import { TableCell } from '@tiptap/extension-table-cell';
import { mergeAttributes } from '@tiptap/core';

export const CustomTableCell = TableCell.extend({
  name: 'tableCell',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      colspan: {
        default: 1,
        parseHTML: (element) =>
          parseInt(element.getAttribute('colspan') ?? '1', 10),
        renderHTML: (attributes) =>
          attributes.colspan > 1 ? { colspan: attributes.colspan } : {},
      },
      rowspan: {
        default: 1,
        parseHTML: (element) =>
          parseInt(element.getAttribute('rowspan') ?? '1', 10),
        renderHTML: (attributes) =>
          attributes.rowspan > 1 ? { rowspan: attributes.rowspan } : {},
      },
      style: {
        default: '',
        parseHTML: (element) => element.getAttribute('style') || '',
        renderHTML: (attributes) =>
          attributes.style ? { style: attributes.style } : {},
      },
      class: {
        default:
          'border border-gray-300 border-r border-b bg-white p-2 align-middle box-border',
        parseHTML: () => {
          return 'border border-gray-300 border-r border-b bg-white p-2 align-middle box-border';
        },
        renderHTML: (attributes) => ({ class: attributes.class }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'td.se-cell',
        getAttrs: (element) => {
          return {
            colspan: parseInt(element.getAttribute('colspan') ?? '1', 10),
            rowspan: parseInt(element.getAttribute('rowspan') ?? '1', 10),
            style: element.getAttribute('style') ?? '',
            class:
              'border border-gray-300 border-r border-b bg-white p-2 align-middle box-border',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['td', mergeAttributes(HTMLAttributes), 0];
  },
});
