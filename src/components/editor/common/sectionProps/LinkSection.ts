import { CommonSectionProps } from "../commonSection";

export interface OembedSection extends CommonSectionProps {
  type: 'oembed';
  content: {
    url: string; // 임베드 URL
    title: string; // 임베드된 콘텐츠의 제목
  };
}

export interface OGLinkSection extends CommonSectionProps {
  type: 'oglink';
  content: {
    title: string; // 링크 제목
    summary: string; // 링크 요약
    url: string; // 링크 URL
    thumbnail: string; // 썸네일 이미지 URL
  };
}

export interface LinkSection extends CommonSectionProps {
  type: 'link';
  content: {
    title: string; // 링크 제목
    summary: string; // 링크 요약
    url: string; // 링크 URL
    thumbnail: string; // 썸네일 이미지 URL
  };
}
