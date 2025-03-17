export interface LinkAttributes {
  type: 'imageLink' | 'oglink' | 'textLink' | 'verticalLink';
  thumbnail?: string;
  title: string;
  summary: string;
  url: string;
  alignment: string;
  style?: string;
  whiteSpace?: string;
}

export const createLinkNodeHTML = (attrs: LinkAttributes): HTMLElement => {
  const linkWrapper = document.createElement('div');
  linkWrapper.className = `mt-[20px] ${attrs.type === 'textLink' ? 'max-w-[450px]' : 'max-w-[490px]'} w-full relative ${attrs.alignment} border border-black/10 shadow-md`;

  let formattedUrl = attrs.url.trim();
  if (
    !formattedUrl.startsWith('https://') &&
    !formattedUrl.startsWith('http://')
  ) {
    formattedUrl = 'https://' + formattedUrl;
  }
  try {
    const url = new URL(formattedUrl);
    formattedUrl = url.hostname;
  } catch (err) {
    console.error("Invalid URL:", formattedUrl, err);
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
      imgElement.className = 'w-full h-auto align-top object-cover';
      imgElement.alt = attrs.title || '링크 썸네일';

      if (attrs.style) {
        imgElement.style.cssText = attrs.style;
      }

      imageContainer.appendChild(imgElement);
      imageLink.appendChild(imageContainer);
      linkWrapper.appendChild(imageLink);
    }

    const textContainer = document.createElement('div');
    textContainer.className =
      'px-[26px] pt-[21px] pb-[18px] leading-[1.4] block relative text-left box-border text-[0] border border-black/10';

    const textWrapper = document.createElement('div');
    textWrapper.className = 'inline-block max-w-full align-middle';

    const titleElement = document.createElement('strong');
    titleElement.className =
      'text-[15px] text-[#333] block font-bold text-ellipsis whitespace-nowrap overflow-hidden break-all';
    titleElement.textContent = attrs.title;

    const summaryElement = document.createElement('p');
    summaryElement.className =
      'text-[13px] text-[#999] whitespace-nowrap overflow-hidden text-ellipsis break-all max-h-9 leading-[18px] mt-[7px]';
    summaryElement.textContent = attrs.summary;

    const urlElement = document.createElement('p');
    urlElement.className = 'text-[12px] mt-[9px] text-sky-600 no-underline truncate';
    urlElement.textContent = formattedUrl;

    textWrapper.appendChild(titleElement);
    textWrapper.appendChild(summaryElement);
    textWrapper.appendChild(urlElement);
    textContainer.appendChild(textWrapper);

    const textLink = document.createElement('a');
    textLink.href = formattedUrl;
    textLink.target = '_blank';
    textLink.className = 'block decoration-none';
    textLink.appendChild(textContainer);

    linkWrapper.appendChild(textLink);
  } else if (attrs.type === 'oglink') {
    linkWrapper.className = `mt-[20px] max-w-[450px] w-full relative ${attrs.alignment} border border-black/10 inset-0 text-inherit vertical-align-baseline`;

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

      if (attrs.style) {
        imgElement.style.cssText = attrs.style;
      }

      imageContainer.appendChild(imgElement);
      outerDiv.appendChild(imageContainer);
    }

    const textContainer = document.createElement('div');
    textContainer.className = `${attrs.thumbnail ? 'left-[110px] absolute' : 'relative'} inset-0 px-[26px] pt-[21px] pb-[18px] leading-[1.4] block text-left box-border text-[0] before:content-[''] before:inline-block before:h-full before:align-middle`;

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
      'text-[12px] mt-[9px] text-sky-600 no-underline truncate';
    urlElement.textContent = formattedUrl;

    textWrapper.appendChild(titleElement);
    textWrapper.appendChild(summaryElement);
    textWrapper.appendChild(urlElement);
    textContainer.appendChild(textWrapper);
    outerDiv.appendChild(textContainer);

    const textLink = document.createElement('a');
    textLink.href = formattedUrl;
    textLink.target = '_blank';
    textLink.className = 'block decoration-none';
    textLink.appendChild(outerDiv);

    linkWrapper.appendChild(textLink);
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
    summaryElement.className = `text-[13px] mb-2 ${attrs.type === 'textLink' ? 'whitespace-nowrap text-[#999] leading-[1.4]' : 'whitespace-normal text-[#999] max-h-[58px] leading-[20px]'} overflow-hidden text-ellipsis break-all`;
    summaryElement.textContent = attrs.summary;

    const urlElement = document.createElement('p');
    urlElement.className = 'text-[12px] text-sky-600 mt-[9px] no-underline truncate';
    urlElement.textContent = formattedUrl;

    textWrapper.appendChild(titleElement);
    textWrapper.appendChild(summaryElement);
    textWrapper.appendChild(urlElement);
    textContainer.appendChild(textWrapper);

    const textLink = document.createElement('a');
    textLink.href = formattedUrl;
    textLink.target = '_blank';
    textLink.className = 'block decoration-none';
    textLink.appendChild(textContainer);

    linkWrapper.appendChild(textLink);
  }
  return linkWrapper;
};
