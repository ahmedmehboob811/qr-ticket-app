
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Calendar, MapPin, DollarSign, Ticket, Users, AlertCircle, CheckCircle } from 'lucide-react';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, bookTicket, getTicketsSold, getTicketsForUser } = useAppContext();
  const { user } = useUser();
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!id) return <p>Event not found.</p>;
  const event = getEventById(id);

  if (!event) return <p>Event not found.</p>;

  const ticketsSold = getTicketsSold(event.id);
  const ticketsRemaining = event.totalTickets - ticketsSold;
  const isSoldOut = ticketsRemaining <= 0;
  
  const userHasTicket = user ? getTicketsForUser(user.id).some(t => t.eventId === event.id) : false;

  const handleBookTicket = () => {
    if (user && user.primaryEmailAddress) {
      const result = bookTicket(event.id, {
        id: user.id,
        fullName: user.fullName,
        primaryEmailAddress: { emailAddress: user.primaryEmailAddress.emailAddress }
      });
      setNotification({ type: result.success ? 'success' : 'error', message: result.message });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const eventDate = new Date(event.date);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <img
        className="w-full h-64 md:h-96 object-cover object-center"
        src={event.imageUrl}
        alt={event.name}
      />
      <div className="p-6 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{event.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-lg">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar className="w-6 h-6 mr-3 text-blue-500" />
            <span>{eventDate.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <MapPin className="w-6 h-6 mr-3 text-blue-500" />
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">{event.description}</p>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center text-3xl font-bold text-green-600 dark:text-green-400">
              <DollarSign className="w-8 h-8 mr-2" />
              <span>{event.price > 0 ? `$${event.price}` : 'Free'}</span>
            </div>
             <div className={`flex items-center mt-2 ${isSoldOut ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}>
              <Ticket className="w-5 h-5 mr-2" />
              <span>{ticketsRemaining} / {event.totalTickets} tickets remaining</span>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <SignedIn>
              {userHasTicket ? (
                <Link to="/my-tickets" className="w-full text-center block px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors">
                  View Your Ticket
                </Link>
              ) : (
                <button
                  onClick={handleBookTicket}
                  disabled={isSoldOut}
                  className="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSoldOut ? 'Sold Out' : 'Book Ticket'}
                </button>
              )}
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in" className="w-full text-center block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                Sign in to Book
              </Link>
            </SignedOut>
          </div>
        </div>

        {notification && (
          <div className={`mt-6 p-4 rounded-lg flex items-center ${notification.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertCircle className="w-5 h-5 mr-3" />}
            {notification.message}
          </div>
        )}

      </div>
    </div>
  );
};

export default EventDetailPage;
