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
  try {
    const pmNode = schema.nodeFromJSON(node); // ProseMirror 노드 생성
    const domSerializer = DOMSerializer.fromSchema(schema);

    // 노드가 단일 요소일 때 처리
    if (!pmNode.content.size) {
      const tempDiv = document.createElement('div');
      tempDiv.appendChild(domSerializer.serializeNode(pmNode));
      return tempDiv.innerHTML;
    }

    // 노드가 여러 콘텐츠를 포함할 때 처리
    const fragment = domSerializer.serializeFragment(pmNode.content);
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(fragment);

    return tempDiv.innerHTML;
  } catch (error) {
    console.error('Error converting node to HTML:', error, node);
    return ''; // 오류 발생 시 빈 문자열 반환
  }
};

const extractPaywallData = (editor: Editor): PaywallData => {
  const jsonData = editor.getJSON(); // JSONContent 타입 반환
  const content: JSONContent[] = jsonData.content || []; // JSONContent 배열로 타입 지정

  let isPremium = false;
  let paywallUp = '';
  let paywallDown = '';
  let imageLink = '';
  
  let paywallFound = false;
  
  if (!paywallFound) {
    paywallUp = content.map((node) => nodeToHTML(node, editor)).join('');
  }

  content.forEach((node, index) => {
  
    if (node.type === 'paywall') {
      isPremium = true;
      paywallFound = true;

      paywallUp = content
        .slice(0, index)
        .map((node) => nodeToHTML(node, editor))
        .join('');

      paywallDown = content
        .slice(index + 1)
        .map((node) => nodeToHTML(node, editor))
        .join('');
    }
    
    if (!imageLink && node.type === 'image' && node.attrs?.src) {
      imageLink = node.attrs.src;
    }
  });

  return { isPremium, paywallUp, paywallDown, imageLink };
};

export default extractPaywallData;
