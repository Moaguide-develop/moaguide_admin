import { Node } from '@tiptap/core';

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

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

          let title =
            ogLinkElement.querySelector('.se-oglink-title')?.textContent || '';
          let summary =
            ogLinkElement.querySelector('.se-oglink-summary')?.textContent ||
            '';
          const url =
            ogLinkElement.querySelector('.se-oglink-url')?.textContent || '';

          title = truncateText(title, 42);
          summary = truncateText(summary, 145);

          return { title, summary, url, alignment };
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
          class: `text-left border-box relative block px-[26px] pt-[21px] pb-[18px] leading-[1.4] before:content-[''] before:inline-block before:h-full before:vertical-align-middle`,
        },
        [
          'div',
          {
            class: 'inline-block max-w-full vertical-align-middle',
          },
          [
            'strong',
            {
              class: 'text-[15px] font-bold text-[#333] block mb-1',
            },
            HTMLAttributes.title,
          ],
          [
            'p',
            {
              class: 'text-[13px] text-[#666] leading-[1.4] mb-2',
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
