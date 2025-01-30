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
  defining: true,

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
        renderHTML: (attributes) => {
          return { class: attributes.alignment };
        },
      },
      fontSize: {
        default: 'text-[15px]',
        parseHTML: (element: HTMLElement) => {
          const spans = element.querySelectorAll(
            'span.se-fs11, span.se-fs13, span.se-fs15, span.se-fs16, span.se-fs19, span.se-fs24, span.se-fs28, span.se-fs30, span.se-fs34, span.se-fs38',
          );

          if (spans.length > 0) {
            for (const span of spans) {
              const matchedClass = Array.from(span.classList).find(
                (cls) => cls in fontSizeMap,
              );

              if (matchedClass) {
                return fontSizeMap[matchedClass];
              }
            }
          }

          return 'text-[15px]';
        },
        renderHTML: (attributes) => {
          return attributes.fontSize ? { class: attributes.fontSize } : {};
        },
      },
      textColor: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const color = element.style.color || null;
          return color;
        },
        renderHTML: (attributes) => {
          return attributes.textColor
            ? { style: `color: ${attributes.textColor};` }
            : {};
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'p',
        getAttrs: (element: HTMLElement) => {
          const spans = element.querySelectorAll(
            'span.se-fs11, span.se-fs13, span.se-fs15, span.se-fs16, span.se-fs19, span.se-fs24, span.se-fs28, span.se-fs30, span.se-fs34, span.se-fs38',
          );

          let matchedFontSize: string = 'text-[15px]';
          if (spans.length > 0) {
            for (const span of spans) {
              const matchedClass = Array.from(span.classList).find(
                (cls) => cls in fontSizeMap,
              );

              if (matchedClass) {
                matchedFontSize = fontSizeMap[matchedClass];
                break;
              }
            }
          }

          return {
            alignment: element.classList.contains(
              'se-text-paragraph-align-center',
            )
              ? 'text-center'
              : element.classList.contains('se-text-paragraph-align-right')
                ? 'text-right'
                : 'text-left',
            fontSize: matchedFontSize,
            textColor: element.style.color || null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(HTMLAttributes, { class: 'mt-[20px]' }), 0];
  },
});

export default CustomParagraph;
