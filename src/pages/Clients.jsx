import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  DollarSign,
  X,
  Save,
  Users
} from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'EthioPay Solutions',
      contact: 'Alemayehu Tadesse',
      email: 'alemayehu@ethiopay.com',
      phone: '+251 11 123 4567',
      company: 'EthioPay Solutions',
      location: 'Addis Ababa, Ethiopia',
      joinDate: '2023-06-15',
      totalProjects: 3,
      activeProjects: 1,
      totalValue: 125000,
      status: 'Active'
    },
    {
      id: 2,
      name: 'AgriTech Ethiopia',
      contact: 'Meron Haile',
      email: 'meron@agritech.et',
      phone: '+251 91 234 5678',
      company: 'AgriTech Ethiopia',
      location: 'Bahir Dar, Ethiopia',
      joinDate: '2023-08-20',
      totalProjects: 2,
      activeProjects: 1,
      totalValue: 85000,
      status: 'Active'
    },
    {
      id: 3,
      name: 'HealthLink Africa',
      contact: 'Daniel Bekele',
      email: 'daniel@healthlink.com',
      phone: '+251 92 345 6789',
      company: 'HealthLink Africa',
      location: 'Dire Dawa, Ethiopia',
      joinDate: '2023-04-10',
      totalProjects: 1,
      activeProjects: 0,
      totalValue: 45000,
      status: 'Inactive'
    },
    {
      id: 4,
      name: 'EduTech Solutions',
      contact: 'Sarah Mekonnen',
      email: 'sarah@edutech.et',
      phone: '+251 93 456 7890',
      company: 'EduTech Solutions',
      location: 'Mekelle, Ethiopia',
      joinDate: '2023-09-05',
      totalProjects: 1,
      activeProjects: 1,
      totalValue: 35000,
      status: 'Active'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    joinDate: '',
    status: 'Active'
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for adding new client
  const handleAddClient = () => {
    setFormData({
      name: '',
      contact: '',
      email: '',
      phone: '',
      company: '',
      location: '',
      joinDate: '',
      status: 'Active'
    });
    setEditingClient(null);
    setShowModal(true);
  };

  // Open modal for editing existing client
  const handleEditClient = (client) => {
    setFormData({
      name: client.name,
      contact: client.contact,
      email: client.email,
      phone: client.phone,
      company: client.company,
      location: client.location,
      joinDate: client.joinDate,
      status: client.status
    });
    setEditingClient(client);
    setShowModal(true);
  };

  // Save client (add or edit)
  const handleSaveClient = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingClient) {
      // Edit existing client
      setClients(prev => prev.map(client => 
        client.id === editingClient.id 
          ? {
              ...client,
              name: formData.name,
              contact: formData.contact,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              location: formData.location,
              joinDate: formData.joinDate,
              status: formData.status
            }
          : client
      ));
    } else {
      // Add new client
      const newClient = {
        id: Math.max(...clients.map(c => c.id)) + 1,
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        location: formData.location,
        joinDate: formData.joinDate,
        totalProjects: 0,
        activeProjects: 0,
        totalValue: 0,
        status: formData.status
      };
      setClients(prev => [...prev, newClient]);
    }
    
    setShowModal(false);
    setEditingClient(null);
  };

  // Delete client with confirmation
  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(client => client.id !== clientId));
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client relationships and projects</p>
        </div>
        <button 
          onClick={handleAddClient}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Client
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{clients.length}</p>
            <p className="text-sm text-gray-600">Total Clients</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{clients.filter(c => c.status === 'Active').length}</p>
            <p className="text-sm text-gray-600">Active Clients</p>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{client.name}</h3>
                <p className="text-gray-600">{client.contact}</p>
              </div>
              <span className={`status-badge ${getStatusColor(client.status)}`}>
                {client.status}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{client.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(client.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{client.totalProjects}</p>
                <p className="text-xs text-gray-600">Total Projects</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{client.activeProjects}</p>
                <p className="text-xs text-gray-600">Active</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">${(client.totalValue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-600">Total Value</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button 
                onClick={() => handleEditClient(client)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDeleteClient(client.id)}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
          <button 
            onClick={handleAddClient}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105"
          >
            Add First Client
          </button>
        </div>
      )}

      {/* Modal for Add/Edit Client */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveClient(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter contact person name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Join Date
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingClient ? 'Update Client' : 'Create Client'}
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

export default Clients;
