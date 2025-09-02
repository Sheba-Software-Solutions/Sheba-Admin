import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Eye, 
  Trash2,
  Bell,
  Users,
  FileText,
  Search,
  Filter
} from 'lucide-react';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'contacts', name: 'Contact Forms', icon: Mail },
    { id: 'newsletters', name: 'Newsletter', icon: Send },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'templates', name: 'Email Templates', icon: FileText }
  ];

  const messages = [
    {
      id: 1,
      from: 'alemayehu@ethiopay.com',
      subject: 'Project Update Request',
      message: 'Hi team, could you please provide an update on the mobile app development progress?',
      timestamp: '2024-01-15 10:30',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      from: 'meron@agritech.et',
      subject: 'Meeting Schedule',
      message: 'I would like to schedule a meeting to discuss the platform features.',
      timestamp: '2024-01-15 09:15',
      read: true,
      priority: 'medium'
    },
    {
      id: 3,
      from: 'daniel@healthlink.com',
      subject: 'Thank You',
      message: 'Thank you for the excellent work on our website. The team is very happy with the results.',
      timestamp: '2024-01-14 16:45',
      read: true,
      priority: 'low'
    }
  ];

  const contactForms = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+251 91 123 4567',
      company: 'StartupXYZ',
      message: 'We are interested in developing a mobile app for our business.',
      timestamp: '2024-01-15 14:20',
      status: 'new'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      email: 'mary@techcorp.com',
      phone: '+251 92 234 5678',
      company: 'TechCorp',
      message: 'Looking for cloud migration services for our existing infrastructure.',
      timestamp: '2024-01-15 11:30',
      status: 'responded'
    }
  ];

  const newsletters = [
    {
      id: 1,
      email: 'subscriber1@example.com',
      name: 'Alice Brown',
      subscribeDate: '2024-01-10',
      status: 'active'
    },
    {
      id: 2,
      email: 'subscriber2@example.com',
      name: 'Bob Wilson',
      subscribeDate: '2024-01-08',
      status: 'active'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'New Project Assigned',
      message: 'You have been assigned to the EthioPay Mobile App project',
      timestamp: '2024-01-15 10:00',
      type: 'project',
      read: false
    },
    {
      id: 2,
      title: 'Client Meeting Reminder',
      message: 'Meeting with AgriTech Ethiopia in 1 hour',
      timestamp: '2024-01-15 09:00',
      type: 'meeting',
      read: true
    }
  ];

  const emailTemplates = [
    {
      id: 1,
      name: 'Welcome Email',
      subject: 'Welcome to Sheba Software',
      category: 'Onboarding',
      lastModified: '2024-01-10'
    },
    {
      id: 2,
      name: 'Project Completion',
      subject: 'Your Project Has Been Completed',
      category: 'Project',
      lastModified: '2024-01-08'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'messages':
        return (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`bg-white rounded-2xl p-6 shadow-lg card-hover border-l-4 ${
                message.read ? 'border-gray-300' : 'border-blue-600'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{message.subject}</h3>
                    <p className="text-gray-600">From: {message.from}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getPriorityColor(message.priority)}`}>
                      {message.priority}
                    </span>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{message.message}</p>
                <div className="flex items-center gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Reply
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'contacts':
        return (
          <div className="space-y-4">
            {contactForms.map((form) => (
              <div key={form.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{form.name}</h3>
                    <p className="text-gray-600">{form.company}</p>
                    <p className="text-sm text-gray-500">{form.email} • {form.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getStatusColor(form.status)}`}>
                      {form.status}
                    </span>
                    <span className="text-sm text-gray-500">{form.timestamp}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{form.message}</p>
                <div className="flex items-center gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Respond
                  </button>
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors duration-200">
                    Mark Responded
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'newsletters':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Newsletter Subscribers</h3>
              <div className="space-y-3">
                {newsletters.map((subscriber) => (
                  <div key={subscriber.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">{subscriber.name}</p>
                      <p className="text-sm text-gray-600">{subscriber.email}</p>
                      <p className="text-xs text-gray-500">Subscribed: {new Date(subscriber.subscribeDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`status-badge ${getStatusColor(subscriber.status)}`}>
                      {subscriber.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`bg-white rounded-2xl p-6 shadow-lg card-hover border-l-4 ${
                notification.read ? 'border-gray-300' : 'border-blue-600'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{notification.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge bg-blue-100 text-blue-800`}>
                      {notification.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'templates':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emailTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-2">{template.subject}</p>
                <p className="text-sm text-gray-500 mb-4">Category: {template.category}</p>
                <p className="text-xs text-gray-500 mb-4">Last modified: {new Date(template.lastModified).toLocaleDateString()}</p>
                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Edit
                  </button>
                  <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
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
          <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
          <p className="text-gray-600 mt-1">Manage messages, notifications, and email templates</p>
        </div>
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
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Communication;
