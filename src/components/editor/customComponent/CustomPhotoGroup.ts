import { Node } from '@tiptap/core';

interface ImageAttributes {
  src: string;
  alt?: string;
  width?: string;
}

const CustomPhotoGroup = Node.create({
  name: 'photoGroup',

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
        tag: 'div.se-section.se-section-imageGroup.se-l-slide',
        getAttrs: (element: Element) => {
          const images: ImageAttributes[] = Array.from(
            element.querySelectorAll('.se-module-image'),
          ).map((imgWrapper) => {
            const imgElement = imgWrapper.querySelector(
              'img.se-image-resource',
            );
            const widthStyle = imgWrapper.getAttribute('style') || '';

            const widthMatch = widthStyle.match(/width:\s*([\d.]+)%/);
            const width = widthMatch ? `${widthMatch[1]}%` : 'auto';

            return {
              src: imgElement?.getAttribute('src')?.trim() || '',
              alt: imgElement?.getAttribute('alt')?.trim() || '',
              width,
            };
          });

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
        class: `w-full relative ${HTMLAttributes.alignment} mt-[20px]`,
      },
      [
        'div',
        {
          class: 'flex relative gap-2',
        },
        ...(HTMLAttributes.images ?? []).map((img: ImageAttributes) => [
          'div',
          {
            class: 'relative',
            style: `width: ${img.width};`,
          },
          [
            'img',
            {
              src: img.src,
              alt: img.alt,
              width: img.width,
              class: 'block relative w-full h-auto',
            },
          ],
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

export default CustomPhotoGroup;
