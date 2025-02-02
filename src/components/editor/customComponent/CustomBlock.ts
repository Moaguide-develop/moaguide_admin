import { Node, mergeAttributes } from '@tiptap/core';
// import { ReactNodeViewRenderer } from '@tiptap/react';
// import ComponentView from './ComponentView';

export const CustomBlock = Node.create({
  name: 'customBlock',
  group: 'block',
  content: 'block+',

  parseHTML() {
    return [{ tag: 'div.se-component.se-text.se-l-default' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        class: 'component-text mt-10',
      }),
      0,
    ];
  },
  // addNodeView() {
  //   return ReactNodeViewRenderer(ComponentView);
  // },
});
