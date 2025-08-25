import express from 'express';
import {
  getRoot,
  getAllFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
} from '../controllers/folderController.js';

const router = express.Router();

router.get('/', getAllFolders);
router.get('/root', getRoot);
router.get('/:id', getFolderById);
router.post('/', createFolder);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);

export default router;
