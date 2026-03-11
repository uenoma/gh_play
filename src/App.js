import React, { useState } from 'react';
import './App.css';
import BriefingRoom from './components/BriefingRoom/BriefingRoom';
import MSDeck from './components/MSDeck/MSDeck';
import MapContainer from './components/BattleMap/MapContainer';
import PlotContainer from './components/Plot/PlotContainer';
import { logout } from './common/ApiWrapper';
import AuthModal from './components/Auth/AuthModal';

function App() {
  const [activeTab, setActiveTab] = useState('briefing');
  const [selectedSession, setSelectedSession] = useState(null);

  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'
  const [authUser, setAuthUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
    { id: 'combatmap', label: '戦闘マップ' },
    { id: 'plot', label: '行動計画' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'briefing':
        return <BriefingRoom onSelectSession={setSelectedSession} selectedSession={selectedSession} authUser={authUser} />;
      case 'msdeck':
        return <MSDeck />;
      case 'combatmap':
        return <MapContainer />;
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
          onSuccess={(user) => { setAuthUser(user); closeModal(); }}
          onClose={closeModal}
        />
      )}
      </header>
    </div>
  );
}

export default App;
