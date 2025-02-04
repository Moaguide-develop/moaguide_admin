import { useEffect, useState } from 'react';
import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import ToolBar from './toolbar/Toolbar';
import extractPaywallData from './common/extractPaywallData';
import { authors, types, categories } from '../../types/options';
import SelectComponent from './SelectComponent';
import CustomToolbar from './toolbar/CustomToolbar';
import { saveArticle } from '../../api/article';
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';

import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import History from '@tiptap/extension-history';
import HardBreak from '@tiptap/extension-hard-break';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Focus from '@tiptap/extension-focus';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TableRow from '@tiptap/extension-table-row';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

import CustomPaywall from './customComponent/CustomPaywall';
import CustomPhoto from './customComponent/CustomPhoto';
import CustomFile from './customComponent/CustomFile';
import PreviewComponent from './PreviewComponrnt';
import SelectMenu from './toolbar/SelectMenu';
import CustomLink from './customComponent/CustomLink';
import CustomDivider from './customComponent/CustomDivider';
import CustomParagraph from './customComponent/CustomParagraph';
import CustomHighlight from './customComponent/CustomHighlight';
import { CustomBlock } from './customComponent/CustomBlock';
import CustomLine from './customComponent/CustomLine';
import CustomQuota from './customComponent/CustomQuote';
import CustomBlockQuotation from './customComponent/CustomBlockQuote';
import CustomPhotoStrip from './customComponent/CustomPhotoStrip';
import CustomVerticalLink from './customComponent/CustomVerticalLink';
import CustomOgLink from './customComponent/CustomOgLink';

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
      Document.configure({
        content: 'customBlock+',
      }),
      History,
      HardBreak,
      Dropcursor,
      Gapcursor,
      Bold,
      Italic,
      Strike,
      Underline,
      Text,
      TextStyle,
      ListItem,
      BulletList.configure({
        keepAttributes: true,
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
        mode: 'shallowest',
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Placeholder.configure({
        placeholder: '내용을 입력하세요.',
      }),
      CustomHighlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['paragraph', 'image', 'blockquote', 'horizontal_rule', 'file'],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse w-full table-fixed overflow-hidden',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class:
            'bg-[rgba(61,37,20,0.05)] border border-[rgba(61,37,20,0.12)] box-border min-w-[1em] px-2 py-1 relative align-middle',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'h-10',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class:
            'border border-[rgba(61,37,20,0.12)] box-border min-w-[1em] px-2 py-1 relative align-middle',
        },
      }),

      CustomBlock,
      CustomParagraph,
      CustomDivider,
      CustomLine,
      CustomQuota,
      CustomBlockQuotation,
      CustomLink,
      CustomVerticalLink,
      CustomOgLink,
      CustomPhoto,
      CustomPhotoStrip,
      CustomFile,
      CustomPaywall,
    ],
    content: `<div class="se-component se-text se-l-default">
      <div class="component-text mt-10">
        <p></p>
      </div>
    </div>`,
    editorProps: {
      handlePaste(view, event) {
        const html = event.clipboardData?.getData('text/html');
        console.log('html', html);
        if (html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const body = doc.body;
          console.log('body', body);
          body.innerHTML = body.innerHTML.replace(/\uFEFF/g, '').trim();

          body.querySelectorAll('span[data-input-buffer]').forEach((span) => {
            span.remove();
          });

          body
            .querySelectorAll('.se-section-quotation .se-cite')
            .forEach((citeElement) => {
              const citationText = citeElement.textContent?.trim();
              if (citationText === '출처 입력') {
                citeElement.remove();
              }
            });

          body
            .querySelectorAll('.se-table-control')
            .forEach((controlBarElement) => {
              controlBarElement.remove();
            });

          body.querySelectorAll('table').forEach((tableElement) => {
            tableElement.querySelectorAll('tr').forEach((trElement, index) => {
              if (index === 0) {
                trElement.querySelectorAll('td').forEach((tdElement) => {
                  const thElement = document.createElement('th');
                  thElement.innerHTML = tdElement.innerHTML;
                  trElement.replaceChild(thElement, tdElement);
                });
              }
            });
          });
          body
            .querySelectorAll('.se-cell-context-menu')
            .forEach((controlBarElement) => {
              controlBarElement.remove();
            });

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
      <div className="border-2 w-full overflow-y-auto flex flex-col">
        <CustomToolbar editor={editor} />
        <ToolBar editor={editor} />
        <div className="overflow-y-auto">
          <div className="px-6 max-w-[1000px] mx-auto">
            <div className="pt-10 pb-[435px]">
              <div className="px-6">
                <h1 className="p-4">
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

                <hr className="mx-4 px-2 border-b-2 border-b-gray-200" />
              </div>
              <EditorContent
                id="tiptap"
                editor={editor}
                onClick={() => editor?.commands.focus()}
                className="w-full px-10 pt-4"
              />
            </div>
          </div>
          <SelectMenu editor={editor} />
          {showPreview && (
            <PreviewComponent
              articleData={articleData}
              onConfirm={handleSave}
              onCancel={() => setShowPreview(false)}
              editor={editor}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;
