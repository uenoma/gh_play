import React, { useState, useEffect } from 'react';
import './Chat.css';
import ChannelList from './ChannelList';
import ChatMessages from './ChatMessages';
import MemberList from './MemberList';
import { getChatChannel } from '../../../common/ApiWrapper';

function Chat({ authUser }) {
  const [isChannelOpen, setIsChannelOpen] = useState(true);
  const [isParticipantOpen, setIsParticipantOpen] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channelMembers, setChannelMembers] = useState([]);

  useEffect(() => {
    if (!selectedChannel) {
      setChannelMembers([]);
      return;
    }
    getChatChannel(selectedChannel.id)
      .then(data => setChannelMembers(data.members ?? []))
      .catch(() => setChannelMembers([]));
  }, [selectedChannel]);

  return (
    <div className="chat">
      <ChannelList isOpen={isChannelOpen} onToggle={() => setIsChannelOpen(!isChannelOpen)} selectedChannel={selectedChannel?.id ?? null} onSelectChannel={(ch) => setSelectedChannel(ch)} />
      <ChatMessages isChannelOpen={isChannelOpen} isParticipantOpen={isParticipantOpen} selectedChannel={selectedChannel} authUser={authUser} />
      <MemberList isOpen={isParticipantOpen} onToggle={() => setIsParticipantOpen(!isParticipantOpen)} members={channelMembers} />
    </div>
  );
}

export default Chat;