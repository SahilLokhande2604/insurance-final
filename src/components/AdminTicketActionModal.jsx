import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supportApi } from '../api/supportApi';
import { useAuth } from '../context/AuthContext';

export function AdminTicketActionModal({ ticket, actionType, onClose, onSuccess }) {
  const { user } = useAuth();
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  if (!ticket) return null;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await supportApi.takeAdminAction(
        ticket.id,
        {
          status: actionType,
          adminRemarks: remarks
        },
        user?.username
      );

      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to update ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <h2 className="text-lg font-bold mb-4">
            {actionType === 'RESOLVED' ? 'Resolve Ticket' : 'Reject Ticket'}
          </h2>

          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter admin remarks..."
            className="w-full border rounded-lg p-3 mb-4"
            rows={4}
          />

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg flex justify-center items-center"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
