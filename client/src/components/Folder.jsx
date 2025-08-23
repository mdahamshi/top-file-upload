import { Folder as FolderIcon, File } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { getRandomColor } from '@sarawebs/sb-utils';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';
import { useEffect, useState } from 'react';
import { ListItem } from './ListItem';

export default function Folder({}) {
  const { id } = useParams();

  const {
    loadOne: getFolder,
    item: folder,
    update: updateMessage,
    remove: removeMessage,
    loading,
  } = useCrud(api.folders);

  useEffect(() => {
    getFolder(id);
  }, []);

  console.log(folder);
  return (
    <section className="msg-list dark:text-white">
      <div className="flex flex-col  gap-4 mx-auto max-w-160">
        <ul>
          <div className="flex sticky shadow-md text-white top-16 bg-primary  p-2 justify-between font-bold">
            <h3 className="basis-2/3">Name</h3>
            <h3 className="basis-1/6 mr-6">Size</h3>
            <h3 className="basis-1/6 ">Created</h3>
          </div>
          {folder &&
            folder.subfolders.map((subfolder) => (
              <ListItem
                key={subfolder.id}
                name={subfolder.name}
                createdAt={subfolder.createdAt}
                Icon={Folder}
                to={api.folderById(subfolder.id)}
              />
            ))}
          {folder &&
            folder.files.map((file) => (
              <ListItem
                key={file.id}
                name={file.originalName}
                createdAt={file.createdAt}
                size={file.size}
                Icon={File}
                to={api.fileById(file.id)}
              />
            ))}
        </ul>
      </div>
    </section>
  );
}
