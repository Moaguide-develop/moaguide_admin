import { useEffect, useState } from 'react';
import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import ToolBar from './toolbar/Toolbar';
import extractPaywallData from './common/extractPaywallData';
import { authors, types, categories } from '../../types/options';
import SelectComponent from './SelectComponent';
import CustomToolbar from './toolbar/CustomToolbar';
import { saveArticle } from '../../api/article';
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';

// Tiptap 기본 확장
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
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
import Link from '@tiptap/extension-link';
// List Extension
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

// Custom Extension
import { getLinkOptions } from './common/Link';
import CustomPaywall from './customComponent/CustomPaywall';
import CustomPhoto from './customComponent/CustomPhoto';
import CustomFile from './customComponent/CustomFile';
import PreviewComponent from './PreviewComponrnt';
import SelectMenu from './toolbar/SelectMenu';

const Editor = ({ content }: { content: JSONContent[] | null }) => {
  const [articleData, setArticleData] = useState({
    title: '',
    authorName: '모아가이드',
    categoryName: 'none',
    type: 'all',
    isPremium: false,
    imageLink: '테스트',
    paywallUp: '',
    paywallDown: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        horizontalRule: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class:
            'mb-4 text-black text-[15px] font-[Pretendard] leading-[30.80px] tracking-wide',
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'my-4 border-b-1 border-gray-200',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc px-6',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal px-6',
        },
      }),
      Focus.configure({
        className: 'rounded-3 border border-blue-500',
        mode: 'all',
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Placeholder.configure({
        placeholder: '내용을 입력하세요.',
      }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['paragraph', 'image', 'blockquote', 'horizontal_rule', 'file'],
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-3 border-gray-300 pl-4 m-6',
        },
      }),
      Link.configure(getLinkOptions()),
      Table.configure({
        resizable: true,
      }),
      TextStyle,
      Underline,
      TableHeader,
      TableRow,
      TableCell,
      
      // 커스텀 콘텐츠
      CustomPhoto,
      CustomFile,
      CustomPaywall,
    ],
    editorProps: {
      handlePaste(view, event) {
        const html = event.clipboardData?.getData('text/html');
        console.log(html);
        if (html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const body = doc.body;

          const fragment = ProseMirrorDOMParser.fromSchema(
            view.state.schema,
          ).parse(body);

          const transaction = view.state.tr.replaceSelectionWith(fragment);
          view.dispatch(transaction);
          return true;
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (content && editor?.commands) {
      editor?.commands.setContent(content);
    }
  }, [content, editor]);

  const handleSavePreview = () => {
    if (!editor) return;

    const { isPremium, paywallUp, paywallDown, imageLink } =
      extractPaywallData(editor);

    setArticleData((prev) => ({
      ...prev,
      isPremium,
      paywallUp,
      paywallDown,
      imageLink,
    }));

    setShowPreview(true);
  };

  const handleSave = () => {
    setShowPreview(false);
    saveArticle(articleData);
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
        {editor && (
          <button
            onClick={handleSavePreview}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            미리보기
          </button>
        )}
      </div>
      <div className="border-2">
        <CustomToolbar editor={editor} />
        <ToolBar editor={editor} />
        <div className="p-6">
          <h1 className="p-4 pl-20 border-b-2 border-b-gray-200">
            <input
              type="text"
              className="w-full text-[40px] font-bold font-['Pretendard'] leading-[56px]"
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
            className="w-full p-4"
          />
          <SelectMenu editor={editor} />
        </div>
        {showPreview && (
          <PreviewComponent
            articleData={articleData}
            onConfirm={handleSave}
            onCancel={() => setShowPreview(false)}
            editor={editor}
          />
        )}
      </div>
    </>
  );
};

export default Editor;
