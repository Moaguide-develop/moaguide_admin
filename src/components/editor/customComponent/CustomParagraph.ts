import { Node } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/core';

const fontSizeMap: Record<string, string> = {
  'se-fs11': 'text-[11px]',
  'se-fs13': 'text-[13px]',
  'se-fs15': 'text-[15px]',
  'se-fs16': 'text-[16px]',
  'se-fs19': 'text-[19px]',
  'se-fs24': 'text-[24px]',
  'se-fs28': 'text-[28px]',
  'se-fs30': 'text-[30px]',
  'se-fs34': 'text-[34px]',
  'se-fs38': 'text-[38px]',
};

const CustomParagraph = Node.create({
  name: 'paragraph',
  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      alignment: {
        default: 'text-left',
        parseHTML: (element: HTMLElement) => {
          if (element.classList.contains('se-text-paragraph-align-center')) {
            return 'text-center';
          } else if (
            element.classList.contains('se-text-paragraph-align-right')
          ) {
            return 'text-right';
          }
          return 'text-left';
        },
        renderHTML: (attributes) => ({
          class: attributes.alignment,
        }),
      },
      fontSize: {
        default: 'text-[15px]',
        parseHTML: (element: HTMLElement) => {
          const spans = element.querySelectorAll('span');
          for (const span of spans) {
            const matchedClass = Array.from(span.classList).find(
              (cls) => cls in fontSizeMap,
            );
            if (matchedClass) {
              return fontSizeMap[matchedClass];
            }
          }
          return 'text-[15px]';
        },
        renderHTML: (attributes) => ({
          class: attributes.fontSize,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'p',
        getAttrs: (element: HTMLElement) => ({
          alignment: element.classList.contains(
            'se-text-paragraph-align-center',
          )
            ? 'text-center'
            : element.classList.contains('se-text-paragraph-align-right')
              ? 'text-right'
              : 'text-left',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      mergeAttributes(HTMLAttributes, { style: 'line-height: 1.8;' }),
      0,
    ];
  },
});

export default CustomParagraph;
