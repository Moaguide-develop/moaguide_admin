import { Node } from '@tiptap/core';

const CustomDivider = Node.create({
  name: 'line1',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      alignment: { default: 'mr-auto ml-0' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-horizontalLine.se-l-line1',
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
    const { alignment } = HTMLAttributes;
    return [
      'div',
      {
        class: `mt-[30px] relative w-full pt-[30px] pb-[29px] ${alignment}`,
      },
      [
        'div',
        { class: 'se-module se-module-horizontalLine __se-unit' },
        ['span', { class: 'absolute inset-0' }],
        [
          'hr',
          {
            class:
              'block border-0 m-0 p-0 block !m-0 mx-auto border-0 h-px bg-[#ddd]',
          },
        ],
      ],
    ];
  },
});

export default CustomDivider;
