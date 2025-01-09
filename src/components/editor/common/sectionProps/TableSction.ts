import { CommonSectionProps, Paragraph } from "../commonSection";

/* 테이블 셀 */
export interface TableCell {
  id: string;
  content: Paragraph[];
  colspan?: number;
  rowspan?: number;
  style?: Record<string, string>;
}

/* 테이블 행 */
export interface TableRow {
  id: string;
  cells: TableCell[];
}

/* 테이블 섹션 */
export interface TableSection extends CommonSectionProps {
  type: 'table';
  content: TableRow[];
}
