import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/header/logo.svg';
import search from '../assets/header/search.svg';
import alert from '../assets/header/alert.svg';
import mypage from '../assets/header/mypage.svg';
import { getCookie } from '../utils/useCookie';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = getCookie('token');
    if (accessToken) {
      setIsLoggedIn(true);
      setIsLoading(false);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null;

  return (
    <div className="flex justify-around items-center p-4 bg-white border-b border-gray-300">
      <div className="cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="logo" className="w-[144px] h-5" />
      </div>

      <div className="flex items-center gap-6">
        <img
          src={search}
          alt="search"
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <img
          src={alert}
          alt="alert"
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            if (isLoggedIn) {
              navigate('/');
            } else {
              navigate('/login');
            }
          }}
        />

        {/* <div className="flex items-center gap-6"> */}
        {isLoggedIn ? (
          <img
            src={mypage}
            alt="mypage"
            className="w-6 h-6 cursor-pointer"
            onClick={() => navigate('/')}
          />
        ) : (
          <button
            className="flex items-center justify-center px-3 py-2 text-normal text-body6 border border-normal rounded-[12px]"
            onClick={() => navigate('/login')}
          >
            로그인 / 회원가입
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
