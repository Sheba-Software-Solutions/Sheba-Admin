import React, { useState, useEffect } from 'react';
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
  Edit,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { apiHelpers } from '../utils/api';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const { showToast } = useToast();

  // State for different data types
  const [companySettings, setCompanySettings] = useState(null);
  const [systemSettings, setSystemSettings] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);

  // Form data for modals
  const [formData, setFormData] = useState({
    // Company settings
    name: '',
    tagline: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: '',
    github_url: '',
    tax_id: '',
    registration_number: '',
    
    // System settings
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    smtp_use_tls: true,
    auto_backup_enabled: false,
    backup_frequency: 'weekly',
    session_timeout: 30,
    max_login_attempts: 5,
    password_expiry_days: 90,
    api_rate_limit: 1000,
    
    // User permissions
    user_id: 1,
    permission: 'dashboard.view',
    granted: true,
    granted_by_id: 1
  });

  const tabs = [
    { id: 'company', name: 'Company Info', icon: Building },
    { id: 'system', name: 'System Settings', icon: Shield },
    { id: 'permissions', name: 'User Permissions', icon: Users },
    { id: 'logs', name: 'System Logs', icon: FileText },
    { id: 'health', name: 'System Health', icon: Database }
  ];

  // Load data based on active tab
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      switch (activeTab) {
        case 'company':
          const companyRes = await apiHelpers.getCompanySettings();
          setCompanySettings(companyRes?.data);
          break;
          
        case 'system':
          const systemRes = await apiHelpers.getSystemSettings();
          setSystemSettings(systemRes?.data);
          break;
          
        case 'permissions':
          const permissionsRes = await apiHelpers.getUserPermissions({ ordering: '-created_at' });
          const permissionsData = permissionsRes?.data;
          setUserPermissions(Array.isArray(permissionsData) ? permissionsData : (permissionsData?.results || []));
          break;
          
        case 'logs':
          const logsRes = await apiHelpers.getSystemLogs({ ordering: '-created_at' });
          const logsData = logsRes?.data;
          setSystemLogs(Array.isArray(logsData) ? logsData : (logsData?.results || []));
          break;
          
        case 'health':
          // This would be a custom API call for system health
          setSystemHealth({
            status: 'healthy',
            database: 'connected',
            storage: 'available',
            memory_usage: '45%',
            cpu_usage: '23%'
          });
          break;
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  const handleEdit = (item) => {
    if (activeTab === 'company') {
      setFormData({
        name: item.name || '',
        tagline: item.tagline || '',
        description: item.description || '',
        email: item.email || '',
        phone: item.phone || '',
        address: item.address || '',
        website: item.website || '',
        facebook_url: item.facebook_url || '',
        twitter_url: item.twitter_url || '',
        linkedin_url: item.linkedin_url || '',
        instagram_url: item.instagram_url || '',
        github_url: item.github_url || '',
        tax_id: item.tax_id || '',
        registration_number: item.registration_number || ''
      });
    } else if (activeTab === 'system') {
      setFormData({
        smtp_host: item.smtp_host || '',
        smtp_port: item.smtp_port || 587,
        smtp_username: item.smtp_username || '',
        smtp_password: item.smtp_password || '',
        smtp_use_tls: item.smtp_use_tls !== undefined ? item.smtp_use_tls : true,
        auto_backup_enabled: item.auto_backup_enabled !== undefined ? item.auto_backup_enabled : false,
        backup_frequency: item.backup_frequency || 'weekly',
        session_timeout: item.session_timeout || 30,
        max_login_attempts: item.max_login_attempts || 5,
        password_expiry_days: item.password_expiry_days || 90,
        api_rate_limit: item.api_rate_limit || 1000
      });
    } else if (activeTab === 'permissions') {
      setFormData({
        user_id: item.user_id || 1,
        permission: item.permission || 'dashboard.view',
        granted: item.granted !== undefined ? item.granted : true,
        granted_by_id: item.granted_by_id || 1
      });
    }
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      let response;
      
      switch (activeTab) {
        case 'company':
          const companyData = {
            name: formData.name,
            tagline: formData.tagline,
            description: formData.description,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            website: formData.website,
            facebook_url: formData.facebook_url,
            twitter_url: formData.twitter_url,
            linkedin_url: formData.linkedin_url,
            instagram_url: formData.instagram_url,
            github_url: formData.github_url,
            tax_id: formData.tax_id,
            registration_number: formData.registration_number
          };
          response = await apiHelpers.updateCompanySettings(companyData);
          break;
          
        case 'system':
          const systemData = {
            smtp_host: formData.smtp_host,
            smtp_port: formData.smtp_port,
            smtp_username: formData.smtp_username,
            smtp_password: formData.smtp_password,
            smtp_use_tls: formData.smtp_use_tls,
            auto_backup_enabled: formData.auto_backup_enabled,
            backup_frequency: formData.backup_frequency,
            session_timeout: formData.session_timeout,
            max_login_attempts: formData.max_login_attempts,
            password_expiry_days: formData.password_expiry_days,
            api_rate_limit: formData.api_rate_limit
          };
          response = await apiHelpers.updateSystemSettings(systemData);
          break;
          
        case 'permissions':
          const permissionData = {
            user_id: formData.user_id,
            permission: formData.permission,
            granted: formData.granted,
            granted_by_id: formData.granted_by_id
          };
          if (editingItem) {
            response = await apiHelpers.updateUserPermission(editingItem.id, permissionData);
          } else {
            response = await apiHelpers.createUserPermission(permissionData);
          }
          break;
      }
      
      showToast(`${activeTab} settings ${editingItem ? 'updated' : 'saved'} successfully`, 'success');
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Failed to save:', error);
      showToast('Failed to save settings', 'error');
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to delete this permission?')) return;
    
    try {
      await apiHelpers.deleteUserPermission(item.id);
      showToast('Permission deleted successfully', 'success');
      loadData();
    } catch (error) {
      console.error('Failed to delete:', error);
      showToast('Failed to delete permission', 'error');
    }
  };

  const handleBackup = async () => {
    try {
      await apiHelpers.backupDatabase();
      showToast('Database backup initiated', 'success');
    } catch (error) {
      console.error('Failed to backup:', error);
      showToast('Failed to initiate backup', 'error');
    }
  };

  const handleRestore = async () => {
    try {
      await apiHelpers.restoreDatabase();
      showToast('Database restore initiated', 'success');
    } catch (error) {
      console.error('Failed to restore:', error);
      showToast('Failed to initiate restore', 'error');
    }
  };

  const getLogLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'debug': return 'bg-gray-100 text-gray-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (activeTab) {
      case 'company':
        return (
          <div className="space-y-6">
            {companySettings && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Company Information</h3>
                  <button onClick={() => handleEdit(companySettings)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                    <p className="text-gray-600 mb-1"><strong>Name:</strong> {companySettings.name}</p>
                    <p className="text-gray-600 mb-1"><strong>Email:</strong> {companySettings.email}</p>
                    <p className="text-gray-600 mb-1"><strong>Phone:</strong> {companySettings.phone}</p>
                    <p className="text-gray-600 mb-1"><strong>Website:</strong> {companySettings.website}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Business Details</h4>
                    <p className="text-gray-600 mb-1"><strong>Tax ID:</strong> {companySettings.tax_id}</p>
                    <p className="text-gray-600 mb-1"><strong>Registration:</strong> {companySettings.registration_number}</p>
                    <p className="text-gray-600 mb-1"><strong>Address:</strong> {companySettings.address}</p>
                  </div>
                </div>
                {companySettings.tagline && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Tagline</h4>
                    <p className="text-gray-600">{companySettings.tagline}</p>
                  </div>
                )}
                {companySettings.description && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{companySettings.description}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            {systemSettings && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">System Configuration</h3>
                  <button onClick={() => handleEdit(systemSettings)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Email Settings</h4>
                    <p className="text-gray-600 mb-1"><strong>SMTP Host:</strong> {systemSettings.smtp_host}</p>
                    <p className="text-gray-600 mb-1"><strong>SMTP Port:</strong> {systemSettings.smtp_port}</p>
                    <p className="text-gray-600 mb-1"><strong>Username:</strong> {systemSettings.smtp_username}</p>
                    <p className="text-gray-600 mb-1"><strong>Use TLS:</strong> {systemSettings.smtp_use_tls ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Security Settings</h4>
                    <p className="text-gray-600 mb-1"><strong>Session Timeout:</strong> {systemSettings.session_timeout} minutes</p>
                    <p className="text-gray-600 mb-1"><strong>Max Login Attempts:</strong> {systemSettings.max_login_attempts}</p>
                    <p className="text-gray-600 mb-1"><strong>Password Expiry:</strong> {systemSettings.password_expiry_days} days</p>
                    <p className="text-gray-600 mb-1"><strong>API Rate Limit:</strong> {systemSettings.api_rate_limit}/hour</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Backup Settings</h4>
                  <p className="text-gray-600 mb-1"><strong>Auto Backup:</strong> {systemSettings.auto_backup_enabled ? 'Enabled' : 'Disabled'}</p>
                  <p className="text-gray-600 mb-1"><strong>Frequency:</strong> {systemSettings.backup_frequency}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'permissions':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">User Permissions</h3>
              <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Permission
              </button>
            </div>
            {userPermissions.map((permission) => (
              <div key={permission.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{permission.user?.username || `User ${permission.user_id}`}</h4>
                    <p className="text-gray-600">{permission.permission_display || permission.permission}</p>
                    <p className="text-sm text-gray-500">Created: {new Date(permission.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${permission.granted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {permission.granted ? 'Granted' : 'Denied'}
                    </span>
                    <button onClick={() => handleEdit(permission)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(permission)} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'logs':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">System Logs</h3>
            {systemLogs.map((log) => (
              <div key={log.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`status-badge ${getLogLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                      <span className="text-sm text-gray-500">{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-900 mb-2">{log.message}</p>
                    {log.module && (
                      <p className="text-sm text-gray-500">Module: {log.module}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'health':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">System Health</h3>
            {systemHealth && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h4 className="text-lg font-bold text-gray-900">System Status</h4>
                  </div>
                  <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className="text-green-600 capitalize">{systemHealth.status}</span></p>
                  <p className="text-gray-600 mb-2"><strong>Database:</strong> <span className="text-green-600 capitalize">{systemHealth.database}</span></p>
                  <p className="text-gray-600 mb-2"><strong>Storage:</strong> <span className="text-green-600 capitalize">{systemHealth.storage}</span></p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-bold text-gray-900">Resource Usage</h4>
                  </div>
                  <p className="text-gray-600 mb-2"><strong>Memory Usage:</strong> {systemHealth.memory_usage}</p>
                  <p className="text-gray-600 mb-2"><strong>CPU Usage:</strong> {systemHealth.cpu_usage}</p>
                </div>
              </div>
            )}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Database Operations</h4>
              <div className="flex items-center gap-4">
                <button onClick={handleBackup} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Backup Database
                </button>
                <button onClick={handleRestore} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Restore Database
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderModal = () => {
    if (!showModal) return null;

    const getModalTitle = () => {
      switch (activeTab) {
        case 'company': return 'Edit Company Settings';
        case 'system': return 'Edit System Settings';
        case 'permissions': return editingItem ? 'Edit Permission' : 'Add Permission';
        default: return 'Edit Settings';
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{getModalTitle()}</h2>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
            {activeTab === 'company' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                  <input type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                    <input type="text" name="tax_id" value={formData.tax_id} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                    <input type="text" name="registration_number" value={formData.registration_number} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                    <input type="url" name="facebook_url" value={formData.facebook_url} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                    <input type="url" name="twitter_url" value={formData.twitter_url} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                    <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'system' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                    <input type="text" name="smtp_host" value={formData.smtp_host} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                    <input type="number" name="smtp_port" value={formData.smtp_port} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                    <input type="text" name="smtp_username" value={formData.smtp_username} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                    <input type="password" name="smtp_password" value={formData.smtp_password} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="smtp_use_tls" checked={formData.smtp_use_tls} onChange={handleInputChange} className="mr-2" />
                  <label className="text-sm font-medium text-gray-700">Use TLS</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input type="number" name="session_timeout" value={formData.session_timeout} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                    <input type="number" name="max_login_attempts" value={formData.max_login_attempts} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                    <input type="number" name="password_expiry_days" value={formData.password_expiry_days} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit</label>
                    <input type="number" name="api_rate_limit" value={formData.api_rate_limit} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="auto_backup_enabled" checked={formData.auto_backup_enabled} onChange={handleInputChange} className="mr-2" />
                  <label className="text-sm font-medium text-gray-700">Enable Auto Backup</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                  <select name="backup_frequency" value={formData.backup_frequency} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === 'permissions' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                  <input type="number" name="user_id" value={formData.user_id} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permission</label>
                  <select name="permission" value={formData.permission} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="dashboard.view">View Dashboard</option>
                    <option value="projects.view">View Projects</option>
                    <option value="projects.add">Add Projects</option>
                    <option value="projects.change">Edit Projects</option>
                    <option value="projects.delete">Delete Projects</option>
                    <option value="clients.view">View Clients</option>
                    <option value="clients.add">Add Clients</option>
                    <option value="clients.change">Edit Clients</option>
                    <option value="clients.delete">Delete Clients</option>
                    <option value="content.view">View Content</option>
                    <option value="content.add">Add Content</option>
                    <option value="content.change">Edit Content</option>
                    <option value="content.delete">Delete Content</option>
                    <option value="communication.view">View Communication</option>
                    <option value="communication.add">Add Communication</option>
                    <option value="communication.change">Edit Communication</option>
                    <option value="communication.delete">Delete Communication</option>
                    <option value="settings.view">View Settings</option>
                    <option value="settings.change">Edit Settings</option>
                    <option value="users.view">View Users</option>
                    <option value="users.add">Add Users</option>
                    <option value="users.change">Edit Users</option>
                    <option value="users.delete">Delete Users</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="granted" checked={formData.granted} onChange={handleInputChange} className="mr-2" />
                  <label className="text-sm font-medium text-gray-700">Granted</label>
                </div>
              </>
            )}

            <div className="flex items-center gap-4 pt-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingItem ? 'Update' : 'Save'}
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage system configuration and user permissions</p>
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

      {/* Modal */}
      {renderModal()}
    </div>
  );
  };

export default Settings;
