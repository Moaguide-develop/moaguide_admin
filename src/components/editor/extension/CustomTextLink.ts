import { mergeAttributes } from '@tiptap/core';
import Link from '@tiptap/extension-link';

const CustomTextLink = Link.extend({
  addAttributes() {
    return {
      'data-href': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-href') || '',
        renderHTML: (attributes) => {
          if (!attributes.href && attributes['data-href']) {
            return { href: attributes['data-href'] };
          }
          return {};
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-href].se-link',
        getAttrs: (node) => {
          return {
            href: node.getAttribute('data-href') || node.getAttribute('href'),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        href: HTMLAttributes.href,
        class: 'underline break-all text-[#608cba]',
      }),
      0,
    ];
  },
});

export default CustomTextLink;
