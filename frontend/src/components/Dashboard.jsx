// src/components/Dashboard.jsx
import { ChartPieIcon, TicketIcon, UserGroupIcon } from '@heroicons/react/24/solid';

export default function Dashboard({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-card p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <ChartPieIcon className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-bold">Ticket Statistics</h3>
        </div>
        <p className="text-sm">Total: {data.ticketStats.total}</p>
        <p className="text-sm">Active: {data.ticketStats.active}</p>
        <p className="text-sm">Pending: {data.ticketStats.pending}</p>
        <p className="text-sm">Closed: {data.ticketStats.closed}</p>
      </div>
      <div className="bg-card p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <UserGroupIcon className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-bold">User Statistics</h3>
        </div>
        <p className="text-sm">Customers: {data.userStats.customers}</p>
        <p className="text-sm">Agents: {data.userStats.agents}</p>
      </div>
      <div className="bg-card p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <TicketIcon className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-bold">Recent Tickets</h3>
        </div>
        <div className="space-y-3">
          {data.recentTickets.map((ticket) => (
            <div key={ticket._id} className="border-b border-gray-200 dark:border-gray-600 pb-2">
              <p className="text-sm font-medium">{ticket.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {ticket.customer.name} - {ticket.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}