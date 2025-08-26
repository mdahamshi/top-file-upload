import { useEffect, useState } from 'react';

import MessageBubble from '../components/MessageBubble';
import { useApp } from '../context/AppContext';
import { Smile } from 'lucide-react';
import NewMessage from '../components/MessageSender';
import { useAuth } from '../context/AuthContext';
import { Button } from 'flowbite-react';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';
import LoadingOverlay from '../components/LoadingOverly';
import FolderList from '../components/FolderList';
import Folder from '../components/Folder';
import ShareList from './ShareList';
import { Link } from 'react-router-dom';
export default function Home() {
  const { isAuth, user } = useAuth();
  const { data: shares, load: getShares } = useCrud(api.shareAll);
  const { appConsts } = useApp();
  useEffect(() => {
    const caller = async () => {
      if (!isAuth) await getShares();
    };
    caller();
  }, []);
  if (isAuth)
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

  return (
    <>
      <h1 className="dark:text-white text-4xl  font-bold mb-8 ">
        Welcome to the {appConsts.appName}
      </h1>
      {shares.length > 0 && (
        <p className="dark:text-white">
          Here is a list of shared folders,{' '}
          <Link className="text-primary" to={'login'}>
            Log in
          </Link>{' '}
          to make yours !
        </p>
      )}
      <ShareList shareArg={shares} />
    </>
  );
}
