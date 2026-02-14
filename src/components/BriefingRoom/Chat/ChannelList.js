import React from 'react';
import './Chat.css';

function ChannelList({ isOpen, onToggle, selectedChannel, onSelectChannel }) {
  const channels = ['# 一般', '# セッション1', '# セッション2'];

  return (
    <div className={`chat-sidebar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? (
        <div className="chat-channels">
          <div className="header-row">
            <h4>チャンネル</h4>
            <button onClick={onToggle} className="toggle-btn">◀</button>
          </div>
          <ul>
            {channels.map(channel => (
              <li
                key={channel}
                className={selectedChannel === channel ? 'selected' : ''}
                onClick={() => onSelectChannel(channel)}
              >
                {channel}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={onToggle} className="toggle-btn">▶</button>
      )}
    </div>
  );
}

export default ChannelList;