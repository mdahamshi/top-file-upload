// utils/sanitize.js

import db from '../db/db.js';

export function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    fname: user.fname,
    lname: user.lname,
    rootFolder: user.rootFolder,
  };
}

export function sanitizeFolder(folder, user) {
  if (!folder) return null;
  const defualtFolder = {
    id: folder.id,
    name: folder.name,
    parentId: folder.parentId,
    createdAt: folder.createdAt,
    updatedAt: folder.updatedAt,
    subfolders: folder.subfolders,
    files: folder.files,
  };
  if (!user) return defualtFolder;

  if (user)
    if (user.id === folder.userId) {
      return folder;
    }
  return defualtFolder;
}

export function sanitizeShare(share) {
  if (!share) return;
  share.folder.pathSegments = [
    { id: share.folder.id, name: share.folder.name },
  ];
  share.folder.parentId = null;
  return share;
}

export const sanitizeSharePathSegmants = async (folder, root) => {
  let current = folder;
  if (!root) {
    folder.pathSegments = [{ id: folder.id, name: folder.name }];
    return folder;
  }
  const helper = async () => {
    const pathSegments = [];
    while (current) {
      pathSegments.unshift({ id: current.id, name: current.name });
      if (current.id === root.id) return pathSegments;
      if (current.parentId) current = await db.folder.getById(current.parentId);
      else return null;
    }
  };
  folder.pathSegments = await helper();
  return folder;
};
