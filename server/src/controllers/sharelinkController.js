import db from '../db/db.js';
import { downloadFileById } from './fileController.js';
import { getFolderById } from './folderController.js';

export const getAllShareLinks = async (req, res, next) => {
  try {
    const items = await db.sharelink.getAll();
    console.log(items);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getShareLinkById = async (req, res, next) => {
  const { token } = req.params;
  try {
    const item = await db.sharelink.getByToken(token);
    res.json(item.folder);
  } catch (error) {
    next(error);
  }
};
export const getShareLinkUser = async (req, res, next) => {
  try {
    const items = await db.sharelink.getByUser(req.user.id);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const createShareLink = async (req, res, next) => {
  try {
    const { duration, folderId } = req.body;
    const ms = (d) => parseInt(d) * 24 * 60 * 60 * 1000;
    let expiresAt = null;
    if (duration != 0) expiresAt = new Date(Date.now() + ms(duration));
    const token = crypto.randomUUID();

    const newItem = await db.sharelink.create({ folderId, token, expiresAt });
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const updateShareLink = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const { folderId, token } = req.body;
    const updatedItem = await db.sharelink.update(id, { folderId, token });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const deleteShareLink = async (req, res, next) => {
  const id = req.params.id;
  try {
    await db.sharelink.delete(id);
    res.json({ message: 'ShareLink deleted' });
  } catch (error) {
    next(error);
  }
};

async function checkDesend(folder, root) {
  let current = folder;

  while (current) {
    if (current.id === root.id) return true;
    if (current.parentId) current = await db.folder.getById(current.parentId);
    else return false;
  }
  return false;
}
export const getSharedSubFolder = async (req, res, next) => {
  const { token, folderId } = req.params;
  try {
    const item = await db.sharelink.getByToken(token);
    const folder = await db.folder.getById(folderId);
    if (await checkDesend(folder, item.folder)) {
      req.params.id = folderId;

      return getFolderById(req, res, next);
    }
    return res
      .status(404)
      .json({ error: 'You are not authorized to access this content' });
  } catch (error) {
    next(error);
  }
};

export const downloadSharedFile = async (req, res, next) => {
  const { token, fileId } = req.params;
  try {
    const item = await db.sharelink.getByToken(token);
    const file = await db.file.getById(fileId);
    const folder = await db.folder.getById(file.folderId);

    if (checkDesend(folder, item.folder)) {
      req.params.id = file.id;
      return downloadFileById(req, res, next);
    }
    res.json(item.folder);
  } catch (error) {
    next(error);
  }
};
