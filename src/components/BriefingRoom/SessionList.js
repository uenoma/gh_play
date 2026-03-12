import React, { useState, useEffect, useCallback, useRef } from "react";
import { getGameSessions, deleteGameSession } from "../../common/ApiWrapper";
import iconReload from "../../assets/images/icon_reload.png";
import iconDelete from "../../assets/images/icon_delete.png";
import iconDetail from "../../assets/images/icon_detail.png";
import SessionCreateModal from "./SessionCreateModal";
import SessionDetailModal from "./SessionDetailModal";
import "./SessionList.css";
import "../Common.css";

function SessionList({ onSelectSession, selectedSession: appSelectedSession, authUser }) {
  const [sessionList, setSessionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedSession, setSelectedSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [detailSessionId, setDetailSessionId] = useState(null);

  const sortKeyRef = useRef(sortKey);
  const sortOrderRef = useRef(sortOrder);
  useEffect(() => { sortKeyRef.current = sortKey; }, [sortKey]);
  useEffect(() => { sortOrderRef.current = sortOrder; }, [sortOrder]);

  const applySort = useCallback((list, key, order) => {
    return [...list].sort((a, b) => {
      const aVal = key === "creator" ? a.user?.name : a[key];
      const bVal = key === "creator" ? b.user?.name : b[key];
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, []);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGameSessions();
      setSessionList(applySort(data, sortKeyRef.current, sortOrderRef.current));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [applySort]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useEffect(() => {
    setSelectedSession(appSelectedSession);
  }, [appSelectedSession]);

  const handleRefresh = () => {
    fetchSessions();
  };

  const openCreateModal = () => {
    if (!authUser) {
      setError("セッションを作成するにはログインしてください。");
      return;
    }
    setCreateModal(true);
  };

  const handleDelete = async (e, session) => {
    e.stopPropagation();
    if (!window.confirm(`セッション "${session.name}" を削除しますか？`)) return;
    try {
      await deleteGameSession(session.id);
      fetchSessions();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
    setSessionList((prev) => applySort(prev, key, order));
  };

  const filteredSessionList = sessionList.filter((session) =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (session.user?.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="session-list">
      <div className="session-buttons">
        <button className="session-refresh-btn" onClick={handleRefresh}>
          <img src={iconReload} alt="更新" />
        </button>
        <input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="session-search-input"
        />
        <button
          className="session-create-btn"
          onClick={openCreateModal}
        >
          セッション作成
        </button>
      </div>
      <div className="session-table-container">
        {loading ? (
          <p className="session-status-msg">読み込み中...</p>
        ) : error ? (
          <p className="session-status-msg session-error-msg">{error}</p>
        ) : (
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
              <th onClick={() => handleSort("capacity")}>
                定員{" "}
                {sortKey === "capacity" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th>参加人数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessionList.map((session) => (
              <tr
                key={session.id}
                className={selectedSession?.id === session.id ? 'selected' : ''}
                onClick={() => {
                  setSelectedSession(session);
                  if (onSelectSession) onSelectSession(session);
                }}
              >
                <td>{session.id}</td>
                <td className="session-name">{session.name}</td>
                <td>{session.user?.name}</td>
                <td>{session.capacity}</td>
                <td className="session-member-count">
                  {session.members_count ?? session.members?.length ?? "-"}
                </td>
                <td className="action-cell">
                  <button
                    className="session-detail-btn"
                    title="詳細"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailSessionId(session.id);
                    }}
                  >
                    <img src={iconDetail} alt="詳細" />
                  </button>
                  {authUser && authUser.id === session.user?.id && (
                    <button
                      className="session-delete-btn"
                      title="削除"
                      onClick={(e) => handleDelete(e, session)}
                    >
                      <img src={iconDelete} alt="削除" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {detailSessionId && (
        <SessionDetailModal
          sessionId={detailSessionId}
          authUser={authUser}
          onClose={() => setDetailSessionId(null)}
          onUpdate={fetchSessions}
        />
      )}
      {createModal && (
        <SessionCreateModal
          onSuccess={() => { setCreateModal(false); fetchSessions(); }}
          onClose={() => setCreateModal(false)}
        />
      )}
    </div>
  );
}

export default SessionList;
