
import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.date);

  return (
    <Link to={`/event/${event.id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <img
          className="w-full h-56 object-cover object-center group-hover:opacity-90 transition-opacity"
          src={event.imageUrl}
          alt={event.name}
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors">{event.name}</h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              <span>{eventDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {eventDate.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              <span className="font-semibold text-lg">{event.price > 0 ? `$${event.price}` : 'Free'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
