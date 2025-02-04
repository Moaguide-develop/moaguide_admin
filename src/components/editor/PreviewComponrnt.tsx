import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { useNavigate } from 'react-router-dom';

interface PreviewProps {
  articleData: {
    title: string;
    authorName: string;
    categoryName: string;
    type: string;
    isPremium: boolean;
    imageLink: string;
    paywallUp: string;
    paywallDown: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
  editor: Editor | null;
}

const PreviewComponent: React.FC<PreviewProps> = ({
  articleData,
  onConfirm,
  onCancel,
}) => {
  const {
    title,
    type,
    categoryName,
    paywallUp,
    paywallDown,
    isPremium: initialIsPremium,
    authorName,
  } = articleData;
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(initialIsPremium);

  const handleToggle = () => {
    setIsPremium(!isPremium);
  };

  const handleSave = () => {
    onConfirm();
    alert('저장되었습니다.');
    navigate('/');
  };

  const cleanHTML = (html: string): string => {
    return html.replace(/^"|"$/g, '').replace(/\\"/g, '"');
  };

  const renderContent = (htmlString: string) => {
    if (!htmlString) return null;

    const cleanedHTML = cleanHTML(htmlString);

    return (
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: cleanedHTML }}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[900px] max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="w-[90%] mx-auto py-12 flex items-center justify-between border-b border-[#ececec]">
          <div className="text-sm text-[#a0a0a0]">
            학습하기 &gt; {type} &gt; {categoryName}
          </div>
          <div className="absolute inset-x-0 text-center pl-4">
            <h1 className="text-lg font-semibold text-[#777777]">{title}</h1>
          </div>
          <div className="flex items-center gap-4 z-[9999]">
            <svg
              width="33"
              height="30"
              viewBox="0 0 33 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.1837 0.862117C21.0626 0.862381 18.1842 2.49716 16.6552 5.13845C15.1262 2.49716 12.2478 0.862381 9.12666 0.862117C4.35298 0.862117 0.482788 5.16012 0.482788 9.7938C0.482788 21.4321 16.6552 29.5518 16.6552 29.5518C16.6552 29.5518 32.8276 21.4321 32.8276 9.7938C32.8276 5.16012 28.9574 0.862117 24.1837 0.862117Z"
                fill="#5200FF"
              />
            </svg>

            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_876_15486"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="43"
                height="43"
              >
                <rect width="43" height="43" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_876_15486)">
                <path
                  d="M30.4584 39.4163C28.9653 39.4163 27.6962 38.8938 26.6511 37.8486C25.6059 36.8035 25.0834 35.5344 25.0834 34.0413C25.0834 33.8622 25.1282 33.4441 25.2177 32.7872L12.6313 25.4413C12.1535 25.8893 11.6011 26.2401 10.974 26.4939C10.3469 26.7478 9.67504 26.8747 8.95837 26.8747C7.46532 26.8747 6.19622 26.3521 5.15108 25.307C4.10594 24.2618 3.58337 22.9927 3.58337 21.4997C3.58337 20.0066 4.10594 18.7375 5.15108 17.6924C6.19622 16.6472 7.46532 16.1247 8.95837 16.1247C9.67504 16.1247 10.3469 16.2516 10.974 16.5054C11.6011 16.7592 12.1535 17.1101 12.6313 17.558L25.2177 10.2122C25.158 10.0031 25.1207 9.80158 25.1058 9.60749C25.0908 9.41339 25.0834 9.1969 25.0834 8.95801C25.0834 7.46495 25.6059 6.19586 26.6511 5.15072C27.6962 4.10558 28.9653 3.58301 30.4584 3.58301C31.9514 3.58301 33.2205 4.10558 34.2657 5.15072C35.3108 6.19586 35.8334 7.46495 35.8334 8.95801C35.8334 10.4511 35.3108 11.7202 34.2657 12.7653C33.2205 13.8104 31.9514 14.333 30.4584 14.333C29.7417 14.333 29.0698 14.2061 28.4427 13.9523C27.8157 13.6985 27.2632 13.3476 26.7855 12.8997L14.199 20.2455C14.2587 20.4545 14.296 20.6561 14.311 20.8502C14.3259 21.0443 14.3334 21.2608 14.3334 21.4997C14.3334 21.7386 14.3259 21.9551 14.311 22.1492C14.296 22.3433 14.2587 22.5448 14.199 22.7538L26.7855 30.0997C27.2632 29.6518 27.8157 29.3009 28.4427 29.0471C29.0698 28.7933 29.7417 28.6663 30.4584 28.6663C31.9514 28.6663 33.2205 29.1889 34.2657 30.2341C35.3108 31.2792 35.8334 32.5483 35.8334 34.0413C35.8334 35.5344 35.3108 36.8035 34.2657 37.8486C33.2205 38.8938 31.9514 39.4163 30.4584 39.4163ZM30.4584 35.833C30.966 35.833 31.3915 35.6613 31.7349 35.3179C32.0783 34.9745 32.25 34.549 32.25 34.0413C32.25 33.5337 32.0783 33.1082 31.7349 32.7648C31.3915 32.4214 30.966 32.2497 30.4584 32.2497C29.9507 32.2497 29.5252 32.4214 29.1818 32.7648C28.8384 33.1082 28.6667 33.5337 28.6667 34.0413C28.6667 34.549 28.8384 34.9745 29.1818 35.3179C29.5252 35.6613 29.9507 35.833 30.4584 35.833ZM8.95837 23.2913C9.46601 23.2913 9.89153 23.1196 10.2349 22.7762C10.5783 22.4328 10.75 22.0073 10.75 21.4997C10.75 20.992 10.5783 20.5665 10.2349 20.2231C9.89153 19.8797 9.46601 19.708 8.95837 19.708C8.45074 19.708 8.02521 19.8797 7.68181 20.2231C7.33841 20.5665 7.16671 20.992 7.16671 21.4997C7.16671 22.0073 7.33841 22.4328 7.68181 22.7762C8.02521 23.1196 8.45074 23.2913 8.95837 23.2913ZM30.4584 10.7497C30.966 10.7497 31.3915 10.578 31.7349 10.2346C32.0783 9.89117 32.25 9.46565 32.25 8.95801C32.25 8.45037 32.0783 8.02485 31.7349 7.68145C31.3915 7.33804 30.966 7.16634 30.4584 7.16634C29.9507 7.16634 29.5252 7.33804 29.1818 7.68145C28.8384 8.02485 28.6667 8.45037 28.6667 8.95801C28.6667 9.46565 28.8384 9.89117 29.1818 10.2346C29.5252 10.578 29.9507 10.7497 30.4584 10.7497Z"
                  fill="#A2A5AA"
                />
              </g>
            </svg>
            <div
              className={`flex items-center ${
                isPremium ? 'bg-[#d2c4a0]' : 'bg-[#444]'
              } rounded-full p-1 w-14 transition-colors`}
              onClick={handleToggle}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  isPremium ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="max-w-[1000px] overflow-y-auto w-[90%] lg:w-full mx-auto my-10">
          <p className="text-sm text-gray-600">
            {new Date().toLocaleDateString()} <br />
            BY. {authorName}
          </p>
          <div className="flex-1 max-h-[70vh]">
            {!isPremium ? (
              <>
                <article className="mt-8 text-[15px] font-['Pretendard'] leading-[30.80px] tracking-wide relative">
                  {renderContent(paywallUp)}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none"></div>
                </article>
                <div className="my-24 rounded-lg text-center flex flex-col items-center gap-4">
                  <p
                    className="text-center text-black font-['Pretendard'] leading-[1.2] tracking-wide"
                    style={{
                      fontSize: 'clamp(18px, 3vw, 20px)',
                    }}
                  >
                    투자 칼럼을 읽으며
                    <br />
                    조각투자로 부의 길을 걸어보세요!
                  </p>
                  <p
                    className="text-center text-black font-semibold font-['Pretendard'] leading-[1.4] tracking-wide"
                    style={{
                      fontSize: 'clamp(12px, 2vw, 24px)',
                    }}
                  >
                    모아가이드를 구독하고 자료를 이어서 받아보세요
                  </p>
                  <div
                    className="block w-[45%] max-w-[400px] py-3 px-4 bg-[#611cf2] text-white font-bold rounded-full transition text-center"
                    style={{
                      fontSize: 'clamp(15px, 1vw, 16px)',
                    }}
                  >
                    3초만에 가입하고 계속 보기
                  </div>
                </div>
              </>
            ) : (
              <article className="mt-8 text-[15px] font-['Pretendard'] leading-[30.80px] tracking-wide">
                {renderContent(paywallUp)}
                <div className="relative">{renderContent(paywallDown)}</div>
              </article>
            )}
          </div>
        </div>

        <footer className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            저장
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PreviewComponent;
