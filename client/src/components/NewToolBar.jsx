import { useState } from 'react';
import { CloudUpload, FolderPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/urls';

export default function NewToolBar({ id }) {
  return (
    <>
      <Link
        to={`${api.newFile(id)}`}
        className="clickable bg-primary text-white fixed bottom-4 p-0 right-4 z-50 shadow-lg w-14 h-14 rounded-full flex items-center justify-center "
      >
        <CloudUpload size={24} strokeWidth={3} />
      </Link>
      <Link
        to={`${api.newFolder(id)}`}
        className="clickable bg-primary text-white fixed bottom-4 p-0 right-20 z-50 shadow-lg w-14 h-14 rounded-full flex items-center justify-center "
      >
        <FolderPlus size={24} strokeWidth={3} />
      </Link>
    </>
  );
}
