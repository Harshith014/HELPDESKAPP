// src/pages/TicketView.jsx
import { TicketIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketDetails from '../components/TicketDetails';
import { getTicketById } from '../services/api';

export default function TicketView() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    const res = await getTicketById(id);
    setTicket(res.data);
  };

  if (!ticket) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TicketIcon className="w-8 h-8 text-primary" /> Ticket Details
      </h2>
      <TicketDetails ticket={ticket} onUpdate={fetchTicket} />
    </div>
  );
}