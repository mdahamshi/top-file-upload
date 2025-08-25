'use client';
import { Button, Label, TextInput, Textarea, Checkbox } from 'flowbite-react';
import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
const ItemEdit = ({ onCancelSave, inName }) => {
  const [name, setName] = useState(inName);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const hasChanges = name !== inName;
    if (hasChanges) {
      onCancelSave({ name });
    } else {
      onCancelSave(null);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="p-4 dark:bg-primaryDark m-auto w-full bg-white max-w-md rounded-lg shadow space-y-6"
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Update Item
      </h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Name</Label>
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="Title"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
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
          Save
          <SendHorizontal />
        </Button>
      </div>
    </form>
  );
};

export default ItemEdit;
