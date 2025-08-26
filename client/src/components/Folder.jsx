import { Folder as FolderIcon, File } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { getRandomColor } from '@sarawebs/sb-utils';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';
import { useEffect, useState } from 'react';
import { ListItem } from './ListItem';
import LoadingOverlay from './LoadingOverly';
import FailPage from '../pages/FailPage';
import NewToolBar from './NewToolBar';
import Breadcrumb from './BreadCrumb';
import { Alert } from 'flowbite-react';
export default function Folder({ parentId }) {
  const { id: idParam } = useParams();
  let id = idParam || parentId;
  const {
    loadOne: getFolder,
    item: folder,
    update: updateFolder,
    remove: removeFolder,
    error: folderErr,
    loading,
  } = useCrud(api.folders);
  const {
    update: updateFile,
    remove: removeFile,
    error: fileErr,
  } = useCrud(api.files);
  const {
    loadOne: getShare,
    item: share,
    create: createShare,
    remove: removeShare,
    error: shareErr,
  } = useCrud(api.share);
  useEffect(() => {
    getFolder(id);
  }, [id]);
  const handleUpdateFolder = async (fid, data) => {
    await updateFolder(fid, data);
    getFolder(id); // refresh
  };

  const handleRemoveFolder = async (fid) => {
    await removeFolder(fid);
    getFolder(id);
  };

  const handleUpdateFile = async (fid, data) => {
    await updateFile(fid, data);
    getFolder(id);
  };
  const handleShare = async (folderId, duration) => {
    const { data: share } = await createShare({ folderId, duration });
    console.log(share);
    getFolder(id);
  };
  const handleRemoveFile = async (fid) => {
    await removeFile(fid);
    getFolder(id);
  };
  if (loading || !folder) return <LoadingOverlay />;
  if (folder.subfolders.length === 0 && folder.files.length === 0)
    return (
      <Layout id={id} pathSegments={folder.pathSegments}>
        <FailPage
          link={{ text: 'Upload', id: `${api.newFile(id)}` }}
          title={'No files yet !'}
          msg={"Let's add some files !"}
        />
      </Layout>
    );
  return (
    <Layout id={id} pathSegments={folder.pathSegments}>
      {folderErr && <Alert color="failure">{folderErr}</Alert>}
      {fileErr && <Alert color="failure">{fileErr}</Alert>}
      {shareErr && <Alert color="failure">{shareErr}</Alert>}
      <ul>
        <div className="flex sticky shadow-md text-white top-16 bg-primary  p-2 py-5  justify-between font-bold">
          <h3 className="w-1/2">Name</h3>
          <h3 className="w-1/6 text-center ">Size</h3>
          <h3 className="w-1/3 text-right ">Created</h3>
        </div>
        {folder && folder.parentId && (
          <ListItem
            key={folder.parentId}
            name={'..'}
            Icon={FolderIcon}
            to={api.folderById(folder.parentId)}
          />
        )}
        {folder &&
          folder.subfolders.map((subfolder) => (
            <ListItem
              key={subfolder.id}
              name={subfolder.name}
              createdAt={subfolder.createdAt}
              Icon={FolderIcon}
              to={api.folderById(subfolder.id)}
              removeItem={() => handleRemoveFolder(subfolder.id)}
              updateItem={(data) => handleUpdateFolder(subfolder.id, data)}
              shareItem={(duration) => handleShare(subfolder.id, duration)}
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
              to={api.fileById(file.id)}
              removeItem={() => handleRemoveFile(file.id)}
              updateItem={(data) => handleUpdateFile(file.id, data)}
            />
          ))}
      </ul>
    </Layout>
  );
}

function Layout({ children, id, pathSegments }) {
  return (
    <section className="msg-list dark:text-white">
      <div className="flex flex-col  gap-4 mx-auto max-w-160">
        <Breadcrumb items={pathSegments} />
        {children}
        <NewToolBar id={id} />
      </div>
    </section>
  );
}
