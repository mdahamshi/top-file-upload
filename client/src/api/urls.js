const base = '/api/v1';
const api = {
  users: `${base}/users`,
  auth: `${base}/auth`,
  files: `${base}/files`,
  fileDownload: (id) => `${base}/files/${id}/download`,
  folders: `${base}/folders`,
  root: `${base}/folders/root`,
  messages: `${base}/messages`,
  userFolders: (id) => `${base}/folders/${id}`,
  folderById: (id) => `/folders/${id}`,
  newFile: (id) => `/new/${id}/file`,
  newFolder: (id) => `/new/${id}/folder`,
  fileById: (id) => `/files/${id}`,
};

export default api;
