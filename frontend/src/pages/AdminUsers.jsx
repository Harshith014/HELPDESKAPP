// src/pages/AdminUsers.jsx
import { CogIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { createUser, deleteUser, getUsers, updateUser } from '../services/api';
import Register from './Register';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleCreateUser = async (user) => {
    await createUser(user);
    fetchUsers();
  };

  const handleUpdateUser = async (user) => {
    await updateUser(editingUser._id, user);
    fetchUsers();
    setEditingUser(null);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CogIcon className="w-8 h-8 text-primary" /> Manage Users
      </h2>
      <Register
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-card rounded-lg shadow-md">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left text-xs font-semibold">Name</th>
              <th className="p-4 text-left text-xs font-semibold">Email</th>
              <th className="p-4 text-left text-xs font-semibold">Role</th>
              <th className="p-4 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                <td className="p-4 text-sm">{user.name}</td>
                <td className="p-4 text-sm">{user.email}</td>
                <td className="p-4 text-sm capitalize">{user.role}</td>
                <td className="p-4 text-sm">
                  <button
                    onClick={() => startEditing(user)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}