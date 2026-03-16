import React, { useState, useEffect } from 'react';
import { getSessionReport, updatePilotPoint } from '../../common/ApiWrapper';
import './Report.css';

function Report({ selectedSession, authUser }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ppDraft, setPpDraft] = useState({});   // { [memberId]: value }
  const [ppSaving, setPpSaving] = useState({}); // { [memberId]: bool }
  const [ppError, setPpError] = useState({});   // { [memberId]: string }

  useEffect(() => {
    if (!selectedSession) {
      setReport(null);
      return;
    }
    setLoading(true);
    setError(null);
    getSessionReport(selectedSession.id)
      .then((data) => {
        setReport(data);
        const drafts = {};
        data.members?.forEach((m) => { drafts[m.id] = m.pilot_point ?? 0; });
        setPpDraft(drafts);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedSession]);

  const handlePpSave = async (memberId) => {
    if (!selectedSession) return;
    setPpSaving((prev) => ({ ...prev, [memberId]: true }));
    setPpError((prev) => ({ ...prev, [memberId]: null }));
    try {
      await updatePilotPoint(selectedSession.id, ppDraft[memberId]);
      setReport((prev) => ({
        ...prev,
        members: prev.members.map((m) =>
          m.id === memberId ? { ...m, pilot_point: ppDraft[memberId] } : m
        ),
      }));
    } catch (err) {
      setPpError((prev) => ({ ...prev, [memberId]: err.message }));
    } finally {
      setPpSaving((prev) => ({ ...prev, [memberId]: false }));
    }
  };

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
                  <td className="report-pilot-point">
                    {authUser && authUser.id === member.id ? (
                      <div className="report-pp-edit">
                        <input
                          type="number"
                          className="report-pp-input"
                          min={0}
                          value={ppDraft[member.id] ?? 0}
                          onChange={(e) =>
                            setPpDraft((prev) => ({ ...prev, [member.id]: Number(e.target.value) }))
                          }
                        />
                        <button
                          className="report-pp-btn"
                          onClick={() => handlePpSave(member.id)}
                          disabled={ppSaving[member.id] || ppDraft[member.id] === member.pilot_point}
                        >
                          {ppSaving[member.id] ? '...' : '更新'}
                        </button>
                        {ppError[member.id] && (
                          <span className="report-pp-error">{ppError[member.id]}</span>
                        )}
                      </div>
                    ) : (
                      member.pilot_point ?? '-'
                    )}
                  </td>
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