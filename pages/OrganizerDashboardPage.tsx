import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useUser } from '@clerk/clerk-react';
import { Users, ScanLine, AlertCircle, CheckCircle, XCircle, Loader2, QrCode } from 'lucide-react';
import { Ticket as TicketType } from '../types';
import QrScanner from '../components/QrScanner';
import { Html5QrcodeResult } from 'html5-qrcode';

// NOTE: For a production application, user roles should be managed via Clerk's custom claims or organization roles,
// not a hardcoded user ID.
const ORGANIZER_USER_ID = 'user_2jFeqyYQfKk8fXgY6sZ7tBvWc9a';

const OrganizerDashboardPage: React.FC = () => {
  const { events, getAttendeesForEvent, validateTicket } = useAppContext();
  const { user, isLoaded } = useUser();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(events.length > 0 ? events[0].id : null);
  const [ticketIdInput, setTicketIdInput] = useState('');
  const [validationResult, setValidationResult] = useState<{ type: 'success' | 'error' | 'warning', message: string, ticket?: TicketType } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-4 text-lg">Verifying permissions...</p>
      </div>
    );
  }

  if (user?.id !== ORGANIZER_USER_ID) {
    return (
      <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
        <XCircle className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-400">You do not have permission to view this page.</p>
      </div>
    );
  }
  
  const handleManualValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketIdInput) return;
    performValidation(ticketIdInput);
    setTicketIdInput('');
  };

  const handleQrScan = (decodedText: string, decodedResult: Html5QrcodeResult) => {
    setIsScanning(false);
    performValidation(decodedText);
  };
  
  const performValidation = (ticketId: string) => {
    const result = validateTicket(ticketId.trim());
    if (result.success) {
      setValidationResult({ type: 'success', message: result.message, ticket: result.ticket });
    } else {
      setValidationResult({ type: result.message.includes('already validated') ? 'warning' : 'error', message: result.message, ticket: result.ticket });
    }
  }

  const attendees = selectedEventId ? getAttendeesForEvent(selectedEventId) : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Organizer Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Manage your events and validate attendee tickets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ticket Scanner */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><ScanLine /> Ticket Validator</h2>
          
          {isScanning ? (
             <div className="flex flex-col items-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                Position the ticket's QR code inside the frame.
              </p>
              <div className="w-full max-w-xs rounded-lg overflow-hidden border-2 border-blue-500 dark:border-blue-400 shadow-inner">
                <QrScanner onScanSuccess={handleQrScan} onScanFailure={(error) => console.warn(error)} />
              </div>
              <button
                onClick={() => setIsScanning(false)}
                className="mt-4 w-full px-4 py-2 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel Scan
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <form onSubmit={handleManualValidate} className="space-y-4">
                <input
                  type="text"
                  value={ticketIdInput}
                  onChange={(e) => setTicketIdInput(e.target.value)}
                  placeholder="Enter Ticket ID"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!ticketIdInput}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Validate Manually
                </button>
              </form>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <button
                onClick={() => {
                    setValidationResult(null);
                    setIsScanning(true);
                }}
                className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <QrCode />
                Scan QR Code
              </button>
            </div>
          )}

          {validationResult && (
            <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
              validationResult.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
              validationResult.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
              'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {validationResult.type === 'success' && <CheckCircle className="w-6 h-6 flex-shrink-0" />}
              {validationResult.type === 'warning' && <AlertCircle className="w-6 h-6 flex-shrink-0" />}
              {validationResult.type === 'error' && <XCircle className="w-6 h-6 flex-shrink-0" />}
              <div>
                <p className="font-bold">{validationResult.message}</p>
                {validationResult.ticket && <p className="text-sm">Attendee: {validationResult.ticket.userName}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Attendee List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2"><Users /> Attendee List</h2>
            <select
              value={selectedEventId || ''}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </select>
          </div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Showing {attendees.length} attendees for <strong>{events.find(e => e.id === selectedEventId)?.name}</strong>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendees.length > 0 && attendees.map(attendee => (
                  <tr key={attendee.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-2">{attendee.userName}</td>
                    <td className="px-4 py-2">{attendee.userEmail}</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        attendee.validated ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                      }`}>
                        {attendee.validated ? 'Checked In' : 'Not Checked In'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
             {attendees.length === 0 && <p className="text-center py-8 text-gray-500">No attendees for this event yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboardPage;