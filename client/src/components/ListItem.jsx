import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import formatBytes from '../utils/formatBytes.js';
import { useState } from 'react';
import { SquarePen, Forward, Download, Trash } from 'lucide-react';
import api from '../api/urls.js';
import ConfirmBlock from './ConfirmBlock.jsx';
import ItemEdit from './ItemEdit.jsx';
import FolderShare from './FolderShare.jsx';
export function ListItem({
  name,
  id,
  Icon,
  size,
  createdAt,
  to,
  removeItem,
  updateItem,
  shareItem,
  shareToken,
}) {
  const [remove, setRemove] = useState(false);
  const [edit, setEdit] = useState(false);
  const [share, setShare] = useState(false);
  const isFolder = to?.includes('folder') || false;
  const handleRemove = () => {
    setRemove(false);
    removeItem();
  };
  if (remove)
    return (
      <ConfirmBlock
        onConfirm={handleRemove}
        onCancel={() => setRemove(false)}
        confirmLabel="Delete"
        message={`Are you sure you want to delete this ${isFolder ? 'Folder' : 'File'} ?`}
        title="Delete"
      />
    );
  if (edit)
    return (
      <ItemEdit
        inName={name}
        onCancelSave={(data) => {
          setEdit(false);
          if (data) {
            updateItem(data);
          }
        }}
      />
    );
  if (share)
    return (
      <FolderShare
        onCancelSave={(data) => {
          setShare(false);
          if (data) {
            shareItem(data);
          }
        }}
      />
    );
  const linkContent = (
    <>
      {' '}
      <Icon className="text-primary dark:text-white shrink-0" />
      <span className="truncate " title={name}>
        {name}
      </span>
    </>
  );
  const content = (
    <div className="flex  flex-col bg-white dark:bg-primaryDark justify-between border border-gray-400 p-1 mb-0.5">
      <div className="flex  ">
        {shareToken ? (
          <a
            href={to}
            download
            className="flex min-w-0 w-1/2 gap-1 clickable items-center"
          >
            {linkContent}
          </a>
        ) : (
          <Link
            to={shareToken ? '' : to}
            target={shareToken ? '_blank' : ''}
            rel={shareToken ? 'noopener noreferrer' : ''}
            className="flex min-w-0 w-1/3 gap-1 clickable items-center"
          >
            {linkContent}
          </Link>
        )}
        <div className="w-1/3 text-center   ">
          {size ? formatBytes(size) : '-'}
        </div>
        <div className="w-1/3   text-right">
          {createdAt ? format(new Date(createdAt), 'PP, HH:mm') : ''}
        </div>
      </div>
      <div className="flex justify-end gap-4 ">
        {updateItem && (
          <span title="Edit" className="clickable">
            <SquarePen
              className="dark:stroke-white clickable text-primary"
              onClick={() => setEdit(true)}
            />
          </span>
        )}
        {removeItem && (
          <span title="Delete" className="clickable">
            <Trash
              className="dark:stroke-white clickable text-primary"
              onClick={() => setRemove(true)}
            />
          </span>
        )}
        {!isFolder && (
          <a href={shareToken ? to : api.fileDownload(id)} download>
            <Download className="dark:stroke-white clickable text-primary" />
          </a>
        )}
        {shareItem && (
          <span title="Delete" className="clickable">
            <Forward
              className="dark:stroke-white clickable text-primary"
              onClick={() => setShare(true)}
            />
          </span>
        )}
      </div>
    </div>
  );

  return <li>{content}</li>;
}
