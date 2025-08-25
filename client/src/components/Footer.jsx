import React from 'react';

export default function Footer({ left, right, children, className, git }) {
  return (
    <footer className={className + ' ' + 'dark:text-white'}>
      {left && <div>{left}</div>}
      <h2 className="text-center">
        Visit{' '}
        <a aria-label="Git Repo" href={git}>
          Git Repo
        </a>{' '}
        for more information
      </h2>
      {children}
      {right && <div>{right}</div>}
    </footer>
  );
}
