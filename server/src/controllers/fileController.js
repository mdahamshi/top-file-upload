import db from '../db/db.js';

export const getAllFiles = async (req, res, next) => {
  try {
    const items = await db.file.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getFileById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const item = await db.file.getById(id);
    if (!item) return res.status(404).json({ error: 'File not found' });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createFile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newItem = await db.file.create({ name });
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const updateFile = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const { name } = req.body;
    const updatedItem = await db.file.update(id, { name });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    await db.file.delete(id);
    res.json({ message: 'File deleted' });
  } catch (error) {
    next(error);
  }
};
