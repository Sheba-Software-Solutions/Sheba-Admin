import React, { useEffect, useState } from "react";
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
  Users,
} from "lucide-react";
import { apiHelpers } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    website: "",
    client_type: "individual",
    contact_person: "",
    is_active: true,
    notes: "",
  });

  // Load clients from backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await apiHelpers.getClients({
          ordering: "-created_at",
        });
        const data = response?.data;
        setClients(Array.isArray(data) ? data : data?.results || []);
      } catch (error) {
        console.error("Failed to load clients:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open modal for adding new client
  const handleAddClient = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      website: "",
      client_type: "individual",
      contact_person: "",
      is_active: true,
      notes: "",
    });
    setEditingClient(null);
    setShowModal(true);
  };

  // Open modal for editing existing client
  const handleEditClient = (client) => {
    setFormData({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
      address: client.address || "",
      website: client.website || "",
      client_type: client.client_type || "individual",
      contact_person: client.contact_person || "",
      is_active: client.is_active ?? true,
      notes: client.notes || "",
    });
    setEditingClient(client);
    setShowModal(true);
  };

  // Save client (add or edit)
  const handleSaveClient = async () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in required fields");
      return;
    }
    const payload = {
      ...formData,
      is_active: formData.is_active === true || formData.is_active === "true",
    };
    try {
      if (editingClient) {
        const response = await apiHelpers.updateClient(
          editingClient.id,
          payload,
        );
        setClients((prev) =>
          prev.map((c) => (c.id === editingClient.id ? response.data : c)),
        );
      } else {
        const response = await apiHelpers.createClient(payload);
        setClients((prev) => [response.data, ...prev]);
      }
      setShowModal(false);
      setEditingClient(null);
    } catch (error) {
      console.error("Failed to save client:", error);
      alert("Failed to save client");
    }
  };

  // Delete client with confirmation
  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await apiHelpers.deleteClient(clientId);
      setClients((prev) => prev.filter((client) => client.id !== clientId));
    } catch (error) {
      console.error("Failed to delete client:", error);
      alert("Failed to delete client");
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      (client.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">
            Manage your client relationships and projects
          </p>
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
            <p className="text-3xl font-bold text-green-600">
              {clients.filter((c) => c.is_active).length}
            </p>
            <p className="text-sm text-gray-600">Active Clients</p>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center min-h-64">
            <LoadingSpinner />
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl p-6 shadow-lg card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {client.name}
                  </h3>
                  <p className="text-gray-600">{client.contact_person}</p>
                </div>
                <span
                  className={`status-badge ${getStatusColor(client.is_active ? "Active" : "Inactive")}`}
                >
                  {client.is_active ? "Active" : "Inactive"}
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
                  <span>{client.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {client.created_at && (
                    <span>
                      Created {new Date(client.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">
                    {client.total_projects ?? 0}
                  </p>
                  <p className="text-xs text-gray-600">Total Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {client.active_projects ?? 0}
                  </p>
                  <p className="text-xs text-gray-600">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">
                    {client.client_type}
                  </p>
                  <p className="text-xs text-gray-600">Type</p>
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
          ))
        )}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No clients found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria
          </p>
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
                {editingClient ? "Edit Client" : "Add New Client"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveClient();
              }}
              className="space-y-4"
            >
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
                    name="contact_person"
                    value={formData.contact_person}
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
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter address"
                  />
                </div>

                {/* Join Date removed: created_at is managed by backend */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Active
                  </label>
                  <select
                    name="is_active"
                    value={formData.is_active ? "true" : "false"}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingClient ? "Update Client" : "Create Client"}
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
