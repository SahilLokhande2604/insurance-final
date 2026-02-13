import { useState, useEffect } from 'react';
import { Plus, FileText, Filter, Search } from 'lucide-react';
import { supportApi } from '../api/supportApi';
import { useAuth } from '../context/AuthContext';
import { TicketCard } from '../components/TicketCard';
import { IssueTicketModal } from '../components/IssueTicketModal';

/**
 * Support Page
 * Customer support page to view and raise tickets
 */
export function Support() {
  const { user } = useAuth();
  
  // State
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user's tickets on mount
  useEffect(() => {
    fetchTickets();
  }, []);

  // Filter tickets when filter or search changes
  useEffect(() => {
    filterTickets();
  }, [tickets, filterType, searchQuery]);

  // Fetch tickets from API
  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const data = await supportApi.getTicketsByUser(user?.username);
      setTickets(data);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tickets based on type and search
  const filterTickets = () => {
    let filtered = [...tickets];

    // Filter by type
    if (filterType !== 'ALL') {
      filtered = filtered.filter(ticket => ticket.type === filterType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.subject.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        ticket.id.toString().includes(query)
      );
    }

    setFilteredTickets(filtered);
  };

  // Handle successful ticket creation
  const handleTicketCreated = (newTicket) => {
    setTickets([newTicket, ...tickets]);
    setShowIssueModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Customer Support 🎧</h1>
        <p className="text-indigo-100">
          Need help? Raise a ticket and our support team will assist you.
        </p>
      </div>

      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Filter and Create button */}
        <div className="flex gap-3">
          {/* Filter dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="ALL">All Tickets</option>
              <option value="ISSUE">Issues</option>
              <option value="POLICY_CHANGE">Policy Changes</option>
            </select>
          </div>

          {/* Raise ticket button */}
          <button
            onClick={() => setShowIssueModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Raise Issue
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Total Tickets</p>
          <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Issues</p>
          <p className="text-2xl font-bold text-yellow-600">
            {tickets.filter(t => t.type === 'ISSUE').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Policy Changes</p>
          <p className="text-2xl font-bold text-blue-600">
            {tickets.filter(t => t.type === 'POLICY_CHANGE').length}
          </p>
        </div>
      </div>

      {/* Tickets list */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchQuery || filterType !== 'ALL' 
              ? 'No tickets found' 
              : 'No tickets yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || filterType !== 'ALL'
              ? 'Try adjusting your search or filter'
              : 'Raise a ticket to get support from our team'}
          </p>
          {!searchQuery && filterType === 'ALL' && (
            <button
              onClick={() => setShowIssueModal(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Raise Your First Issue
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onClick={() => {
                // Handle ticket click - could navigate to detail page
                console.log('Ticket clicked:', ticket);
              }}
            />
          ))}
        </div>
      )}

      {/* Issue Ticket Modal */}
      <IssueTicketModal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        onSuccess={handleTicketCreated}
      />
    </div>
  );
}

export default Support;
