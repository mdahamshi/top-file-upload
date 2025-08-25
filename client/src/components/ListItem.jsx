import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import formatBytes from '../utils/formatBytes.js';
import { useState } from 'react';
import { SquarePen, Download, Trash } from 'lucide-react';
import api from '../api/urls.js';
import ConfirmBlock from './ConfirmBlock.jsx';
import ItemEdit from './ItemEdit.jsx';

export function ListItem({
  name,
  id,
  Icon,
  size,
  createdAt,
  to,
  removeItem,
  updateItem,
}) {
  const [remove, setRemove] = useState(false);
  const [edit, setEdit] = useState(false);
  const isFolder = to.includes('folder');
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
  const content = (
    <div className="flex  flex-col bg-white dark:bg-primaryDark justify-between border border-gray-400 p-1 mb-0.5">
      <div className="flex  ">
        <Link
          to={to}
          className="flex min-w-0 basis-2/3 gap-1 clickable items-center"
        >
          <Icon className="text-primary shrink-0" />
          <span className="truncate " title={name}>
            {name}
          </span>
        </Link>
        <div className="basis-1/6 text-center mx-5  ml-4">
          {size ? formatBytes(size) : ''}
        </div>
        <div className="basis-1/6  whitespace-nowrap">
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
          <a href={api.fileDownload(id)} download>
            <Download className="dark:stroke-white clickable text-primary" />
          </a>
        )}
      </div>
    </div>
  );

  return <li>{content}</li>;
}
