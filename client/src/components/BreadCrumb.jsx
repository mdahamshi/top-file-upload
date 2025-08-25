import { Link } from 'react-router-dom';
import api from '../api/urls';
import { ChevronsRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  let sliced = items;
  if (items.length > 4) {
    sliced = [items[0], { id: items[1].id, name: '...' }, ...items.slice(-3)];
    console.log(sliced);
  }
  return (
    <nav className="flex  text-gray-700 gap-2 flex-wrap">
      {sliced.map((item, index) => (
        <span key={item.id} className="flex items-center">
          <Link
            to={`${api.folderById(item.id)}`}
            className="text-primary link-btn"
          >
            {item.name === 'Root' ? 'Home' : item.name}
          </Link>
          {index < sliced.length - 1 && (
            <span className="mx-1 text-gray-400">
              <ChevronsRight />
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
