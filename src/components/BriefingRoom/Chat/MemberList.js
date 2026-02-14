import React from 'react';
import './Chat.css';

function MemberList({ isOpen, onToggle }) {
  return (
    <div className={`chat-participants ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? (
        <div>
          <div className="header-row">
            <h4>参加者</h4>
            <button onClick={onToggle} className="toggle-btn">▶</button>
          </div>
          <ul>
            <li>ユーザー1</li>
            <li>ユーザー2</li>
            <li>ユーザー3</li>
          </ul>
        </div>
      ) : (
        <button onClick={onToggle} className="toggle-btn">◀</button>
      )}
    </div>
  );
}

export default MemberList;