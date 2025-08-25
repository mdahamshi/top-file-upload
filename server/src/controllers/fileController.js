import db from '../db/db.js';
import { makeMulter, persistFile } from '../services/storage.js';
export const getAllFiles = async (req, res, next) => {
  try {
    const items = await db.file.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getFileById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const file = await db.file.getById(id);

    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);

    // if (file.url) {
    //   // cloud file: redirect to URL
    //   return res.redirect(file.url);
    // }
    // res.download(file.path, file.name);
  } catch (error) {
    next(error);
  }
};
export const downloadFileById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const file = await db.file.getById(id);

    if (!file) return res.status(404).json({ error: 'File not found' });

    if (file.url) {
      return res.redirect(file.url);
    }
    res.download(file.path, file.name);
  } catch (error) {
    next(error);
  }
};

export const createFile = async (req, res, next) => {
  const { folderId: folderIdParam } = req.params;
  const { name } = req.body;
  let folderId = folderIdParam || req.user.rootFolder.id;
  const upload = makeMulter(req.user.id).single('file');

  upload(req, res, async (err) => {
    const originalName = decodeURIComponent(req.file.originalname);

    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
      const { path, url, storedName } = await persistFile({
        reqFile: req.file,
        userId: req.user.id,
        folderId,
      });
      const saved = await db.file.create({
        originalName,
        storedName,
        size: req.file.size,
        mimeType: req.file.mimetype,
        path,
        url,
        ownerId: req.user.id,
        folderId,
      });

      res.json(saved);
    } catch (error) {
      next(error);
    }
  });
};

export const updateFile = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { name } = req.body;
    const updatedItem = await db.file.update(id, { originalName: name });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req, res, next) => {
  const id = req.params.id;
  try {
    await db.file.delete(id);
    res.json({ message: 'File deleted' });
  } catch (error) {
    next(error);
  }
};
