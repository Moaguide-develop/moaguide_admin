import { Node } from '@tiptap/core';

const CustomPaywall = Node.create({
  name: 'paywall',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      alignment: { default: 'mr-auto ml-0' },
      title: { default: '프리미엄 구독자 전용 콘텐츠입니다.' },
      description: {
        default: '모아가이드 구독으로 더 많은 콘텐츠를 만나보세요!',
      },
      buttonText: { default: '프리미엄 구독하기' },
      info: {
        default: `콘텐츠 이용권한이 없는 경우 여기까지만 확인 가능합니다.\n콘텐츠 판매 설정에 따라 문구 및 버튼이 변경될 수 있습니다.`,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.se-section.se-section-custom.se-l-default',
        getAttrs: (element) => {
          const alignment = element.classList.contains(
            'se-section-align-center',
          )
            ? 'mx-auto'
            : element.classList.contains('se-section-align-right')
              ? 'ml-auto mr-0'
              : 'mr-auto ml-0';

          const paywallElement = element.querySelector('.se_paywall');
          if (!paywallElement) {
            return false;
          }

          const title =
            paywallElement.querySelector('.se_paywall_title')?.textContent ||
            '';
          const description =
            paywallElement.querySelector('.se_paywall_desc')?.textContent || '';
          const buttonText =
            paywallElement.querySelector('.se_paywall_subscribe')
              ?.textContent || '';
          const info = Array.from(
            paywallElement.querySelector('.se_paywall_info')?.childNodes || [],
          )
            .map((node) => (node.nodeName === 'BR' ? '\n' : node.textContent))
            .join('');

          return { alignment, title, description, buttonText, info };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment, title, description, buttonText, info } = HTMLAttributes;

    return [
      'div',
      {
        class: `block mt-[30px] mx-[-20px] relative ${alignment}`,
      },
      [
        'div',
        {
          class: `p-[28px_20px_0] tracking-[-0.5px] text-center`,
        },
        [
          'div',
          { class: 'px-[11px] py-[20px] text-[#303038]' },
          ['strong', { class: 'text-[18px] leading-[24px]' }, title],
          [
            'p',
            { class: 'mt-[3px] text-[14px] leading-[20px] opacity-75' },
            description,
          ],
          [
            'a',
            {
              class:
                'overflow-hidden block mt-[31px] px-[15px] py-[13px] text-[17px] font-semibold leading-[20px] text-[#222] tracking-[-0.5px] rounded-[3px] shadow-md border border-[rgba(255,255,255,0.09)] bg-gradient-to-r from-[#e6b459] to-[#e9a750]',
            },
            buttonText,
          ],
        ],
        [
          'p',
          {
            class:
              'pt-[20px] pb-[18px] text-[14px] leading-[20px] text-[#999] border-t border-[rgba(0,0,0,0.1)]',
          },
          ...info
            .split('\n')
            .flatMap((line: string, index: number, array: string[]) =>
              index < array.length - 1 ? [line, ['br']] : [line],
            ),
        ],
      ],
    ];
  },
});

export default CustomPaywall;
