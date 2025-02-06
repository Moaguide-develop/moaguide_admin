import { Node, mergeAttributes } from '@tiptap/core';
// import { ReactNodeViewRenderer } from '@tiptap/react';
// import ComponentView from './ComponentView';

export const CustomBlock = Node.create({
  name: 'customBlock',
  group: 'block',
  content: 'block+',
  defining: true,

  parseHTML() {
    return [{ tag: 'div.se-section.se-section-text' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        class: 'component-text mt-10 relative px-[44px] mx-[-44px]',
        draggable: false,
      }),
      0,
    ];
  },
  // addNodeView() {
  //   return ReactNodeViewRenderer(ComponentView);
  // },
});
