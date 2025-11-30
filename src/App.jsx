import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import USStockListPage from './pages/USStockListPage';
import KRStockListPage from './pages/KRStockListPage';
import USChartPage from './pages/USChartPage';
import KRChartPage from './pages/KRChartPage';
import NotesPage from './pages/NotesPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="us-stocks" element={<USStockListPage />} />
        <Route path="kr-stocks" element={<KRStockListPage />} />
        <Route path="us-chart" element={<USChartPage />} />
        <Route path="kr-chart" element={<KRChartPage />} />
        <Route path="notes" element={<NotesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
