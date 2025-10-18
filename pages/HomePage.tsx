import React from 'react';
import { useAppContext } from '../context/AppContext';
import EventCard from '../components/EventCard';
import { CalendarX2 } from 'lucide-react';

const HomePage: React.FC = () => {
  const { events } = useAppContext();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Upcoming Events</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Discover and book tickets for your next favorite event.</p>
      </div>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
          <CalendarX2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No Events Found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Please check back later for new events.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;