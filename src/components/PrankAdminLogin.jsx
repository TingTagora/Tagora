import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiCopy, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';

const PrankAdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@tagora.online');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showFakePassword, setShowFakePassword] = useState(false);
  
  // Generate a random fake password
  const generateFakePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [fakePassword] = useState(generateFakePassword());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@tagora.online' && password === fakePassword) {
      // Navigate to fake dashboard
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials. Try clicking "Forgot username or password"');
    }
  };

  const showFakeCredentials = () => {
    setShowFakePassword(true);
    setPassword(fakePassword);
    toast.info('Password retrieved! Use this password to login.');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fakePassword);
    toast.success('Password copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div 
        className="bg-slate-800 p-8 rounded-lg border border-slate-700 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <FiLock className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-gray-400">Restricted Access Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none"
              readOnly
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none pr-10"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Access Admin Panel
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={showFakeCredentials}
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Forgot username or password?
          </button>
        </div>

        {showFakePassword && (
          <motion.div 
            className="mt-6 p-4 bg-slate-700 rounded-lg border border-slate-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Retrieved Password:</p>
                <p className="text-gray-300 font-mono text-xs break-all">{fakePassword}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="ml-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                title="Copy to clipboard"
              >
                <FiCopy size={16} />
              </button>
            </div>
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Secure Connection</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrankAdminLogin;
