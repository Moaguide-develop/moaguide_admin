import React, { useEffect, useState } from 'react';
import CustomToolbar from './CustomToolbar';
import { v4 as uuidv4 } from 'uuid';
import SectionRenderer from './SectionRenderer';
import { Paragraph, Section, SectionType, Span } from './common/commonSection';
import { saveSection } from '../../utils/aticleSave';
import { Options } from '../../utils/aticleOptions';
import { generateHtmlForSection } from './common/generateHtmlForSection';
import {
  // createTitleSection,
  createTextSection,
  createQuoteSection,
  createHorizontalLineSection,
  createPaywallSection,
  createTableSection,
  createPhotoSection,
  createOembedSection,
  createOGLinkSection,
  createFileSection,
  createLinkSection,
} from './common/initialSections';
import { parseHtmlToSections } from './common/htmlToSection';
import { addFile } from '../../api/file';
import Toolbar from './Toolbar';

const Editor: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([
    // createTitleSection(), // 초기 제목 섹션
    createTextSection(), // 초기 본문 섹션
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [renderedHtml, setRenderedHtml] = useState<{
    paywallUp: string;
    paywallDown: string;
  } | null>(null);

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );
  const [focusId, setFocusId] = useState<string | null>(null); // 포커스 이동용 상태
  // const [isUploading, setIsUploading] = useState(false); // 파일 업로드 로딩 상태

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedHtml = event.clipboardData.getData('text/html');
    const pastedText = event.clipboardData.getData('text/plain'); // 텍스트 데이터도 가져오기
    // 현재 포커스된 요소 확인
    const activeElement = document.activeElement;
    console.log('HTML 데이터:', pastedHtml);
    console.log('텍스트 데이터:', pastedText);
    if (activeElement && activeElement.id === 'title-input') {
      // 제목 필드에 붙여넣기 처리
      setTitle((prevTitle) => prevTitle + pastedText);
    } else {
      // 본문 섹션 붙여넣기 처리
      if (pastedHtml) {
        const newSections = parseHtmlToSections(pastedHtml);
        setSections(newSections);
      } else if (pastedText) {
        console.warn('HTML 데이터가 없으므로 텍스트로 처리합니다.');
        const newSections = parseHtmlToSections(`<p>${pastedText}</p>`);
        setSections(newSections);
      } else {
        console.error('붙여넣을 수 있는 데이터가 없습니다.');
      }
    }
  };

  const addSection = (action: string, type?: SectionType) => {
    if (action === 'addSection' && type) {
      if (
        type === 'paywall' &&
        sections.some((section) => section.type === 'paywall')
      ) {
        alert('페이월 설정은 한번만 가능합니다.');
        return;
      }
      const newSection: Section = (() => {
        switch (type) {
          case 'quote':
            return createQuoteSection();
          case 'horizontalLine':
            return createHorizontalLineSection();
          case 'paywall':
            return createPaywallSection();
          case 'table':
            return createTableSection();
          case 'photo':
            return createPhotoSection();
          case 'oembed':
            return createOembedSection();
          case 'oglink':
            return createOGLinkSection();
          case 'link':
            return createLinkSection();
          case 'file':
            return createFileSection();
          default:
            throw new Error(`Unsupported section type: ${type}`);
        }
      })();

      setSections((prev) => [...prev, newSection]);
    }
    if (action === 'fileUpload') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf'; // PDF 파일만, */*은 모든 파일
      input.onchange = async (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        // setIsUploading(true); // 로딩 시작
        try {
          const fileId = await addFile(file);
          const fileSection = createFileSection();
          fileSection.content.fileName = file.name;
          fileSection.content.fileUrl = fileId;
          console.log('업로드된 파일:', file);
          console.log('업로드된 파일 URL:', fileId);
          console.log('업로드된 파일 이름:', file.name);
          setSections((prev) => [...prev, fileSection]);
        } catch (error) {
          console.error(error);
          alert('파일 업로드에 실패했습니다.');
        }
        // finally {
        //   setIsUploading(false); // 로딩 종료
        // }
      };

      input.click();
    }
  };

  const updateSection = (id: string, updatedContent: any) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? {
              ...section,
              content: updatedContent,
            }
          : section,
      ),
    );
  };

  const saveSections = () => {
    let isPremium = false;
    let imageLink = '';
    let summary = '';
    let paywallUp = '';
    let paywallDown = '';

    const htmlString = sections
      .map((section) => {
        const { id, type, content } = section;
        return generateHtmlForSection(id, type, content);
      })
      .filter((html) => html !== null)
      .join('');

    // Paywall 분리 처리
    if (sections.some((section) => section.type === 'paywall')) {
      const paywallIndex = sections.findIndex(
        (section) => section.type === 'paywall',
      );

      const upperSections = sections.slice(0, paywallIndex);
      paywallUp = upperSections
        .map((section) => {
          const { id, type, content } = section;
          return generateHtmlForSection(id, type, content);
        })
        .join('');

      const lowerSections = sections.slice(paywallIndex + 1);
      paywallDown = lowerSections
        .map((section) => {
          const { id, type, content } = section;
          return generateHtmlForSection(id, type, content);
        })
        .join('');
    } else {
      paywallUp = htmlString;
      paywallDown = '';
    }

    summary = sections
      .filter((section) => section.type === 'text')
      .map((section) =>
        section.content
          .map((paragraph: Paragraph) =>
            paragraph.spans.map((span: Span) => span.content).join(''),
          )
          .join(''),
      )
      .join(' ')
      .slice(0, 100);

    const savedData: saveSection = {
      title,
      authorName: '모아가이드',
      category: selectedCategory,
      type: selectedType,
      isPremium,
      imageLink,
      summary,
      paywallUp,
      paywallDown,
    };

    console.log('저장된 데이터:', JSON.stringify(savedData, null, 2));
    setRenderedHtml({ paywallUp, paywallDown });
  };

  const applyStyleToSelectedSection = (
    className: Partial<Paragraph['className']>,
  ) => {
    if (!selectedSectionId) {
      alert('먼저 섹션을 선택하세요!');
      return;
    }

    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === selectedSectionId && section.type === 'text') {
          return {
            ...section,
            content: section.content.map((paragraph: Paragraph) => ({
              ...paragraph,
              className: className,
            })),
          };
        }
        return section;
      }),
    );
  };
  
  const applyBoldStyle = (spanId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === selectedSectionId && section.type === 'text') {
          return {
            ...section,
            content: section.content.map((paragraph) => ({
              ...paragraph,
              spans: paragraph.spans.map((span) =>
                span.id === spanId ? { ...span, isBold: !span.isBold } : span
              ),
            })),
          };
        }
        return section;
      })
    );
  };

  const applyListStyle = (paragraphId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === selectedSectionId && section.type === 'text') {
          return {
            ...section,
            content: section.content.map((paragraph) =>
              paragraph.id === paragraphId
                ? { ...paragraph, isList: !paragraph.isList }
                : paragraph
            ),
          };
        }
        return section;
      })
    );
  };

  const addNewParagraph = (selectedSectionId: string) => {
    const newParagraph: Paragraph = {
      id: `SE-${uuidv4()}`,
      style: {},
      spans: [{ id: `SE-${uuidv4()}`, content: '', className: '' }],
    };

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === selectedSectionId && section.type === 'text'
          ? {
              ...section,
              content: [
                ...section.content.map((paragraph) => paragraph),
                newParagraph,
              ],
            }
          : section,
      ),
    );

    setFocusId(newParagraph.spans[0].id); // 새로 생성된 Span ID로 포커스 설정
  };

  useEffect(() => {
    if (focusId) {
      const element = document.getElementById(focusId);
      if (element) {
        element.focus(); // 새 단락으로 포커스 이동
      }
    }
  }, [focusId]); // focusId가 변경될 때마다 실행

  return (
    <>
      <div className="w-full flex justify-between p-2">
        <div className="justify-start p-2">
          <button className="bg-gray-300 text-gray-800">Cancel</button>
          <button onClick={saveSections} className="bg-green-500 text-white">
            Save
          </button>
        </div>
        <div className="justify-end p-2">
          <div className="">
            {Options.type.map((type) => (
              <button
                key={type.value}
                className={`mr-2 border-gray-100 ${selectedType === type.value ? 'bg-blue-300' : ''}`}
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="">
            {Options.category.map((category) => (
              <button
                key={category.value}
                className={`mr-2 ${selectedCategory === category.value ? 'bg-blue-300' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="flex-1 relative max-h-[calc(100%-44px)]"
        onPaste={handlePaste}
      >
        <CustomToolbar onAction={addSection} />
        <Toolbar
          onApplyStyle={applyStyleToSelectedSection}
        />
        <div className="flex-1 my-4 overflow-y-auto p-2">
          <div className="p-4">
            <textarea
              id="title-input" // 제목 필드의 고유 ID
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full text-4xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => setSelectedSectionId(section.id)} // 섹션 클릭 시 선택
              style={{
                border:
                  section.id === selectedSectionId ? '2px solid blue' : '',
                padding: '10px',
                margin: '5px 0',
              }}
            >
              <SectionRenderer
                key={section.id}
                section={section}
                onUpdate={updateSection}
                onEnter={() => addNewParagraph(section.id)}
              />
            </div>
          ))}
        </div>
      </div>
      {renderedHtml && (
        <div className="border-t-2 border-gray-200 p-2">
          <h3>Paywall Up:</h3>
          <div dangerouslySetInnerHTML={{ __html: renderedHtml.paywallUp }} />
          <h3>Paywall Down:</h3>
          <div dangerouslySetInnerHTML={{ __html: renderedHtml.paywallDown }} />
        </div>
      )}
    </>
  );
};

export default Editor;
