import { CommonSectionProps } from "../commonSection";

// src/common/sectionProps/FileSection.ts
export interface FileSectionContent {
  id: string;
  fileName: string;
  fileUrl: string;
}

export interface FileSection extends CommonSectionProps {
  type: 'file';
  content: FileSectionContent;
}
