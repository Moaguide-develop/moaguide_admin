import { Node } from '@tiptap/core';

export const CustomTable = Node.create({
  name: 'table',
  group: 'block',
  content: 'tableRow+',
  isolating: true,

  addAttributes() {
    return {
      alignment: { default: 'mr-auto ml-0' },
      width: { default: '100%' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-table',
        getAttrs: (element) => {
          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';

          const styleAttr = element.getAttribute('style') || '';
          const widthMatch = styleAttr.match(/width:\s*([\d.]+%?)/);
          const width = widthMatch ? widthMatch[1] : '100%';

          return { alignment, width };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment, width } = HTMLAttributes;

    return [
      'div',
      {
        class: `mt-10 ${alignment} overflow-visible relative bg-white`,
        style: `width: ${width};`,
      },
      [
        'table',
        {
          class:
            'border border-[#d2d2d2] w-full border-collapse table-fixed overflow-hidden',
        },
        ['tbody', 0],
      ],
    ];
  },
});
