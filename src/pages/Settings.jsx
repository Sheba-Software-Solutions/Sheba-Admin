import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Building, 
  Users, 
  Shield, 
  Key,
  Database,
  FileText,
  Save,
  Upload,
  Download,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: 'company', name: 'Company Info', icon: Building },
    { id: 'users', name: 'User Permissions', icon: Users },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'backup', name: 'Backup & Restore', icon: Database },
    { id: 'logs', name: 'System Logs', icon: FileText }
  ];

  const users = [
    {
      id: 1,
      name: 'Abebe Tadesse',
      email: 'abebe@shebasoftware.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-15 10:30'
    },
    {
      id: 2,
      name: 'Meron Haile',
      email: 'meron@shebasoftware.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-01-15 09:15'
    },
    {
      id: 3,
      name: 'Daniel Bekele',
      email: 'daniel@shebasoftware.com',
      role: 'Developer',
      status: 'Active',
      lastLogin: '2024-01-14 16:45'
    }
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Production API',
      key: 'sk_prod_1234567890abcdef',
      created: '2024-01-01',
      lastUsed: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Development API',
      key: 'sk_dev_abcdef1234567890',
      created: '2024-01-01',
      lastUsed: '2024-01-14',
      status: 'Active'
    }
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 10:30:45',
      level: 'INFO',
      message: 'User login successful: abebe@shebasoftware.com',
      source: 'Authentication'
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:25:12',
      level: 'WARNING',
      message: 'Failed login attempt from IP: 192.168.1.100',
      source: 'Security'
    },
    {
      id: 3,
      timestamp: '2024-01-15 09:15:30',
      level: 'INFO',
      message: 'Project created: EthioPay Mobile App',
      source: 'Projects'
    },
    {
      id: 4,
      timestamp: '2024-01-15 08:45:22',
      level: 'ERROR',
      message: 'Database connection timeout',
      source: 'Database'
    }
  ];

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800';
      case 'INFO': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input 
                  type="text" 
                  defaultValue="Sheba Software"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue="info@shebasoftware.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  defaultValue="+251 11 123 4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input 
                  type="url" 
                  defaultValue="https://shebasoftware.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea 
                  defaultValue="Addis Ababa, Ethiopia"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">User Management</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {user.role}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {user.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900">Session Timeout</h4>
                    <p className="text-sm text-gray-600">Automatically log out inactive users</p>
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>4 hours</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900">Password Requirements</h4>
                    <p className="text-sm text-gray-600">Enforce strong password policies</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">API Keys</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Generate Key
                </button>
              </div>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {apiKey.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <code className="bg-gray-100 px-3 py-2 rounded-lg text-sm font-mono flex-1">
                        {showApiKey ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                      </code>
                      <button 
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Created: {new Date(apiKey.created).toLocaleDateString()}</span>
                      <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Backup & Restore</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                  <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">Create Backup</h4>
                  <p className="text-sm text-gray-600 mb-4">Export all system data and configurations</p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto">
                    <Download className="w-5 h-5" />
                    Create Backup
                  </button>
                </div>
                
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                  <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">Restore Data</h4>
                  <p className="text-sm text-gray-600 mb-4">Import data from a backup file</p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 mx-auto">
                    <Upload className="w-5 h-5" />
                    Upload Backup
                  </button>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Recent Backups</h4>
                <div className="space-y-3">
                  {['2024-01-15_backup.zip', '2024-01-14_backup.zip', '2024-01-13_backup.zip'].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{backup}</p>
                        <p className="text-sm text-gray-600">Size: 125 MB</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">System Logs</h3>
              <div className="flex items-center gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>All Levels</option>
                  <option>ERROR</option>
                  <option>WARNING</option>
                  <option>INFO</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Refresh
                </button>
              </div>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl">
                  <span className={`status-badge ${getLogLevelColor(log.level)} shrink-0`}>
                    {log.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{log.message}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>{log.timestamp}</span>
                      <span>Source: {log.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure system preferences and security</p>
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

export default Settings;
