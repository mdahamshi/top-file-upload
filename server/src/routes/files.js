import express from 'express';
import { getAllFiles, getFileById, createFile, updateFile, deleteFile } from '../controllers/fileController.js';
import {
  ensureAuthenticated,
} from "../middleware/auth.js";
const router = express.Router();

router.get('/', getAllFiles);
router.get('/:id', getFileById);
router.post('/upload/:folderId?', ensureAuthenticated, createFile);
router.put('/:id', updateFile);
router.delete('/:id', deleteFile);

export default router;
