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
  DollarSign
} from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const clients = [
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
      totalProjects: 4,
      activeProjects: 0,
      totalValue: 180000,
      status: 'Completed'
    },
    {
      id: 4,
      name: 'TechCorp Inc.',
      contact: 'Sara Alemayehu',
      email: 'sara@techcorp.com',
      phone: '+251 93 456 7890',
      company: 'TechCorp Inc.',
      location: 'Hawassa, Ethiopia',
      joinDate: '2023-12-01',
      totalProjects: 1,
      activeProjects: 1,
      totalValue: 95000,
      status: 'Active'
    }
  ];

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
          onClick={() => setShowModal(true)}
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

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105"
          >
            Add First Client
          </button>
        </div>
      )}
    </div>
  );
};

export default Clients;
