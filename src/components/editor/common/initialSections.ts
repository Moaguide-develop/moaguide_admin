import { TitleSection } from './sectionProps/TitleSection';
import { TextSection } from './sectionProps/TextSection';
import { QuoteSection } from './sectionProps/QuoteSection';
import { HorizontalLineSection } from './sectionProps/HorizontalLineSection';
import { PaywallSection } from './sectionProps/paywallSection';
import { v4 as uuidv4 } from 'uuid';
import { TableSection } from './sectionProps/TableSction';
import { PhotoSection } from './sectionProps/PhotoSection';
import {
  LinkSection,
  OembedSection,
  OGLinkSection,
} from './sectionProps/LinkSection';
import { FileSection } from './sectionProps/FileSection';
// import { Section, SectionType } from './commonSection';

/* 고유 ID 생성 함수 */
const generateId = () => `SE-${uuidv4()}`;
const generateContentId = () => `SE-${uuidv4()}`;
const generateSpanId = () => `SE-${uuidv4()}`;



/* 제목 섹션 초기화 */
export const createTitleSection = (): TitleSection => {
  const id = generateId();
  const contentId = generateContentId();
  const spanId = generateSpanId();

  return {
    id,
    compid: id,
    a11yTitle: '제목',
    type: 'title',
    content: [
      {
        id: contentId,
        style: { fontSize: '2.5rem', fontWeight: 'bold' },
        spans: [
          {
            id: spanId,
            style: { color: 'rgb(0, 0, 0)' },
            className: 'absolute top-0 left-0 text-gray-400 pointer-events-none',
            content: '',
          },
        ],
      },
    ],
    // actions: {
    //   coverButtons: [],
    //   editButtons: [],
    //   movingButtons: [],
    // },
  };
};

/* 본문 섹션 초기화 */
export const createTextSection = (): TextSection => {
  try {
    const id = generateId();
    const contentId = generateContentId();
    const spanId = generateSpanId();
    return {
      id,
      compid: id,
      a11yTitle: '본문',
      type: 'text',
      content: [
        {
          id: contentId,
          className: 'text-left',
          style: { lineHeight: '1.8' },
          spans: [
            {
              id: spanId,
              style: { color: 'rgb(0, 0, 0)' },
              className: 'absolute top-0 left-0 text-gray-400 pointer-events-none',
              content: '',
            },
          ],
        },
      ],
    };
  } catch (error) {
    console.error('Failed to create text section:', error);
    throw error; // 필요 시 기본값 반환 또는 에러 처리
  }
};

/* 인용구 섹션 초기화 */
export const createQuoteSection = (): QuoteSection => {
  const id = generateId();
  return {
    id,
    compid: id,
    a11yTitle: '인용구',
    type: 'quote',
    content: {
      quote: [
        {
          id: `${id}`,
          style: { lineHeight: '1.8' },
          spans: [
            {
              id: `${id}`,
              style: { color: 'rgb(0, 0, 0)' },
              className: '',
              content: '',
            },
          ],
        },
      ],
      cite: [
        {
          id: `${id}`,
          style: { lineHeight: '1.5' },
          spans: [
            {
              id: `${id}`,
              className: '',
              style: { color: 'rgb(119, 119, 119)' },
              content: '',
            },
          ],
        },
      ],
    },
  };
};

/* 구분선 섹션 초기화 */
export const createHorizontalLineSection = (): HorizontalLineSection => {
  const id = generateId();
  return {
    id,
    compid: id,
    a11yTitle: '구분선',
    type: 'horizontalLine',
    styleType: 'default',
  };
};

/* 페이월 섹션 초기화 */
export const createPaywallSection = (): PaywallSection => {
  const id = generateId();
  return {
    id,
    compid: id,
    a11yTitle: '페이월',
    type: 'paywall',
    content: {
      title: '프리미엄 구독자 전용 콘텐츠입니다.',
      description: '모아가이드 구독으로 더 많은 콘텐츠를 만나보세요!',
      subscribeText: '프리미엄 구독하기',
      infoText: '콘텐츠 이용권한이 없는 경우 여기까지만 확인 가능합니다.',
    },
  };
};

/* 표 섹션 초기화 */
export const createTableSection = (): TableSection => {
  const id = generateId();
  const rows = 3; // 행 개수
  const columns = 3; // 열 개수

  const content = Array.from({ length: rows }, (_, rowIndex) => ({
    id: `${id}-row${rowIndex + 1}`,

    cells: Array.from({ length: columns }, (_, cellIndex) => ({
      id: `${id}-row${rowIndex + 1}-cell${cellIndex + 1}`,
      content: [
        {
          id: `${id}-row${rowIndex + 1}-cell${cellIndex + 1}-paragraph`,
          style: {}, // 기본 style 속성 추가
          spans: [
            {
              id: `${id}-row${rowIndex + 1}-cell${cellIndex + 1}-span`,
              className: '',
              content: '',
            },
          ],
        },
      ],
    })),
  }));

  return {
    id,
    compid: id,
    a11yTitle: '표',
    type: 'table',
    content,
  };
};

