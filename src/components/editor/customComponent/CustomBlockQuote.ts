import { Node } from '@tiptap/core';
// import { ReactNodeViewRenderer } from '@tiptap/react';
// import QuotationComponent from './QuotationComponent';

const CustomBlockQuotation = Node.create({
  name: 'lineQuotation',

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
        tag: 'div.se-section.se-section-quotation.se-l-quotation_line',
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
        class: `se-section se-section-quotation se-l-quotation_line py-2 relative ${alignment} mt-10`,
      },
      [
        'div',
        {
          class: `se-quotation-container px-5 py-0.5 relative m-auto box-border before:absolute before:top-0 before:bottom-0 before:left-0 before:border-l-[6px] before:border-[#515151] before:content-['']`,
        },
        [
          'div',
          {
            class: 'component-text',
          },
          0,
        ],
      ],
    ];
  },

  // addNodeView() {
  //   return ReactNodeViewRenderer(QuotationComponent);
  // },
});

export default CustomBlockQuotation;
