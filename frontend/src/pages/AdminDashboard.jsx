// src/pages/AdminDashboard.jsx
import { ChartBarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import { getDashboardData } from '../services/api';

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const res = await getDashboardData();
    setData(res.data);
  };

  if (!data) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ChartBarIcon className="w-8 h-8 text-primary" /> Dashboard
      </h2>
      <Dashboard data={data} />
    </div>
  );
}