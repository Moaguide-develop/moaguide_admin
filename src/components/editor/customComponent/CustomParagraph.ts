import { Node } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/core';

const CustomParagraph = Node.create({
  name: 'paragraph',
  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      alignment: {
        default: 'text-left',
        parseHTML: (element: HTMLElement) => {
          if (element.classList.contains('se-text-paragraph-align-center')) {
            return 'text-center';
          } else if (
            element.classList.contains('se-text-paragraph-align-right')
          ) {
            return 'text-right';
          }
          return 'text-left';
        },
        renderHTML: (attributes) => ({
          class: attributes.alignment,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'p',
        getAttrs: (element: HTMLElement) => ({
          alignment: element.classList.contains(
            'se-text-paragraph-align-center',
          )
            ? 'text-center'
            : element.classList.contains('se-text-paragraph-align-right')
              ? 'text-right'
              : 'text-left',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      mergeAttributes(HTMLAttributes, { style: 'line-height: 1.8;' }),
      0,
    ];
  },
});

export default CustomParagraph;
