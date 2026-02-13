import { useState, useEffect } from 'react';
import { FileText, Filter, Search, User, Calendar } from 'lucide-react';
import { supportApi } from '../../api/supportApi';
import { TicketCard } from '../../components/TicketCard';

/**
 * AdminTickets Page
 * Admin view to see all support tickets
 */
export function AdminTickets() {
  // State
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all tickets on mount
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
      const data = await supportApi.getAllTickets();
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
        ticket.raisedBy.toLowerCase().includes(query) ||
        ticket.id.toString().includes(query)
      );
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredTickets(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Support Tickets 🎫</h1>
        <p className="text-indigo-100">
          View and manage all customer support tickets.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Total Tickets</p>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Issues</p>
            <FileText className="h-5 w-5 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {tickets.filter(t => t.type === 'ISSUE').length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Policy Changes</p>
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {tickets.filter(t => t.type === 'POLICY_CHANGE').length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Unique Users</p>
            <User className="h-5 w-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            {new Set(tickets.map(t => t.raisedBy)).size}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, subject, user..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Filter dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="ISSUE">Issues Only</option>
            <option value="POLICY_CHANGE">Policy Changes Only</option>
          </select>
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
            No tickets found
          </h3>
          <p className="text-gray-500">
            {searchQuery || filterType !== 'ALL'
              ? 'Try adjusting your search or filter'
              : 'No support tickets have been raised yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Results count */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>
              Showing <span className="font-medium">{filteredTickets.length}</span> ticket
              {filteredTickets.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Tickets grid */}
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
        </div>
      )}
    </div>
  );
}

export default AdminTickets;
