import express from 'express';
import {
  downloadFileById,
  getAllFiles,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
} from '../controllers/fileController.js';
import { ensureAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.get('/', getAllFiles);
router.get('/:id', getFileById);
router.get('/:id/download', ensureAuthenticated, downloadFileById);
router.post('/upload/:folderId?', ensureAuthenticated, createFile);
router.put('/:id', ensureAuthenticated, updateFile);
router.delete('/:id', ensureAuthenticated, deleteFile);

export default router;
