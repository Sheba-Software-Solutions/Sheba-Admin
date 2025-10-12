import React, { useState, useEffect } from 'react';
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
  Filter,
  Plus,
  Edit,
  Save,
  X
} from 'lucide-react';
import { apiHelpers } from '../utils/api';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { showToast } = useToast();

  // State for different data types
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Form data for modals
  const [formData, setFormData] = useState({
    // Contact submission form
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    status: 'new',
    response: '',
    
    // Email template form
    template_name: '',
    template_type: 'welcome',
    template_subject: '',
    template_content: '',
    is_active: true,
    
    // Newsletter form
    newsletter_title: '',
    newsletter_content: '',
    newsletter_status: 'draft',
    scheduled_at: '',
    
    // Subscriber form
    subscriber_email: '',
    subscriber_name: '',
    is_active: true,
    
    // Notification form
    notification_title: '',
    notification_message: '',
    notification_type: 'info',
    recipient_id: 1
  });

  const tabs = [
    { id: 'contacts', name: 'Contact Forms', icon: Mail },
    { id: 'templates', name: 'Email Templates', icon: FileText },
    { id: 'newsletters', name: 'Newsletters', icon: Send },
    { id: 'subscribers', name: 'Subscribers', icon: Users },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  // Load data based on active tab
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      switch (activeTab) {
        case 'contacts':
          const contactsRes = await apiHelpers.getContactSubmissions({ ordering: '-created_at' });
          const contactsData = contactsRes?.data;
          setContactSubmissions(Array.isArray(contactsData) ? contactsData : (contactsData?.results || []));
          break;
          
        case 'templates':
          const templatesRes = await apiHelpers.getEmailTemplates({ ordering: '-created_at' });
          const templatesData = templatesRes?.data;
          setEmailTemplates(Array.isArray(templatesData) ? templatesData : (templatesData?.results || []));
          break;
          
        case 'newsletters':
          const newslettersRes = await apiHelpers.getNewsletters({ ordering: '-created_at' });
          const newslettersData = newslettersRes?.data;
          setNewsletters(Array.isArray(newslettersData) ? newslettersData : (newslettersData?.results || []));
          break;
          
        case 'subscribers':
          const subscribersRes = await apiHelpers.getSubscribers({ ordering: '-subscribed_at' });
          const subscribersData = subscribersRes?.data;
          setSubscribers(Array.isArray(subscribersData) ? subscribersData : (subscribersData?.results || []));
          break;
          
        case 'notifications':
          const notificationsRes = await apiHelpers.getNotifications({ ordering: '-created_at' });
          const notificationsData = notificationsRes?.data;
          setNotifications(Array.isArray(notificationsData) ? notificationsData : (notificationsData?.results || []));
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
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAdd = () => {
    setFormData({
      name: '', email: '', phone: '', subject: '', message: '', status: 'new', response: '',
      template_name: '', template_type: 'welcome', template_subject: '', template_content: '', is_active: true,
      newsletter_title: '', newsletter_content: '', newsletter_status: 'draft', scheduled_at: '',
      subscriber_email: '', subscriber_name: '', is_active: true,
      notification_title: '', notification_message: '', notification_type: 'info', recipient_id: 1
    });
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || '', email: item.email || '', phone: item.phone || '', 
      subject: item.subject || '', message: item.message || '', status: item.status || 'new', 
      response: item.response || '',
      template_name: item.name || '', template_type: item.template_type || 'welcome', 
      template_subject: item.subject || '', template_content: item.content || '', 
      is_active: item.is_active !== undefined ? item.is_active : true,
      newsletter_title: item.title || '', newsletter_content: item.content || '', 
      newsletter_status: item.status || 'draft', scheduled_at: item.scheduled_at || '',
      subscriber_email: item.email || '', subscriber_name: item.name || '', 
      is_active: item.is_active !== undefined ? item.is_active : true,
      notification_title: item.title || '', notification_message: item.message || '', 
      notification_type: item.notification_type || 'info', recipient_id: item.recipient_id || 1
    });
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      let response;
      
      switch (activeTab) {
        case 'contacts':
          const contactData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            status: formData.status,
            response: formData.response
          };
          if (editingItem) {
            response = await apiHelpers.updateContactSubmission(editingItem.id, contactData);
          } else {
            response = await apiHelpers.createContactSubmission(contactData);
          }
          break;
          
        case 'templates':
          const templateData = {
            name: formData.template_name,
            template_type: formData.template_type,
            subject: formData.template_subject,
            content: formData.template_content,
            is_active: formData.is_active
          };
          if (editingItem) {
            response = await apiHelpers.updateEmailTemplate(editingItem.id, templateData);
          } else {
            response = await apiHelpers.createEmailTemplate(templateData);
          }
          break;
          
        case 'newsletters':
          const newsletterData = {
            title: formData.newsletter_title,
            content: formData.newsletter_content,
            status: formData.newsletter_status,
            scheduled_at: formData.scheduled_at || null,
            created_by_id: 1 // Current user ID
          };
          if (editingItem) {
            response = await apiHelpers.updateNewsletter(editingItem.id, newsletterData);
          } else {
            response = await apiHelpers.createNewsletter(newsletterData);
          }
          break;
          
        case 'subscribers':
          const subscriberData = {
            email: formData.subscriber_email,
            name: formData.subscriber_name,
            is_active: formData.is_active
          };
          if (editingItem) {
            response = await apiHelpers.updateSubscriber(editingItem.id, subscriberData);
          } else {
            response = await apiHelpers.createSubscriber(subscriberData);
          }
          break;
          
        case 'notifications':
          const notificationData = {
            title: formData.notification_title,
            message: formData.notification_message,
            notification_type: formData.notification_type,
            recipient_id: formData.recipient_id
          };
          if (editingItem) {
            response = await apiHelpers.updateNotification(editingItem.id, notificationData);
          } else {
            response = await apiHelpers.createNotification(notificationData);
          }
          break;
      }
      
      showToast(`${activeTab.slice(0, -1)} ${editingItem ? 'updated' : 'created'} successfully`, 'success');
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Failed to save:', error);
      showToast('Failed to save', 'error');
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      switch (activeTab) {
        case 'contacts':
          await apiHelpers.deleteContactSubmission(item.id);
          break;
        case 'templates':
          await apiHelpers.deleteEmailTemplate(item.id);
          break;
        case 'newsletters':
          await apiHelpers.deleteNewsletter(item.id);
          break;
        case 'subscribers':
          await apiHelpers.deleteSubscriber(item.id);
          break;
        case 'notifications':
          await apiHelpers.deleteNotification(item.id);
          break;
      }
      showToast('Item deleted successfully', 'success');
      loadData();
    } catch (error) {
      console.error('Failed to delete:', error);
      showToast('Failed to delete', 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (activeTab) {
      case 'contacts':
        return (
          <div className="space-y-4">
            {contactSubmissions.map((contact) => (
              <div key={contact.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email}</p>
                    <p className="text-sm text-gray-500">{contact.phone} • {new Date(contact.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                    <button onClick={() => handleEdit(contact)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(contact)} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900">{contact.subject}</h4>
                  <p className="text-gray-700 mt-2">{contact.message}</p>
                </div>
                {contact.response && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Response:</h5>
                    <p className="text-gray-700">{contact.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'templates':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emailTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                    <p className="text-gray-600 mb-2">{template.subject}</p>
                    <p className="text-sm text-gray-500">Type: {template.template_type}</p>
                    <p className="text-xs text-gray-500">Last modified: {new Date(template.updated_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getStatusColor(template.is_active ? 'active' : 'inactive')}`}>
                      {template.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <button onClick={() => handleEdit(template)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(template)} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 line-clamp-3">
                  {template.content}
                </div>
              </div>
            ))}
          </div>
        );

      case 'newsletters':
        return (
          <div className="space-y-4">
            {newsletters.map((newsletter) => (
              <div key={newsletter.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{newsletter.title}</h3>
                    <p className="text-sm text-gray-500">Created: {new Date(newsletter.created_at).toLocaleDateString()}</p>
                    {newsletter.scheduled_at && (
                      <p className="text-sm text-gray-500">Scheduled: {new Date(newsletter.scheduled_at).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getStatusColor(newsletter.status)}`}>
                      {newsletter.status}
                    </span>
                    <button onClick={() => handleEdit(newsletter)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(newsletter)} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {newsletter.content}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Recipients: {newsletter.recipients_count}</span>
                  <span>Opened: {newsletter.opened_count}</span>
                  <span>Clicked: {newsletter.clicked_count}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'subscribers':
        return (
          <div className="space-y-4">
            {subscribers.map((subscriber) => (
              <div key={subscriber.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{subscriber.name || 'No Name'}</h3>
                    <p className="text-gray-600">{subscriber.email}</p>
                    <p className="text-sm text-gray-500">Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getStatusColor(subscriber.is_active ? 'active' : 'inactive')}`}>
                      {subscriber.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <button onClick={() => handleEdit(subscriber)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(subscriber)} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`bg-white rounded-2xl p-6 shadow-lg card-hover border-l-4 ${
                notification.is_read ? 'border-gray-300' : 'border-blue-600'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(notification.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-badge ${getStatusColor(notification.notification_type)}`}>
                      {notification.notification_type}
                    </span>
                    <button onClick={() => handleEdit(notification)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(notification)} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors duration-200">
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

  const renderModal = () => {
    if (!showModal) return null;

    const getModalTitle = () => {
      switch (activeTab) {
        case 'contacts': return editingItem ? 'Edit Contact Submission' : 'Add Contact Submission';
        case 'templates': return editingItem ? 'Edit Email Template' : 'Add Email Template';
        case 'newsletters': return editingItem ? 'Edit Newsletter' : 'Add Newsletter';
        case 'subscribers': return editingItem ? 'Edit Subscriber' : 'Add Subscriber';
        case 'notifications': return editingItem ? 'Edit Notification' : 'Add Notification';
        default: return 'Add Item';
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
            {activeTab === 'contacts' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Response</label>
                  <textarea name="response" value={formData.response} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </>
            )}

            {activeTab === 'templates' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                    <input type="text" name="template_name" value={formData.template_name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Type</label>
                    <select name="template_type" value={formData.template_type} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="welcome">Welcome</option>
                      <option value="project_update">Project Update</option>
                      <option value="invoice">Invoice</option>
                      <option value="newsletter">Newsletter</option>
                      <option value="proposal">Proposal</option>
                      <option value="follow_up">Follow Up</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" name="template_subject" value={formData.template_subject} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea name="template_content" value={formData.template_content} onChange={handleInputChange} required rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="mr-2" />
                  <label className="text-sm font-medium text-gray-700">Active</label>
                </div>
              </>
            )}

            {activeTab === 'newsletters' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input type="text" name="newsletter_title" value={formData.newsletter_title} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea name="newsletter_content" value={formData.newsletter_content} onChange={handleInputChange} required rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select name="newsletter_status" value={formData.newsletter_status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="sent">Sent</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled At</label>
                    <input type="datetime-local" name="scheduled_at" value={formData.scheduled_at} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'subscribers' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="subscriber_email" value={formData.subscriber_email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" name="subscriber_name" value={formData.subscriber_name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="mr-2" />
                  <label className="text-sm font-medium text-gray-700">Active</label>
                </div>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input type="text" name="notification_title" value={formData.notification_title} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="notification_message" value={formData.notification_message} onChange={handleInputChange} required rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select name="notification_type" value={formData.notification_type} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                      <option value="success">Success</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient ID</label>
                    <input type="number" name="recipient_id" value={formData.recipient_id} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center gap-4 pt-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingItem ? 'Update' : 'Create'}
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
          <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
          <p className="text-gray-600 mt-1">Manage messages, notifications, and email templates</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add {activeTab.slice(0, -1)}
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
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default Communication;

