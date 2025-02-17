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
      alignment: { default: 'mr-auto ml-0' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="file"].se-section.se-section-file.se-l-default',
        getAttrs: (element) => {
          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';
          return { alignment };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'file',
        class: 'se-section se-section-file se-l-default',
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileComponent);
  },
});

export default CustomFile;
