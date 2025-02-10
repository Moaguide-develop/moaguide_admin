import { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';

interface PreviewData {
  thumbnail?: string;
  title: string;
  summary: string;
  url: string;
}

const LinkModal = ({
  editor,
  onClose,
}: {
  editor: Editor;
  onClose: () => void;
}) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [selectedType, setSelectedType] = useState('imageLink');

  useEffect(() => {
    navigator.clipboard.readText().then((text) => setUrl(text));
  }, []);

  const fetchPreviewData = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=653faa30-b985-4463-bfb7-ba1ba9b36501`,
      );
      const data = await response.json();

      setPreviewData({
        thumbnail: data.hybridGraph.image || '',
        title: data.hybridGraph.title || '제목 없음',
        summary: data.hybridGraph.description || '설명 없음',
        url: data.hybridGraph.url || url,
      });
    } catch (error) {
      console.error('미리보기 데이터를 가져오는 중 오류 발생:', error);
      setPreviewData({
        thumbnail: 'https://via.placeholder.com/150',
        title: '제목',
        summary: '본문',
        url: 'https://example.com',
      });
    }
    setLoading(false);
  };

  const insertContent = () => {
    if (!previewData) return;

    const { state } = editor.view;
    const { selection } = state;

    const isInsideCustomBlock =
      selection.$from.node(1)?.type.name === 'customBlock';

    if (isInsideCustomBlock) {
      const customBlockPos =
        selection.$from.start(1) + selection.$from.node(1).nodeSize;

      editor
        .chain()
        .focus()
        .command(({ tr }) => {
          tr.insertText('\n', state.selection.from);
          return true;
        })
        .exitCode()
        .insertContentAt(customBlockPos, {
          type: selectedType,
          attrs: previewData,
        })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .insertContent({
          type: selectedType,
          attrs: previewData,
        })
        .run();
    }

    onClose();
  };

  const renderPreview = () => {
    if (!previewData) return null;

    switch (selectedType) {
      case 'imageLink':
        return (
          <div className="mt-10 max-w-[450px] w-full relative border border-black/10 overflow-hidden">
            <div className="se-module se-module-oglink __se-unit group">
              {previewData.thumbnail && (
                <div className="max-h-[450px] overflow-hidden block z-10 relative">
                  <img
                    src={previewData.thumbnail}
                    className="w-full h-auto align-top bg-cover"
                    alt={previewData.title || '링크 썸네일'}
                  />
                  <div className="absolute top-1 left-3 w-px h-4 bg-white transform origin-center -rotate-45"></div>
                </div>
              )}
            </div>
            <div className="px-[26px] pt-[21px] pb-[18px] leading-[1.4] block relative text-left box-border border border-black/10">
              <div className="inline-block max-w-full align-middle">
                <strong className="text-[15px] text-ellipsis whitespace-nowrap overflow-hidden break-all block font-bold text-[#333]">
                  {previewData.title}
                </strong>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis break-all max-h-9 leading-[18px] mt-[7px] text-[13px] text-[#999]">
                  {previewData.summary}
                </p>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis break-all mt-[9px] text-[#a1885f] text-[13px] no-underline">
                  {previewData.url}
                </p>
              </div>
            </div>
          </div>
        );
      case 'oglink':
        return (
          <div className="mt-10 max-w-[450px] w-full relative border border-black/10 inset-0 text-inherit vertical-align-baseline">
            <div className="block relative w-full bg-[#fff] decoration-none shadow-md">
              {previewData.thumbnail && (
                <div className="w-[110px] block relative z-10">
                  <img
                    src={previewData.thumbnail}
                    className="w-full min-h-[114px] h-auto align-top object-cover"
                    alt={previewData.title || '링크 썸네일'}
                  />
                  <div className="inset-0 border-black/10"></div>
                </div>
              )}
              <div className="left-[110px] absolute inset-0 px-[26px] pt-[21px] pb-[18px] leading-[1.4] block text-left box-border text-[0] before:content-[''] before:inline-block before:h-full before:align-middle">
                <div className="inline-block max-w-full align-middle">
                  <strong className="text-[15px] font-bold text-[#333] break-all block mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {previewData.title}
                  </strong>
                  <p className="mt-[7px] text-[13px] leading-[1.4] text-[#999] break-all whitespace-nowrap overflow-hidden text-ellipsis">
                    {previewData.summary}
                  </p>
                  <p className="mt-[9px] text-[#a1885f] text-[13px] break-all whitespace-nowrap overflow-hidden text-ellipsis no-underline">
                    {previewData.url}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 border border-black/10"></div>
            </div>
          </div>
        );
      case 'verticalLink':
        return (
          <div className="mt-10 max-w-[490px] w-full relative border border-black/10 shadow-md">
            <div className="text-left border-box relative block px-[26px] pt-[21px] pb-[18px] leading-[1.4] before:content-[''] before:inline-block before:h-full before:align-middle">
              <div className="inline-block max-w-full align-middle">
                <strong className="text-[15px] text-[#333] block mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all">
                  {previewData.title}
                </strong>
                <p className="text-[13px] mb-2 whitespace-normal max-h-[58px] leading-[20px] overflow-hidden text-ellipsis break-all">
                  {previewData.summary}
                </p>
                <p className="text-[12px] text-[#a1885f] underline">
                  {previewData.url}
                </p>
              </div>
            </div>
          </div>
        );
      case 'textLink':
        return (
          <div className="mt-10 max-w-[450px] w-full relative border border-black/10 shadow-md">
            <div className="text-left border-box relative block px-[26px] pt-[21px] pb-[18px] leading-[1.4] before:content-[''] before:inline-block before:h-full before:align-middle">
              <div className="inline-block max-w-full align-middle">
                <strong className="text-[15px] text-[#333] block mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all">
                  {previewData.title}
                </strong>
                <p className="text-[13px] mb-2 whitespace-nowrap mt-[7px] text-[#999] leading-[1.4] overflow-hidden text-ellipsis break-all">
                  {previewData.summary}
                </p>
                <p className="text-[12px] text-[#a1885f] underline">
                  {previewData.url}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[510px] p-6 bg-white border border-gray-300 shadow-lg rounded-md">
      <div className="text-center mb-4">
        <strong className="text-2xl font-semibold text-gray-700">링크</strong>
      </div>

      <div className="mb-5">
        <div className="relative flex items-center border border-gray-300 rounded-md h-12 pl-4 pr-12">
          <input
            type="url"
            className="flex-1 outline-none bg-transparent text-[14px] leading-[1.2]"
            placeholder="URL을 입력하세요."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4"
            onClick={fetchPreviewData}
          >
            🔍
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {[
            {
              type: 'imageLink',
              icon: (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="26" height="14" fill="black" />
                  <rect y="16" width="26" height="2" fill="black" />
                  <rect y="20" width="26" height="2" fill="black" />
                  <rect y="24" width="14" height="2" fill="black" />
                </svg>
              ),
            },
            {
              type: 'oglink',
              icon: (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 26 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="10" height="10" fill="black" />
                  <rect x="12" y="1" width="14" height="2" fill="black" />
                  <rect x="12" y="4" width="14" height="2" fill="black" />
                  <rect x="12" y="7" width="8" height="2" fill="black" />
                </svg>
              ),
            },
            {
              type: 'verticalLink',
              icon: (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 26 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="26" height="2" fill="black" />
                  <rect y="4" width="26" height="1" fill="black" />
                  <rect y="6" width="26" height="1" fill="black" />
                  <rect y="8" width="26" height="1" fill="black" />
                  <rect y="11" width="13" height="2" fill="black" />
                </svg>
              ),
            },
            {
              type: 'textLink',
              icon: (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 26 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="26" height="2" fill="black" />
                  <rect y="4" width="26" height="2" fill="black" />
                  <rect y="8" width="13" height="2" fill="black" />
                </svg>
              ),
            },
          ].map(({ type, icon }) => (
            <button
              key={type}
              className={`px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center ${
                selectedType === type
                  ? 'border-[#00c73c] border-[4px] text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setSelectedType(type)}
            >
              {icon}
            </button>
          ))}
        </div>
        <div className="mt-4 p-3 border border-black/10 rounded-md shadow-md max-h-[300px] overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">
              링크 정보를 불러오는 중...
            </p>
          ) : previewData ? (
            <div className="relative border border-black/10 shadow-md p-4">
              {renderPreview()}
            </div>
          ) : (
            <p className="text-center text-gray-500">미리보기가 없습니다.</p>
          )}
        </div>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="w-32 h-10 px-4 py-2 border border-gray-300 rounded-md bg-[#00c73c] text-white font-semibold disabled:bg-gray-300"
          onClick={insertContent}
          disabled={!previewData}
        >
          확인
        </button>
      </div>
      <button
        type="button"
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✖
      </button>
    </div>
  );
};

export default LinkModal;
