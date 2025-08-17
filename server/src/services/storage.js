// src/services/storage.js
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { uploadToCloudinary } from './cloudinary.js'
import { uploadToSupabase } from './supabase.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const provider = process.env.STORAGE_PROVIDER || 'local'

export function makeMulter(userId, folderId = 'root') {
  if (provider === 'local') {
    const dest = path.join(__dirname, '../../uploads', userId, folderId)
    fs.mkdirSync(dest, { recursive: true })
    return multer({
      storage: multer.diskStorage({
        destination: dest,
        filename: (_req, file, cb) => {
          const ts = Date.now()
          cb(null, ts + '-' + file.originalname.replace(/\s+/g, '_'))
        },
      }),
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    })
  } else {
    // cloud providers use memory storage; we will forward buffer to provider
    return multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } })
  }
}

export async function persistFile({ reqFile, userId, folderId = null }) {
  // returns { path, url }
  if (provider === 'local') {
    return { path: reqFile.path, url: null }
  }

  if (provider === 'cloudinary') {
    const folder = `${process.env.CLOUDINARY_FOLDER || 'uploads'}/${userId}${folderId ? '/' + folderId : ''}`
    const url = await uploadToCloudinary(reqFile.buffer, reqFile.mimetype, folder, reqFile.originalname)
    return { path: null, url }
  }

  if (provider === 'supabase') {
    const folder = `${userId}${folderId ? '/' + folderId : ''}`
    const { url } = await uploadToSupabase(reqFile.buffer, reqFile.mimetype, folder, reqFile.originalname)
    return { path: null, url }
  }

  throw new Error('Unknown STORAGE_PROVIDER')