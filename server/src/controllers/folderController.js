import db from '../db/db.js';

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
    res.json(item);
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
    const { name } = req.body;
    const updatedItem = await db.folder.update(id, { name });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const deleteFolder = async (req, res, next) => {
  const id = req.params.id;
  try {
    await db.folder.delete(id);
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
