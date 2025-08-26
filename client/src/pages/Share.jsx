'use client';
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Checkbox,
  Select,
  Alert,
} from 'flowbite-react';
import { Folder as FolderIcon, File } from 'lucide-react';
import Breadcrumb from '../components/BreadCrumb';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';

import { Share2 } from 'lucide-react';
import LoadingOverlay from '../components/LoadingOverly';
import { ListItem } from '../components/ListItem';
import NewToolBar from '../components/NewToolBar';
import Errorpage from './Errorpage';
import FailPage from './FailPage';
const Share = ({ onCancelSave }) => {
  const { token, id } = useParams();
  const shareUrl = id ? api.shareByTokenIdServer(token) : null;

  const {
    loadOne: getShare,
    item: folder,
    update: updateFolder,
    remove: removeFolder,
    error: shareErr,
    loading,
  } = useCrud(api.share);
  useEffect(() => {
    const caller = async () => {
      if (id) {
        await getShare(id, shareUrl);
      } else await getShare(token);
    };
    caller();
  }, [token, id]);
  if (loading || !folder) return <LoadingOverlay />;
  if (shareErr || !folder) return <Errorpage errorArg={shareErr} />;
  if (folder.subfolders.length === 0 && folder.files.length === 0)
    return (
      <Layout id={id} pathSegments={folder.pathSegments}>
        <FailPage
          link={{ text: 'Home', id: `/` }}
          title={'No files in this share !'}
        />
      </Layout>
    );
  return (
    <Layout id={folder.id} token={token} pathSegments={folder.pathSegments}>
      {shareErr && <Alert color="failure">{shareErr}</Alert>}
      <ul>
        <div className="flex sticky shadow-md text-white top-16 bg-primary  p-2 py-5  justify-between font-bold">
          <h3 className="w-1/2">Name</h3>
          <h3 className="w-1/6 text-center">Size</h3>
          <h3 className="w-1/3 text-right ">Created</h3>
        </div>
        {folder && folder.parentId && (
          <ListItem
            key={folder.parentId}
            name={'..'}
            Icon={FolderIcon}
            to={api.shareByTokenId(token, folder.parentId)}
          />
        )}
        {folder &&
          folder.subfolders.map((subfolder) => (
            <ListItem
              key={subfolder.id}
              name={subfolder.name}
              createdAt={subfolder.createdAt}
              Icon={FolderIcon}
              to={api.shareByTokenId(token, subfolder.id)}
            />
          ))}
        {folder &&
          folder.files.map((file) => (
            <ListItem
              key={file.id}
              id={file.id}
              name={file.originalName}
              createdAt={file.createdAt}
              size={file.size}
              Icon={File}
              to={api.shareByTokenDownloadServer(token, file.id)}
              shareToken={true}
            />
          ))}
      </ul>
    </Layout>
  );
};

function Layout({ children, token, pathSegments }) {
  return (
    <section className=" dark:text-white">
      <div className="flex flex-col  gap-4 mx-auto max-w-160">
        <Breadcrumb token={token} type="share" items={pathSegments} />
        {children}
      </div>
    </section>
  );
}
export default Share;
