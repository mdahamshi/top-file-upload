import { useEffect, useState } from 'react';

import MessageBubble from '../components/MessageBubble';
import { useApp } from '../context/AppContext';
import { MessageCircle, Smile } from 'lucide-react';
import NewMessage from '../components/MessageSender';
import { useAuth } from '../context/AuthContext';
import { Button } from 'flowbite-react';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';
import LoadingOverlay from '../components/LoadingOverly';
import FolderList from '../components/FolderList';
export default function Home() {
  const { isAuth, isMember, user } = useAuth();
  const {
    data: folders,
    load: getFolders,
    update: updateMessage,
    remove: removeMessage,
    loading,
  } = useCrud(api.folders);

  const { appConsts } = useApp();

  useEffect(() => {
    getFolders(api.userFolders(user.id));
  }, [isAuth, isMember, user]);
  return (
    <div className="dark:text-white h-full">
      <h1 className="text-4xl text-center font-bold mb-8 ">
        Welcome to the {appConsts.appName} {isAuth && `, ${user.fname} `}
        <Smile size={44} className="align-bottom inline" />
      </h1>
      <FolderList
        onMessageUpdate={updateMessage}
        removeMessage={removeMessage}
        folders={folders}
      />

    </div>
  );
}
