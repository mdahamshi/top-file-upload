'use client';

import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
  createTheme,
  TextInput,
  Textarea,
  Alert,
} from 'flowbite-react';
import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useMessages } from '../context/MessageContext';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';
import { useParams, useNavigate } from 'react-router-dom';
import SmartButton from '../components/SmartButton';

const theme = createTheme({
  content: {
    base: 'p-4 flex flex-col justify-center',
  },
});

export default function NewFolder() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState({ type: null, message: null });
  const navigate = useNavigate();

  const { id } = useParams();
  const parentId = id;
  const {
    loadOne: getFolder,
    item: folder,
    update: updateMessage,
    create: createFolder,
    loading,
  } = useCrud(api.folders);

  const handleSend = async (e) => {
    setStatus({ type: null, message: null });

    e.preventDefault();
    const body = { name, parentId };
    const { error } = await createFolder(body);
    if (error) {
      setStatus({ type: 'error', message: error.message });
      return;
    }

    setStatus({ type: 'success', message: 'Created successfully !' });
    setTimeout(() => navigate(-1), 1500);

    setName('');
  };

  return (
    <>
      <div className="card  dark:text-white">
        <form className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            New Folder
          </h3>
          {status.type === 'success' && (
            <Alert color="success">{status.message}</Alert>
          )}
          {status.type === 'error' && (
            <Alert color="failure">{status.message}</Alert>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Folder name</Label>
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Folder name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="w-full flex justify-end">
            <SmartButton
              disabled={loading || status.type === 'success'}
              type="submit"
              className="btn-primary gap-4"
              onClick={handleSend}
            >
              {loading || status.type === 'success' ? 'Creating...' : 'Create'}
              <SendHorizontal />
            </SmartButton>
          </div>
        </form>
      </div>
    </>
  );
}
