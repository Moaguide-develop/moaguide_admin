import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import QuotationComponent from './QuotationComponent';

const CustomQuotation = Node.create({
  name: 'quotation',

  group: 'block',
  atom: false,

  content: 'inline*',

  addAttributes() {
    return {
      text: { default: '' },
      citation: { default: '' },
      alignment: { default: 'mr-auto ml-0' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-quotation',
        getAttrs: (element) => {
          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';

          const text =
            element.querySelector('.se-quote p')?.textContent?.trim() || '';

          const citationElement = element.querySelector('.se-cite p');
          let citationText = citationElement?.textContent?.trim() || '';
          const hasPlaceholder =
            citationElement?.querySelector('.se-placeholder') !== null;
          if (hasPlaceholder) {
            citationText = '';
          }

          return { text, citation: citationText, alignment };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { text, citation, alignment } = HTMLAttributes;

    return [
      'div',
      {
        class: `py-2 relative ${alignment}`,
      },
      [
        'div',
        {
          class: `px-5 py-0.5 relative m-auto box-border before:absolute before:top-0 before:bottom-0 before:left-0 before:border-l-[6px] before:border-[#515151] before:content-['']`,
        },
        [
          'div',
          { class: 'se-module se-module-text __se-unit se-quote' },
          [
            'p',
            {
              class: 'se-text-paragraph se-text-paragraph-align-left',
              style: 'line-height: 1.8',
            },
            ['b', text],
          ],
        ],
        citation
          ? [
              'div',
              { class: 'se-module se-module-text __se-unit se-cite' },
              [
                'p',
                {
                  class:
                    'se-text-paragraph se-text-paragraph-align-left text-sm text-gray-500',
                },
                citation,
              ],
            ]
          : null,
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(QuotationComponent);
  },
});

export default CustomQuotation;
