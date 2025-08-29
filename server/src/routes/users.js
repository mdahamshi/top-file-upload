import express from 'express';
import {
  getFolders,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUName,
} from '../controllers/userController.js';

import { registerValidationRules } from '../middleware/register.js';
import { ensureAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.get('/check-email', searchUName);
router.get('/:id', ensureAuthenticated, getUserById);
router.post('/', registerValidationRules, createUser);
router.get('/:userId/folders', ensureAuthenticated, getFolders);
export default router;
