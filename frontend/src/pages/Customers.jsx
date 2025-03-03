// src/pages/Customers.jsx
import { UsersIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import CustomerList from '../components/CustomerList';
import { getCustomers } from '../services/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <UsersIcon className="w-8 h-8 text-primary" /> Customers
      </h2>
      <CustomerList customers={customers} />
    </div>
  );
}