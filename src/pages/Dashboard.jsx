import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getUserApplications } from '../utils/firestoreUtils';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (currentUser) {
        try {
          const userApps = await getUserApplications(currentUser.uid);
          setApplications(userApps);
        } catch (error) {
          console.error('Error fetching applications:', error);
          toast.error('Failed to load applications');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplications();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <nav className="bg-slate-800 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold text-white">Tagora</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Welcome, {currentUser?.displayName || currentUser?.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your job applications and profile
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👤</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">Profile</h3>
                <p className="text-gray-400">Manage your information</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">Name:</span> {currentUser?.displayName || 'Not set'}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Email:</span> {currentUser?.email}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Status:</span> 
                <span className="text-green-400 ml-1">Active</span>
              </p>
            </div>
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300">
              Edit Profile
            </button>
          </div>

          {/* Applications Card */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📋</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">Applications</h3>
                <p className="text-gray-400">Track your job applications</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Total:</span>
                <span className="text-white font-medium">{applications.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Pending:</span>
                <span className="text-yellow-400 font-medium">
                  {applications.filter(app => app.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Reviewed:</span>
                <span className="text-green-400 font-medium">
                  {applications.filter(app => app.status === 'reviewed').length}
                </span>
              </div>
            </div>
            <Link 
              to="/"
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-300 block text-center"
            >
              Apply for Jobs
            </Link>
          </div>

          {/* Settings Card */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚙️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">Settings</h3>
                <p className="text-gray-400">Account preferences</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left text-gray-300 hover:text-white py-2 px-3 rounded hover:bg-slate-700 transition-colors duration-300">
                Notification Settings
              </button>
              <button className="w-full text-left text-gray-300 hover:text-white py-2 px-3 rounded hover:bg-slate-700 transition-colors duration-300">
                Privacy Settings
              </button>
              <button className="w-full text-left text-gray-300 hover:text-white py-2 px-3 rounded hover:bg-slate-700 transition-colors duration-300">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Your Applications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Your Applications</h2>
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <p className="text-gray-300 mt-2">Loading applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-white mb-2">No Applications Yet</h3>
                <p className="text-gray-400 mb-4">
                  Start applying for jobs to see your applications here
                </p>
                <Link 
                  to="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 inline-block"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="border border-slate-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white">{application.position}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        application.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                        application.status === 'reviewed' ? 'bg-blue-600 text-blue-100' :
                        application.status === 'accepted' ? 'bg-green-600 text-green-100' :
                        'bg-red-600 text-red-100'
                      }`}>
                        {application.status?.charAt(0).toUpperCase() + application.status?.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      Applied: {application.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                    </p>
                    {application.experience && (
                      <p className="text-gray-400 text-sm">Experience: {application.experience}</p>
                    )}
                    {application.coverLetter && (
                      <p className="text-gray-400 text-sm mt-2 truncate">
                        Cover Letter: {application.coverLetter.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
