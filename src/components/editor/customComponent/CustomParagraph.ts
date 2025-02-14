import { Node } from '@tiptap/core';

const CustomParagraph = Node.create({
  name: 'paragraph',
  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      alignment: {
        default: 'text-left',
      },
      lineHeight: {
        default: '1.8',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'p',
        getAttrs: (element) => {
          const alignment = element.classList.contains(
            'se-text-paragraph-align-center',
          )
            ? 'text-center'
            : element.classList.contains('se-text-paragraph-align-right')
              ? 'text-right'
              : 'text-left';

          const styleAttr = element.getAttribute('style') || '';
          const match = styleAttr.match(/line-height:\s*([\d.]+)/);
          const lineHeight = match?.[1] ?? null;

          return { alignment, lineHeight };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment, lineHeight } = HTMLAttributes;

    return [
      'p',
      {
        class: `${alignment}`,
        style: `line-height: ${lineHeight ?? '1.8'};`,
      },
      0,
    ];
  },
});

export default CustomParagraph;
