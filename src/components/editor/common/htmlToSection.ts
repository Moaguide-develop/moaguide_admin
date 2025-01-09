import { Paragraph, Section } from './commonSection';
import {
  createTitleSection,
  createTextSection,
  createQuoteSection,
  createHorizontalLineSection,
  createPaywallSection,
  createTableSection,
  createPhotoSection,
  createOembedSection,
  createOGLinkSection,
  createFileSection,
  createLinkSection,
} from './initialSections';

/**
 * HTML 문자열을 섹션 배열로 변환하는 함수
 * @param htmlString HTML 문자열
 * @returns 섹션 배열
 */

// 스타일 속성을 kebab-case에서 camelCase로 변환
const convertStyleToCamelCase = (
  styleString: string,
): Record<string, string> => {
  return styleString
    ? Object.fromEntries(
        styleString
          .split(';')
          .map((style) => {
            const [key, value] = style.split(':').map((s) => s.trim());
            if (!key || !value) return null;
            const camelCaseKey = key
              .split('-')
              .map((part, index) =>
                index === 0
                  ? part
                  : part.charAt(0).toUpperCase() + part.slice(1),
              )
              .join('');
            return [camelCaseKey, value];
          })
          .filter((entry): entry is [string, string] => !!entry),
      )
    : {};
};

