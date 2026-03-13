import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { getChatMessages, createChatMessage } from '../../../common/ApiWrapper';

function ChatMessages({ isChannelOpen, isParticipantOpen, selectedChannel, authUser }) {
  const className = `chat-main ${isChannelOpen ? 'channel-open' : 'channel-closed'} ${isParticipantOpen ? 'participant-open' : 'participant-closed'}`;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!selectedChannel) {
      setMessages([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    getChatMessages(selectedChannel.id)
      .then(data => {
        // APIは新しい順で返すため逆順にして古い順で表示
        setMessages([...(data.data ?? [])].reverse());
        setLoading(false);
      })
      .catch(err => {
        setError(err.status === 403 ? 'チャンネルに参加するとメッセージを閲覧できます' : (err.message || 'メッセージの取得に失敗しました'));
        setLoading(false);
      });
  }, [selectedChannel]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !selectedChannel || sending) return;
    setSending(true);
    try {
      const newMsg = await createChatMessage(selectedChannel.id, { body: inputText.trim() });
      setMessages(prev => [...prev, newMsg]);
      setInputText('');
    } catch (err) {
      // 送信失敗は無視（入力は保持）
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = !!authUser && !!selectedChannel && !sending;

  return (
    <div className={className}>
      <div className="chat-messages">
        {!selectedChannel ? (
          <p className="chat-status">チャンネルを選択してください</p>
        ) : loading ? (
          <p className="chat-status">読み込み中...</p>
        ) : error ? (
          <p className="chat-status chat-error">{error}</p>
        ) : messages.length === 0 ? (
          <p className="chat-status">メッセージはまだありません</p>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              className={`chat-message ${authUser && msg.user_id === authUser.id ? 'mine' : 'theirs'}`}
            >
              <span className="chat-message-user">{msg.user?.name ?? '不明'}</span>
              <span className="chat-message-body">{msg.body}</span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-area">
        <textarea
          className="chat-input"
          placeholder={authUser ? 'メッセージを入力... (Shift+Enterで改行)' : 'ログインするとメッセージを送信できます'}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!canSend}
          rows={1}
        />
        <button className="chat-send-btn" onClick={handleSend} disabled={!canSend}>
          送信
        </button>
      </div>
    </div>
  );
}

export default ChatMessages;