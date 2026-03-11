const BASE_URL = 'https://dndhideout.com/gh/gh_backend/public/api';

// ローカルストレージのトークンキー
const TOKEN_KEY = 'gh_auth_token';

// トークン管理
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// 共通フェッチヘルパー
const request = async (method, path, body = null, requireAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };

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
