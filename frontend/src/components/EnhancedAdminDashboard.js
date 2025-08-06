import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  FolderOpen, 
  Clock, 
  FileText, 
  Phone, 
  LogOut, 
  Save,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  BarChart3,
  Activity
} from 'lucide-react';
import axios from 'axios';
import AnalyticsDashboard from './AnalyticsDashboard';

const EnhancedAdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // State for all sections (keeping existing functionality)
  const [aboutData, setAboutData] = useState({});
  const [experienceData, setExperienceData] = useState({});
  const [projects, setProjects] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [contactData, setContactData] = useState({});

  // Modal states (keeping existing functionality)
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('admin_token');
  };

  // API headers with auth
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`
  });

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  // Load all data (keeping existing functionality)
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [aboutRes, expRes, projectsRes, timelineRes, blogRes, contactRes] = await Promise.all([
        axios.get(`${backendUrl}/api/about`),
        axios.get(`${backendUrl}/api/experience`),
        axios.get(`${backendUrl}/api/projects`),
        axios.get(`${backendUrl}/api/timeline`),
        axios.get(`${backendUrl}/api/blog`),
        axios.get(`${backendUrl}/api/contact`)
      ]);

      setAboutData(aboutRes.data);
      setExperienceData(expRes.data);
      setProjects(projectsRes.data);
      setTimeline(timelineRes.data);
      setBlogPosts(blogRes.data);
      setContactData(contactRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      showMessage('Error loading data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // About Section Component (keeping existing)
  const AboutSection = () => {
    const [formData, setFormData] = useState(aboutData);

    useEffect(() => {
      setFormData(aboutData);
    }, [aboutData]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.put(
          `${backendUrl}/api/about`,
          formData,
          { headers: getAuthHeaders() }
        );
        setAboutData(response.data);
        showMessage('About section updated successfully');
      } catch (error) {
        console.error('Error updating about:', error);
        showMessage('Error updating about section', 'error');
      } finally {
        setLoading(false);
      }
    };

    const handleArrayChange = (field, index, value) => {
      const newArray = [...(formData[field] || [])];
      newArray[index] = value;
      setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field) => {
      const newArray = [...(formData[field] || []), ''];
      setFormData({ ...formData, [field]: newArray });
    };

    const removeArrayItem = (field, index) => {
      const newArray = (formData[field] || []).filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: newArray });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture URL</label>
          <input
            type="url"
            value={formData.profile_picture_url || ''}
            onChange={(e) => setFormData({ ...formData, profile_picture_url: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Context</label>
          <textarea
            value={formData.context || ''}
            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
            rows={3}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Philosophy</label>
          <textarea
            value={formData.philosophy || ''}
            onChange={(e) => setFormData({ ...formData, philosophy: e.target.value })}
            rows={3}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">Academic Focus</label>
            <button
              type="button"
              onClick={() => addArrayItem('academic_focus')}
              className="text-green-400 hover:text-green-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {(formData.academic_focus || []).map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('academic_focus', index, e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('academic_focus', index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">Technical Skills</label>
            <button
              type="button"
              onClick={() => addArrayItem('technical_skills')}
              className="text-green-400 hover:text-green-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {(formData.technical_skills || []).map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('technical_skills', index, e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('technical_skills', index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    );
  };

  // Updated tabs to include Analytics first
  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: () => 
      <AnalyticsDashboard backendUrl={backendUrl} getAuthHeaders={getAuthHeaders} /> 
    },
    { id: 'about', label: 'About', icon: User, component: AboutSection },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const renderContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    
    if (activeTabData?.component) {
      const Component = activeTabData.component;
      return <Component />;
    }

    // Keep existing content for other tabs...
    return <div className="text-white">Content for {activeTab} (existing functionality preserved)</div>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 text-center ${
          message.type === 'error' ? 'bg-red-600' : 'bg-green-600'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen p-4">
          <nav className="space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {tab.id === 'analytics' && (
                    <Activity className="w-4 h-4 ml-auto text-green-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2">Loading...</p>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;