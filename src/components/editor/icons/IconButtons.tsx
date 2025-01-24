import { Editor } from '@tiptap/react';

const isActive = (editor: Editor, name: string, options?: Record<string, unknown>) =>
  editor.isActive(name, options) ? 'bg-gray-300' : '';

const Icon = {
  H1: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'heading', { level: 1 })}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z" />
      </svg>
    </button>
  ),
  H2: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'heading', { level: 2 })}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-160q0-33 23.5-56.5T600-520h160v-80H520v-80h240q33 0 56.5 23.5T840-600v80q0 33-23.5 56.5T760-440H600v80h240v80H520Z" />
      </svg>
    </button>
  ),
  H3: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'heading', { level: 3 })}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H600v-80h160v-80H520v-80h240q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H520Z" />
      </svg>
    </button>
  ),
  Bold: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'bold')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" />
      </svg>
    </button>
  ),
  Italic: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'italic')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
      </svg>
    </button>
  ),
  Strikethrough: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'strike')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z" />
      </svg>
    </button>
  ),
  Underline: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'underline')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M200-120v-80h560v80H200Zm280-160q-101 0-157-63t-56-167v-330h103v336q0 56 28 91t82 35q54 0 82-35t28-91v-336h103v330q0 104-56 167t-157 63Z" />
      </svg>
    </button>
  ),
  Left: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().setTextAlign('left').run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'left')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z" />
      </svg>
    </button>
  ),
  Center: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().setTextAlign('center').run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'center')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z" />
      </svg>
    </button>
  ),
  Right: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().setTextAlign('right').run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'right')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z" />
      </svg>
    </button>
  ),
  Justify: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'justify')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M120-120v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z" />
      </svg>
    </button>
  ),
  BulletList: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'bulletList')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
      </svg>
    </button>
  ),
  OrderedList: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'orderedList')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z" />
      </svg>
    </button>
  ),
};

export { Icon };

