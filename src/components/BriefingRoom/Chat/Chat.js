import React, { useState } from 'react';
import './Chat.css';
import ChannelList from './ChannelList';
import ChatMessages from './ChatMessages';
import MemberList from './MemberList';

function Chat() {
  const [isChannelOpen, setIsChannelOpen] = useState(true);
  const [isParticipantOpen, setIsParticipantOpen] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState('# 一般');

  return (
    <div className="chat">
      <ChannelList isOpen={isChannelOpen} onToggle={() => setIsChannelOpen(!isChannelOpen)} selectedChannel={selectedChannel} onSelectChannel={setSelectedChannel} />
      <ChatMessages isChannelOpen={isChannelOpen} isParticipantOpen={isParticipantOpen} />
      <MemberList isOpen={isParticipantOpen} onToggle={() => setIsParticipantOpen(!isParticipantOpen)} />
    </div>
  );
}

export default Chat;