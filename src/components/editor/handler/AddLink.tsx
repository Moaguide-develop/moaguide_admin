import { Editor } from '@tiptap/react';

const AddLink = ({ editor }: { editor: Editor }) => {
  const fetchPreviewData = async (url: string) => {
    try {
      const response = await fetch(
        `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=c0d9f0d4-6763-4e41-8377-79f24e15e717`,
      );
      const data = await response.json();

      return {
        thumbnail: data.hybridGraph.image || '',
        title: data.hybridGraph.title || '제목 없음',
        summary: data.hybridGraph.description || '설명 없음',
      };
    } catch (error) {
      console.error('미리보기 데이터를 가져오는 중 오류 발생:', error);
      return {
        thumbnail: 'https://via.placeholder.com/150',
        title: '링크 제목',
        summary: '링크 요약 내용',
      };
    }
  };

  return (
    <button
      onClick={async () => {
        const url = prompt('링크를 입력하세요:');
        if (!url) return;

        fetchPreviewData(url).then(({ thumbnail, title, summary }) => {
          if (url.includes('instagram.com')) {
            editor
              .chain()
              .focus()
              .insertContent({
                type: 'verticalLink',
                attrs: {
                  title,
                  summary,
                  url,
                },
              })
              .run();
            return;
          }

          if (
            editor.getAttributes('is-small') &&
            !editor.getAttributes('alt')
          ) {
            editor
              .chain()
              .focus()
              .insertContent({
                type: 'oglink',
                attrs: {
                  thumbnail,
                  title,
                  summary,
                  url,
                },
              })
              .run();
            return;
          }
          editor
            .chain()
            .focus()
            .insertContent({
              type: 'link',
              attrs: {
                thumbnail,
                title,
                summary,
                url,
              },
            })
            .run();
        });
      }}
      className="cursor-pointer hover:opacity-40 p-2 rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M680-160v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm560-40h-80q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480Z" />
      </svg>
    </button>
  );
};

export default AddLink;
