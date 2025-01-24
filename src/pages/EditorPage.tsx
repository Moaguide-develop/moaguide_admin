import Editor from "../components/editor/Editor";

const EditorPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 상단 제목 */}
      <div className="text-2xl font-bold mb-6">새글쓰기</div>

      {/* 본문 작성 영역 */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 min-h-screen">
        <div className="text-lg font-semibold text-gray-800 mb-4">
          본문 작성
        </div>
        <Editor content={[]}/>
      </div>
    </div>
  );
};

export default EditorPage;
