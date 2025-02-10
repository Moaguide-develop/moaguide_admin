export interface LinkAttributes {
  type: 'imageLink' | 'oglink' | 'textLink' | 'verticalLink';
  thumbnail?: string;
  title: string;
  summary: string;
  url: string;
  alignment: string;
  whiteSpace?: string;
}

export const createLinkNodeHTML = (attrs: LinkAttributes): HTMLElement => {
  const linkWrapper = document.createElement('div');
  linkWrapper.className = `mt-10 ${attrs.type === 'textLink' ? 'max-w-[450px]' : 'max-w-[490px]'} w-full relative ${attrs.alignment} border border-black/10 shadow-md`;

  let formattedUrl = attrs.url.trim();
  if (
    !formattedUrl.startsWith('https://') &&
    !formattedUrl.startsWith('http://')
  ) {
    formattedUrl = 'https://' + formattedUrl;
  }

  if (attrs.type === 'imageLink') {
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
  } else if (attrs.type === 'oglink') {
    linkWrapper.className = `mt-10 max-w-[450px] w-full relative ${attrs.alignment} border border-black/10 inset-0 text-inherit vertical-align-baseline`;

    const outerDiv = document.createElement('div');
    outerDiv.className =
      'block relative w-full bg-[#fff] decoration-none shadow-md';

    if (attrs.thumbnail) {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'w-[110px] block relative z-10';

      const imgElement = document.createElement('img');
      imgElement.src = attrs.thumbnail;
      imgElement.className =
        'w-full min-h-[114px] h-auto align-top object-cover';
      imgElement.alt = attrs.title || '링크 썸네일';

      imageContainer.appendChild(imgElement);
      outerDiv.appendChild(imageContainer);
    }

    const textContainer = document.createElement('div');
    textContainer.className = `left-[110px] absolute inset-0 px-[26px] pt-[21px] pb-[18px] leading-[1.4] block text-left box-border text-[0] before:content-[''] before:inline-block before:h-full before:align-middle`;

    const textWrapper = document.createElement('div');
    textWrapper.className = 'inline-block max-w-full align-middle';

    const titleElement = document.createElement('strong');
    titleElement.className =
      'text-[15px] font-bold text-[#333] break-all block mb-1 whitespace-nowrap overflow-hidden text-ellipsis';
    titleElement.textContent = attrs.title;

    const summaryElement = document.createElement('p');
    summaryElement.className =
      'mt-[7px] text-[13px] leading-[1.4] text-[#999] break-all whitespace-nowrap overflow-hidden text-ellipsis';
    summaryElement.textContent = attrs.summary;

    const urlElement = document.createElement('p');
    urlElement.className =
      'mt-[9px] text-[#a1885f] text-[13px] break-all whitespace-nowrap overflow-hidden text-ellipsis no-underline';
    urlElement.textContent = formattedUrl;

    textWrapper.appendChild(titleElement);
    textWrapper.appendChild(summaryElement);
    textWrapper.appendChild(urlElement);
    textContainer.appendChild(textWrapper);
    outerDiv.appendChild(textContainer);
    linkWrapper.appendChild(outerDiv);
  } else if (attrs.type === 'textLink' || attrs.type === 'verticalLink') {
    const textContainer = document.createElement('div');
    textContainer.className = `text-left border-box relative block px-[26px] pt-[21px] pb-[18px] leading-[1.4] before:content-[''] before:inline-block before:h-full before:align-middle`;

    const textWrapper = document.createElement('div');
    textWrapper.className = 'inline-block max-w-full align-middle';

    const titleElement = document.createElement('strong');
    titleElement.className =
      'text-[15px] text-[#333] block mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all';
    titleElement.textContent = attrs.title;

    const summaryElement = document.createElement('p');
    summaryElement.className = `text-[13px] mb-2 ${attrs.type === 'textLink' ? 'whitespace-nowrap text-[#333] leading-[1.4]' : 'whitespace-nowrap max-h-[58px] leading-[20px]'} overflow-hidden text-ellipsis break-all`;
    summaryElement.textContent = attrs.summary;

    const urlElement = document.createElement('p');
    urlElement.className = 'text-[12px] text-[#a1885f] underline';
    urlElement.textContent = formattedUrl;

    textWrapper.appendChild(titleElement);
    textWrapper.appendChild(summaryElement);
    textWrapper.appendChild(urlElement);
    textContainer.appendChild(textWrapper);
    linkWrapper.appendChild(textContainer);
  }
  return linkWrapper;
};
