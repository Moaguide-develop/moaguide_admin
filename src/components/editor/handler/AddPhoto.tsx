import React from 'react';
import { Editor } from '@tiptap/react';

const AddPhoto: React.FC<{ editor: Editor }> = ({ editor }) => {
  const handleUploadPhoto = async (files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    const imageUrl = URL.createObjectURL(file);

    editor
      .chain()
      .focus()
      .insertContent({
        type: 'photo',
        attrs: {
          src: imageUrl,
          alt: '',
          title: '',
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
        accept="image/*"
        onChange={(e) => {
          handleUploadPhoto(e.target.files);
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM240-280h480L570-480 450-320l-90-120-120 160Zm-40-480v560-560Z" />
      </svg>
    </button>
  );
};

export default AddPhoto;
