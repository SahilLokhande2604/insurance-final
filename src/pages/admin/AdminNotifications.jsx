import { useState, useEffect } from 'react';
import {
  Send,
  Loader2,
  Users,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { authApi } from '../../api/authApi';
import { notificationApi } from '../../api/notificationApi';
import { Modal } from '../../components/Modal';

export function AdminNotifications() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  const [formData, setFormData] = useState({
    username: '',
    // title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authApi.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await notificationApi.sendNotificationToUser(formData);
      setSentCount((prev) => prev + 1);
      setShowForm(false);
      setFormData({
        username: '',
        // title: '',
        message: '',
        type: 'info',
      },
    
    await notificationApi.sendNotificationToUser(
  selectedUsername,
  {
    // title: formData.title,
    message: formData.message,
    type: formData.type
  }
)

);
    } catch (error) {
      console.error('Failed to send notification:', error);
    } finally {
      setIsSending(false);
    }
  };

  const notificationTypes = [
    { value: 'info', label: 'Information', icon: Info, color: 'text-blue-500' },
    { value: 'success', label: 'Success', icon: CheckCircle, color: 'text-green-500' },
    { value: 'warning', label: 'Warning', icon: AlertTriangle, color: 'text-yellow-500' },
    { value: 'error', label: 'Error', icon: AlertCircle, color: 'text-red-500' },
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500">Send notifications to customers</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
          Send Notification
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-500">Total Recipients</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Send className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{sentCount}</p>
              <p className="text-sm text-gray-500">Sent This Session</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Customer List</h2>
          <p className="text-sm text-gray-500">
            Select a customer to send a notification
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  {/* <span className="text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span> */}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData({ ...formData, username: user.username });
                  setShowForm(true);
                }}
                className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Send Notification
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Send Notification"
        size="lg"
      >
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient
            </label>
            <select
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSending}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Notification
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
