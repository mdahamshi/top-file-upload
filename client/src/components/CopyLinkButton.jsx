import { useState } from 'react';
import { Copy } from 'lucide-react';

function CopyLinkButton({ link }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="flex items-center gap-1 dark:text-white text-primary clickable"
    >
      <Copy />
      {copied ? 'Copied!' : ''}
    </button>
  );
}

export default CopyLinkButton;
