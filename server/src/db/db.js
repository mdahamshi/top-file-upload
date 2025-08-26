import sharelink from './queries/sharelink.js';
import folder from './queries/folder.js';
import file from './queries/file.js';
import user from './queries/user.js';

const db = {
  sharelink,
  file,
  user,
  folder,
};

export default db;
