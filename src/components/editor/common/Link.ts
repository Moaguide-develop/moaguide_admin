import { LinkOptions } from '@tiptap/extension-link';

export const linkValidationConfig = {
  allowedProtocols: ['http', 'https'],
  disallowedProtocols: ['ftp', 'file', 'mailto'],
  disallowedDomains: ['example-phishing.com', 'malicious-site.net'], // 악성 사이트
  noAutoLinkDomains: ['example-no-autolink.com', 'another-no-autolink.com'], // 자동 링크 제외 사이트
};

// 유효한 URI인지 검증하는 함수
export const isAllowedUri = (
  url: string,
  defaultProtocol: string,
  validate: (url: string) => boolean,
): boolean => {
  const { allowedProtocols, disallowedProtocols, disallowedDomains } = linkValidationConfig;

  try {
    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${defaultProtocol}://${url}`);

    // 기본 검증
    if (!validate(parsedUrl.href)) return false;

    // 프로토콜 검증
    const protocol = parsedUrl.protocol.replace(':', '');
    if (disallowedProtocols.includes(protocol) || !allowedProtocols.includes(protocol)) {
      return false;
    }

    // 도메인 검증
    const domain = parsedUrl.hostname;
    if (disallowedDomains.includes(domain)) return false;

    return true;
  } catch {
    return false;
  }
};

// 자동 링크화 여부 결정
export const shouldAutoLink = (url: string): boolean => {
  const { noAutoLinkDomains } = linkValidationConfig;

  try {
    const parsedUrl = new URL(url);
    return !noAutoLinkDomains.includes(parsedUrl.hostname);
  } catch {
    return false;
  }
};

// Link 설정 반환
export const getLinkOptions = (): Partial<LinkOptions> => ({
  openOnClick: false,
  autolink: true,
  linkOnPaste: true,
  defaultProtocol: 'https',
  isAllowedUri: (url, ctx) => isAllowedUri(url, ctx.defaultProtocol, ctx.defaultValidate),
  shouldAutoLink: (url) => shouldAutoLink(url),
});
