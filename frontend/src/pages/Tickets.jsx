// src/pages/Tickets.jsx
import { PlusCircleIcon, TicketIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import TicketList from '../components/TicketList';
import { AuthContext } from '../context/AuthContext';
import { createTicket, getTickets } from '../services/api';

export default function Tickets() {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await getTickets();
    setTickets(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    files.forEach((file) => formData.append('attachments', file));

    await createTicket(formData);
    setTitle('');
    setDescription('');
    setFiles([]);
    fetchTickets();
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TicketIcon className="w-8 h-8 text-primary" /> Tickets
      </h2>
      {user.role === 'customer' && (
        <form onSubmit={handleSubmit} className="mb-8 bg-card p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                required
                rows="3"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-blue-700"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <PlusCircleIcon className="w-5 h-5" /> Create Ticket
            </button>
          </div>
        </form>
      )}
      <TicketList tickets={tickets} />
    </div>
  );
}