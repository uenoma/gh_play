import React, { useState, useEffect, useRef } from "react";
import { getGameSession, updateGameSession, joinGameSession, leaveGameSession } from "../../common/ApiWrapper";
import "../Auth/AuthModal.css";
import "./SessionCreateModal.css";
import "./SessionDetailModal.css";
import iconMinus from "../../assets/images/icon_minus.png";

/**
 * @param {{ sessionId: number, authUser: object|null, onClose: () => void }} props
 */
function SessionDetailModal({ sessionId, authUser, onClose, onUpdate }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", description: "", capacity: 1 });
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const mouseDownOnOverlay = useRef(false);

  const loadSession = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getGameSession(sessionId);
      setSession(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const openEdit = () => {
    setEditForm({ name: session.name, description: session.description ?? "", capacity: session.capacity });
    setEditError("");
    setEditMode(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      const updated = await updateGameSession(sessionId, editForm);
      setSession(updated);
      setEditMode(false);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const isOwner = authUser && session && authUser.id === session.user?.id;
  const isMember = authUser && session && session.members?.some((m) => m.id === authUser.id);

  const handleJoin = async () => {
    if (!authUser) return;
    setJoinLoading(true);
    setError("");
    try {
      await joinGameSession(sessionId);
      onUpdate?.();
      await loadSession();
    } catch (err) {
      setError(err.message);
    } finally {
      setJoinLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!window.confirm("このセッションから離脱しますか？")) return;
    setLeaveLoading(true);
    setError("");
    try {
      await leaveGameSession(sessionId);
      onUpdate?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLeaveLoading(false);
    }
  };

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleString("ja-JP", { dateStyle: "short", timeStyle: "short" }) : "-";

  return (
    <div
      className="auth-modal-overlay"
      onMouseDown={(e) => { mouseDownOnOverlay.current = e.target === e.currentTarget; }}
      onClick={() => { if (mouseDownOnOverlay.current) onClose(); }}
    >
      <div className="auth-modal session-detail-modal">
        <h2 className="auth-modal-title">セッション詳細</h2>
        {loading ? (
          <p className="session-detail-msg">読み込み中...</p>
        ) : error ? (
          <p className="session-detail-msg auth-error">{error}</p>
        ) : session && !editMode && (
          <dl className="session-detail-list">
            <div className="session-detail-row">
              <dt>ID</dt>
              <dd>{session.id}</dd>
            </div>
            <div className="session-detail-row">
              <dt>セッション名</dt>
              <dd>{session.name}</dd>
            </div>
            <div className="session-detail-row">
              <dt>説明</dt>
              <dd className="session-detail-description">{session.description || "（なし）"}</dd>
            </div>
            <div className="session-detail-row">
              <dt>定員</dt>
              <dd>{session.capacity} 人</dd>
            </div>
            <div className="session-detail-row">
              <dt>作成者</dt>
              <dd>{session.user?.name}</dd>
            </div>
            <div className="session-detail-row">
              <dt>作成日時</dt>
              <dd>{formatDate(session.created_at)}</dd>
            </div>
            <div className="session-detail-row">
              <dt>更新日時</dt>
              <dd>{formatDate(session.updated_at)}</dd>
            </div>
            <div className="session-detail-row session-detail-members-row">
              <dt>参加者</dt>
              <dd>
                {session.members && session.members.length > 0 ? (
                  <ul className="session-members-list">
                    {session.members.map((member) => (
                      <li key={member.id} className="session-member-item">
                        <span className="session-member-name">{member.name}</span>
                        <span className="session-member-date">
                          {formatDate(member.pivot?.joined_at)}
                        </span>
                        {authUser && authUser.id === member.id && (
                          <button
                            className="session-member-leave-btn"
                            title="離脱"
                            onClick={handleLeave}
                            disabled={leaveLoading}
                          >
                            <img src={iconMinus} alt="離脱" />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="session-no-members">参加者なし</span>
                )}
              </dd>
            </div>
          </dl>
        )}
        {session && editMode && (
          <form onSubmit={handleEditSubmit}>
            <div className="auth-form-group">
              <label>セッション名</label>
              <div className="auth-input-wrap">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                  maxLength={255}
                  required
                />
              </div>
            </div>
            <div className="auth-form-group">
              <label>説明（任意）</label>
              <div className="auth-input-wrap">
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="create-session-textarea"
                />
              </div>
            </div>
            <div className="auth-form-group">
              <label>定員数</label>
              <div className="auth-input-wrap">
                <input
                  type="number"
                  value={editForm.capacity}
                  onChange={(e) => setEditForm((p) => ({ ...p, capacity: Number(e.target.value) }))}
                  min={1}
                  required
                />
              </div>
            </div>
            {editError && <p className="auth-error">{editError}</p>}
            <div className="auth-modal-actions">
              <button type="submit" className="auth-btn" disabled={editLoading}>
                {editLoading ? "処理中..." : "保存"}
              </button>
              <button type="button" className="auth-btn auth-btn-cancel" onClick={() => setEditMode(false)}>
                キャンセル
              </button>
            </div>
          </form>
        )}
        {!editMode && (
        <div className="auth-modal-actions">
          {isOwner && (
            <button className="auth-btn session-edit-action-btn" onClick={openEdit}>編集</button>
          )}
          {authUser && !isMember && (
            <button className="auth-btn session-join-action-btn" onClick={handleJoin} disabled={joinLoading}>
              {joinLoading ? "処理中..." : "参加"}
            </button>
          )}
          <button className="auth-btn auth-btn-cancel" onClick={onClose}>閉じる</button>
        </div>
        )}
      </div>
    </div>
  );
}

export default SessionDetailModal;
