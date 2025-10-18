
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useUser } from '@clerk/clerk-react';
// FIX: The default import from 'qrcode.react' is no longer valid in recent versions.
// Switched to a named import 'QRCodeCanvas' and aliased it as 'QRCode' to fix the component rendering.
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { Ticket as TicketIcon, Calendar, MapPin, QrCode } from 'lucide-react';

const MyTicketsPage: React.FC = () => {
  const { getTicketsForUser, getEventById } = useAppContext();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to view your tickets.</div>;
  }

  const userTickets = getTicketsForUser(user.id);

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">My Tickets</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Here are all the event tickets you've booked.</p>
      </div>

      {userTickets.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
          <TicketIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tickets found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You haven't booked any tickets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {userTickets.map(ticket => {
            const event = getEventById(ticket.eventId);
            if (!event) return null;
            const eventDate = new Date(event.date);

            return (
              <div key={ticket.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${ticket.validated ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                      {ticket.validated ? 'Validated' : 'Active'}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{event.name}</h2>
                    <div className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                        <span>{eventDate.toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })} at {eventDate.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                   <p className="mt-4 text-xs text-gray-500">Ticket ID: {ticket.id}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-600">
                  <div className="p-2 bg-white rounded-lg shadow-md">
                    <QRCode value={ticket.id} size={160} level="H" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <QrCode size={16} /> Scan at Entry
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;
