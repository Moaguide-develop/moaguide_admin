import React from 'react';
import { Editor } from '@tiptap/react';
import { addFile } from '../../../api/file';

const AddFile: React.FC<{ editor: Editor }> = ({ editor }) => {
  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    const fileUrl = await addFile(file);
    
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'file',
        attrs: {
          src: fileUrl,
          title: file.name,
        },
      })
      .run();
  };

  return (
    <button
      type="button"
      className="relative w-8 h-8 cursor-pointer hover:opacity-40"
    >
      <input
        type="file"
        className="absolute top-0 left-0 w-8 h-8 outline-none opacity-0 file:cursor-pointer"
        accept=".pdf,image/jpeg,image/png"
        onChange={(e) => handleFileUpload(e.target.files)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
      </svg>
    </button>
  );
};

export default AddFile;
