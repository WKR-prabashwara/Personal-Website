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
  X
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // State for all sections
  const [aboutData, setAboutData] = useState({});
  const [experienceData, setExperienceData] = useState({});
  const [projects, setProjects] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [contactData, setContactData] = useState({});

  // Modal states
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

  // Load all data
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

  // About Section Component
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

  // Experience Section Component
  const ExperienceSection = () => {
    const [formData, setFormData] = useState(experienceData);

    useEffect(() => {
      setFormData(experienceData);
    }, [experienceData]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.put(
          `${backendUrl}/api/experience`,
          formData,
          { headers: getAuthHeaders() }
        );
        setExperienceData(response.data);
        showMessage('Experience section updated successfully');
      } catch (error) {
        console.error('Error updating experience:', error);
        showMessage('Error updating experience section', 'error');
      } finally {
        setLoading(false);
      }
    };

    const handleSkillChange = (index, field, value) => {
      const newSkills = [...(formData.technical_skills || [])];
      newSkills[index] = { ...newSkills[index], [field]: value };
      setFormData({ ...formData, technical_skills: newSkills });
    };

    const addSkill = () => {
      const newSkills = [...(formData.technical_skills || []), { name: '', level: 0 }];
      setFormData({ ...formData, technical_skills: newSkills });
    };

    const removeSkill = (index) => {
      const newSkills = (formData.technical_skills || []).filter((_, i) => i !== index);
      setFormData({ ...formData, technical_skills: newSkills });
    };

    const handleStatusChange = (field, value) => {
      const newStatus = { ...(formData.current_status || {}), [field]: value };
      setFormData({ ...formData, current_status: newStatus });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Technical Skills</h3>
            <button
              type="button"
              onClick={addSkill}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>
          
          {(formData.technical_skills || []).map((skill, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-800 rounded">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm text-gray-300 mb-1">Level (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skill.level || 0}
                    onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="self-end p-2 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Current Status</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Academic Level</label>
              <textarea
                value={formData.current_status?.academic_level || ''}
                onChange={(e) => handleStatusChange('academic_level', e.target.value)}
                rows={2}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Learning Focus</label>
              <textarea
                value={formData.current_status?.learning_focus || ''}
                onChange={(e) => handleStatusChange('learning_focus', e.target.value)}
                rows={3}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Future Goals</label>
              <textarea
                value={formData.current_status?.future_goals || ''}
                onChange={(e) => handleStatusChange('future_goals', e.target.value)}
                rows={3}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>
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

  // Contact Section Component
  const ContactSection = () => {
    const [formData, setFormData] = useState(contactData);

    useEffect(() => {
      setFormData(contactData);
    }, [contactData]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.put(
          `${backendUrl}/api/contact`,
          formData,
          { headers: getAuthHeaders() }
        );
        setContactData(response.data);
        showMessage('Contact information updated successfully');
      } catch (error) {
        console.error('Error updating contact:', error);
        showMessage('Error updating contact information', 'error');
      } finally {
        setLoading(false);
      }
    };

    const handleSocialLinkChange = (platform, url) => {
      const newSocialLinks = { ...(formData.social_links || {}), [platform]: url };
      setFormData({ ...formData, social_links: newSocialLinks });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="text"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
              <input
                type="url"
                value={formData.social_links?.github || ''}
                onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.social_links?.linkedin || ''}
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
              <input
                type="url"
                value={formData.social_links?.twitter || ''}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>
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

  const tabs = [
    { id: 'about', label: 'About', icon: User, component: AboutSection },
    { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceSection },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Phone, component: ContactSection }
  ];

  const renderContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    
    if (activeTabData?.component) {
      const Component = activeTabData.component;
      return <Component />;
    }

    // For projects, timeline, blog - show simple list view for now
    switch (activeTab) {
      case 'projects':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowProjectModal(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
            
            <div className="grid gap-4">
              {projects.map(project => (
                <div key={project.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">{project.title}</h3>
                      <p className="text-gray-400 text-sm">{project.description}</p>
                      <p className="text-gray-500 text-xs mt-1">Status: {project.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(project);
                          setShowProjectModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Timeline</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowTimelineModal(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>
            
            <div className="grid gap-4">
              {timeline.map(event => (
                <div key={event.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">{event.title}</h3>
                      <p className="text-gray-400 text-sm">{event.description}</p>
                      <p className="text-gray-500 text-xs mt-1">{event.year} - {event.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(event);
                          setShowTimelineModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Blog Posts</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowBlogModal(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Post
              </button>
            </div>
            
            <div className="grid gap-4">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">{post.title}</h3>
                      <p className="text-gray-400 text-sm">{post.excerpt}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {post.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(post);
                          setShowBlogModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div className="text-white">Select a tab to manage content</div>;
    }
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

export default AdminDashboard;