// src/components/TicketList.jsx
import { Link } from 'react-router-dom';

export default function TicketList({ tickets }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-card rounded-lg shadow-md">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-4 text-left text-xs font-semibold">Ticket ID</th>
            <th className="p-4 text-left text-xs font-semibold">Title</th>
            <th className="p-4 text-left text-xs font-semibold">Status</th>
            <th className="p-4 text-left text-xs font-semibold">Customer</th>
            <th className="p-4 text-left text-xs font-semibold">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              <td className="p-4">
                <Link to={`/ticket/${ticket._id}`} className="text-primary hover:underline">
                  {ticket.ticketId}
                </Link>
              </td>
              <td className="p-4 text-sm">{ticket.title}</td>
              <td className="p-4 text-sm">
                <span
                  className={[
                    "inline-block px-2 py-1 rounded-full text-xs font-medium",
                    ticket.status === "Active" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                    ticket.status === "Pending" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                    ticket.status === "Closed" && "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="p-4 text-sm">{ticket.customer.name}</td>
              <td className="p-4 text-sm">{new Date(ticket.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}