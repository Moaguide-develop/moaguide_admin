import { CommonSectionProps } from '../commonSection';

export type LineType = 'line1' | 'default';

export interface HorizontalLineSection extends CommonSectionProps {
  type: 'horizontalLine';
  styleType: LineType;
}
