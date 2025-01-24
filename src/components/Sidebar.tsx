import { useNavigate } from 'react-router-dom';
import Edit from '../../public/sidebar/Editor.svg';
import Purchase from '../../public/sidebar/Purchase.svg';
import Coupon from '../../public/sidebar/Coupon.svg';
import Setting from '../../public/sidebar/Setting.svg';

const Sidebar: React.FC = () => {
  const alertHandler = () => {
    alert('준비중입니다.');
  };
  const navigate = useNavigate();
  return (
    <div className="w-80 h-[980px] bg-white p-6 border border-gray-200 flex flex-col rounded-xl">
      {/* 프로필 영역 */}
      <div className="flex flex-col items-end cursor-pointer">
        <img
          src={Edit}
          alt=""
          className="w-[28.8px] h-[28.8px] mb-4 hover:text-gray-400"
          onClick={() => {
            navigate('/editor');
          }}
        />
      </div>
      <div className="flex flex-col items-center mb-10">
        <div className="w-[186px] h-[186px] bg-gray-300 rounded-full" />
        <div className="mt-8 text-4xl font-bold text-gray-800">모아가이드</div>
        <div className="mt-4 text-gray-700 text-lg font-bold">
          운영관리자 페이지
        </div>
      </div>

      {/* 메뉴 아이콘 영역 */}
      <div className="flex justify-around mb-6 gap-3">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            alertHandler();
          }}
        >
          <img src={Purchase} alt="" className="w-7 h-7"></img>
          <span className="mt-2 text-base text-gray-600">구매내역</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            navigate('/couponlist');
          }}
        >
          <img src={Coupon} alt="" className="w-7 h-7"></img>
          <span className="mt-2 text-base text-gray-600">쿠폰관리</span>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            alertHandler();
          }}
        >
          <img src={Setting} alt="" className="w-7 h-7"></img>
          <span className="mt-2 text-base text-gray-600">설정</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-t-2 border-gray-600 mb-6"></div>

      {/* 메뉴 영역 */}
      <div className="space-y-10">
        {/* 구독채널 */}
        <div className="space-y-6 pl-7 pt-4">
          <div className="pl-2 text-xl font-semibold text-gray-800">
            구독채널
          </div>
          <div className="pl-2 space-y-6">
            <div
              className="text-xl text-[#A1A1A1] hover:text-purple-600 cursor-pointer"
              onClick={() => {
                alertHandler();
              }}
            >
              구매 콘텐츠
            </div>
            <div
              className="text-xl text-[#A1A1A1] hover:text-purple-600 cursor-pointer"
              onClick={() => {
                alertHandler();
              }}
            >
              관심 콘텐츠
            </div>
          </div>
        </div>

        {/* 북마크 */}
        <div className="space-y-6 pl-7 pt-4">
          <div className="pl-2 text-xl font-semibold text-gray-800">북마크</div>
          <div className="pl-2 space-y-6">
            <div
              className="text-xl text-[#A1A1A1] hover:text-purple-600 cursor-pointer"
              onClick={() => {
                alertHandler();
              }}
            >
              찜한 콘텐츠
            </div>
          </div>
        </div>

        {/* 글 관리하기 */}
        <div className="space-y-6 pl-7 pt-4">
          <div className="pl-2 text-xl font-semibold text-gray-800">
            글 관리하기
          </div>
          <div className="pl-2 space-y-6">
            <div
              className="text-xl font-sans text-[#A1A1A1] hover:text-purple-600 cursor-pointer"
              onClick={() => {
                alertHandler();
              }}
            >
              콘텐츠 수정하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
