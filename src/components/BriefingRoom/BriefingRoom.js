import React, { useState } from 'react';
import SessionList from './SessionList';
import Chat from './Chat/Chat';
import './BriefingRoom.css';

function BriefingRoom({ onSelectSession, selectedSession, authUser }) {
  const [channelRefreshKey, setChannelRefreshKey] = useState(0);

  return (
    <div className="briefing-room">
      <div className="briefing-left">
        <SessionList
          onSelectSession={onSelectSession}
          selectedSession={selectedSession}
          authUser={authUser}
          onSessionCreated={() => setChannelRefreshKey(k => k + 1)}
        />
      </div>
      <div className="briefing-right">
        <Chat authUser={authUser} channelRefreshKey={channelRefreshKey} />
      </div>
    </div>
  );
}

export default BriefingRoom;