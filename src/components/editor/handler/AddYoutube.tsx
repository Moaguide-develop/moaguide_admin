import { Editor } from '@tiptap/react';
import React from 'react';

const AddYoutube: React.FC<{ editor: Editor }> = ({ editor }) => {
  const handleInsertYoutube = async () => {
    const url = prompt('YouTube URL을 입력하세요:');
    if (url) {
      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
        );
        if (!response.ok) {
          throw new Error('유효한 YouTube URL이 아닙니다.');
        }

        const data = await response.json();

        if (!data.html) {
          throw new Error('YouTube oEmbed API에서 html 응답이 없습니다.');
        }

        const iframeSrcMatch = data.html.match(/src="(.*?)"/);
        const iframeSrc = iframeSrcMatch?.[1] || '';

        const frameborderMatch = data.html.match(/frameborder="(.*?)"/);
        const frameborder = frameborderMatch?.[1] || '0';

        const allowMatch = data.html.match(/allow="(.*?)"/);
        const allow =
          allowMatch?.[1] ||
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';

        const allowfullscreenMatch = data.html.match(/allowfullscreen/);
        const allowfullscreen = allowfullscreenMatch ? '' : null;

        if (!iframeSrc) {
          throw new Error('YouTube oEmbed에서 iframe src를 찾을 수 없습니다.');
        }

        editor
          .chain()
          .focus()
          .insertContent({
            type: 'oembed',
            attrs: {
              src: iframeSrc,
              width: data.thumbnail_width || '400',
              height: data.thumbnail_height || '300',
              frameborder: frameborder,
              allow: allow,
              allowfullscreen: allowfullscreen,
              title: data.title || 'Untitled',
            },
          })
          .run();
      } catch (error) {
        console.error('Failed to fetch YouTube oEmbed API:', error);
      }
    }
  };

  return (
    <button
      onClick={handleInsertYoutube}
      className="cursor-pointer hover:opacity-40 p-2 rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#5f6368"
      >
        <path d="M616-242q-27 1-51.5 1.5t-43.5.5h-41q-71 0-133-2-53-2-104.5-5.5T168-257q-26-7-45-26t-26-45q-6-23-9.5-56T82-447q-2-36-2-73t2-73q2-30 5.5-63t9.5-56q7-26 26-45t45-26q23-6 74.5-9.5T347-798q62-2 133-2t133 2q53 2 104.5 5.5T792-783q26 7 45 26t26 45q6 23 9.5 56t5.5 63q2 36 2 73v17q-19-8-39-12.5t-41-4.5q-83 0-141.5 58.5T600-320q0 21 4 40.5t12 37.5ZM400-400l208-120-208-120v240Zm360 200v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
      </svg>
    </button>
  );
};

export default AddYoutube;
