const base = '/api/v1';
const api = {
  users: `${base}/users`,
  auth: `${base}/auth`,
  files: `${base}/files`,
  folders: `${base}/folders`,
  messages: `${base}/messages`,
  userFolders: (id) => `${base}/users/${id}/folders`,
  folderById: (id) => `/folders/${id}`,
  fileById: (id) => `/files/${id}`,
};

export default api;
