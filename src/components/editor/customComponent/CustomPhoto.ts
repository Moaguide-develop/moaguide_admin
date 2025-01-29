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
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-image',
        getAttrs: (element) => {
          const imgElement = element.querySelector('img.se-image-resource');
          const src = imgElement?.getAttribute('src') || '';
          const alt = imgElement?.getAttribute('alt') || '';
          const width = imgElement?.getAttribute('width') || '680';

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

          return { src, alt, width, alignment, caption };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment } = HTMLAttributes;

    return [
      'div',
      {
        class: `w-full relative ${alignment}`,
      },
      [
      'div',
      {class: 'relative se-module-image __se-unit'},
      [
      'div',
      {class: 'relative'},
        [
          'img',
          {
            src: HTMLAttributes.src,
            alt: HTMLAttributes.alt,
            width: HTMLAttributes.width,
            class: 'block w-full relative h-auto',
          },
        ],
      ],
      ],
    ];
  },
});

export default CustomPhoto;
