import React, { useState } from 'react';
import { EditorState, Modifier, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CustomEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 에디터 상태 변경 핸들러
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  // 커스텀 블록 삽입
  const insertCustomBlock = () => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    // Entity 생성
    const contentStateWithEntity = contentState.createEntity('CUSTOM_BLOCK', 'IMMUTABLE', {
      title: 'Custom Block Title',
      content: 'This is custom block content.',
    });

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    // 텍스트와 Entity를 삽입
    const newContentState = Modifier.insertText(
      contentStateWithEntity,
      selectionState,
      ' [Custom Block] ',
      undefined,
      entityKey
    );

    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
    setEditorState(newEditorState);
  };

  const handleContentSave = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);
    console.log('HTML Output:', htmlContent);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <div className="w-full max-w-4xl border rounded-md bg-white shadow-md">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbarCustomButtons={[
            <button
              key="customBlockButton"
              onClick={insertCustomBlock}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Custom Block
            </button>,
          ]}
          toolbar={{
            options: [
              'inline', 'blockType', 'fontSize', 'fontFamily',
              'list', 'textAlign', 'colorPicker', 'link', 'embedded',
              'image', 'remove', 'history',
            ],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
            blockType: {
              options: ['Normal', 'Blockquote', 'Code', 'H1', 'H2', 'H3'],
            },
            list: { options: ['unordered', 'ordered'] },
            textAlign: { options: ['left', 'center', 'right', 'justify'] },
            colorPicker: {
              colors: [
                'rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)',
              ],
            },
          }}
        />
      </div>

      <button
        onClick={handleContentSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Save Content
      </button>
    </div>
  );
};

export default CustomEditor;
