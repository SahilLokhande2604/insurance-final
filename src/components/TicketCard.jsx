import { FileText, Calendar, User, Hash } from 'lucide-react';
import { cn } from '../utils/cn';

/**
 * TicketCard Component
 * Displays a support ticket in a card format
 */
export function TicketCard({ ticket, onClick }) {
  // Format date to be readable
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get badge color based on ticket type
  const getTypeBadgeColor = (type) => {
    if (type === 'ISSUE') {
      return 'bg-yellow-100 text-yellow-700';
    } else if (type === 'POLICY_CHANGE') {
      return 'bg-blue-100 text-blue-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header with ticket type badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {ticket.subject}
          </h3>
        </div>
        <span
          className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            getTypeBadgeColor(ticket.type)
          )}
        >
          {ticket.type === 'ISSUE' ? 'Issue' : 'Policy Change'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {ticket.description}
      </p>

      {/* Footer with metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          {/* Ticket ID */}
          <div className="flex items-center gap-1">
            <Hash className="h-3 w-3" />
            <span>{ticket.id}</span>
          </div>

          {/* Raised by */}
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{ticket.raisedBy}</span>
          </div>

          {/* Created date */}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(ticket.createdAt)}</span>
          </div>
        </div>

        {/* Policy ID if exists */}
        {ticket.policyId && (
          <div className="text-indigo-600 font-medium">
            Policy #{ticket.policyId}
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketCard;
