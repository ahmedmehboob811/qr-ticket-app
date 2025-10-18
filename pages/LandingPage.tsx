import React from 'react';
import { Link } from 'react-router-dom';
import { Search, QrCode, Zap, Ticket } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 lg:py-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20" 
          style={{backgroundImage: "url('https://picsum.photos/seed/eventlanding/1920/1080')"}}
        ></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Your Next Unforgettable Experience Awaits
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Discover, book, and manage tickets for the best events, from local meetups to global conferences. Your seamless event journey starts here.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              to="/events"
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Browse Events
            </Link>
            <Link
              to="/sign-up"
              className="inline-block px-8 py-3 text-lg font-semibold text-blue-600 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose EventHive?</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Everything you need for a smooth event experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easily find events that match your interests from our curated catalog.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                <QrCode className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant QR Tickets</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive a secure QR code ticket instantly after booking for hassle-free entry.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                For users and organizers alike, our platform makes managing events a breeze.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Get Your Ticket in 3 Easy Steps</h2>
          </div>
          <div className="relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 dark:bg-gray-600"></div>
             <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                    <div className="relative flex items-center justify-center h-20 w-20 mx-auto mb-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full text-2xl font-bold text-blue-600 dark:text-blue-400">1</div>
                    <h3 className="text-xl font-semibold mb-2">Browse & Select</h3>
                    <p className="text-gray-600 dark:text-gray-400">Explore our event catalog and choose your desired event.</p>
                </div>
                 <div className="text-center">
                    <div className="relative flex items-center justify-center h-20 w-20 mx-auto mb-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
                    <h3 className="text-xl font-semibold mb-2">Book Your Ticket</h3>
                    <p className="text-gray-600 dark:text-gray-400">Secure your spot with our simple and fast booking process.</p>
                </div>
                 <div className="text-center">
                    <div className="relative flex items-center justify-center h-20 w-20 mx-auto mb-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
                    <h3 className="text-xl font-semibold mb-2">Attend & Enjoy</h3>
                    <p className="text-gray-600 dark:text-gray-400">Use your QR code ticket at the venue for quick entry.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Dive In?</h2>
          <p className="mt-2 mb-6 text-gray-600 dark:text-gray-400">Join thousands of others and find your next great experience.</p>
          <Link
            to="/events"
            className="inline-block px-10 py-4 text-xl font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Explore All Events
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
           <p>&copy; {new Date().getFullYear()} EventHive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
