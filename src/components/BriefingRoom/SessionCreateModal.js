import React, { useState, useRef } from "react";
import { createGameSession } from "../../common/ApiWrapper";
import "../Auth/AuthModal.css";

/**
 * @param {{ onSuccess: () => void, onClose: () => void }} props
 */
function SessionCreateModal({ onSuccess, onClose }) {
  const [form, setForm] = useState({ name: "", description: "", capacity: 4 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const mouseDownOnOverlay = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createGameSession(form);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-modal-overlay"
      onMouseDown={(e) => { mouseDownOnOverlay.current = e.target === e.currentTarget; }}
      onClick={() => { if (mouseDownOnOverlay.current) onClose(); }}
    >
      <div className="auth-modal">
        <h2 className="auth-modal-title">セッション作成</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>セッション名</label>
            <div className="auth-input-wrap">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="255文字以内"
                maxLength={255}
                required
              />
            </div>
          </div>
          <div className="auth-form-group">
            <label>説明（任意）</label>
            <div className="auth-input-wrap">
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="セッションの説明"
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
                value={form.capacity}
                onChange={(e) => setForm((p) => ({ ...p, capacity: Number(e.target.value) }))}
                min={1}
                required
              />
            </div>
          </div>
          {error && <p className="auth-error">{error}</p>}
          <div className="auth-modal-actions">
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "処理中..." : "作成"}
            </button>
            <button type="button" className="auth-btn auth-btn-cancel" onClick={onClose}>
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SessionCreateModal;
