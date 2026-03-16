import React, { useState, useEffect } from 'react';
import { getGameSession } from '../../common/ApiWrapper';
import './Report.css';

function Report({ selectedSession }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedSession) {
      setSession(null);
      return;
    }
    setLoading(true);
    setError(null);
    getGameSession(selectedSession.id)
      .then((data) => setSession(data))
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

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleString('ja-JP', { dateStyle: 'short', timeStyle: 'short' }) : '-';

  return (
    <div className="report">
      <h2 className="report-session-name">{session?.name}</h2>
      <section className="report-section">
        <h3 className="report-section-title">参加者一覧</h3>
        {session?.members && session.members.length > 0 ? (
          <table className="report-members-table">
            <thead>
              <tr>
                <th>名前</th>
                <th>参加日時</th>
              </tr>
            </thead>
            <tbody>
              {session.members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{formatDate(member.pivot?.joined_at)}</td>
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