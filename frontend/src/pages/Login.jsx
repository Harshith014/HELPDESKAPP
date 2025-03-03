// src/pages/Login.jsx
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/tickets');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="bg-card p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <LockClosedIcon className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login to Helpdesk</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium transition-all">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}