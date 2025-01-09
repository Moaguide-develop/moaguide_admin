import { CommonSectionProps, Span } from '../commonSection';

export interface PhotoCaption {
  id: string;
  style?: Record<string, string>;
  spans: Span[];
}

export interface PhotoSection extends CommonSectionProps {
  type: 'photo';
  content: {
    url: string; // 사진 URL
    alt: string; // 대체 텍스트
    caption: PhotoCaption; // 사진 설명
  };
}
