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
  useEffect(() => {
    getFolder(id);
  }, [id]);

  if (loading || !folder) return <LoadingOverlay />;
  console.log(folder);
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
      <ul>
        <div className="flex sticky shadow-md text-white top-16 bg-primary  p-2 justify-between font-bold">
          <h3 className="basis-2/3">Name</h3>
          <h3 className="basis-1/6 mr-6">Size</h3>
          <h3 className="basis-1/6 ">Created</h3>
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
              removeItem={() => removeFolder(subfolder.id)}
              updateItem={(data) => updateFolder(subfolder.id, data)}
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
              removeItem={() => removeFile(file.id)}
              updateItem={(data) => updateFile(file.id, data)}
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
