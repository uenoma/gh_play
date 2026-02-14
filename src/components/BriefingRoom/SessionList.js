import React, { useState } from "react";
import sessions from "./sessionData";
import iconReload from "../../assets/images/icon_reload.png";
import "./SessionList.css";
import "../Common.css";

function SessionList({ onSelectSession }) {
  const [sessionList, setSessionList] = useState(sessions);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedSession, setSelectedSession] = useState(null);

  const handleRefresh = () => {
    // ダミーの更新処理（実際にはAPIから再取得）
    setSessionList([...sessions]);
    alert("セッション一覧を更新しました");
  };

  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
    const sorted = [...sessionList].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSessionList(sorted);
  };

  return (
    <div className="session-list">
      <div className="session-buttons">
        <button className="session-refresh-btn" onClick={handleRefresh}>
          <img src={iconReload} alt="更新" />
        </button>
        <button
          className="session-create-btn"
          onClick={() => alert("セッション作成機能は未実装です")}
        >
          セッション作成
        </button>
      </div>
      <div className="session-table-container">
        <table className="common-table">
          <thead className="common-thead-sticky">
            <tr>
              <th onClick={() => handleSort("id")}>
                ID {sortKey === "id" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("name")}>
                セッション名{" "}
                {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("creator")}>
                作成者{" "}
                {sortKey === "creator" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("participants")}>
                参加人数{" "}
                {sortKey === "participants" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {sessionList.map((session) => (
              <tr
                key={session.id}
                className={selectedSession === session.id ? 'selected' : ''}
                onClick={() => {
                  setSelectedSession(session.id);
                  if (onSelectSession) onSelectSession(session);
                }}
              >
                <td>{session.id}</td>
                <td className="session-name">{session.name}</td>
                <td>{session.creator}</td>
                <td>{session.participants}</td>
                <td className="action-cell">
                  <button
                    className="session-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`セッション "${session.name}" を削除しました！`);
                    }}
                  >
                    削除
                  </button>
                  <button
                    className="session-join-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`セッション "${session.name}" に参加しました！`);
                    }}
                  >
                    参加
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SessionList;
