import React from 'react';
import { Editor } from '@tiptap/react';
import { TextSelection } from 'prosemirror-state';

const AddPaywall: React.FC<{ editor: Editor }> = ({ editor }) => {
  const handleInsertPaywall = () => {
    const hasPaywall = editor
      .getJSON()
      .content?.some((node: any) => node.type === 'paywall');

    if (hasPaywall) {
      alert('페이월 설정은 한번만 가능합니다.');
      return;
    }

    editor
      .chain()
      .focus()
      .insertContent({
        type: 'paywall',
        attrs: {
          title: '프리미엄 구독자 전용 콘텐츠입니다.',
          description: '모아가이드 구독으로 더 많은 콘텐츠를 만나보세요!',
          buttonText: '프리미엄 구독하기',
          info: '콘텐츠 이용권한이 없는 경우 여기까지만 확인 가능합니다.',
        },
      })
      .run();

    const { state, view } = editor;
    const { tr } = state;
    const endPosition = tr.selection.$to.pos;

    const newSelection = TextSelection.near(state.doc.resolve(endPosition));
    const newTr = tr.setSelection(newSelection);
    view.dispatch(newTr);
  };

  return (
    <button
      onClick={handleInsertPaywall}
      className="relative w-8 h-8 cursor-pointer hover:opacity-40"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 16v-21q0-33-23.5-56.5T720-720H240q-33 0-56.5 23.5T160-640v21q18-11 38-16t42-5Zm-74 130 445 108q9 2 18 0t17-8l139-116q-11-15-28-24.5t-37-9.5H240q-26 0-45.5 13.5T166-510Z" />
      </svg>
    </button>
  );
};

export default AddPaywall;
