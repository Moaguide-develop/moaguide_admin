export interface LinkAttributes {
  thumbnail?: string;
  title: string;
  summary: string;
  url: string;
  alignment: string;
}

export const createLinkNodeHTML = (attrs: LinkAttributes): HTMLElement => {
  const linkWrapper = document.createElement('div');

  const alignmentClass = attrs.alignment;
  linkWrapper.className = `mt-10 max-w-[490px] w-full relative border border-black/10 shadow-md ${alignmentClass}`;

  let formattedUrl = attrs.url.trim();
  if (
    !formattedUrl.startsWith('https://') &&
    !formattedUrl.startsWith('http://')
  ) {
    formattedUrl = 'https://' + formattedUrl;
  }

  if (attrs.thumbnail) {
    const imageLink = document.createElement('a');
    imageLink.href = formattedUrl;
    imageLink.target = '_blank';
    imageLink.className = 'block decoration-none';

    const imageContainer = document.createElement('div');
    imageContainer.className =
      'max-h-[450px] overflow-hidden block z-10 relative';

    const imgElement = document.createElement('img');
    imgElement.src = attrs.thumbnail;
    imgElement.className = 'w-full h-auto align-top';
    imgElement.alt = attrs.title || '링크 썸네일';

    imageContainer.appendChild(imgElement);
    imageLink.appendChild(imageContainer);
    linkWrapper.appendChild(imageLink);
  }

  const textLink = document.createElement('a');
  textLink.href = formattedUrl;
  textLink.target = '_blank';
  textLink.className = 'block decoration-none';

  const textContainer = document.createElement('div');
  textContainer.className =
    'px-[26px] pt-[21px] pb-[18px] leading-[1.4] block relative text-left box-border';

  const titleElement = document.createElement('strong');
  titleElement.className =
    'text-[15px] text-ellipsis whitespace-nowrap overflow-hidden break-all block font-bold text-[#333]';
  titleElement.textContent = attrs.title;

  const summaryElement = document.createElement('p');
  summaryElement.className =
    'whitespace-nowrap overflow-hidden text-ellipsis break-all max-h-9 leading-[18px] mt-[7px] text-[13px] text-[#999]';
  summaryElement.textContent = attrs.summary;

  const urlElement = document.createElement('p');
  urlElement.className = 'text-[12px] text-[#a1885f] underline';
  urlElement.textContent = formattedUrl;

  textContainer.appendChild(titleElement);
  textContainer.appendChild(summaryElement);
  textContainer.appendChild(urlElement);
  textLink.appendChild(textContainer);
  linkWrapper.appendChild(textLink);

  return linkWrapper;
};
