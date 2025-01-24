import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import PhotoComponent from './PhotoComponent';

const CustomPhoto = Node.create({
  name: 'photo',

  group: 'block', // 블록 요소로 처리
  // inline: false, 
  atom: true, // 독립적 요소

  addAttributes() {
    return {
      src: {
        default: null, // 이미지 URL
      },
      alt: {
        default: '', // 대체 텍스트
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PhotoComponent); // React 컴포넌트와 연결
  },
});

export default CustomPhoto;
