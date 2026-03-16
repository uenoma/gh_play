const BASE_URL = 'https://dndhideout.com/gh/gh_backend/public/api';

// ローカルストレージのトークンキー
const TOKEN_KEY = 'gh_auth_token';

// トークン管理
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// 共通フェッチヘルパー
const request = async (method, path, body = null, requireAuth = false) => {
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

  if (requireAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const options = { method, headers };
  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, options);

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'APIエラーが発生しました');
    error.status = response.status;
    error.errors = data.errors || null;
    throw error;
  }

  return data;
};

// ============================================================
// ユーザー管理
// ============================================================

/**
 * ユーザー登録
 * @param {{ name: string, email: string, password: string, password_confirmation: string }} params
 * @returns {{ token: string, user: object }}
 */
export const register = async ({ name, email, password, password_confirmation }) => {
  const data = await request('POST', '/register', { name, email, password, password_confirmation });
  setToken(data.token);
  return data;
};

/**
 * ログイン
 * @param {{ email: string, password: string }} params
 * @returns {{ token: string, user: object }}
 */
export const login = async ({ email, password }) => {
  const data = await request('POST', '/login', { email, password });
  setToken(data.token);
  return data;
};

/**
 * ログアウト（認証必須）
 * @returns {{ message: string }}
 */
export const logout = async () => {
  const data = await request('POST', '/logout', null, true);
  removeToken();
  return data;
};

/**
 * ログイン中ユーザー取得（認証必須）
 * @returns {{ id: number, name: string, email: string }}
 */
export const getMe = () => request('GET', '/user', null, true);

/**
 * 退会（認証必須）
 * @returns {{ message: string }}
 */
export const deleteAccount = async () => {
  const data = await request('DELETE', '/user', null, true);
  removeToken();
  return data;
};

// ============================================================
// 機体データ（MobileSuit）
// ============================================================

/**
 * 機体一覧取得
 * @returns {object[]}
 */
export const getMobileSuits = () => request('GET', '/mobile-suits');

/**
 * 機体詳細取得
 * @param {number} id
 * @returns {object}
 */
export const getMobileSuit = (id) => request('GET', `/mobile-suits/${id}`);

/**
 * 機体作成
 * @param {{ data_id: string, ms_number?: string, ms_name: string, ms_name_optional?: string, ms_icon?: string, ms_data: object, creator_name: string, edit_password: string }} params
 * @returns {object}
 */
export const createMobileSuit = (params) => request('POST', '/mobile-suits', params);

/**
 * 機体更新
 * @param {number} id
 * @param {{ data_id: string, ms_number?: string, ms_name: string, ms_name_optional?: string, ms_icon?: string, ms_data: object, creator_name: string, edit_password: string }} params
 * @returns {object}
 */
export const updateMobileSuit = (id, params) => request('PUT', `/mobile-suits/${id}`, params);

/**
 * 機体削除
 * @param {number} id
 * @param {{ creator_name: string, edit_password: string }} params
 * @returns {null}
 */
export const deleteMobileSuit = (id, { creator_name, edit_password }) =>
  request('DELETE', `/mobile-suits/${id}`, { creator_name, edit_password });

// ============================================================
// ゲームセッション
// ============================================================

/**
 * ゲームセッション一覧取得
 * @returns {object[]}
 */
export const getGameSessions = () => request('GET', '/game-sessions');

/**
 * ゲームセッション詳細取得
 * @param {number} id
 * @returns {object}
 */
export const getGameSession = (id) => request('GET', `/game-sessions/${id}`);

/**
 * ゲームセッション作成（認証必須）
 * @param {{ name: string, description?: string, capacity: number }} params
 * @returns {object}
 */
export const createGameSession = (params) => request('POST', '/game-sessions', params, true);

/**
 * ゲームセッション削除（認証必須）
 * @param {number} id
 * @returns {{ message: string }}
 */
export const deleteGameSession = (id) => request('DELETE', `/game-sessions/${id}`, null, true);

/**
 * ゲームセッション編集（認証必須）
 * @param {number} id
 * @param {{ name?: string, description?: string, capacity?: number }} params
 * @returns {object}
 */
export const updateGameSession = (id, params) => request('PATCH', `/game-sessions/${id}`, params, true);

/**
 * ゲームセッションに参加（認証必須）
 * @param {number} id
 * @returns {object}
 */
