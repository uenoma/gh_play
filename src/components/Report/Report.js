import React, { useState, useEffect } from 'react';
import { getSessionReport } from '../../common/ApiWrapper';
import './Report.css';

function Report({ selectedSession }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedSession) {
      setReport(null);
      return;
    }
    setLoading(true);
    setError(null);
    getSessionReport(selectedSession.id)
      .then((data) => setReport(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedSession]);

  if (!selectedSession) {
    return <div className="report"><p className="report-status">セッションを選択してください</p></div>;
  }
  if (loading) {
    return <div className="report"><p className="report-status">読み込み中...</p></div>;
  }
  if (error) {
    return <div className="report"><p className="report-status report-error">{error}</p></div>;
  }

  return (
    <div className="report">
      <h2 className="report-session-name">{report?.name}</h2>
      <section className="report-section">
        <h3 className="report-section-title">参加者一覧</h3>
        {report?.members && report.members.length > 0 ? (
          <table className="report-members-table">
            <thead>
              <tr>
                <th>使用機体</th>
                <th>パイロットポイント</th>
                <th>名前</th>
              </tr>
            </thead>
            <tbody>
              {report.members.map((member) => (
                <tr key={member.id}>
                  <td>
                    {member.mobile_suit ? (
                      <span className="report-ms-name">
                        {member.mobile_suit.ms_number && (
                          <span className="report-ms-number">{member.mobile_suit.ms_number}</span>
                        )}
                        {member.mobile_suit.ms_name}
                        {member.mobile_suit.ms_name_optional && (
                          <span className="report-ms-optional"> ({member.mobile_suit.ms_name_optional})</span>
                        )}
                      </span>
                    ) : (
                      <span className="report-ms-none">未選択</span>
                    )}
                  </td>
                  <td className="report-pilot-point">{member.pilot_point ?? '-'}</td>
                  <td>{member.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="report-status">参加者なし</p>
        )}
      </section>
    </div>
  );
}

export default Report;