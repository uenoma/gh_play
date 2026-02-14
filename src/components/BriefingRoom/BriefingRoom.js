import React from 'react';
import SessionList from './SessionList';
import Chat from './Chat/Chat';
import './BriefingRoom.css';

function BriefingRoom({ onSelectSession, selectedSession }) {
  return (
    <div className="briefing-room">
      <div className="briefing-left">
        <SessionList onSelectSession={onSelectSession} selectedSession={selectedSession} />
      </div>
      <div className="briefing-right">
        <Chat />
      </div>
    </div>
  );
}

export default BriefingRoom;