export const joinGameSession = (id) => request('POST', `/game-sessions/${id}/join`, null, true);

/**
 * ゲームセッションから離脱（認証必須）
 * @param {number} id
 * @returns {{ message: string }}
 */
export const leaveGameSession = (id) => request('DELETE', `/game-sessions/${id}/leave`, null, true);

/**
 * セッションレポート取得（参加者・使用機体・パイロットポイント）
 * @param {number} id - ゲームセッションID
 * @returns {object} セッションレポート
 */
export const getSessionReport = (id) => request('GET', `/game-sessions/${id}/report`);

/**
 * セッションで使用する機体を選択・解除（認証必須）
 * @param {number} id - ゲームセッションID
 * @param {number|null} mobileSuitId - 機体ID（null で解除）
 * @returns {object} 更新されたゲームセッション
 */
export const selectSessionMobileSuit = (id, mobileSuitId) =>
  request('PUT', `/game-sessions/${id}/mobile-suit`, { mobile_suit_id: mobileSuitId }, true);

// ============================================================
// パスワード管理
// ============================================================

/**
 * パスワードリセットメール送信
 * @param {string} email
 * @returns {{ message: string }}
 */
export const forgotPassword = (email) => request('POST', '/forgot-password', { email });

/**
 * パスワードリセット実行
 * @param {{ token: string, email: string, password: string, password_confirmation: string }} params
 * @returns {{ message: string }}
 */
export const resetPassword = (params) => request('POST', '/reset-password', params);

/**
 * パスワード変更（認証必須）
 * @param {{ current_password: string, password: string, password_confirmation: string }} params
 * @returns {{ message: string }}
 */
export const changePassword = (params) => request('PUT', '/user/password', params, true);

// ============================================================
// チャットチャンネル
// ============================================================

/**
 * チャンネル一覧取得（認証必須）
 * @returns {object[]}
 */
export const getChatChannels = () => request('GET', '/chat-channels', null, true);

/**
 * チャンネル詳細取得（認証必須）
 * @param {number} id
 * @returns {object}
 */
export const getChatChannel = (id) => request('GET', `/chat-channels/${id}`, null, true);

/**
 * チャンネル作成（認証必須）
 * @param {{ name: string, description?: string }} params
 * @returns {object}
 */
export const createChatChannel = (params) => request('POST', '/chat-channels', params, true);

/**
 * チャンネル更新（認証必須）
 * @param {number} id
 * @param {{ name?: string, description?: string }} params
 * @returns {object}
 */
export const updateChatChannel = (id, params) => request('PATCH', `/chat-channels/${id}`, params, true);

/**
 * チャンネル削除（認証必須）
 * @param {number} id
 * @returns {{ message: string }}
 */
export const deleteChatChannel = (id) => request('DELETE', `/chat-channels/${id}`, null, true);

/**
 * チャンネル参加（認証必須）
 * @param {number} id
 * @returns {object}
 */
export const joinChatChannel = (id) => request('POST', `/chat-channels/${id}/join`, null, true);

/**
 * チャンネル退出（認証必須）
 * @param {number} id
 * @returns {{ message: string }}
 */
export const leaveChatChannel = (id) => request('DELETE', `/chat-channels/${id}/leave`, null, true);

/**
 * チャンネル既読マーク（認証必須）
 * @param {number} id
 * @returns {{ message: string }}
 */
export const markChatChannelRead = (id) => request('POST', `/chat-channels/${id}/read`, null, true);

/**
 * メッセージ一覧取得（認証必須）
 * @param {number} channelId
 * @param {string} [cursor]
 * @returns {{ data: object[], next_cursor: string|null }}
 */
export const getChatMessages = (channelId, cursor = null) => {
  const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : '';
  return request('GET', `/chat-channels/${channelId}/messages${query}`, null, true);
};

/**
 * メッセージ投稿（認証必須）
 * @param {number} channelId
 * @param {{ body: string }} params
 * @returns {object}
 */
export const createChatMessage = (channelId, params) => request('POST', `/chat-channels/${channelId}/messages`, params, true);

/**
 * メッセージ削除（認証必須）
 * @param {number} channelId
 * @param {number} messageId
 * @returns {{ message: string }}
 */
export const deleteChatMessage = (channelId, messageId) => request('DELETE', `/chat-channels/${channelId}/messages/${messageId}`, null, true);
