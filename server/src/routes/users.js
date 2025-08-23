import express from 'express';
import { getFolders, getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

import { registerValidationRules } from "../middleware/register.js";
import {
  ensureAuthenticated,
} from "../middleware/auth.js";
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', registerValidationRules, createUser);
router.put('/:id', ensureAuthenticated, updateUser);
router.delete('/:id', deleteUser);
router.get('/:userId/folders', getFolders);

export default router;
