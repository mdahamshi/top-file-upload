import db from '../db/db.js';
import fs from 'fs/promises'; // use promises API for cleaner async/await
import { sanitizeFolder } from '../utils/sanitize.js';

export const getAllFolders = async (req, res, next) => {
  try {
    const items = await db.folder.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getFolderById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await db.folder.getById(id);
    if (!item) return res.status(404).json({ error: 'Folder not found' });
    item.pathSegments = await getPathSegments(id);
    res.json(sanitizeFolder(item, req.user));
  } catch (error) {
    next(error);
  }
};
export const getRoot = async (req, res, next) => {
  const id = req.user.rootFolder.id;
  req.params.id = id;
  return getFolderById(req, res, next);
};

export const createFolder = async (req, res, next) => {
  try {
    const { name, parentId: parantParam } = req.body;
    let parentId = parantParam || req.user.rootFolder.id;
    const userId = req.user.id;
    const newItem = await db.folder.create({ name, parentId, userId });

    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const updateFolder = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (id === req.user.rootFolder.id) throw new Error('Cannot rename root');
    const currentItem = await db.folder.getById(id);
    if (currentItem.userId !== req.user.id)
      throw new Error('Access denied');
    const { name } = req.body;
    const updatedItem = await db.folder.update(id, { name });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};
const provider = process.env.STORAGE_PROVIDER || 'local';
const deleteFolderRec = async (id) => {
  const folder = await db.folder.getById(id);

  if (!folder) return;
  if (folder.userId !== req.user.id)
    throw new Error('Access denied');
  // Delete files from disk + DB
  for (const file of folder.files) {
    if (provider === 'local') {
      await fs.unlink(file.path);
    }

    await db.file.delete(file.id);
  }

  for (const child of folder.subfolders) {
    await deleteFolderRec(child.id);
  }
  await db.folder.delete(id);
};

export const deleteFolder = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (id === req.user.rootFolder.id) throw new Error('Cannot delete root');
    deleteFolderRec(id);
    res.json({ message: 'Folder deleted' });
  } catch (error) {
    next(error);
  }
};

export const getPathSegments = async (entityId) => {
  if (!entityId) return [];

  const pathSegments = [];
  let currentId = entityId;

  while (currentId) {
    const entity = await db.folder.getById(currentId);
    if (entity) {
      pathSegments.unshift({ id: entity.id, name: entity.name });
      currentId = entity.parentId;
    } else {
      currentId = null;
    }
  }

  return pathSegments;
};
