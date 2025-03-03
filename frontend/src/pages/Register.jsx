// src/pages/Register.jsx
import { UserPlusIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ onSubmit, editingUser, setEditingUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      setPassword('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      const user = { name, email, password, role };
      onSubmit(user);
    } else {
      // Handle standalone registration
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');
      navigate('/login');
    }
  };

  return (
    <div className={onSubmit ? 'mb-6' : 'min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 px-4'}>
      <div className={onSubmit ? 'bg-card p-6 rounded-xl shadow-md' : 'bg-card p-8 rounded-xl shadow-md w-full max-w-md'}>
        {!onSubmit && (
          <div className="flex justify-center mb-6">
            <UserPlusIcon className="w-12 h-12 text-primary" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-center mb-6">{editingUser ? 'Edit User' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              required
            />
          </div>
          {!editingUser && (
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                required
              />
            </div>
          )}
          {onSubmit && (
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                required
              >
                <option value="customer">Customer</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            {editingUser ? 'Update User' : 'Create User'}
          </button>
        </form>
        {!onSubmit && (
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium transition-all">
                Login here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}