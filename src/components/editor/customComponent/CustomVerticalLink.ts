import { Node } from '@tiptap/core';

const CustomVerticalLink = Node.create({
  name: 'verticalLink',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      title: { default: '' },
      summary: { default: '' },
      url: { default: '' },
      alignment: { default: 'mr-auto ml-0' },
      whiteSpace: { default: 'whitespace-normal text-[#333] leading-[1.4]' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-oglink.se-l-vertical_image',
        getAttrs: (element) => {
          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';

          const ogLinkElement = element.querySelector('.se-module-oglink');
          if (!ogLinkElement) return false;

          const title =
            ogLinkElement.querySelector('.se-oglink-title')?.textContent || '';
          const summary =
            ogLinkElement.querySelector('.se-oglink-summary')?.textContent ||
            '';
          const whiteSpace = 'whitespace-nowrap max-h-[58px] leading-[20px]';
          const url =
            ogLinkElement.querySelector('.se-oglink-url')?.textContent || '';

          return { title, summary, url, alignment, whiteSpace };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        class: `mt-10 max-w-[490px] w-full relative ${HTMLAttributes.alignment} border border-black/10 shadow-md`,
      },
      [
        'div',
        {
          class: `text-left border-box relative block px-[26px] pt-[21px] pb-[18px] leading-[1.4] before:content-[''] before:inline-block before:h-full before:align-middle`,
        },
        [
          'div',
          {
            class: 'inline-block max-w-full align-middle',
          },
          [
            'strong',
            {
              class:
                'text-[15px] text-[#333] block mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all',
            },
            HTMLAttributes.title,
          ],
          [
            'p',
            {
              class: `text-[13px] mb-2 ${HTMLAttributes.whiteSpace} overflow-hidden text-ellipsis break-all`,
            },
            HTMLAttributes.summary,
          ],
          [
            'p',
            {
              class: 'text-[12px] text-[#a1885f] underline',
            },
            HTMLAttributes.url,
          ],
        ],
      ],
    ];
  },
});

export default CustomVerticalLink;
