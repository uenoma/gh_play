import React from 'react';
import './Chat.css';

function MemberList({ isOpen, onToggle, members = [] }) {
  return (
    <div className={`chat-participants ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? (
        <div>
          <div className="header-row">
            <h4>参加者</h4>
            <button onClick={onToggle} className="toggle-btn">▶</button>
          </div>
          {members.length === 0 ? (
            <p className="channel-status">参加者なし</p>
          ) : (
            <ul>
              {members.map(member => (
                <li key={member.id}>{member.name}</li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <button onClick={onToggle} className="toggle-btn">◀</button>
      )}
    </div>
  );
}

export default MemberList;