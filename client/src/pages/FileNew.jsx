import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
  FileInput,
  TextInput,
  Alert,
  Checkbox,
  Textarea,
} from 'flowbite-react';
import { useState } from 'react';
import { SendHorizontal, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverly';
import SmartButton from '../components/SmartButton';
import { useParams } from 'react-router-dom';

export default function FileNew() {
  const { isAuth, isAdmin } = useAuth();
  const { create: addFile, error, loading } = useCrud(api.files);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: null, message: null });

  if (!isAuth) return null;
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [pinned, setPinned] = useState(false);
  const [message, setMsg] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const { id } = useParams();

  function handleClose() {
    setFile(null);
    setText('');
    setMsg('');
    navigate(-1);
  }
  const handleChange = (e) => {
    setStatus({ type: null, message: null });
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus({ type: null, message: null });
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size === 0) {
        setStatus({
          type: 'error',
          message:
            "Yuor system doesn't support drag and drop, use click insted.",
        });
        return;
      }
      console.log(e.dataTransfer.files);
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragOver(false);
  };
  const handleUpload = async () => {
    if (!file) return;

    setStatus({ type: null, message: null });
    const formData = new FormData();
    console.log(file);
    formData.append('file', file, encodeURIComponent(file.name));

    try {
      const res = await fetch(`${api.files}/upload/${id}`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();

      setStatus({ type: 'success', message: 'Uploaded successfully !' });

      setTimeout(() => handleClose(), 1500);

      console.log('Uploaded:', data);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
      console.error(err);
    }
  };

  if (loading) return <LoadingOverlay />;

  return (
    <div>
      <div className="card  dark:text-white">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Upload new file
        </h3>
        {status.type === 'success' && (
          <Alert color="success">{status.message}</Alert>
        )}
        {status.type === 'error' && (
          <Alert color="failure">{status.message}</Alert>
        )}
        <div
          className={`flex h-64 w-full dark:bg-primaryDark  cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed 
    ${isDragOver ? 'border-blue-400  bg-blue-50' : 'border-gray-300 bg-gray-50'} 
    hover:bg-gray-100 dark:hover:bg-gray-600`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            document.getElementById('dropzone-file').click();
            setStatus({ type: null, message: null });
          }}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">Any file up to 50MB</p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {file && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm">Selected: {file.name}</p>

            <SmartButton
              disabled={loading || status.type === 'success'}
              type="submit"
              className="btn-primary gap-4"
              onClick={handleUpload}
            >
              {loading || status.type === 'success' ? 'Uploading...' : 'Upload'}
              <SendHorizontal />
            </SmartButton>
          </div>
        )}
      </div>
    </div>
  );
}
