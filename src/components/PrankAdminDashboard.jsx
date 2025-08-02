import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiFileText, 
  FiBriefcase, 
  FiBarChart, 
  FiSettings,
  FiActivity,
  FiDatabase,
  FiServer,
  FiShield,
  FiEye,
  FiDownload,
  FiLock,
  FiHardDrive,
  FiMonitor,
  FiCheck
} from 'react-icons/fi';

const PrankAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // Generate hundreds of fake blurred entries
  const generateFakeData = (count) => {
    const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson', 'Jessica Miller', 'Christopher Moore', 'Ashley Taylor', 'Matthew Anderson', 'Amanda Thomas'];
    const positions = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UI/UX Designer', 'DevOps Engineer', 'Marketing Specialist', 'Sales Manager', 'Content Writer'];
    const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Tesla', 'SpaceX', 'Uber', 'Airbnb'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: names[Math.floor(Math.random() * names.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      email: `user${i + 1}@example.com`,
      status: ['Active', 'Pending', 'Inactive'][Math.floor(Math.random() * 3)],
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      salary: `$${(Math.random() * 100 + 50).toFixed(0)}k`,
      score: Math.floor(Math.random() * 100) + '%'
    }));
  };

  const fakeUsers = generateFakeData(347);
  const fakeApplications = generateFakeData(892);
  const fakeLogs = generateFakeData(1247);

  const handlePrankAction = async (actionName) => {
    setIsLoading(true);
    
    // Show loading for 2-3 seconds
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Redirect to Rick Roll
    window.location.href = 'https://youtu.be/8qRWky53n7Y?t=28';
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart },
    { id: 'users', label: 'Users (347)', icon: FiUsers },
    { id: 'applications', label: 'Applications (892)', icon: FiFileText },
    { id: 'logs', label: 'System Logs (1,247)', icon: FiActivity },
    { id: 'servers', label: 'Servers', icon: FiServer },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl mb-2">Loading hundreds of databases...</p>
          <div className="text-gray-400 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <FiLock className="text-blue-400" />
              <p>Accessing secure servers...</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiHardDrive className="text-green-400" />
              <p>Fetching user data...</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiBarChart className="text-purple-400" />
              <p>Compiling analytics...</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiShield className="text-red-400" />
              <p>Verifying permissions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const BlurredTable = ({ data, title }) => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-white font-bold">{title}</h3>
        <button 
          onClick={() => handlePrankAction(`View ${title}`)}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2"
        >
          <FiEye size={14} />
          View All
        </button>
      </div>
      <div className="overflow-hidden" style={{ filter: 'blur(4px)' }}>
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="text-left p-3 text-white">Name</th>
              <th className="text-left p-3 text-white">Position</th>
              <th className="text-left p-3 text-white">Company</th>
              <th className="text-left p-3 text-white">Status</th>
              <th className="text-left p-3 text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 50).map((item) => (
              <tr key={item.id} className="border-b border-slate-700">
                <td className="p-3 text-white">{item.name}</td>
                <td className="p-3 text-gray-300">{item.position}</td>
                <td className="p-3 text-gray-300">{item.company}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === 'Active' ? 'bg-green-900 text-green-300' :
                    item.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-gray-400">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 bg-slate-700 text-center">
        <button 
          onClick={() => handlePrankAction(`Load more ${title}`)}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          Load {data.length - 50} more entries...
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FiLock className="text-red-500" />
                <h1 className="text-2xl font-bold text-white">Tagora Admin Portal</h1>
              </div>
              <p className="text-gray-400">Secure Administrative Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <FiMonitor size={16} />
                <span className="text-sm">Live Data</span>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-slate-800 rounded-lg border border-slate-700 p-4">
              <div className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div className="bg-slate-800 p-6 rounded-lg border border-slate-700" whileHover={{ scale: 1.02 }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Users</p>
                        <p className="text-2xl font-bold text-white">2,847</p>
                      </div>
                      <FiUsers className="text-blue-500 text-2xl" />
                    </div>
                  </motion.div>

                  <motion.div className="bg-slate-800 p-6 rounded-lg border border-slate-700" whileHover={{ scale: 1.02 }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Applications</p>
                        <p className="text-2xl font-bold text-yellow-500">892</p>
                      </div>
                      <FiFileText className="text-yellow-500 text-2xl" />
                    </div>
                  </motion.div>

                  <motion.div className="bg-slate-800 p-6 rounded-lg border border-slate-700" whileHover={{ scale: 1.02 }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Active Sessions</p>
                        <p className="text-2xl font-bold text-green-500">1,247</p>
                      </div>
                      <FiActivity className="text-green-500 text-2xl" />
                    </div>
                  </motion.div>

                  <motion.div className="bg-slate-800 p-6 rounded-lg border border-slate-700" whileHover={{ scale: 1.02 }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Server Load</p>
                        <p className="text-2xl font-bold text-red-500">89%</p>
                      </div>
                      <FiServer className="text-red-500 text-2xl" />
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => handlePrankAction('Export User Data')}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <FiDownload size={20} />
                    Export User Data
                  </button>
                  <button 
                    onClick={() => handlePrankAction('Generate Reports')}
                    className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <FiBarChart size={20} />
                    Generate Reports
                  </button>
                  <button 
                    onClick={() => handlePrankAction('Security Audit')}
                    className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <FiShield size={20} />
                    Security Audit
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'users' && <BlurredTable data={fakeUsers} title="User Management" />}
            {activeTab === 'applications' && <BlurredTable data={fakeApplications} title="Job Applications" />}
            {activeTab === 'logs' && <BlurredTable data={fakeLogs} title="System Logs" />}
            
            {(activeTab === 'servers' || activeTab === 'settings') && (
              <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <FiLock className="text-red-500 text-2xl" />
                  <h3 className="text-xl text-white">{activeTab === 'servers' ? 'Server Management' : 'System Settings'}</h3>
                </div>
                <p className="text-gray-400 mb-6">Restricted access required</p>
                <button 
                  onClick={() => handlePrankAction(`Access ${activeTab}`)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  <FiShield size={16} />
                  Request Access
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrankAdminDashboard;
