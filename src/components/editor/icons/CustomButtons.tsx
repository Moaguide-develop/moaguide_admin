import { Editor } from '@tiptap/react';
import AddPhoto from '../handler/AddPhoto';
import AddPaywall from '../handler/AddPaywall';
import AddFile from '../handler/AddFile';
import AddLink from '../handler/AddLink';

const isActive = (editor: Editor, name: string) =>
  editor.isActive(name) ? 'bg-gray-300' : 'bg-white';

const CustomIcon = {
  AddPhoto: ({ editor }: { editor: Editor }) => <AddPhoto editor={editor} />,
  HorizontalRule: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() =>
        editor.chain().focus().insertContent({ type: 'default' }).run()
      }
      className="cursor-pointer hover:opacity-40 p-2 rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M160-440v-80h640v80H160Z" />
      </svg>
    </button>
  ),
  Quote: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() =>
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'lineQuotation',
            content: [{ type: 'paragraph+' }],
          })
          .run()
      }
      className={`cursor-pointer hover:opacity-40 p-2 rounded ${isActive(editor, 'defaultQuotation')}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="m228-240 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T458-480L320-240h-92Zm360 0 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T818-480L680-240h-92ZM320-500q25 0 42.5-17.5T380-560q0-25-17.5-42.5T320-620q-25 0-42.5 17.5T260-560q0 25 17.5 42.5T320-500Zm360 0q25 0 42.5-17.5T740-560q0-25-17.5-42.5T680-620q-25 0-42.5 17.5T620-560q0 25 17.5 42.5T680-500Zm0-60Zm-360 0Z" />
      </svg>
    </button>
  ),
  AddLink: ({ editor }: { editor: Editor }) => <AddLink editor={editor} />,
  AddFile: ({ editor }: { editor: Editor }) => <AddFile editor={editor} />,
  Table: ({ editor }: { editor: Editor }) => (
    <button
      onClick={() =>
        editor
          .chain()
          .focus()
          .insertTable({
            rows: 3,
            cols: 3,
            withHeaderRow: true,
          })
          .run()
      }
      className="cursor-pointer hover:opacity-40 p-2 rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="#5f6368"
      >
        <path
          fillRule="evenodd"
          d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4V6h4v4H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5v-4zm1 0h4v4H6v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11v4zm-1 0H6V1h4v4z"
        />
      </svg>
    </button>
  ),
  AddPaywall: ({ editor }: { editor: Editor }) => (
    <AddPaywall editor={editor} />
  ),
};

export { CustomIcon };
