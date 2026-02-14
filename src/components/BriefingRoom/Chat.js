import React from 'react';
import './Chat.css';

function Chat() {
  return (
    <div className="chat">
      <div className="chat-messages">
        <p>チャットメッセージがここに表示されます...</p>
        <p>ユーザー1: こんにちは！</p>
        <p>ユーザー2: セッションに参加しましょう。</p>
      </div>
      <div className="chat-input-area">
        <input type="text" className="chat-input" placeholder="メッセージを入力..." />
        <button className="chat-send-btn">送信</button>
      </div>
    </div>
  );
}

export default Chat;