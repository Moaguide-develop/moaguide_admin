import { CommonSectionProps, Paragraph } from '../commonSection';

/* 본문 섹션 타입 정의 */
export interface TextSection extends CommonSectionProps {
  type: 'text';
  content: Paragraph[];
}
