import React, { useState, useEffect } from 'react';
import './Chat.css';
import { getChatChannels } from '../../../common/ApiWrapper';

function ChannelList({ isOpen, onToggle, selectedChannel, onSelectChannel }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getChatChannels()
      .then(data => {
        setChannels(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'チャンネルの取得に失敗しました');
        setLoading(false);
      });
  }, []);

  return (
    <div className={`chat-sidebar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? (
        <div className="chat-channels">
          <div className="header-row">
            <h4>チャンネル</h4>
            <button onClick={onToggle} className="toggle-btn">◀</button>
          </div>
          {loading ? (
            <p className="channel-status">読み込み中...</p>
          ) : error ? (
            <p className="channel-status channel-error">{error}</p>
          ) : (
            <ul>
              {channels.map(channel => (
                <li
                  key={channel.id}
                  className={selectedChannel === channel.id ? 'selected' : ''}
                  onClick={() => onSelectChannel(channel)}
                >
                  # {channel.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <button onClick={onToggle} className="toggle-btn">▶</button>
      )}
    </div>
  );
}

export default ChannelList;