import React, { useState, useEffect } from 'react';
import './App.css';
import BriefingRoom from './components/BriefingRoom/BriefingRoom';
import MSDeck from './components/MSDeck/MSDeck';
import MapContainer from './components/BattleMap/MapContainer';
import PlotContainer from './components/Plot/PlotContainer';
import { logout, getMe, getToken } from './common/ApiWrapper';
import AuthModal from './components/Auth/AuthModal';
import Report from './components/Report/Report';

function App() {
  const [activeTab, setActiveTab] = useState('briefing');
  const [selectedSession, setSelectedSession] = useState(null);

  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register' | 'reset-password'
  const [authUser, setAuthUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [resetParams, setResetParams] = useState({ token: '', email: '' });

  useEffect(() => {
    if (getToken()) {
      getMe()
        .then((user) => setAuthUser(user))
        .catch(() => {}); // トークンが無効な場合は何もしない
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    if (token && email) {
      setResetParams({ token, email });
      setAuthModal('reset-password');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const openModal = (type) => setAuthModal(type);
  const closeModal = () => setAuthModal(null);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    try {
      await logout();
    } catch (_) {
      // トークンが無効でもローカルの状態はクリアする
    }
    setAuthUser(null);
  };

  const tabs = [
    { id: 'briefing', label: 'ブリーフィング' },
    { id: 'msdeck', label: 'MSデッキ' },
    { id: 'report', label: '戦況' },
    { id: 'plot', label: '行動計画' },
    { id: 'combatmap', label: '戦闘マップ' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'briefing':
        return <BriefingRoom onSelectSession={setSelectedSession} selectedSession={selectedSession} authUser={authUser} />;
      case 'msdeck':
        return <MSDeck selectedSession={selectedSession} authUser={authUser} />;
      case 'report':
        return <Report selectedSession={selectedSession} authUser={authUser} />;
      case 'combatmap':
        return <MapContainer selectedSession={selectedSession} />;
      case 'plot':
        return <PlotContainer />;
      default:
        return <BriefingRoom onSelectSession={setSelectedSession} selectedSession={selectedSession} authUser={authUser} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-bar">
          <div className="logo">GH Play</div>
          <div className="session-info">
            {selectedSession ? `${selectedSession.name}` : 'セッションを選択してください'}
          </div>
          <div className="auth-buttons">
            {authUser ? (
              <div className="user-menu-wrap">
                <button
                  className="auth-btn auth-username-btn"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                >
                  {authUser.name} ▾
                </button>
                {userMenuOpen && (
                  <div className="user-submenu">
                    <button className="user-submenu-item" onClick={handleLogout}>ログアウト</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="auth-btn" onClick={() => openModal('login')}>ログイン</button>
                <button className="auth-btn" onClick={() => openModal('register')}>サインイン</button>
              </>
            )}
          </div>
        </div>
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      {authModal && (
        <AuthModal
          mode={authModal}
          initialToken={resetParams.token}
          initialEmail={resetParams.email}
          onSuccess={(user) => { setAuthUser(user); closeModal(); }}
          onClose={closeModal}
        />
      )}
      </header>
    </div>
  );
}

export default App;
