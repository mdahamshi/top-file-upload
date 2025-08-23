import { Folder } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { getRandomColor } from '@sarawebs/sb-utils';
import { Link } from 'react-router-dom';
import api from '../api/urls';
import { ListItem } from './ListItem';

export default function FolderList({
  folders,
  removeMessage,
  onMessageUpdate,
}) {
  return (
    <section className="msg-list">
      <div className="flex flex-col  gap-4 mx-auto max-w-160">

        <ul>
        <div className='flex p-2 justify-between font-bold'>
          <h3 className='flex-2/3'>Name</h3>
          <h3 className='flex-1/3'>Size</h3>
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

        </ul>
      </div>

    </section>
  );
}
