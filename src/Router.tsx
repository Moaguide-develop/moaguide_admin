import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import ExamplePage from './pages/ExamplePage';
import LoginPage from './pages/LoginPage';
import CouponRegisterPage from './pages/CouponRegisterPage';
import CouponListPage from './pages/CouponListPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExamplePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/coupon" element={<CouponRegisterPage />} />
        <Route path="/couponlist" element={<CouponListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
