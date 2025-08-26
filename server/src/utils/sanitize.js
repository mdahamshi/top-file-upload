// utils/sanitize.js

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
