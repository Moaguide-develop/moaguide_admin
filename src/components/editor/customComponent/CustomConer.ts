import { Node } from '@tiptap/core';

const CustomCorner = Node.create({
  name: 'cornerQuotation',

  group: 'block',
  atom: true,

  content: 'paragraph+',

  addAttributes() {
    return {
      alignment: { default: 'mr-auto ml-0' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-quotation.se-l-quotation_corner',
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
        class: `py-2 relative ${HTMLAttributes.alignment} mt-10`,
      },
      [
        'div',
        {
          class: `max-w-[450px] px-[36px] py-[39px] box-border relative mx-auto font-[inherit]
          before:top-0 before:left-0 before:border-t-[6px] before:border-l-[6px] before:border-r-0
          before:border-b-0 before:content-[""] before:absolute before:w-[26px] before:h-[26px]
          before:border before:border-[#4a4a4a] before:border-solid 
          after:bottom-0 after:right-0 after:border-t-0 after:border-l-0 after:border-r-[6px]
          after:border-b-[6px] after:content-[""] after:absolute after:w-[26px] after:h-[26px] 
          after:border after:border-[#4a4a4a] after:border-solid`,
        },
        [
          'div',
          {
            class: 'component-text relative',
          },
          0,
        ],
      ],
    ];
  },
});

export default CustomCorner;
