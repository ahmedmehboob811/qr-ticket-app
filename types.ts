
export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  price: number;
  totalTickets: number;
  imageUrl: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  validated: boolean;
  purchaseDate: string;
}
