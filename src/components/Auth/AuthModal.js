import React, { useState, useRef } from 'react';
import { login, register, forgotPassword, resetPassword } from '../../common/ApiWrapper';
import './AuthModal.css';

/**
 * @param {{ mode: 'login' | 'register' | 'reset-password', initialEmail?: string, initialToken?: string, onSuccess: (user: object) => void, onClose: () => void }} props
 */
function AuthModal({ mode, initialEmail = '', initialToken = '', onSuccess, onClose }) {
  const [view, setView] = useState(mode); // 'login' | 'register' | 'forgot-password' | 'reset-password'
  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail,
    password: '',
    password_confirmation: '',
    token: initialToken,
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
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
    setSuccessMsg('');
    try {
      if (view === 'login') {
        const data = await login({ email: formData.email, password: formData.password });
        onSuccess(data.user);
      } else if (view === 'register') {
        const data = await register(formData);
        onSuccess(data.user);
      } else if (view === 'forgot-password') {
        const data = await forgotPassword(formData.email);
        setSuccessMsg(data.message || 'パスワードリセットメールを送信しました。');
      } else if (view === 'reset-password') {
        const data = await resetPassword({
          token: formData.token,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        });
        setSuccessMsg(data.message || 'パスワードをリセットしました。');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchView = (nextView) => {
    setError('');
    setSuccessMsg('');
    setView(nextView);
  };

  const titles = {
    login: 'ログイン',
    register: 'ユーザー登録',
    'forgot-password': 'パスワードリセット',
    'reset-password': '新しいパスワードの設定',
  };

  return (
    <div
      className="auth-modal-overlay"
      onMouseDown={(e) => { mouseDownOnOverlay.current = e.target === e.currentTarget; }}
      onClick={() => { if (mouseDownOnOverlay.current) onClose(); }}
    >
      <div className="auth-modal">
        <h2 className="auth-modal-title">{titles[view]}</h2>

        {successMsg ? (
          <>
            <p className="auth-success">{successMsg}</p>
            <div className="auth-modal-actions">
              {view === 'reset-password' ? (
                <button type="button" className="auth-btn" onClick={() => switchView('login')}>
                  ログインへ
                </button>
              ) : (
                <button type="button" className="auth-btn" onClick={onClose}>
                  閉じる
                </button>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            {view === 'register' && (
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
            {(view === 'login' || view === 'register' || view === 'reset-password') && (
              <div className="auth-form-group">
                <label>{view === 'reset-password' ? '新しいパスワード' : 'パスワード'}</label>
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
            )}
            {(view === 'register' || view === 'reset-password') && (
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
            {view === 'login' && (
              <div className="auth-forgot-link">
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => switchView('forgot-password')}
                >
                  パスワードをお忘れですか？
                </button>
              </div>
            )}
            {error && <p className="auth-error">{error}</p>}
            <div className="auth-modal-actions">
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading
                  ? '処理中...'
                  : view === 'login'
                  ? 'ログイン'
                  : view === 'register'
                  ? '登録'
                  : view === 'forgot-password'
                  ? 'メールを送信'
                  : 'パスワードを変更'}
              </button>
              {view === 'forgot-password' ? (
                <button
                  type="button"
                  className="auth-btn auth-btn-cancel"
                  onClick={() => switchView('login')}
                >
                  戻る
                </button>
              ) : (
                <button type="button" className="auth-btn auth-btn-cancel" onClick={onClose}>
                  キャンセル
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
