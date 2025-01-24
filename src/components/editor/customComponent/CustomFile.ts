import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import FileComponent from './FileComponent';

const CustomFile = Node.create({
  name: 'file',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="file"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'file' }),
      [
        'a',
        {
          href: HTMLAttributes.src,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'Download File',
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileComponent); // React 컴포넌트와 연결
  },
});

export default CustomFile;
