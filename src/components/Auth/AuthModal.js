import React, { useState, useRef } from 'react';
import { login, register } from '../../common/ApiWrapper';
import './AuthModal.css';

/**
 * @param {{ mode: 'login' | 'register', onSuccess: (user: object) => void, onClose: () => void }} props
 */
function AuthModal({ mode, onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const mouseDownOnOverlay = useRef(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data =
        mode === 'login'
          ? await login({ email: formData.email, password: formData.password })
          : await register(formData);
      onSuccess(data.user);
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
        <h2 className="auth-modal-title">
          {mode === 'login' ? 'ログイン' : 'ユーザー登録'}
        </h2>
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="auth-form-group">
              <label>アカウント名</label>
              <div className="auth-input-wrap">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="英数字・_-.のみ"
                  required
                />
              </div>
            </div>
          )}
          <div className="auth-form-group">
            <label>メールアドレス</label>
            <div className="auth-input-wrap">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>
          <div className="auth-form-group">
            <label>パスワード</label>
            <div className="auth-input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="8文字以上"
                required
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {mode === 'register' && (
            <div className="auth-form-group">
              <label>パスワード（確認）</label>
              <div className="auth-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="パスワードを再入力"
                  required
                />
              </div>
            </div>
          )}
          {error && <p className="auth-error">{error}</p>}
          <div className="auth-modal-actions">
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? '処理中...' : mode === 'login' ? 'ログイン' : '登録'}
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

export default AuthModal;
