import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import PaywallComponent from './PaywallComponent'; // React 컴포넌트로 렌더링

const CustomPaywall = Node.create({
  name: 'paywall',

  group: 'block', // 블록 요소로 처리
  atom: true, // 독립적 요소

  addAttributes() {
    return {
      title: { default: '프리미엄 구독자 전용 콘텐츠입니다.' },
      description: {
        default: '모아가이드 구독으로 더 많은 콘텐츠를 만나보세요!',
      },
      buttonText: { default: '프리미엄 구독하기' },
      info: {
        default: '콘텐츠 이용권한이 없는 경우 여기까지만 확인 가능합니다.',
      },
      brInfo: {
        default: '콘텐츠 판매 설정에 따라 문구 및 버튼이 변경될 수 있습니다.',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se_paywall',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: 'se_paywall' }),
      [
        'div',
        { class: 'se_paywall_text' },
        ['strong', { class: 'se_paywall_title' }, HTMLAttributes.title],
        ['p', { class: 'se_paywall_desc' }, HTMLAttributes.description],
        ['a', { class: 'se_paywall_subscribe' }, HTMLAttributes.buttonText],
      ],
      ['p', { class: 'se_paywall_info' }, HTMLAttributes.info],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PaywallComponent); // React 컴포넌트와 연결
  },
});

export default CustomPaywall;
