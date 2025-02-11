import { Node } from '@tiptap/core';

const CustomPostit = Node.create({
  name: 'postitQuotation',

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
        tag: 'div.se-section.se-section-quotation.se-l-quotation_postit',
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
        class: `pt-2 pb-[59px] relative ${HTMLAttributes.alignment} mt-5 mx-auto`,
        // before:top-[-3px] before:right-[-3px] before:bottom-[-3px] before:left-[-3px] before:border before:border-[#ddd] before:invisible before:content-[""] before:absolute before:border-solid before:box-content after:max-w-[680px] after:right-0 after:left-0 after:h-[3px] after:w-full after:max-w-[360px] after:m-auto after:bg-[#baa67e] after:content-[""] after:absolute after:bg-[#2edd63] after:invisible after:box-content
      },
      [
        'div',
        {
          class: `max-w-[460px] px-[33px] pt-[33px] pb-0 border-solid border-[#d5d5d5] border-t-[4px] border-r-[4px] border-b-0 border-l-[4px] bg-white box-border relative m-auto font-[inherit] align-baseline 
          before:w-[42px] before:h-[49px] before:bg-[position:-665px_-618px] before:content-[""] before:box-content
          before:absolute before:top-full before:right-[-4px] before:bg-no-repeat before:bg-[url('https://editor-static.pstatic.net/e/basic.desktop/1.55.1//img/se-sp-editor-3fabaad1.png')] before:bg-custom
          after:content-[""] after:absolute after:top-full after:left-[-4px] after:right-[38px] after:h-[49px] after:bg-white after:border after:border-[#d5d5d5] after:border-solid after:border-b-[4px]
          after:border-l-[4px] after:border-t-0 after:border-r-0 after:box-border`,
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

export default CustomPostit;
