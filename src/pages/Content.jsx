import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  FileText,
  Image,
  Users,
  Globe,
  Save,
  Upload,
  X,
  FolderOpen
} from 'lucide-react';

const Content = () => {
  const [activeTab, setActiveTab] = useState('website');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState('');

  // Website Content State
  const [websiteContent, setWebsiteContent] = useState([
    { id: 1, section: 'Hero Section', title: 'Welcome to Sheba Software', content: 'Transform your vision into powerful, scalable software solutions.', lastModified: '2024-01-15' },
    { id: 2, section: 'About Us', title: 'About Sheba Software', content: 'We are a leading software development company in Ethiopia.', lastModified: '2024-01-14' },
    { id: 3, section: 'Services', title: 'Our Services', content: 'Custom software development, web applications, mobile apps.', lastModified: '2024-01-13' },
    { id: 4, section: 'Contact Info', title: 'Contact Information', content: 'Get in touch with us for your next project.', lastModified: '2024-01-12' }
  ]);

  const tabs = [
    { id: 'website', name: 'Website Content', icon: Globe },
    { id: 'blog', name: 'Blog Posts', icon: FileText },
    { id: 'portfolio', name: 'Portfolio', icon: Image },
    { id: 'services', name: 'Services', icon: Edit },
    { id: 'team', name: 'Team Members', icon: Users }
  ];

  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'The Future of Software Development in Ethiopia',
      author: 'Abebe Tadesse',
      status: 'Published',
      publishDate: '2024-01-15',
      views: 1250,
      category: 'Technology',
      content: 'Exploring the future trends in software development...'
    },
    {
      id: 2,
      title: 'Building Scalable Web Applications',
      author: 'Meron Haile',
      status: 'Draft',
      publishDate: null,
      views: 0,
      category: 'Development',
      content: 'Best practices for building scalable applications...'
    },
    {
      id: 3,
      title: 'Digital Transformation in Ethiopian Businesses',
      author: 'Daniel Bekele',
      status: 'Published',
      publishDate: '2024-01-10',
      views: 890,
      category: 'Business',
      content: 'How digital transformation is changing business...'
    }
  ]);

  // Portfolio Projects State
  const [portfolioProjects, setPortfolioProjects] = useState([
    {
      id: 1,
      title: 'EthioPay Mobile App',
      category: 'FinTech',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
      status: 'Featured',
      technologies: ['React Native', 'Node.js', 'MongoDB'],
      description: 'A comprehensive mobile payment solution for Ethiopia.'
    },
    {
      id: 2,
      title: 'AgriTech Platform',
      category: 'Agriculture',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
      status: 'Active',
      technologies: ['React', 'Python', 'PostgreSQL'],
      description: 'Digital platform connecting farmers with modern agricultural solutions.'
    },
    {
      id: 3,
      title: 'HealthLink Website',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      status: 'Active',
      technologies: ['Next.js', 'Tailwind', 'Strapi'],
      description: 'Healthcare management system for medical professionals.'
    }
  ]);

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Abebe Tadesse',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Visionary leader with 10+ years in software development and business strategy.',
      status: 'Active',
      email: 'abebe@shebasoftware.com',
      phone: '+251 11 123 4567'
    },
    {
      id: 2,
      name: 'Meron Haile',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      bio: 'Technical expert specializing in scalable architecture and emerging technologies.',
      status: 'Active',
      email: 'meron@shebasoftware.com',
      phone: '+251 91 234 5678'
    },
    {
      id: 3,
      name: 'Daniel Bekele',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      bio: 'Full-stack developer passionate about creating elegant, efficient solutions.',
      status: 'Active',
      email: 'daniel@shebasoftware.com',
      phone: '+251 92 345 6789'
    }
  ]);

  // Services State
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Custom Software Development',
      description: 'Transform your vision into powerful, scalable software solutions.',
      features: ['Enterprise Software', 'API Development', 'Legacy Modernization'],
      status: 'Active',
      price: 'Starting from $5,000'
    },
    {
      id: 2,
      title: 'Website Development',
      description: 'Create stunning, responsive websites that captivate your audience.',
      features: ['Responsive Design', 'E-commerce', 'CMS'],
      status: 'Active',
      price: 'Starting from $2,000'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications.',
      features: ['iOS & Android', 'Cross-Platform', 'UI/UX Design'],
      status: 'Active',
      price: 'Starting from $8,000'
    }
  ]);

  // Form Data State
  const [formData, setFormData] = useState({
    // Website Content
    section: '',
    title: '',
    content: '',
    // Blog Post
    author: '',
    category: '',
    publishDate: '',
    status: 'Draft',
    views: 0,
    // Portfolio Project
    image: '',
    technologies: '',
    description: '',
    // Team Member
    name: '',
    role: '',
    bio: '',
    email: '',
    phone: '',
    // Service
    features: '',
    price: ''
  });

  // CRUD Handler Functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = (type) => {
    setFormData({
      section: '',
      title: '',
      content: '',
      author: '',
      category: '',
      publishDate: '',
      status: 'Draft',
      views: 0,
      image: '',
      technologies: '',
      description: '',
      name: '',
      role: '',
      bio: '',
      email: '',
      phone: '',
      features: '',
      price: ''
    });
    setEditingItem(null);
    setModalType(type);
    setShowModal(true);
  };

  const handleEdit = (item, type) => {
    setFormData({
      ...item,
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies || '',
      features: Array.isArray(item.features) ? item.features.join(', ') : item.features || ''
    });
    setEditingItem(item);
    setModalType(type);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title && !formData.name && !formData.section) {
      alert('Please fill in required fields');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    
    switch (modalType) {
      case 'website':
        if (editingItem) {
          setWebsiteContent(prev => prev.map(item => 
            item.id === editingItem.id 
              ? { ...item, section: formData.section, title: formData.title, content: formData.content, lastModified: currentDate }
              : item
          ));
        } else {
          const newItem = {
            id: Math.max(...websiteContent.map(w => w.id)) + 1,
            section: formData.section,
            title: formData.title,
            content: formData.content,
            lastModified: currentDate
          };
          setWebsiteContent(prev => [...prev, newItem]);
        }
        break;
        
      case 'blog':
        if (editingItem) {
          setBlogPosts(prev => prev.map(item => 
            item.id === editingItem.id 
              ? { ...item, title: formData.title, author: formData.author, category: formData.category, content: formData.content, status: formData.status, publishDate: formData.publishDate }
              : item
          ));
        } else {
          const newItem = {
            id: Math.max(...blogPosts.map(b => b.id)) + 1,
            title: formData.title,
            author: formData.author,
            category: formData.category,
            content: formData.content,
            status: formData.status,
            publishDate: formData.publishDate,
            views: 0
          };
          setBlogPosts(prev => [...prev, newItem]);
        }
        break;
        
      case 'portfolio':
        const techArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
        if (editingItem) {
          setPortfolioProjects(prev => prev.map(item => 
            item.id === editingItem.id 
              ? { ...item, title: formData.title, category: formData.category, image: formData.image, description: formData.description, technologies: techArray, status: formData.status }
              : item
          ));
        } else {
          const newItem = {
            id: Math.max(...portfolioProjects.map(p => p.id)) + 1,
            title: formData.title,
            category: formData.category,
            image: formData.image,
            description: formData.description,
            technologies: techArray,
            status: formData.status
          };
          setPortfolioProjects(prev => [...prev, newItem]);
        }
        break;
        
      case 'services':
        const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
        if (editingItem) {
          setServices(prev => prev.map(item => 
            item.id === editingItem.id 
              ? { ...item, title: formData.title, description: formData.description, features: featuresArray, price: formData.price, status: formData.status }
              : item
          ));
        } else {
          const newItem = {
            id: Math.max(...services.map(s => s.id)) + 1,
            title: formData.title,
            description: formData.description,
            features: featuresArray,
            price: formData.price,
            status: formData.status
          };
          setServices(prev => [...prev, newItem]);
        }
        break;
        
      case 'team':
        if (editingItem) {
          setTeamMembers(prev => prev.map(item => 
            item.id === editingItem.id 
              ? { ...item, name: formData.name, role: formData.role, bio: formData.bio, email: formData.email, phone: formData.phone, image: formData.image, status: formData.status }
              : item
          ));
        } else {
          const newItem = {
            id: Math.max(...teamMembers.map(t => t.id)) + 1,
            name: formData.name,
            role: formData.role,
            bio: formData.bio,
            email: formData.email,
            phone: formData.phone,
            image: formData.image,
            status: formData.status
          };
          setTeamMembers(prev => [...prev, newItem]);
        }
        break;
    }
    
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (type) {
        case 'website':
          setWebsiteContent(prev => prev.filter(item => item.id !== id));
          break;
        case 'blog':
          setBlogPosts(prev => prev.filter(item => item.id !== id));
          break;
        case 'portfolio':
          setPortfolioProjects(prev => prev.filter(item => item.id !== id));
          break;
        case 'services':
          setServices(prev => prev.filter(item => item.id !== id));
          break;
        case 'team':
          setTeamMembers(prev => prev.filter(item => item.id !== id));
          break;
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Published':
      case 'Active':
      case 'Featured':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'website':
        return (
          <div className="space-y-6">
            {websiteContent.map((content) => (
              <div key={content.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{content.section}</h3>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">{content.title}</h4>
                    <p className="text-gray-600">{content.content}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last modified: {new Date(content.lastModified).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(content, 'website')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(content.id, 'website')}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'blog':
        return (
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600">by {post.author}</p>
                  </div>
                  <span className={`status-badge ${getStatusBadge(post.status)}`}>
                    {post.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>Category: {post.category}</span>
                  {post.publishDate && <span>Published: {new Date(post.publishDate).toLocaleDateString()}</span>}
                  <span>Views: {post.views}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button 
                    onClick={() => handleEdit(post, 'blog')}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id, 'blog')}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'portfolio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                    <span className={`status-badge ${getStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{project.category}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(project, 'portfolio')}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id, 'portfolio')}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span key={feature} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`status-badge ${getStatusBadge(service.status)}`}>
                    {service.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEdit(service, 'services')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Service
                  </button>
                  <button 
                    onClick={() => handleDelete(service.id, 'services')}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'team':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                    </div>
                    <span className={`status-badge ${getStatusBadge(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(member, 'team')}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id, 'team')}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Manage website content, blog posts, and portfolio</p>
        </div>
        <button 
          onClick={() => handleAdd(activeTab)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add {tabs.find(tab => tab.id === activeTab)?.name.slice(0, -1) || 'Content'}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit' : 'Add'} {tabs.find(tab => tab.id === modalType)?.name.slice(0, -1) || 'Content'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              {modalType === 'website' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <input
                      type="text"
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Hero Section, About Us"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Content title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Content description"
                      required
                    />
                  </div>
                </>
              )}

              {modalType === 'blog' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Blog post title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Author name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Technology">Technology</option>
                      <option value="Development">Development</option>
                      <option value="Business">Business</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Blog post content"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                      <input
                        type="date"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}

              {modalType === 'portfolio' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Project title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., FinTech, Healthcare"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Project description"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Featured">Featured</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}

              {modalType === 'services' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Service title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Service description"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma-separated)</label>
                    <input
                      type="text"
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Starting from $5,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {modalType === 'team' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Job title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief biography"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+251 11 123 4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingItem ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
