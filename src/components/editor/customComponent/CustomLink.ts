import { Node, mergeAttributes } from '@tiptap/core';

const CustomLinkNode = Node.create({
  name: 'customLink',

  group: 'inline',

  inline: true,

  selectable: false,

  addAttributes() {
    return {
      href: {
        default: null,
      },
      title: {
        default: null,
      },
      description: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-custom-link]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes({ 'data-custom-link': true }, HTMLAttributes), HTMLAttributes.title];
  },
});

export default CustomLinkNode;
