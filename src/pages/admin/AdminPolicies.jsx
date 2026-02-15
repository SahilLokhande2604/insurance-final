import { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Trash2, Loader2, Search } from 'lucide-react';
import { policyApi } from '../../api/policyApi.js';
import { Modal } from '../../components/Modal.jsx';

const policyTypes = [
  'Health Insurance',
  'Life Insurance',
  'Auto Insurance',
  'Home Insurance',
  'Travel Insurance',
];

export function AdminPolicies() {
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverageAmount: '',
    premium: '',
    duration: '',
    features: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await policyApi.getAllPolicies();
        setPolicies(data);
      } catch (error) {
        console.error('Failed to fetch policies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenForm = (policy) => {
    if (policy) {
      setEditingPolicy(policy);
      setFormData({
        name: policy.PolicyName,
        type: policy.policyType,
        description: policy.description,
        coverageAmount: policy.coverageAmount.toString(),
        premium: policy.premiumAmount.toString(),
        duration: policy.duration,
        features: policy.features.join(', '),
      });
    } else {
      setEditingPolicy(null);
      setFormData({
        name: '',
        type: '',
        description: '',
        coverageAmount: '',
        premium: '',
        duration: '',
        features: '',
      });
    }
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const policyData = {
        PolicyName: formData.name,
        policyType: formData.type,
        description: formData.description,
        coverageAmount: parseFloat(formData.coverageAmount),
        premiumAmount: parseFloat(formData.premium),
        duration: formData.duration,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        isActive: true,
      };

      if (editingPolicy) {
        const updated = await policyApi.updatePolicy(editingPolicy.id, policyData);
        setPolicies(prev => prev.map(p => p.id === editingPolicy.id ? updated : p));
      } else {
        const newPolicy = await policyApi.createPolicy(policyData);
        setPolicies(prev => [...prev, newPolicy]);
      }

      setShowForm(false);
    } catch (error) {
      console.error('Failed to save policy:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this policy?')) return;
    
    try {
      console.log('Deleting policy with ID:', id);
      await policyApi.deletePolicy(id);
      setPolicies(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete policy:', error);
    }
  };

  const filteredPolicies = policies.filter(policy => {
    const name = policy.name ? policy.name.toLowerCase() : '';
    const type = policy.type ? policy.type.toLowerCase() : '';
    const search = searchTerm ? searchTerm.toLowerCase() : '';
    return name.includes(search) || type.includes(search);
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
          <p className="text-gray-500">Create and manage insurance policies</p>
        </div>
        <button
          onClick={() => handleOpenForm(null)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add New Policy
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search policies..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Policies Grid */}
      {filteredPolicies.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No policies found</h3>
          <p className="text-gray-500">Create your first policy to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                    {policy.type}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleOpenForm(policy)}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(policy.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{policy.name}</h3>
                    <p className="text-sm text-gray-500">{policy.duration}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {policy.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Coverage</p>
                    <p className="font-semibold text-gray-900">
                      ${policy.coverageAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Premium</p>
                    <p className="font-semibold text-indigo-600">${policy.premium}/mo</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Policy Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingPolicy ? 'Edit Policy' : 'Create New Policy'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Basic Health Cover"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                required
              >
                <option value="">Select type</option>
                {policyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the policy coverage..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coverage Amount ($)
              </label>
              <input
                type="number"
                value={formData.coverageAmount}
                onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })}
                placeholder="100000"
                min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Premium ($)
              </label>
              <input
                type="number"
                value={formData.premium}
                onChange={(e) => setFormData({ ...formData, premium: e.target.value })}
                placeholder="99"
                min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 1 Year"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features (comma-separated)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="e.g., Hospital Coverage, Surgery Coverage, 24/7 Support"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                editingPolicy ? 'Update Policy' : 'Create Policy'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AdminPolicies;
