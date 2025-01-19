import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import ToolBar from './toolbar/Toolbar';
import extractPaywallData from './common/extractPaywallData';
import { authors, types, categories } from '../../types/options';
import SelectComponent from './SelectComponent';
import CustomToolbar from './toolbar/CustomToolbar';

// Tiptap 기본 확장
import StarterKit from '@tiptap/starter-kit';
import Focus from '@tiptap/extension-focus';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { getLinkOptions } from './common/Link';

// List Extension
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

// Custom Extension
import CustomPaywall from './customComponent/CustomPaywall';
// import CustomPhoto from './customComponent/CustomPhoto';
import CustomFile from './customComponent/CustomFile';

const Editor = ({ content }: { content: string }) => {
  const [renderedHtml, setRenderedHtml] = useState<{
    paywallUp: string;
    paywallDown: string;
  } | null>(null);

  const [articleData, setArticleData] = useState({
    title: '',
    authorName: '모아가이드',
    categoryName: 'none',
    type: 'all',
    isPremium: false,
    imageLink: '',
    paywallUp: '',
    paywallDown: '',
  });
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        blockquote: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal',
        },
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),

      // 텍스트
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Placeholder.configure({
        placeholder: '내용을 입력하세요.',
      }),
      TextStyle,
      Underline,
      Highlight,
      TextAlign.configure({
        types: ['paragraph', 'image', 'blockquote'],
      }),
      Blockquote,

      // 커스텀 콘텐츠
      Link.configure(getLinkOptions()),
      Image,
      // CustomPhoto,
      CustomFile,
      CustomPaywall,
      Table.configure({ resizable: true }),
      TableHeader,
      TableRow,
      TableCell,
    ],
  });

  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content, editor?.commands]);

  const handleSave = () => {
    if (!editor) return;

    const { isPremium, paywallUp, paywallDown, imageLink } =
      extractPaywallData(editor);

    const updatedData = {
      ...articleData,
      isPremium,
      paywallUp,
      paywallDown,
      imageLink,
    };
    setArticleData(updatedData);
    console.log(updatedData);
    setRenderedHtml({ paywallUp, paywallDown });
    console.log('Paywall Up:', renderedHtml?.paywallUp);
    console.log('Paywall Down:', renderedHtml?.paywallDown);
  };

  const values = {
    authorName: articleData.authorName,
    type: articleData.type,
    categoryName: articleData.categoryName,
  };

  const handleSelectChange = (key: string, value: string) => {
    setArticleData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <SelectComponent
        data={[
          { label: '작성자', value: 'authorName', options: authors },
          { label: '콘텐츠', value: 'type', options: types },
          { label: '카테고리', value: 'categoryName', options: categories },
        ]}
        values={values}
        onChange={handleSelectChange}
      />
      <div className="my-4 space-x-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          저장하기
        </button>
      </div>
      <div className="border-2">
        <CustomToolbar editor={editor} />
        <ToolBar editor={editor} />
        <div className="p-6">
          <h1 className="p-4 pl-20 border-b-2 border-b-gray-200">
            <input
              type="text"
              className="w-full text-2xl font-bold"
              placeholder="제목"
              value={articleData.title}
              onChange={(e) =>
                setArticleData({ ...articleData, title: e.target.value })
              }
            />
          </h1>
          <EditorContent
            id="tiptap"
            editor={editor}
            onClick={() => editor?.commands.focus()}
            className="w-full p-4 "
          />
          
        </div>

        {renderedHtml && (
          <div className="border-t-2 border-gray-200 p-2">
            <h3>Paywall Up:</h3>
            <div dangerouslySetInnerHTML={{ __html: renderedHtml.paywallUp }} />
            <h3>Paywall Down:</h3>
            <div
              dangerouslySetInnerHTML={{ __html: renderedHtml.paywallDown }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Editor;
