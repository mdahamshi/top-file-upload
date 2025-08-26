import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import formatBytes from '../utils/formatBytes.js';
import { useState } from 'react';
import { SquarePen, Forward, Download, Trash } from 'lucide-react';
import { Folder as FolderIcon, File } from 'lucide-react';

import api from '../api/urls.js';
import ConfirmBlock from './ConfirmBlock.jsx';
import ItemEdit from './ItemEdit.jsx';
import FolderShare from './FolderShare.jsx';
import CopyLinkButton from './CopyLinkButton.jsx';
import { formatDistanceToNow } from 'date-fns/esm';
export function ShareItem({ item, removeShare }) {
  const [remove, setRemove] = useState(false);
  const handleRemove = () => {
    setRemove(false);
    removeShare();
  };
  if (remove)
    return (
      <ConfirmBlock
        onConfirm={handleRemove}
        onCancel={() => setRemove(false)}
        confirmLabel="Delete"
        message={`Are you sure you want to delete this Share ?`}
        title="Delete"
      />
    );

  const content = (
    <div className="flex  flex-col bg-white dark:bg-primaryDark justify-between border border-gray-400 p-1 mb-0.5">
      <div className="flex  ">
        <div className="flex w-1/3 gap-1 clickable items-center">
          <FolderIcon className="text-primary dark:text-white shrink-0" />
          <span className="truncate " title={item.folder.name}>
            {item.folder.name}
          </span>
        </div>
        <div className="w-1/3 text-center ">
          {format(new Date(item.createdAt), 'PP, HH:mm')}
        </div>
        <div className="w-1/3 text-right">
          {formatDistanceToNow(new Date(item.expiresAt), { addSuffix: true })}
        </div>
      </div>
      <div className="flex justify-end gap-4 ">
        {removeShare && (
          <span title="Delete" className="clickable">
            <Trash
              className="dark:stroke-white clickable text-primary"
              onClick={() => setRemove(true)}
            />
          </span>
        )}
        <CopyLinkButton
          link={`${window.location.origin}/${api.shareByToken(item.token)}`}
        />
      </div>
    </div>
  );

  return <li>{content}</li>;
}
