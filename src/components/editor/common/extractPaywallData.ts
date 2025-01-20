import { Editor } from '@tiptap/react';
import { JSONContent } from '@tiptap/core';
import { DOMSerializer } from '@tiptap/pm/model';

interface PaywallData {
  isPremium: boolean;
  paywallUp: string;
  paywallDown: string;
  imageLink: string;
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
        const pmNode = schema.nodeFromJSON(node);
        const serializedNode = domSerializer.serializeNode(pmNode);
        tempDiv.appendChild(serializedNode);
      } catch (error) {
        console.error('Error converting node to HTML:', error, node);
      }
    });
    return tempDiv.innerHTML.replace(/\\"/g, '"');
  };

  paywallUp = convertToHTML(content); // Default to the entire content if no paywall is found

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
