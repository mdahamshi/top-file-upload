// src/services/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

if (process.env.STORAGE_PROVIDER === 'cloudinary') {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function uploadToCloudinary(buffer, mimeType, folder, filename) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        filename_override: filename,
        use_filename: true,
        unique_filename: false,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}