export const parseHtmlToSections = (htmlString: string): Section[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const sections: Section[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      // 제목 섹션 처리
      // if (element.classList.contains('se-documentTitle')) {
      //   const titleSection = createTitleSection();
      //   titleSection.content = Array.from(element.querySelectorAll('p')).map(
      //     (p, pIndex) => {
      //       const spans = Array.from(p.querySelectorAll('span')).map(
      //         (span, spanIndex) => ({
      //           id: span.id || `${titleSection.id}-span-${pIndex}-${spanIndex}`,
      //           className: span.className,
      //           style: convertStyleToCamelCase(span.style.cssText || ''), // 스타일 변환
      //           content: span.textContent || '',
      //         }),
      //       );
      //       return {
      //         id: p.id || `${titleSection.id}-content-${pIndex}`,
      //         className: p.className,
      //         style: convertStyleToCamelCase(p.style.cssText || ''), // 스타일 변환
      //         spans,
      //       };
      //     },
      //   );
      //   sections.push(titleSection);
      // }

      // 텍스트 섹션 처리
     if (element.classList.contains('se-text')) {
        const textSection = createTextSection();

        textSection.content = Array.from(element.querySelectorAll('p')).map(
          (p, pIndex) => {
            // TailwindCSS 클래스 매핑
            const tailwindStyle = p.classList.contains(
              'se-text-paragraph-align-center',
            )
              ? 'text-center'
              : p.classList.contains('se-text-paragraph-align-right')
                ? 'text-right'
                : 'text-left';

            const spans = Array.from(p.querySelectorAll('span')).map(
              (span, spanIndex) => ({
                id: span.id || `${textSection.id}-span-${pIndex}-${spanIndex}`,
                className: span.className,
                style: convertStyleToCamelCase(span.style.cssText || ''), // 스타일 변환
                content: span.textContent || '',
              }),
            );
            return {
              id: p.id || `${textSection.id}-content-${pIndex}`,
              className: tailwindStyle,
              style: convertStyleToCamelCase(p.style.cssText || ''), // 스타일 변환
              spans,
            };
          },
        );
        sections.push(textSection);
      }

      // 인용구 섹션 처리
      else if (element.classList.contains('se-quotation')) {
        const quoteSection = createQuoteSection();

        // Quote 처리
        const quote = element.querySelector('.se-quote');
        if (quote) {
          quoteSection.content.quote = Array.from(
            quote.querySelectorAll('p'),
          ).map((p, pIndex) => {
            const spans = Array.from(p.querySelectorAll('span')).map(
              (span, spanIndex) => ({
                id:
                  span.id || `${quoteSection.id}-quote-${pIndex}-${spanIndex}`,
                className: span.className,
                style: convertStyleToCamelCase(span.style.cssText || ''), // 스타일 변환
                content: span.textContent || '',
              }),
            );

            return {
              id: p.id || `${quoteSection.id}-quote-${pIndex}`,
              className: p.className,
              style: convertStyleToCamelCase(p.style.cssText || ''), // 스타일 변환
              spans,
            };
          });
        }

        // Cite 처리
        // const cite = element.querySelector('.se-cite');
        // if (cite) {
        //   quoteSection.content.cite = Array.from(
        //     cite.querySelectorAll('p'),
        //   ).map((p, pIndex) => {
        //     const spans = Array.from(p.querySelectorAll('span')).map(
        //       (span, spanIndex) => ({
        //         id: span.id || `${quoteSection.id}-cite-${pIndex}-${spanIndex}`,
        //         className: span.className,
        //         style: convertStyleToCamelCase(span.style.cssText || ''), // 스타일 변환
        //         content: span.textContent || '',
        //       }),
        //     );

        //     return {
        //       id: p.id || `${quoteSection.id}-cite-${pIndex}`,
        //       className: p.className,
        //       style: convertStyleToCamelCase(p.style.cssText || ''), // 스타일 변환
        //       spans,
        //     };
        //   });
        // }

        sections.push(quoteSection);
      }

      // 구분선 섹션 처리
      else if (element.classList.contains('se-horizontalLine')) {
        const horizontalLineSection = createHorizontalLineSection();
        sections.push(horizontalLineSection);
      }

      // 페이월 섹션 처리
      else if (element.classList.contains('se-custom')) {
        const paywallSection = createPaywallSection();
        sections.push(paywallSection);
      }

      // 표 섹션 처리
      else if (element.classList.contains('se-table')) {
        const tableSection = createTableSection();
        const rows = element.querySelectorAll('tr');
        tableSection.content = Array.from(rows).map((row, rowIndex) => {
          const cells = row.querySelectorAll('td, th');
          return {
            id: `${tableSection.id}-row${rowIndex + 1}`,
            cells: Array.from(cells).map((cell, cellIndex) => ({
              id: `${tableSection.id}-row${rowIndex + 1}-cell${cellIndex + 1}`,
              className: '__se-unit se-cell',
              content: [
                {
                  id: `${tableSection.id}-row${rowIndex + 1}-cell${cellIndex + 1}-paragraph`,
                  className: 'se-text-paragraph se-text-paragraph-align-left',
                  style: {},
                  spans: [
                    {
                      id: `${tableSection.id}-row${rowIndex + 1}-cell${cellIndex + 1}-span`,
                      className: 'se-ff-system se-fs15 __se-node',
                      content: cell.innerHTML || '',
                    },
                  ],
                },
              ],
            })),
          };
        });
        sections.push(tableSection);
      }

      // 사진 섹션 처리
      else if (element.classList.contains('se-image')) {
        const photoSection = createPhotoSection();
        photoSection.content.url =
          element.querySelector('img')?.getAttribute('src') || '';
        photoSection.content.alt =
          element.querySelector('img')?.getAttribute('alt') || '';
        sections.push(photoSection);
      }

      // 나란히 놓은 사진 섹션 처리
      // else if (
      //   element.classList.contains('se-imageStrip')
      // ) {
      //   const photoSection = createPhotoSection();
      //   photoSection.content.url = element.querySelector('img')?.getAttribute('src') || '';
      //   photoSection.content.alt = element.querySelector('img')?.getAttribute('alt') || '';
      //   sections.push(photoSection);
      // }

      // 임베드 섹션 처리
      else if (element.classList.contains('se-oembed')) {
        const oembedSection = createOembedSection();
        oembedSection.content.url =
          element.querySelector('iframe')?.getAttribute('src') || '';
        oembedSection.content.title =
          element.querySelector('iframe')?.getAttribute('title') || '';
        sections.push(oembedSection);
      }

      // OGLink 섹션 처리
      else if (element.classList.contains('se-oglink')) {
        const ogLinkSection = createOGLinkSection();
        ogLinkSection.content.title =
          element.querySelector('strong')?.textContent || '';
        ogLinkSection.content.summary =
          element.querySelector('p')?.textContent || '';
        ogLinkSection.content.url =
          element.querySelector('.se-oglink-url')?.textContent || '';
        const thumbnailSrc =
          element.querySelector('img')?.getAttribute('src') || '';
        const match = thumbnailSrc.match(/src=%22(.*?)%22/);
        ogLinkSection.content.thumbnail = match
          ? decodeURIComponent(match[1])
          : '';
        sections.push(ogLinkSection);
      }

      // link 섹션 처리
      else if (element.classList.contains('se-l-vertical_image')) {
        const linkSection = createLinkSection();
        linkSection.content.title =
          element.querySelector('strong')?.textContent || '';
        linkSection.content.summary =
          element.querySelector('p')?.textContent || '';
        linkSection.content.url =
          element.querySelector('.se-oglink-url')?.textContent || '';
        const thumbnailSrc =
          element.querySelector('img')?.getAttribute('src') || '';
        const match = thumbnailSrc.match(/src=%22(.*?)%22/);
        linkSection.content.thumbnail = match
          ? decodeURIComponent(match[1])
          : '';
        sections.push(linkSection);
      }

      // 파일 섹션 처리
      else if (element.classList.contains('se-file')) {
        const fileSection = createFileSection();
        fileSection.content.fileName =
          element.querySelector('.se-file-name')?.textContent || '';
        fileSection.content.fileUrl =
          element.querySelector('a')?.getAttribute('href') || '';
        sections.push(fileSection);
      }
    }
  });
  return sections;
};
