import { Editor } from '@tiptap/react';
import { JSONContent } from '@tiptap/core';
import { DOMSerializer } from '@tiptap/pm/model';
import { createFileNodeHTML, FileAttributes } from './File';
import { createLinkNodeHTML, LinkAttributes } from './link';

interface PaywallData {
  paywallUp: string;
  paywallDown: string;
  imageLink: string;
  isPremium: boolean;
}

const extractPaywallData = (editor: Editor): PaywallData => {
  const jsonData = editor.getJSON();
  const content: JSONContent[] = jsonData.content || [];

  const { schema } = editor;
  const domSerializer = DOMSerializer.fromSchema(schema);

  let isPremium = false;
  let paywallUp = '';
  let paywallDown = '';
  let imageLink = '';

  const convertToHTML = (nodes: any[]): string => {
    const tempDiv = document.createElement('div');
    nodes.forEach((node) => {
      try {
        if (node.type === 'file' && node.attrs?.src) {
          const fileWrapper = createFileNodeHTML({
            src: node.attrs.src,
            title: node.attrs.title,
            alignment: node.attrs.alignment,
          } as FileAttributes);

          tempDiv.appendChild(fileWrapper);
        } else if (
          ['link', 'oglink', 'verticalLink'].includes(node.type) &&
          node.attrs?.url
        ) {
          const linkElement = createLinkNodeHTML({
            thumbnail: node.attrs.thumbnail,
            title: node.attrs.title,
            summary: node.attrs.summary,
            url: node.attrs.url,
            alignment: node.attrs.alignment,
          } as LinkAttributes);
          tempDiv.appendChild(linkElement);
        } else if (node.type === 'table') {
          const tableWrapper = document.createElement('div');
          tableWrapper.className =
            'mt-[30px] relative max-w-[680px] mx-auto px-5 w-full';
          tableWrapper.style.width = '100%';

          const pmNode = schema.nodeFromJSON(node);
          const serializedNode = domSerializer.serializeNode(pmNode);
          tableWrapper.appendChild(serializedNode);

          tempDiv.appendChild(tableWrapper);
        } else if (node.type === 'customBlock') {
          const blockWrapper = document.createElement('div');
          blockWrapper.className =
            'component-text mt-10 relative px-[44px] mx-[-44px]';

          if (node.content && node.content.length > 0) {
            node.content.forEach((childNode: JSONContent) => {
              if (
                childNode.type === 'paragraph' &&
                (!childNode.content || childNode.content.length === 0)
              ) {
                const emptyParagraph = document.createElement('p');
                emptyParagraph.className = 'text-center text-[19px]';
                emptyParagraph.style.lineHeight = '1.8';
                emptyParagraph.appendChild(document.createElement('br'));
                blockWrapper.appendChild(emptyParagraph);
              } else {
                const pmNode = schema.nodeFromJSON(childNode);
                const serializedNode = domSerializer.serializeNode(pmNode);
                blockWrapper.appendChild(serializedNode);
              }
            });
          }
          tempDiv.appendChild(blockWrapper);
        } else {
          const pmNode = schema.nodeFromJSON(node);
          const serializedNode = domSerializer.serializeNode(pmNode);
          tempDiv.appendChild(serializedNode);
        }
      } catch (error) {
        console.error('Error converting node to HTML:', error, node);
      }
    });
    return tempDiv.innerHTML.replace(/\\"/g, '"');
  };

  paywallUp = convertToHTML(content);

  content.forEach((node, index) => {
    if (node.type === 'paywall') {
      isPremium = true;
      paywallUp = convertToHTML(content.slice(0, index));
      paywallDown = convertToHTML(content.slice(index + 1));
    }

    if (!imageLink && node.type === 'photo' && node.attrs?.src) {
      imageLink = node.attrs.src;
    }
  });

  return { isPremium, paywallUp, paywallDown, imageLink };
};

export default extractPaywallData;
