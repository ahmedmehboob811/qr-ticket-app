import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Event, Ticket } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock Data
const initialEvents: Event[] = [
  {
    id: '1',
    name: 'React Conference 2024',
    date: '2024-10-26T10:00:00Z',
    location: 'Virtual',
    description: 'The biggest conference for React developers. Join us for a day of learning and networking with the best in the industry.',
    price: 49,
    totalTickets: 250,
    imageUrl: 'https://picsum.photos/seed/reactconf/1200/800',
  },
  {
    id: '2',
    name: 'Vue.js Summit',
    date: '2024-11-15T09:00:00Z',
    location: 'San Francisco, CA',
    description: 'A two-day summit dedicated to everything Vue. Featuring talks from core team members and community leaders.',
    price: 199,
    totalTickets: 500,
    imageUrl: 'https://picsum.photos/seed/vueconf/1200/800',
  },
  {
    id: '3',
    name: 'Design Systems Meetup',
    date: '2024-12-05T18:00:00Z',
    location: 'New York, NY',
    description: 'An informal meetup for designers and developers passionate about building and maintaining design systems.',
    price: 0,
    totalTickets: 100,
    imageUrl: 'https://picsum.photos/seed/designmeetup/1200/800',
  },
  {
    id: '4',
    name: 'AI in Tech Gala',
    date: '2025-01-20T19:00:00Z',
    location: 'London, UK',
    description: 'An exclusive gala celebrating the advancements of Artificial Intelligence in the technology sector.',
    price: 350,
    totalTickets: 150,
    imageUrl: 'https://picsum.photos/seed/aigala/1200/800',
  },
];


interface AppContextType {
  events: Event[];
  tickets: Ticket[];
  getEventById: (id: string) => Event | undefined;
  getTicketsForUser: (userId: string) => Ticket[];
  getAttendeesForEvent: (eventId: string) => Ticket[];
  bookTicket: (eventId: string, user: { id: string; fullName: string | null; primaryEmailAddress: { emailAddress: string } | undefined }) => { success: boolean; message: string };
  validateTicket: (ticketId: string) => { success: boolean; message: string; ticket?: Ticket };
  getTicketsSold: (eventId: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events] = useState<Event[]>(initialEvents);
  // Initialize tickets from localStorage to persist data across sessions.
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const savedTickets = localStorage.getItem('eventhive-tickets');
      return savedTickets ? JSON.parse(savedTickets) : [];
    } catch (error) {
      console.error('Failed to parse tickets from localStorage', error);
      return [];
    }
  });

  // Save tickets to localStorage whenever the state changes.
  useEffect(() => {
    try {
      localStorage.setItem('eventhive-tickets', JSON.stringify(tickets));
    } catch (error) {
      console.error('Failed to save tickets to localStorage', error);
    }
  }, [tickets]);


  const getEventById = useCallback((id: string) => events.find(event => event.id === id), [events]);

  const getTicketsForUser = useCallback((userId: string) => tickets.filter(ticket => ticket.userId === userId), [tickets]);

  const getAttendeesForEvent = useCallback((eventId: string) => tickets.filter(ticket => ticket.eventId === eventId), [tickets]);
  
  const getTicketsSold = useCallback((eventId: string) => tickets.filter(ticket => ticket.eventId === eventId).length, [tickets]);

  const bookTicket = useCallback((eventId: string, user: { id: string; fullName: string | null; primaryEmailAddress: { emailAddress: string } | undefined }) => {
    const event = getEventById(eventId);
    if (!event) {
      return { success: false, message: 'Event not found.' };
    }

    if (getTicketsSold(eventId) >= event.totalTickets) {
      return { success: false, message: 'This event is sold out.' };
    }

    const existingTicket = tickets.find(t => t.eventId === eventId && t.userId === user.id);
    if (existingTicket) {
      return { success: false, message: 'You have already booked a ticket for this event.' };
    }

    const newTicket: Ticket = {
      id: uuidv4(),
      eventId,
      userId: user.id,
      userName: user.fullName || 'N/A',
      userEmail: user.primaryEmailAddress?.emailAddress || 'N/A',
      validated: false,
      purchaseDate: new Date().toISOString(),
    };

    setTickets(prevTickets => [...prevTickets, newTicket]);
    return { success: true, message: 'Ticket booked successfully!' };
  }, [tickets, getEventById, getTicketsSold]);

  const validateTicket = useCallback((ticketId: string) => {
    let ticket: Ticket | undefined;
    let success = false;
    let message = '';
  
    setTickets(currentTickets => {
      const ticketIndex = currentTickets.findIndex(t => t.id === ticketId);
      
      if (ticketIndex === -1) {
        message = 'Invalid Ticket ID.';
        return currentTickets;
      }
  
      ticket = currentTickets[ticketIndex];
      if (ticket.validated) {
        message = `Ticket already validated on ${new Date(ticket.purchaseDate).toLocaleString()}.`;
        return currentTickets;
      }
  
      const updatedTickets = [...currentTickets];
      updatedTickets[ticketIndex] = { ...ticket, validated: true };
      message = 'Ticket validated successfully!';
      success = true;
      return updatedTickets;
    });

    return { success, message, ticket };
  }, []);


  return (
    <AppContext.Provider value={{ events, tickets, getEventById, getTicketsForUser, getAttendeesForEvent, bookTicket, validateTicket, getTicketsSold }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};