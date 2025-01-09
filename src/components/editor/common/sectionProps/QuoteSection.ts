import { CommonSectionProps, Paragraph } from '../commonSection';

/* 인용구 섹션 타입 정의 */
export interface QuoteContent {
  quote: Paragraph[];
  cite: Paragraph[];
}

export interface QuoteSection extends CommonSectionProps {
  type: 'quote';
  content: QuoteContent;
}
