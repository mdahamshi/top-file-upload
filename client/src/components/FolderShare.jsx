'use client';
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Checkbox,
  Select,
} from 'flowbite-react';
import { useState } from 'react';
import { Share2 } from 'lucide-react';
const FolderShare = ({ onCancelSave }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const duration = e.target.duration.value;
    console.log(duration);
    await onCancelSave(duration);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 dark:bg-primaryDark m-auto w-full bg-white max-w-md rounded-lg shadow space-y-6"
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Share folder
      </h3>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="duration">Select share duration</Label>
        </div>
        <Select id="duration" required>
          <option value="1">1d</option>
          <option value="7">7d</option>
          <option value="30">30d</option>
        </Select>
      </div>
      <div className="w-full  flex gap-4 justify-end">
        <button
          onClick={() => onCancelSave(null)}
          type="button"
          className="px-4 py-2 rounded  bg-gray-200 dark:text-white dark:bg-gray-700"
        >
          Cancel
        </button>
        <Button type="submit" className="btn-primary flex gap-4">
          Share
          <Share2 />
        </Button>
      </div>
    </form>
  );
};

export default FolderShare;
