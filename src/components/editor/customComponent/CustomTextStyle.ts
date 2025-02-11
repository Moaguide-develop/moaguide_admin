import { mergeAttributes } from '@tiptap/core';
import TextStyle from '@tiptap/extension-text-style';

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

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      fontSize: {
        default: 'text-[15px]',
        parseHTML: (element: HTMLElement) => {
          const matchedClass = Array.from(element.classList).find(
            (cls) => cls in fontSizeMap,
          );

          return matchedClass ? fontSizeMap[matchedClass] : 'text-[15px]';
        },
        renderHTML: (attributes) => ({
          class: attributes.fontSize,
        }),
      },
      isEmoji: {
        default: false,
        parseHTML: (element: HTMLElement) => {
          return element.classList.contains('se-emoji');
        },
        renderHTML: (attributes) =>
          attributes.isEmoji ? { class: 'se-emoji' } : {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span.se-emoji',
        getAttrs: () => ({ isEmoji: true }),
      },
      {
        tag: 'span',
        getAttrs: (element: HTMLElement) => {
          const matchedClass = Array.from(element.classList).find(
            (cls) => cls in fontSizeMap,
          );

          return {
            fontSize: matchedClass ? fontSizeMap[matchedClass] : 'text-[15px]',
          };
        },
      },
    ];
  },

  renderHTML({ mark, HTMLAttributes }) {
    if (mark.attrs.isEmoji) {
      return [
        'span',
        mergeAttributes(HTMLAttributes, { class: 'se-emoji' }),
        0,
      ];
    }
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});

export default CustomTextStyle;
