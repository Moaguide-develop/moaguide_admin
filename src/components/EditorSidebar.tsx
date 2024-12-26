const EditorSidebar: React.FC = () => (
  <div className="w-64 bg-white p-6 border-r border-gray-200 flex flex-col">
    {/* 프로필 영역 */}
    <div className="flex flex-col w-6 h-6 mb-4"></div>
    <div className="flex flex-col items-center mb-10">
      <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      <div className="mt-4 text-xl font-bold text-gray-800">모아가이드</div>
      <div className="text-gray-500 text-sm">운영관리자 페이지</div>
    </div>

    {/* 구분선 */}
    <div className="-mx-6 border-t-2 border-gray-300 mb-4"></div>

    {/* 메뉴 영역 */}
    <div className="space-y-4">
      {/* 대시보드 - 구분선 포함 */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-800">대시보드</div>
      </div>
      <div className="-mx-6 border-t-2 border-gray-300 my-4"></div>

      {/* 첫 번째 메뉴 그룹 */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-800">새글쓰기</div>
        <div className="text-sm font-semibold text-gray-800">콘텐츠 관리</div>
        <div className="text-sm font-semibold text-gray-800">
          댓글/커뮤니티 관리
        </div>
        <div className="text-sm font-semibold text-gray-800">
          채널홈 노출 관리
        </div>
        <div className="text-sm font-semibold text-gray-800">
          구독 상품 관리
        </div>
      </div>
      <div className="-mx-6 border-t-2 border-gray-300 my-4"></div>

      {/* 두 번째 메뉴 그룹 */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-800">뉴스레터 관리</div>
        <div className="text-sm font-semibold text-gray-800">쿠폰 관리</div>
        <div className="text-sm font-semibold text-gray-800">
          마케팅 메시지 관리
        </div>
      </div>
      <div className="-mx-6 border-t-2 border-gray-300 my-4"></div>

      {/* 세 번째 메뉴 그룹 */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-800">통계</div>
        <div className="text-sm font-semibold text-gray-800">구독자 관리</div>
        <div className="text-sm font-semibold text-gray-800">판매 관리</div>
      </div>
      <div className="-mx-6 border-t-2 border-gray-300 my-4"></div>
    </div>

    {/* 하단 아이콘 영역 */}
    <div className="mt-auto flex justify-around pt-6">
      <div className="flex flex-col items-center cursor-pointer">
        <div className="w-6 h-6 bg-gray-400 rounded"></div>
        <div className="mt-2 text-xs text-gray-600">채팅</div>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <div className="w-6 h-6 bg-gray-400 rounded"></div>
        <div className="mt-2 text-xs text-gray-600">도움말</div>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <div className="w-6 h-6 bg-gray-400 rounded"></div>
        <div className="mt-2 text-xs text-gray-600">설정</div>
      </div>
    </div>
  </div>
);

export default EditorSidebar;
