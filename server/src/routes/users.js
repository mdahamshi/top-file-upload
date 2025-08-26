import express from 'express';
import {
  getFolders,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

import { registerValidationRules } from '../middleware/register.js';
import { ensureAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.get('/:id', ensureAuthenticated, getUserById);
router.post('/', registerValidationRules, createUser);
router.get('/:userId/folders', ensureAuthenticated, getFolders);

export default router;
