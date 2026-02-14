import React from 'react';
import './Chat.css';

function ChatMessages({ isChannelOpen, isParticipantOpen }) {
  const className = `chat-main ${isChannelOpen ? 'channel-open' : 'channel-closed'} ${isParticipantOpen ? 'participant-open' : 'participant-closed'}`;

  return (
    <div className={className}>
      <div className="chat-messages">
        <p>チャットメッセージがここに表示されます...</p>
      </div>
      <div className="chat-input-area">
        <input type="text" className="chat-input" placeholder="メッセージを入力..." />
        <button className="chat-send-btn">送信</button>
      </div>
    </div>
  );
}

export default ChatMessages;