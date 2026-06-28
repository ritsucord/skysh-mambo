import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import StockDetailPage from '../pages/StockDetailPage.jsx';
import CommunityPage from '../pages/CommunityPage.jsx';
import MyPage from '../pages/MyPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/stocks/:symbol" element={<StockDetailPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
