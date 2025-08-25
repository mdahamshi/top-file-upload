import { Folder, File } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { getRandomColor } from '@sarawebs/sb-utils';
import { Link } from 'react-router-dom';
import api from '../api/urls';
import { ListItem } from './ListItem';
import FailPage from '../pages/FailPage';
export default function FolderList({ folders, files }) {
  if (folders.length === 0 && files.length === 0)
    return (
      <FailPage
        link={{ text: 'Upload', id: api.newFile }}
        title={'No files yet !'}
        msg={"Let's add some files !"}
      />
    );
  return (
    <section className="msg-list">
      <div className="flex flex-col  gap-4 mx-auto max-w-160">
        <ul>
          <div className="flex p-2 justify-between font-bold">
            <h3 className="flex-2/3">Name</h3>
            <h3 className="flex-1/3">Size</h3>
            <h3>Created</h3>
          </div>
          {folders.map((folder) => (
            <ListItem
              key={folder.id}
              name={folder.name}
              createdAt={folder.createdAt}
              Icon={Folder}
              to={api.folderById(folder.id)}
            />
          ))}
          {files.map((file) => (
            <ListItem
              key={file.id}
              name={file.originalName}
              createdAt={file.createdAt}
              Icon={File}
              to={api.folderById(file.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
