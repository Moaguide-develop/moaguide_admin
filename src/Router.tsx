import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import ExamplePage from './pages/ExamplePage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExamplePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
