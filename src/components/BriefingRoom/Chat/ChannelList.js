import React, { useState, useEffect } from 'react';
import './Chat.css';
import { getChatChannels, deleteChatChannel, createChatChannel, joinChatChannel } from '../../../common/ApiWrapper';

const CHANNEL_NAME_MAX = 100;

function ChannelList({ isOpen, onToggle, selectedChannel, onSelectChannel, authUser, onDelete, refreshKey }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const fetchChannels = () => {
    setLoading(true);
    setError(null);
    getChatChannels()
      .then(data => { setChannels(data); setLoading(false); })
      .catch(err => { setError(err.message || 'チャンネルの取得に失敗しました'); setLoading(false); });
  };

  useEffect(() => { fetchChannels(); }, [authUser, refreshKey]);

  const selectedChannelObj = channels.find(ch => ch.id === selectedChannel) ?? null;
  const canDelete = authUser && selectedChannelObj
    && !selectedChannelObj.is_system
    && selectedChannelObj.user_id === authUser.id;

  const handleDelete = async () => {
    if (!canDelete || deleting) return;
    if (!window.confirm(`「${selectedChannelObj.name}」を削除しますか？`)) return;
    setDeleting(true);
    try {
      await deleteChatChannel(selectedChannelObj.id);
      onDelete?.(selectedChannelObj.id);
      fetchChannels();
    } catch (_) {}
    finally { setDeleting(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const name = newChannelName.trim().slice(0, CHANNEL_NAME_MAX);
    if (!name || creating) return;
    setCreating(true);
    setCreateError(null);
    try {
      const created = await createChatChannel({ name });
      await joinChatChannel(created.id);
      setNewChannelName('');
      setShowCreateForm(false);
      fetchChannels();
    } catch (err) {
      setCreateError(err.message || 'チャンネルの作成に失敗しました');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className={`chat-sidebar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? (
        <div className="chat-channels channel-list-inner">
          <div className="header-row">
            <h4>チャンネル</h4>
            <button onClick={onToggle} className="toggle-btn">◀</button>
          </div>
          <div className="channel-list-body">
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
          {authUser && (
            <div className="channel-list-actions">
              {showCreateForm ? (
                <form onSubmit={handleCreate} className="channel-create-form">
                  <input
                    type="text"
                    className="channel-create-input"
                    value={newChannelName}
                    onChange={e => setNewChannelName(e.target.value)}
                    placeholder="チャンネル名"
                    maxLength={CHANNEL_NAME_MAX}
                    autoFocus
                  />
                  {createError && <p className="channel-status channel-error">{createError}</p>}
                  <div className="channel-create-btns">
                    <button type="submit" className="channel-action-btn channel-create-btn" disabled={creating || !newChannelName.trim()}>
                      {creating ? '...' : '作成'}
                    </button>
                    <button type="button" className="channel-action-btn channel-cancel-btn" onClick={() => { setShowCreateForm(false); setNewChannelName(''); setCreateError(null); }}>
                      キャンセル
                    </button>
                  </div>
                </form>
              ) : (
                <button className="channel-action-btn channel-add-btn" onClick={() => setShowCreateForm(true)}>
                  + チャンネルを作成
                </button>
              )}
              {canDelete && !showCreateForm && (
                <button
                  className="channel-action-btn channel-delete-btn"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? '...' : 'チャンネルを削除'}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <button onClick={onToggle} className="toggle-btn">▶</button>
      )}
    </div>
  );
}

export default ChannelList;