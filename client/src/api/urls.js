const base = '/api/v1';
const api = {
  users: `${base}/users`,
  auth: `${base}/auth`,
  files: `${base}/files`,
  fileDownload: (id) => `${base}/files/${id}/download`,
  folders: `${base}/folders`,
  share: `${base}/share`,
  root: `${base}/folders/root`,
  messages: `${base}/messages`,
  userFolders: (id) => `${base}/folders/${id}`,
  folderById: (id) => `/folders/${id}`,
  shareByTokenId: (token, id) => `/share/${token}/folder/${id}`,
  shareByTokenIdServer: (token) => `${base}/share/${token}/folder`,
  shareByTokenDownloadServer: (token, id) =>
    `${base}/share/${token}/download/${id}`,
  shareByToken: (token) => `share/${token}`,
  newFile: (id) => `/new/${id}/file`,
  newFolder: (id) => `/new/${id}/folder`,
  fileById: (id) => `/files/${id}`,
};

export default api;
