import { useState } from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';
import { supportApi } from '../api/supportApi';
import { useAuth } from '../context/AuthContext';

/**
 * IssueTicketModal Component
 * Modal to raise a new issue ticket
 */
export function IssueTicketModal({ isOpen, onClose, onSuccess, policyId = null }) {
  const { user } = useAuth();
  
  // Form state
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPolicyId, setSelectedPolicyId] = useState(policyId || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Prepare ticket data
      const ticketData = {
        subject: subject.trim(),
        description: description.trim(),
        policyId: selectedPolicyId ? Number(selectedPolicyId) : null,
      };

      // Call API to raise issue
      const ticket = await supportApi.raiseIssue(ticketData, user?.username);

      // Success - close modal and notify parent
      if (onSuccess) {
        onSuccess(ticket);
      }
      
      // Reset form
      setSubject('');
      setDescription('');
      setSelectedPolicyId('');
      
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to raise issue. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Raise an Issue
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Policy ID (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Policy ID (Optional)
              </label>
              <input
                type="number"
                value={selectedPolicyId}
                onChange={(e) => setSelectedPolicyId(e.target.value)}
                placeholder="Enter policy ID if related to a policy"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                disabled={policyId !== null}
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of the issue"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {subject.length}/100 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide detailed information about the issue..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                rows={6}
                required
                maxLength={4000}
              />
              <p className="text-xs text-gray-500 mt-1">
                {description.length}/4000 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !subject.trim() || !description.trim()}
                className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Issue'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default IssueTicketModal;
