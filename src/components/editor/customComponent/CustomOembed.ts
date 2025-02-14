import { Node } from '@tiptap/core';

const CustomOembed = Node.create({
  name: 'oembed',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: '' },
      alignment: { default: '' },
      width: { default: '' },
      height: { default: '' },
      frameborder: { default: '' },
      allow: { default: '' },
      referrerpolicy: { default: '' },
      allowfullscreen: { default: '' },
      title: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-oembed.se-l-default',
        getAttrs: (element) => {
          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';

          const frameElement = element.querySelector('iframe');
          if (!frameElement) {
            return {};
          }

          return {
            src: frameElement.getAttribute('src') || '',
            alignment,
            width: frameElement.getAttribute('width') || '400',
            height: frameElement.getAttribute('height') || '300',
            frameborder: frameElement.getAttribute('frameborder') || '0',
            allow: frameElement.getAttribute('allow') || '',
            referrerpolicy: frameElement.getAttribute('referrerpolicy') || '',
            allowfullscreen: frameElement.getAttribute('allowfullscreen') || '',
            title: frameElement.getAttribute('title') || '',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        class: `relative mt-5 ${HTMLAttributes.alignment}`,
      },
      [
        'div',
        {
          class: `relative before:content-[""] before:absolute before:inset-0 before:z-10 before:bg-transparent before:box-content`,
        },
        [
          'div',
          {
            style: 'padding-top: 75%;',
          },
          [
            'iframe',
            {
              class: 'absolute inset-0 w-full h-full',
              src: HTMLAttributes.src || '',
              width: HTMLAttributes.width || '300',
              height: HTMLAttributes.height || '400',
              frameborder: HTMLAttributes.frameborder || '0',
              allow: HTMLAttributes.allow || '',
              referrerpolicy: HTMLAttributes.referrerpolicy || '',
              allowfullscreen: HTMLAttributes.allowfullscreen || '',
              title: HTMLAttributes.title || '',
            },
          ],
        ],
      ],
    ];
  },
});

export default CustomOembed;
