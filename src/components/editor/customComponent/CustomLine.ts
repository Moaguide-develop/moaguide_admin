import { Node } from '@tiptap/core';

const CustomLine = Node.create({
  name: 'default',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      alignment: { default: 'mx-auto' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-horizontalLine.se-l-default',
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
      {
        class: `w-[220px] mt-5 relative pt-[30px] pb-[29px] ${HTMLAttributes.alignment}`,
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

export default CustomLine;
