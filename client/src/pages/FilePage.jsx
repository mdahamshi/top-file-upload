import { useParams } from 'react-router-dom';
import { useCrud } from '@sarawebs/sb-hooks';
import api from '../api/urls';
import { useEffect, useState } from 'react';
import FailPage from './FailPage';
import { format } from 'date-fns';

export default function FilePage() {
  const { id } = useParams();
  const {
    update: updateFile,
    item: file,

    loadOne: getFile,
    loading,

    remove: removeFile,
  } = useCrud(api.files);

  useEffect(() => {
    getFile(id);
  }, [id]);

  if (!file)
    return (
      <FailPage
        link={{ text: 'Upload', id: `${api.newFile(id)}` }}
        title={'No files yet !'}
        msg={"Let's add some files !"}
      />
    );
  return (
    <div className=" flex flex-col items-center justify-center p-8 font-sans text-cente dark:text-white">
      <h1 className="text-4xl text-primary mb-4 font-bold">
        {file.originalName}
      </h1>

      <p className=" mb-4">
        Created at:{' '}
        {file.createdAt ? format(new Date(file.createdAt), 'PP, HH:mm') : ''}
      </p>
      <a href={api.fileDownload(file.id)} className="link-btn" download>
        Download
      </a>
    </div>
  );
}
