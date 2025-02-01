import { mergeAttributes } from '@tiptap/core';
import Highlight from '@tiptap/extension-highlight';

export const rgbToHex = (rgb: string | null): string | null => {
  if (!rgb) return null;
  const match = rgb.match(/\d+/g);
  if (!match) return rgb;
  const [r, g, b] = match.map(Number);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

const CustomHighlight = Highlight.extend({
  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const parentSpan = element.closest('span.se-highlight') as HTMLElement | null;
          const backgroundColor = parentSpan ? parentSpan.style.backgroundColor : element.style.backgroundColor;

          console.log('🎯 Parsing element:', element);
          console.log('🎨 Background Color:', backgroundColor);

          return backgroundColor ? rgbToHex(backgroundColor) : null;
        },
        renderHTML: (attributes) => {
          console.log('✨ Render HTMLAttributes:', attributes);
          return {
            style: `background-color: ${attributes.color ?? 'transparent'}; color: inherit;`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
        getAttrs: (element: HTMLElement) => {
          const parentSpan = element.closest('span.se-highlight') as HTMLElement | null;
          const backgroundColor = parentSpan ? parentSpan.style.backgroundColor : element.style.backgroundColor;

          console.log('🛠 Detected mark with parent:', parentSpan);
          console.log('🎨 Extracted Background Color:', backgroundColor);

          return {
            color: backgroundColor ? rgbToHex(backgroundColor) : null,
          };
        },
      },
      {
        tag: 'span.se-highlight',
        getAttrs: (element: HTMLElement) => {
          const backgroundColor = element.style.backgroundColor || null;

          console.log('🔍 Found span.se-highlight:', element);
          console.log('🎨 Background Color:', backgroundColor);

          return {
            color: backgroundColor ? rgbToHex(backgroundColor) : null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    console.log('🚀 Render HTMLAttributes:', HTMLAttributes);
    return ['mark', mergeAttributes(HTMLAttributes), 0];
  },
});

export default CustomHighlight;
