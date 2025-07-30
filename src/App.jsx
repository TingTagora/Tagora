import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitJobApplication } from './utils/firestoreUtils';
import { toast } from 'react-toastify';

// Simple Application Form Component
const ApplicationForm = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: currentUser?.email || '',
    position: '',
    phone: '',
    experience: '',
    coverLetter: '',
    portfolio: '',
    availability: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positions = [
    'Content Writing',
    'Social Media Management', 
    'Web Development',
    'Digital Marketing',
    'Graphic Design',
    'Virtual Assistant'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const applicationData = {
        ...formData,
        userId: currentUser?.uid || null,
        userEmail: currentUser?.email || formData.email,
        appliedAt: new Date().toISOString(),
      };

      await submitJobApplication(applicationData);
      toast.success('Application submitted successfully! We will review your application and get back to you within 2-3 business days.');
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Apply to Tagora</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-white mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              placeholder="your.email@example.com"
              disabled={!!currentUser}
            />
          </div>

          <div>
            <label className="block text-white mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Position Applied For *</label>
            <select
              required
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select a position</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Years of Experience</label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select experience level</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Portfolio/Website URL</label>
            <input
              type="url"
              value={formData.portfolio}
              onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              placeholder="https://your-portfolio.com"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Availability</label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select availability</option>
              <option value="immediate">Immediate</option>
              <option value="2-weeks">2 weeks notice</option>
              <option value="1-month">1 month notice</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Cover Letter</label>
            <textarea
              value={formData.coverLetter}
              onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
              rows="4"
              className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Navigation Component that uses Auth Context
const NavigationBar = ({ onShowApplicationForm, scrollToSection }) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="bg-slate-800 p-4 fixed w-full top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Tagora</h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('openings')}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Job Openings
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Contact
          </button>
        </div>
        <div className="flex space-x-4">
          {currentUser ? (
            // Logged in user navigation
            <>
              <span className="text-gray-300">Welcome, {currentUser.displayName || currentUser.email}</span>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-300">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            // Guest user navigation
            <>
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Main Tagora Website
const TagoraHome = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openings = [
    {
      title: 'Content Writer',
      type: 'Part-time',
      skills: ['Content Writing', 'SEO', 'Research'],
      description: 'Create engaging content for blogs, websites, and social media.'
    },
    {
      title: 'Social Media Manager',
      type: 'Part-time',
      skills: ['Social Media', 'Content Creation', 'Analytics'],
      description: 'Manage social media presence and create engaging campaigns.'
    },
    {
      title: 'Web Developer',
      type: 'Part-time',
      skills: ['HTML/CSS', 'JavaScript', 'React'],
      description: 'Build and maintain modern, responsive websites.'
    },
    {
      title: 'Digital Marketing Specialist',
      type: 'Part-time',
      skills: ['SEO', 'PPC', 'Analytics'],
      description: 'Drive online growth through strategic digital marketing.'
    },
    {
      title: 'Graphic Designer',
      type: 'Part-time',
      skills: ['Photoshop', 'Illustrator', 'Canva'],
      description: 'Create stunning visual content for various platforms.'
    },
    {
      title: 'Virtual Assistant',
      type: 'Part-time',
      skills: ['Admin Tasks', 'Communication', 'Organization'],
      description: 'Provide administrative support and help streamline operations.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      {/* Navigation */}
      <NavigationBar 
        onShowApplicationForm={() => setShowApplicationForm(true)}
        scrollToSection={scrollToSection}
      />

      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Tagora</span> Team
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We're hiring talented individuals for part-time positions in content writing, 
              social media management, web development, and more. Work remotely with a dynamic team 
              and grow your career with us.
            </p>
            <div className="space-x-4">
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Apply Now
              </button>
              <button 
                onClick={() => scrollToSection('openings')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                View Openings
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-slate-800 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Why Choose <span className="text-blue-500">Tagora?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-white mb-4">Remote First</h3>
                <p className="text-gray-300">Work from anywhere with flexible schedules that fit your lifestyle.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-white mb-4">Competitive Pay</h3>
                <p className="text-gray-300">Fair compensation for your skills with opportunities for growth.</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-white mb-4">Skill Development</h3>
                <p className="text-gray-300">Learn new technologies and advance your career with our support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section id="openings" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Current <span className="text-blue-500">Openings</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openings.map((job, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{job.type}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="bg-slate-600 text-gray-300 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowApplicationForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300"
                  >
                    Apply for this role
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-slate-800 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Ready to <span className="text-blue-500">Get Started?</span>
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join hundreds of talented professionals who have chosen Tagora for their career growth.
            </p>
            <div className="space-x-4">
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Start Your Application
              </button>
              <button 
                onClick={() => window.open('mailto:careers@tagora.com')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                📧 Contact HR
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <ApplicationForm onClose={() => setShowApplicationForm(false)} />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<TagoraHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
          
          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
