import { Node } from '@tiptap/core';

function srcFormatter(url: string | null): string {
  if (!url) return '';
  const decodedUrl = decodeURIComponent(url);

  const srcMatch = decodedUrl.match(/src="([^"]+)"/);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }
  return url;
}

const CustomLink = Node.create({
  name: 'link',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      thumbnail: { default: null },
      title: { default: '' },
      summary: { default: '' },
      url: { default: '' },
      alignment: { default: 'mr-auto ml-0' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-oglink.se-l-large_image.se-section-align-center',
        getAttrs: (element) => {
          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';

          const ogLinkElement = element.querySelector('.se-module-oglink');
          if (!ogLinkElement) {
            return false;
          }

          const rawThumbnail = ogLinkElement
            .querySelector('.se-oglink-thumbnail img')
            ?.getAttribute('src');
          const thumbnail = rawThumbnail ? srcFormatter(rawThumbnail) : '';
          const title =
            ogLinkElement.querySelector('.se-oglink-title')?.textContent || '';
          const summary =
            ogLinkElement.querySelector('.se-oglink-summary')?.textContent ||
            '';
          const url =
            ogLinkElement.querySelector('.se-oglink-url')?.textContent || '';

          return { thumbnail, title, summary, url, alignment };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { thumbnail, title, summary, url, alignment } = HTMLAttributes;

    return [
      'div',
      {
        class: `max-w-[450px] w-full relative ${alignment} border border-black/10 rounded-lg overflow-hidden`,
      },
      [
        'div',
        { class: 'se-module se-module-oglink __se-unit group' },
        [
          'div',
          { class: 'max-h-[450px] overflow-hidden block z-10 relative' },
          [
            'img',
            {
              src: thumbnail,
              class: 'w-full h-auto align-top',
              alt: title || '링크 썸네일',
            },
          ],
          [
            'button',
            {
              type: 'button',
              class:
                'absolute top-0 right-0 z-10 w-6 h-6 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center',
              'data-log': 'ogkct.x',
              onclick: 'window.removeThumbnail(event)',
            },
            ['span', { class: 'sr-only' }, '이미지 썸네일 삭제'],
            [
              'div',
              {
                class:
                  'absolute top-1 left-3 w-px h-4 bg-white transform origin-center rotate-45',
              },
            ],
            [
              'div',
              {
                class:
                  'absolute top-1 left-3 w-px h-4 bg-white transform origin-center -rotate-45',
              },
            ],
          ],
        ],
        [
          'div',
          {
            class:
              'px-[26px] pt-[21px] pb-[18px] leading-[1.4] block relative text-left box-border text-[0] obsolute inset-0 border border-black/10',
          },
          [
            'div',
            { class: 'inline-block max-w-full align-middle' },
            [
              'strong',
              {
                class:
                  'text-[15px] text-ellipsis whitespace-nowrap overflow-hidden break-all block font-bold text-[#333] ',
              },
              title,
            ],
            [
              'p',
              {
                class:
                  'whitespace-nowrap overflow-hidden text-ellipsis break-all max-h-9 leading-[18px] mt-[7px] text-[13px] text-[#999]',
              },
              summary,
            ],
            [
              'p',
              {
                class:
                  'whitespace-nowrap overflow-hidden text-ellipsis break-all mt-[9px] text-[#a1885f] text-[13px] no-underline',
              },
              url,
            ],
          ],
        ],
      ],
    ];
  },
});

export default CustomLink;
