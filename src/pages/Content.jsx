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
  Upload
} from 'lucide-react';

const Content = () => {
  const [activeTab, setActiveTab] = useState('website');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'website', name: 'Website Content', icon: Globe },
    { id: 'blog', name: 'Blog Posts', icon: FileText },
    { id: 'portfolio', name: 'Portfolio', icon: Image },
    { id: 'services', name: 'Services', icon: Edit },
    { id: 'team', name: 'Team Members', icon: Users }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Software Development in Ethiopia',
      author: 'Abebe Tadesse',
      status: 'Published',
      publishDate: '2024-01-15',
      views: 1250,
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Building Scalable Web Applications',
      author: 'Meron Haile',
      status: 'Draft',
      publishDate: null,
      views: 0,
      category: 'Development'
    },
    {
      id: 3,
      title: 'Digital Transformation in Ethiopian Businesses',
      author: 'Daniel Bekele',
      status: 'Published',
      publishDate: '2024-01-10',
      views: 890,
      category: 'Business'
    }
  ];

  const portfolioProjects = [
    {
      id: 1,
      title: 'EthioPay Mobile App',
      category: 'FinTech',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
      status: 'Featured',
      technologies: ['React Native', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'AgriTech Platform',
      category: 'Agriculture',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
      status: 'Active',
      technologies: ['React', 'Python', 'PostgreSQL']
    },
    {
      id: 3,
      title: 'HealthLink Website',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      status: 'Active',
      technologies: ['Next.js', 'Tailwind', 'Strapi']
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Abebe Tadesse',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Visionary leader with 10+ years in software development and business strategy.',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Meron Haile',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      bio: 'Technical expert specializing in scalable architecture and emerging technologies.',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Daniel Bekele',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      bio: 'Full-stack developer passionate about creating elegant, efficient solutions.',
      status: 'Active'
    }
  ];

  const services = [
    {
      id: 1,
      title: 'Custom Software Development',
      description: 'Transform your vision into powerful, scalable software solutions.',
      features: ['Enterprise Software', 'API Development', 'Legacy Modernization'],
      status: 'Active'
    },
    {
      id: 2,
      title: 'Website Development',
      description: 'Create stunning, responsive websites that captivate your audience.',
      features: ['Responsive Design', 'E-commerce', 'CMS'],
      status: 'Active'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications.',
      features: ['iOS & Android', 'Cross-Platform', 'UI/UX Design'],
      status: 'Active'
    }
  ];

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
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Website Sections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Hero Section', 'About Us', 'Services', 'Contact Info'].map((section) => (
                  <div key={section} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{section}</span>
                      <Edit className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200">
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
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Edit
                    </button>
                    <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200">
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
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Service
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
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Edit
                    </button>
                    <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200">
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
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Content
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
    </div>
  );
};

export default Content;
