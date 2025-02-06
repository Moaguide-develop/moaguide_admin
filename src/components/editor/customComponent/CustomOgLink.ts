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

const CustomOgLink = Node.create({
  name: 'oglink',

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
        tag: 'div.se-section.se-section-oglink.se-l-image',
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
    return [
      'div',
      {
        class: `mt-10 max-w-[450px] w-full relative ${HTMLAttributes.alignment} border border-black/10 inset-0 text-inherit vertical-align-baseline`,
      },
      [
        'div',
        {
          class: 'block relative w-full bg-[#fff] decoration-none shadow-md',
        },
        ...(HTMLAttributes.thumbnail
          ? [
              [
                'div',
                { class: 'w-[110px] block relative z-10' },
                [
                  'img',
                  {
                    src: HTMLAttributes.thumbnail,
                    class: 'w-full min-h-[114px] h-auto align-top object-cover',
                    alt: HTMLAttributes.title || '링크 썸네일',
                  },
                ],
                [
                  'div',
                  {
                    class: 'inset-0 border-black/10',
                  },
                ],
              ],
            ]
          : []),
        [
          'div',
          {
            class: `left-[110px] absolute inset-0 px-[26px] pt-[21px] pb-[18px] leading-[1.4] block text-left box-border text-[0] before:content-[''] before:inline-block before:h-full before:align-middle`,
          },
          [
            'div',
            { class: 'inline-block max-w-full align-middle' },
            [
              'strong',
              {
                class:
                  'text-[15px] font-bold text-[#333] break-all block mb-1 whitespace-nowrap overflow-hidden text-ellipsis',
              },
              HTMLAttributes.title,
            ],
            [
              'p',
              {
                class:
                  'mt-[7px] text-[13px] leading-[1.4] text-[#999] break-all whitespace-nowrap overflow-hidden text-ellipsis',
              },
              HTMLAttributes.summary,
            ],
            [
              'p',
              {
                class:
                  'mt-[9px] text-[#a1885f] text-[13px] break-all whitespace-nowrap overflow-hidden text-ellipsis no-underline',
              },
              HTMLAttributes.url,
            ],
          ],
        ],
        [
          'div',
          {
            class: 'absolute inset-0 border border-black/10',
          },
        ],
      ],
    ];
  },
});

export default CustomOgLink;
