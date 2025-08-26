import { useEffect, useState } from 'react';

import MessageBubble from '../components/MessageBubble';
import { useApp } from '../context/AppContext';
import { MessageCircle, Smile } from 'lucide-react';
import NewMessage from '../components/MessageSender';
import { useAuth } from '../context/AuthContext';
import { Alert, Button } from 'flowbite-react';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';
import LoadingOverlay from '../components/LoadingOverly';
import FolderList from '../components/FolderList';
import Folder from '../components/Folder';
import { ShareItem } from '../components/ShareItem';
export default function ShareList() {
  const {
    load: getShares,
    data: shares,
    create: createShare,
    remove: removeShare,
    error: shareErr,
    loading,
  } = useCrud(api.share);
  const handleRemove = async (id) => {
    await removeShare(id);
    getShares();
  };
  useEffect(() => {
    getShares();
  }, []);

  if (loading || !shares) return <LoadingOverlay />;
  if (shares.length === 0) return;

  return (
    <div className="dark:text-white h-full mt-8">
      {shareErr && <Alert color="failure">{shareErr}</Alert>}

      <h1 className="text-4xl  font-bold mb-8 ">Shared by You:</h1>

      <section className="msg-list dark:text-white">
        <div className="flex flex-col  gap-4 mx-auto max-w-160">
          <ul>
            <div className="flex sticky shadow-md text-white top-16 bg-primary  p-2 py-5  justify-between font-bold">
              <h3 className="w-1/3">Name</h3>
              <h3 className="w-1/3 text-center ">Created</h3>
              <h3 className="w-1/3 text-right">Expires</h3>
            </div>
            {shares.map((share) => (
              <ShareItem
                key={share.id}
                removeShare={() => handleRemove(share.id)}
                item={share}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
