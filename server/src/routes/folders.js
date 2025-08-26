import express from 'express';
import {
  getRoot,
  getAllFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
} from '../controllers/folderController.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/root', ensureAuthenticated, getRoot);
router.get('/:id', ensureAuthenticated, getFolderById);
router.post('/', ensureAuthenticated, createFolder);
router.put('/:id', ensureAuthenticated, updateFolder);
router.delete('/:id', ensureAuthenticated, deleteFolder);

export default router;
