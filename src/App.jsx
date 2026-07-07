import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import Journey from './pages/Journey';
import SundayReview from './pages/SundayReview';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import Diary from './pages/Diary';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="missies" element={<Missions />} />
        <Route path="dagboek" element={<Diary />} />
        <Route path="reis" element={<Journey />} />
        <Route path="zondag" element={<SundayReview />} />
        <Route path="instellingen" element={<Settings />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
