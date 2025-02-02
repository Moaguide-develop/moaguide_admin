import { Node } from '@tiptap/core';

interface ImageAttributes {
  src: string;
  alt?: string;
  width?: string;
}

const CustomPhotoStrip = Node.create({
  name: 'photoStrip',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      images: {
        default: [] as ImageAttributes[],
      },
      alignment: { default: 'mr-auto ml-0' },
      caption: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-imageStrip.se-l-default',
        getAttrs: (element: Element) => {
          const images: ImageAttributes[] =
            Array.from(element.querySelectorAll('img.se-image-resource')).map(
              (img) => ({
                src: img.getAttribute('src') || '',
                alt: img.getAttribute('alt') || '',
                width: img.getAttribute('width') || '680',
              }),
            ) ?? [];

          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';

          const captionElement = element.querySelector('.se-caption p');
          const captionText = captionElement?.textContent?.trim() || '';
          const isPlaceholder =
            captionElement?.querySelector('.se-placeholder') !== null;
          const caption = isPlaceholder ? '' : captionText;

          return { images: images ?? [], alignment, caption };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        class: `w-full relative ${HTMLAttributes.alignment} mt-[30px]`,
      },
      [
        'div',
        { class: 'flex gap-2' },
        ...(HTMLAttributes.images ?? []).map((img: ImageAttributes) => [
          'img',
          {
            src: img.src,
            alt: img.alt,
            width: img.width,
            class: 'block w-[48%] h-auto',
          },
        ]),
      ],
      ...(HTMLAttributes.caption !== '사진 설명을 입력하세요.'
        ? [
            [
              'div',
              { class: 'w-full mt-2 text-center' },
              [
                'p',
                {
                  class: 'text-[13px] text-center',
                  style: 'line-height: 1.5;',
                },
                HTMLAttributes.caption,
              ],
            ],
          ]
        : []),
    ];
  },
});

export default CustomPhotoStrip;
