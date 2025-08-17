import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
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

export default router;
