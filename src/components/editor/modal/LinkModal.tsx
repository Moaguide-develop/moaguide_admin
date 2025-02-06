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
        `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=c0d9f0d4-6763-4e41-8377-79f24e15e717`,
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
        title: '링크 제목',
        summary: '링크 요약 내용',
        url: 'https://example.com',
      });
    }
    setLoading(false);
  };

  const insertContent = () => {
    if (!previewData) return;
    editor
      .chain()
      .focus()
      .insertContent({
        type: selectedType,
        attrs: previewData,
      })
      .run();
    onClose();
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
          {['imageLink', 'oglink', 'verticalLink', 'textLink'].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 border border-gray-300 rounded-md ${
                selectedType === type
                  ? 'bg-[#00c73c] text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="mt-4 p-3 border border-black/10 rounded-md shadow-md max-h-[300px] overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">
              링크 정보를 불러오는 중...
            </p>
          ) : previewData ? (
            <div>
              <p className="font-bold text-lg text-gray-800">
                {previewData.title}
              </p>
              <p className="text-sm text-gray-600">{previewData.summary}</p>
              <p className="text-blue-500 text-sm mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {previewData.url}
              </p>
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
