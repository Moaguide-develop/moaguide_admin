import { FileSection } from './sectionProps/FileSection';
import { HorizontalLineSection } from './sectionProps/HorizontalLineSection';
import {
  LinkSection,
  OembedSection,
  OGLinkSection,
} from './sectionProps/LinkSection';
import { PaywallSection } from './sectionProps/paywallSection';
import { PhotoCaption, PhotoSection } from './sectionProps/PhotoSection';
import { QuoteSection } from './sectionProps/QuoteSection';
import { TableRow, TableSection } from './sectionProps/TableSction';
import { TextSection } from './sectionProps/TextSection';
import { TitleSection } from './sectionProps/TitleSection';

/* 공통 Props (모든 섹션에 포함되는 속성) */
export interface CommonSectionProps {
  id: string; // 고유 섹션 ID
  compid: string; // 데이터 컴포넌트 ID
  a11yTitle: string; // 접근성 타이틀
  type: SectionType; // 섹션 타입
}

/* 텍스트 단락 및 Span 정의 */
export interface Paragraph {
  id: string; // 단락 ID
  className?: string; // 단락 클래스
  style?: Record<string, string>;
  isList?: boolean; // 리스트 여부
  spans: Span[]; // 단락 내부의 Span 배열
}

export type textAlignment = 'left' | 'center' | 'right';

export interface Span {
  id: string; // Span ID
  style?: Record<string, string>; // 텍스트 스타일
  className: string; // Span 클래스
  content: string; // 텍스트 내용
  isBold?: boolean; // 볼드 여부
}

/* 섹션 타입 정의 */
export type SectionType =
  | 'title'
  | 'text'
  | 'quote'
  | 'horizontalLine'
  | 'paywall'
  | 'table'
  | 'photo'
  | 'oembed'
  | 'oglink'
  | 'link'
  | 'file';

/* 통합 섹션 타입 */
export type Section =
  | (TitleSection & { content: Paragraph[] })
  | (TextSection & { content: Paragraph[] })
  | (QuoteSection & { content: { quote: Paragraph[]; cite: Paragraph[] } })
  | (HorizontalLineSection & { content?: never })
  | (PaywallSection & { content: { title: string; description: string } })
  | (TableSection & { content: TableRow[] })
  | (PhotoSection & { content: { url: string; alt: string; caption?: PhotoCaption } })
  | (OembedSection & { content: { url: string; title?: string } })
  | (OGLinkSection & {
      content: {
        title: string;
        summary: string;
        url: string;
        thumbnail?: string;
      };
    })
  | (LinkSection & { content: { url: string } })
  | (FileSection & { content: { fileName: string; fileUrl: string } });

/* 툴바 버튼 정의 */
export interface ToolbarButton {
  name: string;
  label: string;
  icon: string;
  action: string;
  type?: SectionType;
}

export const toolbarSections: ToolbarButton[] = [
  {
    name: 'addQuote',
    label: '인용구',
    icon: '💬',
    action: 'addSection',
    type: 'quote',
  },
  {
    name: 'addHorizontalLine',
    label: '구분선',
    icon: '🔲',
    action: 'addSection',
    type: 'horizontalLine',
  },
  {
    name: 'addPaywall',
    label: '페이월',
    icon: '💰',
    action: 'addSection',
    type: 'paywall',
  },
  {
    name: 'addTable',
    label: '표',
    icon: '📋',
    action: 'addSection',
    type: 'table',
  },
  {
    name: 'addImage',
    label: '사진',
    icon: '🖼️',
    action: 'addSection',
    type: 'photo',
  },
  {
    name: 'addOembed',
    label: 'ombed 링크',
    icon: '🔗',
    action: 'addSection',
    type: 'oembed',
  },
  {
    name: 'addOgLink',
    label: '링크',
    icon: '🔗',
    action: 'addSection',
    type: 'oglink',
  },
  {
    name: 'addLink',
    label: 'sms링크',
    icon: '🔗',
    action: 'addSection',
    type: 'link',
  },
  {
    name: 'addFile',
    label: '파일',
    icon: '📁',
    action: 'fileUpload',
    type: 'file',
  },
];
