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
import Folder from '../components/Folder';
import ShareList from './ShareList';
export default function Home() {
  const { isAuth, user } = useAuth();

  const { appConsts } = useApp();

  return (
    <div className="dark:text-white h-full">
      <h1 className="text-4xl  font-bold mb-8 ">
        Welcome to the {appConsts.appName} {isAuth && `, ${user.fname} `}
        <Smile size={44} className="align-bottom inline" />
      </h1>
      <Folder parentId={user.rootFolder.id} />

      <ShareList />
    </div>
  );
}
