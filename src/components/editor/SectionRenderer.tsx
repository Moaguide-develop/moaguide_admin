import React from 'react';
import { Paragraph, Section } from './common/commonSection';
import TitleSection from './sections/TitleSection';
import TextSection from './sections/TextSection';
import QuoteSection from './sections/QuoteSection';
import { QuoteContent } from './common/sectionProps/QuoteSection';
import HorizontalLineSection from './sections/HorizontalLineSection';
import PaywallSection from './sections/PaywallSection';
import TableSection from './sections/TableSection';
import PhotoSection from './sections/PhotoSection';
import OembedSection from './sections/OembedSection';
import OGLinkSection from './sections/OGLinkSection';
import FileSection from './sections/FileSection';
import LinkSection from './sections/SMSLinkSection';

interface SectionRendererProps {
  section: Section;
  onUpdate: (id: string, content: Paragraph[] | QuoteContent) => void;
  onEnter: (id:string) => void;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  onUpdate,
  onEnter,
}) => {
  const handleUpdate = (updatedContent: any) => {
    onUpdate(section.id, updatedContent);
  };

  switch (section.type) {
    // case 'title':
    //   return (
    //     <TitleSection
    //       id={section.id}
    //       compid={section.compid}
    //       a11yTitle={section.a11yTitle}
    //       content={section.content}
    //       // actions={section.actions}
    //       onUpdate={handleUpdate}
    //     />
    //   );

    case 'text':
      return (
        <TextSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
          onUpdate={handleUpdate}
          onEnter={onEnter}
        />
      );

    case 'quote':
      return (
        <QuoteSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
          onUpdate={handleUpdate}
        />
      );

    case 'horizontalLine':
      return (
        <HorizontalLineSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          styleType={section.styleType}
        />
      );

    case 'paywall':
      return (
        <PaywallSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
        />
      );

    case 'table':
      return (
        <TableSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
          onUpdate={handleUpdate}
        />
      );

    case 'photo':
      return (
        <PhotoSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
          onUpdate={handleUpdate}
        />
      );

    case 'oembed':
      return (
        <OembedSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
          onUpdate={handleUpdate}
        />
      );

    case 'oglink':
      return (
        <OGLinkSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
          onUpdate={handleUpdate}
        />
      );

    case 'link':
      return (
        <LinkSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
          onUpdate={handleUpdate}
          type={section.type}
        />
      );

    case 'file':
      return (
        <FileSection
          id={section.id}
          compid={section.compid}
          a11yTitle={section.a11yTitle}
          content={section.content}
          onUpdate={handleUpdate}
          type={section.type}
        />
      );

    default:
      return null;
  }
};

export default SectionRenderer;
