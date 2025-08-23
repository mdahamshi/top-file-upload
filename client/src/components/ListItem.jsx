import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import formatBytes from '../utils/formatBytes.js';

export function ListItem({ name, id, Icon, size, createdAt, to }) {
  const content = (
    <div className="flex bg-white dark:bg-primaryDark justify-between border border-gray-400 p-1 mb-0.5 clickable">
      <div className="flex min-w-0 basis-2/3 gap-1 items-center">
        <Icon className="text-primary shrink-0" />
        <span className="truncate " title={name}>
          {name}
        </span>
      </div>
      <div className="basis-1/6 mx-5  ml-4">
        {size ? formatBytes(size) : '-'}
      </div>
      <div className="basis-1/6  whitespace-nowrap">
        {format(new Date(createdAt), 'PP, HH:hh')}
      </div>
    </div>
  );

  return <li >{to ? <Link to={to}>{content}</Link> : content}</li>;
}
