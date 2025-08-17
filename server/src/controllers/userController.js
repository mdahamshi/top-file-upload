import db from '../db/db.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const items = await db.user.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const item = await db.user.getById(id);
    if (!item) return res.status(404).json({ error: 'User not found' });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email, fname, lname, passwordHash } = req.body;
    const newItem = await db.user.create({ email, fname, lname, passwordHash });
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const { email, fname, lname, passwordHash } = req.body;
    const updatedItem = await db.user.update(id, { email, fname, lname, passwordHash });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    await db.user.delete(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
