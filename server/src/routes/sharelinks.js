import express from 'express';
import {
  getSharedSubFolder,
  downloadSharedFile,
  getShareLinkById,
  getShareLinkUser,
  createShareLink,
  deleteShareLink,
} from '../controllers/sharelinkController.js';
import { ensureAuthenticated } from '../middleware/auth.js';
import { ensureShareExist } from '../middleware/share.js';

const router = express.Router();

router.get('/:token', ensureShareExist, getShareLinkById);
router.get('/', ensureAuthenticated, getShareLinkUser);
router.get('/:token/download/:fileId', ensureShareExist, downloadSharedFile);
router.get('/:token/folder/:folderId', ensureShareExist, getSharedSubFolder);
router.post('/', ensureAuthenticated, createShareLink);
router.delete('/:id', ensureShareExist, deleteShareLink);
export default router;
