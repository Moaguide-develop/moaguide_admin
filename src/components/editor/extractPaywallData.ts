import { Editor } from '@tiptap/react';
import { DOMSerializer } from 'prosemirror-model';
import { JSONContent } from '@tiptap/core';

interface PaywallData {
  isPremium: boolean;
  paywallUp: string;
  paywallDown: string;
  imageLink: string;
}

const nodeToHTML = (node: JSONContent, editor: Editor): string => {
  const { schema } = editor;
  const domSerializer = DOMSerializer.fromSchema(schema);

  // ProseMirror 노드 생성
  const pmNode = schema.nodeFromJSON(node);

  // DOMSerializer로 HTML 변환
  const fragment = domSerializer.serializeFragment(pmNode.content);
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(fragment);

  return tempDiv.innerHTML;
};

const extractPaywallData = (editor: Editor): PaywallData => {
  const jsonData = editor.getJSON(); // JSONContent 타입 반환
  const content: JSONContent[] = jsonData.content || []; // JSONContent 배열로 타입 지정

  let isPremium = false;
  let paywallUp = '';
  let paywallDown = '';
  let imageLink = '';

  content.forEach((node, index) => {
    // Paywall 노드 찾기
    if (node.type === 'paywall') {
      isPremium = true;

      // Paywall 이전의 노드 HTML로 변환
      paywallUp = content
        .slice(0, index)
        .map((node) => nodeToHTML(node, editor))
        .join('');

      // Paywall 이후의 노드 HTML로 변환
      paywallDown = content
        .slice(index + 1)
        .map((node) => nodeToHTML(node, editor))
        .join('');
    }

    // 첫 번째 이미지의 src 추출
    if (!imageLink && node.type === 'image' && node.attrs?.src) {
      imageLink = node.attrs.src;
    }
  });

  return { isPremium, paywallUp, paywallDown, imageLink };
};

export default extractPaywallData;