import React, { useState } from 'react';
import './App.css';
import BriefingRoom from './components/BriefingRoom/BriefingRoom';
import MSDeck from './components/MSDeck/MSDeck';
import MapContainer from './components/BattleMap/MapContainer';
import PlotContainer from './components/Plot/PlotContainer';

function App() {
  const [activeTab, setActiveTab] = useState('briefing');
  const [selectedSession, setSelectedSession] = useState(null);

  const tabs = [
    { id: 'briefing', label: 'ブリーフィング' },
    { id: 'msdeck', label: 'MSデッキ' },
    { id: 'combatmap', label: '戦闘マップ' },
    { id: 'plot', label: '行動計画' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'briefing':
        return <BriefingRoom onSelectSession={setSelectedSession} />;
      case 'msdeck':
        return <MSDeck />;
      case 'combatmap':
        return <MapContainer />;
      case 'plot':
        return <PlotContainer />;
      default:
        return <BriefingRoom onSelectSession={setSelectedSession} />;
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
            <button className="auth-btn">ログイン</button>
            <button className="auth-btn">サインイン</button>
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
      </header>
    </div>
  );
}

export default App;
