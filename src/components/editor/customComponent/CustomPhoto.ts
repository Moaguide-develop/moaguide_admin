import { Node } from '@tiptap/core';

const CustomPhoto = Node.create({
  name: 'photo',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: '' },
      alt: { default: '' },
      width: { default: '680' },
      alignment: { default: 'mr-auto ml-0' },
      caption: { default: '' },
      style: { default: '' },
      stat404: { default: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-image.se-l-default',
        getAttrs: (element) => {
          const stat404 =
            element.querySelector('.se-image-status-404') !== null;

          const captionElement = element.querySelector('.se-caption p');
          const captionText = captionElement?.textContent?.trim() || '';
          const isPlaceholder =
            captionElement?.querySelector('.se-placeholder') !== null;
          const caption = isPlaceholder ? '' : captionText;

          if (stat404) {
            return { stat404: true, caption };
          }

          const widthStyle = element?.getAttribute('style') || '';
          const widthMatch = widthStyle.match(/max-width:\s*([\d.]+)px/);
          const style = widthMatch ? `${widthMatch[1]}px` : 'w-full';

          const imgElement = element.querySelector('img.se-image-resource');
          const src =
            imgElement?.getAttribute('data-src')?.trim() ||
            imgElement?.getAttribute('src')?.trim();

          const alt = imgElement?.getAttribute('alt') || '';
          const width = imgElement?.getAttribute('width') || '680';

          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';

          return {
            src,
            alt,
            width,
            alignment,
            caption,
            style,
            stat404: false,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    if (HTMLAttributes.stat404) {
      return [
        'div',
        {
          class: `relative mt-[30px] ${HTMLAttributes.alignment}`,
        },
        [
          'div',
          { class: 'relative pt-[56.25%] border border-[#e9e9e9]' },
          [
            'div',
            {
              class: `absolute top-0 bottom-0 w-full h-full m-auto text-center before:content-[""] before:inline-block before:h-full before:align-middle`,
            },
            [
              'p',
              {
                class:
                  'inline-block px-4 text-[16px] text-[#ccc] text-center align-middle',
              },
              '존재하지 않는 이미지입니다.',
            ],
          ],
        ],
        HTMLAttributes.caption !== '사진 설명을 입력하세요.'
          ? [
              'p',
              {
                class: 'text-[13px] text-center mt-2',
                style: 'line-height: 1.5;',
              },
              HTMLAttributes.caption,
            ]
          : null,
      ];
    }

    return [
      'div',
      {
        class: `relative mt-[30px] ${HTMLAttributes.alignment}`,
      },
      [
        'img',
        {
          src: HTMLAttributes.src,
          alt: HTMLAttributes.alt,
          width: HTMLAttributes.width,
          class: `block relative h-auto ${HTMLAttributes.alignment} ${HTMLAttributes.style}`,
        },
      ],

      HTMLAttributes.caption !== '사진 설명을 입력하세요.'
        ? [
            'p',
            {
              class: 'text-[13px] text-center mt-2',
              style: 'line-height: 1.5;',
            },
            HTMLAttributes.caption,
          ]
        : null,
    ];
  },
});

export default CustomPhoto;
