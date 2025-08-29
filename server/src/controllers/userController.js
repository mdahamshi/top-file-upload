import db from '../db/db.js';
import { generatePasswordHash } from '../utils/passport.js';
import { sanitizeUser } from '../utils/sanitize.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const items = await db.user.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const item = await db.user.getById(id);
    if (!item) return res.status(404).json({ error: 'User not found' });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getFolders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const items = await db.folder.getByMe(userId);

    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email: emailArg, fname, lname, password } = req.body;
    const email = emailArg.trim();
    const passwordHash = await generatePasswordHash(password);
    const newItem = await db.user.create({ email, fname, lname, passwordHash });
    const createdUser = await db.user.getByEmail(email);
    return req.login(createdUser, (err) => {
      if (err) return next(err);
      res.status(201).json({
        message: 'Registration successful',
        user: sanitizeUser(createdUser),
      });
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { email, fname, lname, passwordHash } = req.body;
    const updatedItem = await db.user.update(id, {
      email,
      fname,
      lname,
      passwordHash,
    });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await db.user.delete(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

export const searchUName = async (req, res, next) => {
  try {
    const search = req.query.search?.trim();
    let items;
    items = await db.user.searchByUName(search);
    if (!items) {
      return res.json({
        available: true,
        message: `'${search}' is available.`,
      });
    } else {
      return res
        .status(409)
        .json({ available: false, error: `'${search}' is already taken.` });
    }
  } catch (error) {
    next(error);
  }
};
