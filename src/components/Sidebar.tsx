import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-white p-6 border-r border-gray-200 flex flex-col">
      {/* 프로필 영역 */}
      <div className="flex flex-col items-end">
        <button
          className="w-6 h-6 bg-gray-400 rounded-full mb-4"
          onClick={() => {
            console.log('editor');
            navigate('/editor');
          }}
        ></button>
      </div>
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="mt-4 text-xl font-bold text-gray-800">모아가이드</div>
        <div className="text-gray-500 text-sm">운영관리자 페이지</div>
      </div>

      {/* 메뉴 아이콘 영역 */}
      <div className="flex justify-around mb-8">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span className="mt-2 text-sm text-gray-600">구매내역</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span className="mt-2 text-sm text-gray-600">쿠폰관리</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span className="mt-2 text-sm text-gray-600">설정</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-t-4 border-gray-600 mb-6"></div>

      {/* 메뉴 영역 */}
      <div className="space-y-10">
        {/* 구독채널 */}
        <div className="space-y-2">
          <div className="pl-2 text-sm font-semibold text-gray-800">
            구독채널
          </div>
          <div className="pl-2 space-y-2">
            <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">
              구매 콘텐츠
            </div>
            <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">
              관심 콘텐츠
            </div>
          </div>
        </div>

        {/* 북마크 */}
        <div className="space-y-2">
          <div className="pl-2 text-sm font-semibold text-gray-800">북마크</div>
          <div className="pl-2 space-y-2">
            <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">
              찜한 콘텐츠
            </div>
          </div>
        </div>

        {/* 글 관리하기 */}
        <div className="space-y-2">
          <div className="pl-2 text-sm font-semibold text-gray-800">
            글 관리하기
          </div>
          <div className="pl-2 space-y-2">
            <div className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer">
              콘텐츠 수정하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