/* 사진 섹션 초기화 */
export const createPhotoSection = (): PhotoSection => {
  const id = generateId();
  return {
    id,
    compid: id,
    a11yTitle: '사진',
    type: 'photo',
    content: {
      url: '',
      alt: '',
      caption: {
        id: `${id}-caption`,
        spans: [
          {
            id: `${id}-span`,
            className: '',
            content: '',
          },
        ],
      },
    },
  };
};

/* 임베드 섹션 초기화 */
export const createOembedSection = (): OembedSection => {
  const id = generateId();
  return {
    id,
    compid: id,
    a11yTitle: 'embed 링크',
    type: 'oembed',
    content: {
      // url: 'https://www.youtube.com/embed/FVY_GHHwpKo?feature=oembed',
      url: '',
      // title: '[MV] ERU(이루) _ 흰눈',
      title: '',
    },
  };
};

/* 링크 섹션 초기화 */
export const createOGLinkSection = (): OGLinkSection => {
  const id = generateId();
  return {
    id,
    compid: id,
    a11yTitle: '링크',
    type: 'oglink',
    content: {
      // title: '[굿모닝 증시]"美증시 혼조 마감…국내증시, 환율 부담 지속"',
      title: '',
      // summary: '미국 증시가 혼조세로 마감한 가운데 27일 한국 증시는 원·달러 환율 부담 등에 따른 차익실현 압박 및 업종 차별화 흐름이 이어질 전망이다. 26일(현지시간) 미국 뉴욕증시 3대 지수는 보합권에서 혼조세로 마감했다.',
      summary: '',
      // url: 'n.news.naver.com',
      url: '',
      // thumbnail: 'https://imgnews.pstatic.net/image/277/2024/12/27/0005523953_001_20241227081011699.jpg?type=w800',
      thumbnail: '',
    },
  };
};

export const createLinkSection = (): LinkSection => {
  const id = generateId();
  return {
    id,
    compid: id,
    a11yTitle: '링크',
    type: 'link',
    content: {
      // title: `Instagram의 모아가이드 | STO 정보 큐레이션 플랫폼님 : "📢 "진짜 개빠르게 읽어주는 경제뉴스" 韓 증시 혹한기 끝날까···2025년 '상저하고' 전망 📌 3줄 핵심 요약 1️⃣ 작년 코스피 2399.49 마감(-9.97%), 증권사들 올해 코스피 밴드 2100~3206 제시, ‘상저하고’ 전망 다수. 2️⃣ 상반기 트럼프 당선 등 불확실성으로 수출주 회복 지연, 하반기 경기 개선 + 투자심리 회복 가능성. 3️⃣ 환율은 상반기 1400원 부근 횡보 예상, 내수주·중소형주 바텀피싱 전략 단기 유효. 머스크, 엑스 계정명 '코인'으로 바꾸자…코인시세 900% 급등 📌 3줄 핵심 요약 1️⃣ 머스크가 엑스 계정명 ‘케키우스 막시무스’로 변경, ‘개구리 페페’ 프로필 사진 설정 → 암호화폐 시장 출렁. 2️⃣ 개구리 페페, 극우·백인우월주의 상징 연계 논란. 3️⃣ 밈 코인 ‘케키우스 막시무스’ 900% 이상 폭등, 머스크 연관은 불투명. "1분기 환율 1440원 전망…상반기 원화약세 지속" 📌 3줄 핵심 요약 1️⃣ 한국투자증권, 올해 1분기 원·달러 환율 1440원 전망, 상반기 내내 약세 압력. 2️⃣ 정치 불확실성 + 글로벌 강달러 요인 → 1400원대 중후반 등락 전망. 3️⃣ 약세는 1분기 말 완화 예상, 다음 저항선 1500원으로 지목. 비트코인 1.34% 상승…리플은 10.48% 폭등, 무슨 일? 📌 3줄 핵심 요약 1️⃣ 일본 SBI, 리플 투자 확대 소식에 리플 +10.48%(2.31달러), 2.3달러 돌파. 2️⃣ SBI, 리플 랩스 지분 8%·14조7000억 원 투자 보유 → 급등 원인. 3️⃣ 코인데스크, 리플 2.27달러 저항선 돌파로 상승 가능성 ↑, 다음 저항선 2.55달러 제시. 올해 금융시장 사자성어는 '오리무중'..."미국 주식 선호 이어질 것" 📌 3줄 핵심 요약 1️⃣ 삼성증권 조사, 고액 자산가 50% “2025년 금융시장 ‘오리무중’” 대안 마련 필요. 2️⃣ 코스피 상승률 5.2% 예상, 주식 비중 확대 의사는 감소, 미국 선호도는 오히려 상승. 3️⃣ S&P500·나스닥 각각 11.3%·11.7% 상승 전망, 트럼프 2기 정책·美 국채 투자 매력 부각. 더 많은 콘텐츠는 네이버에 모아가이드를 검색해보세요! #경제뉴스 #재테크 #금융정보 #부동산 #비트코인 #증권시장 #대부업 #모아가이드 #사회초년생 #성공투자"`,
      title: '',
      // summary: `moaguide.official - January 1, 2025: "📢 "진짜 개빠르게 읽어주는 경제뉴스" 韓 증시 혹한기 끝날까···2025년 '상저하고' 전망 📌 3줄 핵심 요약 1️⃣ 작년 코스피 2399.49 마감(-9.97%), 증권사들 올해 코스피 밴드 2100~3206 제시, ‘상저하고’ 전망 다수. 2️⃣ 상반기 트럼프 당선 등 불확실성으로 수출주 회복 지연, 하반기 경기 개선 + 투자심리 회복 가능성. 3️⃣ 환율은 상반기 1400원 부근 횡보 예상, 내수주·중소형주 바텀피싱 전략 단기 유효. 머스크, 엑스 계정...`,
      summary: '',
      // url: 'www.instagram.com',
      url: '',
      // thumbnail: 'https://scontent.cdninstagram.com/v/t51.75761-15/471926383_17910208272062096_4875478156845615341_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=vzEpb9FBZrgQ7kNvgHJ0cT2&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=AJj-h8ubfSIxVFeQh_HxUos&oh=00_AYBbO5nNOLcshcgTVVKSEOmFsabMAtWbRbLg_S0ZYWheCA&oe=677BB785',
      thumbnail: '',
    },
  };
};

