import { Node } from '@tiptap/core';

const CustomQuota = Node.create({
  name: 'defaultQuotation',

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
        tag: 'div.se-section.se-section-quotation.se-l-default',
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
        class: `py-2 relative ${alignment} mt-10 mx-auto`,
      },
      [
        'div',
        {
          class: `se-quotation-container pt-[35px] pb-[33px] relative mx-auto box-border 
                  before:absolute before:w-[21px] before:h-[16px] before:bg-no-repeat before:bg-[url('https://editor-static.pstatic.net/e/basic.desktop/1.55.1//img/se-sp-editor-3fabaad1.png')] before:bg-custom
                  before:bg-[-522px_-941px] before:top-0 before:left-1/2 before:-translate-x-1/2
                  after:absolute after:w-[21px] after:h-[16px] after:bg-no-repeat after:bg-[url('https://editor-static.pstatic.net/e/basic.desktop/1.55.1//img/se-sp-editor-3fabaad1.png')] after:bg-custom
                  after:bg-[-499px_-941px] after:bottom-0 after:left-1/2 after:-translate-x-1/2`,
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

export default CustomQuota;
