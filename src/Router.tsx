import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
// import ExamplePage from './pages/ExamplePage';
import LoginPage from './pages/LoginPage';
import CouponRegisterPage from './pages/CouponRegisterPage';
import CouponListPage from './pages/CouponListPage';
import HomePage from './pages/HomPage';
import EditorPage from './pages/EditorPage';
import MainLayout from './Layouts/MainLayout';
import EditorLayout from './Layouts/EditorLayout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/editor"
          element={
            <EditorLayout>
              <EditorPage />
            </EditorLayout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/coupon" element={<CouponRegisterPage />} />
        <Route path="/couponlist" element={<CouponListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
