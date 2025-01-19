import { Editor } from '@tiptap/react';
import { JSONContent } from '@tiptap/core';

interface PaywallData {
  isPremium: boolean;
  paywallUp: JSONContent[];
  paywallDown: JSONContent[];
  imageLink: string;
}

const extractPaywallData = (editor: Editor): PaywallData => {
  const jsonData = editor.getJSON(); // JSONContent 타입 반환
  const content: JSONContent[] = jsonData.content || []; // JSONContent 배열로 타입 지정

  let isPremium = false;
  let paywallUp: JSONContent[] = [];
  let paywallDown: JSONContent[] = [];
  let imageLink = '';

  if (!isPremium) {
    paywallUp = content;
  }
  content.forEach((node, index) => {
    if (node.type === 'paywall') {
      isPremium = true;

      paywallUp = content.slice(1, index);

      paywallDown = content.slice(index + 1);
    }

    if (!imageLink && node.type === 'photo' && node.attrs?.src) {
      imageLink = node.attrs.src;
    }
  });

  return { isPremium, paywallUp, paywallDown, imageLink };
};

export default extractPaywallData;