/* 파일 섹션 초기화 */
export const createFileSection = (): FileSection => {
  const id = generateId();
  return {
    id,
    compid: id,
    a11yTitle: '파일 첨부',
    type: 'file',
    content: {
      id: `${id}-file`,
      fileName: '',
      fileUrl: '',
    },
  };
};

// export const createSection = (type: SectionType): Section => {
//   const id = generateId();
//   const contentId = generateContentId();
//   const spanId = generateSpanId();

//   switch (type) {
//     case 'title':
//       return {
//         id,
//         compid: id,
//         a11yTitle: '제목',
//         type: 'title',
//         content: [
//           {
//             id: contentId,
//             spans: [
//               {
//                 id: spanId,
//                 content: '',
//               },
//             ],
//           },
//         ],
//       };
//     case 'text':
//       return {
//         id,
//         compid: id,
//         a11yTitle: '본문',
//         type: 'text',
//         content: [
//           {
//             id: contentId,
//             spans: [
//               {
//                 id: spanId,
//                 content: '',
//               },
//             ],
//           },
//         ],
//       };
//     case 'quote':
//       return {
//         id,
//         compid: id,
//         a11yTitle: '인용구',
//         type: 'quote',
//         content: {
//           quote: [
//             {
//               id: contentId,
//               spans: [
//                 {
//                   id: spanId,
//                   content: '',
//                 },
//               ],
//             },
//           ],
//           cite: [
//             {
//               id: contentId,
//               spans: [
//                 {
//                   id: spanId,
//                   content: '',
//                 },
//               ],
//             },
//           ],
//         },
//       };
//     case 'table':
//       return {
//         id,
//         compid: id,
//         a11yTitle: '표',
//         type: 'table',
//         content: [],
//       };
//     case 'photo':
//       return {
//         id,
//         compid: id,
//         a11yTitle: '사진',
//         type: 'photo',
//         content: {
//           url: '',
//           alt: '',
//           caption: {
//             id: contentId,
//             spans: [
//               {
//                 id: spanId,
//                 content: '',
//               },
//             ],
//           },
//         },
//       };
//     case 'file':
//       return {
//         id,
//         compid: id,
//         a11yTitle: '파일',
//         type: 'file',
//         content: {
//           id: contentId,
//           fileName: '',
//           fileUrl: '',
//         },
//       };
//     default:
//       throw new Error(`Unsupported section type: ${type}`);
//   }
// };