// src/components/CustomerList.jsx
export default function CustomerList({ customers }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-card rounded-lg shadow-md">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-4 text-left text-xs font-semibold">Name</th>
            <th className="p-4 text-left text-xs font-semibold">Email</th>
            <th className="p-4 text-left text-xs font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              <td className="p-4 text-sm">{customer.name}</td>
              <td className="p-4 text-sm">{customer.email}</td>
              <td className="p-4 text-sm capitalize">{customer.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}