import { CommonSectionProps, Paragraph } from '../commonSection';

/* 액션 정의 */
export interface Action {
  id: string;
  title: string;
  label?: string; // 버튼 텍스트
}

export interface TitleActions {
  coverButtons: Action[];
  editButtons: Action[];
  movingButtons: Action[];
}

/* 제목 섹션 타입 정의 */
export interface TitleSection extends CommonSectionProps {
  type: 'title';
  content: Paragraph[];
  // actions: TitleActions;
}
