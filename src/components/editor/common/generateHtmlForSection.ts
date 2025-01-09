import { Paragraph, SectionType, Span } from './commonSection';

// 유틸리티 함수: CamelCase 스타일을 KebabCase로 변환
const convertCamelCaseToKebab = (styleObj: Record<string, string>): string =>
  Object.entries(styleObj)
    .map(
      ([key, value]) =>
        `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`,
    )
    .join(' ');

export const generateHtmlForSection = (
  id: string,
  type: SectionType,
  content: any,
): string => {
  switch (type) {
    case 'title': {
      const titleContent =
        content[0]?.spans?.map((span: Span) => span.content).join('') || '';
      return `<div class="" id="${id}">${titleContent}</div>`;
    }

    case 'text': {
      const textHtml = content
        .map(
          (paragraph: Paragraph) => `
                      <p id="${paragraph.id}" class="${paragraph.className}" style="${convertCamelCaseToKebab(paragraph.style || {})}">
                          ${paragraph.spans
                            .map(
                              (span) =>
                                `<span id="${span.id}" class="${span.className}" style="${convertCamelCaseToKebab(span.style || {})}">${span.content}</span>`,
                            )
                            .join('')}
                      </p>`,
        )
        .join('');
      return `<div class="" id="${id}">${textHtml}</div>`;
    }

    case 'quote': {
      const quoteContent = content.quote
        .map(
          (paragraph: Paragraph) => `
                      <p id="${paragraph.id}" class="${paragraph.className}" style="${convertCamelCaseToKebab(paragraph.style || {})}">
                          ${paragraph.spans
                            .map(
                              (span) =>
                                `<span id="${span.id}" class="" style="${convertCamelCaseToKebab(span.style || {})}">${span.content}</span>`,
                            )
                            .join('')}
                      </p>`,
        )
        .join('');
      const citeContent = content.cite
        .map(
          (paragraph: Paragraph) => `
                      <p id="${paragraph.id}" class="${paragraph.className}" style="${convertCamelCaseToKebab(paragraph.style || {})}">
                          ${paragraph.spans
                            .map(
                              (span) =>
                                `<span id="${span.id}" class="" style="${convertCamelCaseToKebab(span.style || {})}">${span.content}</span>`,
                            )
                            .join('')}
                      </p>`,
        )
        .join('');
      return `<div class="" id="${id}">${quoteContent}${citeContent}</div>`;
    }

    // case 'paywall': {
    //   return `<div id="${id}" class="se-component se-paywall">${content.title}</div>`;
    // }

    case 'photo': {
      return `
      <div class="" id="${id}">
        <div class="se-component-content se-component-content-fit">
          <div class="se-section se-section-image se-l-default se-section-align-center">
            <div class="se-module se-module-image" style="">
              <a class="se-module-image-link __se_image_link __se_link"
                style=""
                onclick="return false;"
                data-linktype="img"
                data-linkdata="{id:"${id}", src:"${content.url}", originalWidth:"1350", originalHeight:"1350", linkUse:"false", link:""}"
                aria-hidden="true"
                >
                <img src="${content.url}" alt="${content.alt}" class="${content.className}"/>
              </a>
            </div>
          </div>
        </div>
      </div>`;
    }

    case 'table': {
      const tableHtml = content
        .map(
          (row: any, rowIndex: number) => `
            <tr id="row-${rowIndex}">
              ${row.cells
                .map(
                  (cell: any, cellIndex: number) => `
                  <td id="cell-${rowIndex}-${cellIndex}" class="${cell.className}">
                    ${cell.content
                      .map(
                        (paragraph: Paragraph) => `
                        <p id="${paragraph.id}" class="" style="${convertCamelCaseToKebab(paragraph.style || {})}">
                          ${paragraph.spans
                            .map(
                              (span: Span) => `
                              <span id="${span.id}" class="" style="${convertCamelCaseToKebab(span.style || {})}">${span.content}</span>
                            `,
                            )
                            .join('')}
                        </p>`,
                      )
                      .join('')}
                  </td>`,
                )
                .join('')}
            </tr>`,
        )
        .join('');
      return `<table class="" id="${id}">${tableHtml}</table>`;
    }

    case 'oembed': {
      return `<div class="" id="${id}">
                  <iframe src="${content.url}" title="${content.title}"></iframe>
                </div>`;
    }

    case 'oglink': {
      return `<div class="" id="${id}">
                  <strong>${content.title}</strong>
                  <p>${content.summary}</p>
                  <a href="${content.url}" target="_blank">
                    <img src="${content.thumbnail}" alt="${content.title}" />
                  </a>
                </div>`;
    }

    case 'file': {
      // 파일 이름과 확장자 분리
      const fileName =
        content.fileName.slice(0, content.fileName.lastIndexOf('.')) ||
        content.fileName;
      const fileExtension =
        content.fileName.slice(content.fileName.lastIndexOf('.')) || '';

      return `
      <div class="" id="${id}">
          <div class="se-component-content">
              <div class="se-section se-section-file se-l-default se-section-align-center">
                  <div class="se-module se-module-file">
                      <span class="se-file-icon"><strong class="se-blind">첨부파일</strong></span>
                      <div class="se-file-name-container">
                          <span class="se-file-name">${fileName}</span><span class="se-file-extension">${fileExtension}</span>
                      </div>
                      <a href="${content.fileId}" 
                         class="se-file-save-button __se_link se-file-save-button-activated" 
                         role="button" 
                         target="_blank" 
                         data-linktype="file" 
                         data-linkdata="{\"link\": \"${content.fileId}\"}">
                          <span class="se-blind">파일 다운로드</span>
                      </a>
                  </div>
              </div>
          </div>
          <script type="text/data" class="__se_module_data" 
                  data-module="{\"type\":\"v2_file\", \"id\":\"${id}\", \"data\" : { \"link\": \"${content.fileId}\"}}">
          </script>
      </div>`;
    }

    case 'horizontalLine': {
      return `<div class="" id="${id}">
                  <hr />
                </div>`;
    }
    default:
      return '';
  }
};
