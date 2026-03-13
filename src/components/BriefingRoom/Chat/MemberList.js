import React, { useState } from 'react';
import './Chat.css';
import { joinChatChannel, leaveChatChannel } from '../../../common/ApiWrapper';

function MemberList({ isOpen, onToggle, members = [], selectedChannel, authUser, onMembersChange }) {
  const [working, setWorking] = useState(false);

  const isMember = authUser && members.some(m => m.id === authUser.id);

  const handleJoin = async () => {
    if (!selectedChannel || working) return;
    setWorking(true);
    try {
      await joinChatChannel(selectedChannel.id);
      onMembersChange?.();
    } catch (_) {}
    finally { setWorking(false); }
  };

  const handleLeave = async () => {
    if (!selectedChannel || working) return;
    setWorking(true);
    try {
      await leaveChatChannel(selectedChannel.id);
      onMembersChange?.();
    } catch (_) {}
    finally { setWorking(false); }
  };

  return (
    <div className={`chat-participants ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? (
        <div className="member-list-inner">
          <div className="header-row">
            <h4>参加者</h4>
            <button onClick={onToggle} className="toggle-btn">▶</button>
          </div>
          <div className="member-list-body">
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
          {authUser && selectedChannel && (
            <div className="member-list-actions">
              {isMember ? (
                <button
                  className="member-action-btn leave-btn"
                  onClick={handleLeave}
                  disabled={working}
                >
                  {working ? '...' : '退出'}
                </button>
              ) : (
                <button
                  className="member-action-btn join-btn"
                  onClick={handleJoin}
                  disabled={working}
                >
                  {working ? '...' : '参加'}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <button onClick={onToggle} className="toggle-btn">◀</button>
      )}
    </div>
  );
}

export default MemberList;