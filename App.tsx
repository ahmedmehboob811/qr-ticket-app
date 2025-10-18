
import React from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import MyTicketsPage from './pages/MyTicketsPage';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const PUBLISHABLE_KEY = 'pk_test_aW5mb3JtZWQtbXVzdGFuZy00Ni5jbGVyay5hY2NvdW50cy5kZXYk';

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      // FIX: When providing a custom `routerPush`, ClerkProvider also requires a `routerReplace` prop.
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      <AppProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
          <Header />
          <main className="container mx-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/events" element={<HomePage />} />
              <Route path="/event/:id" element={<EventDetailPage />} />
              <Route path="/sign-in/*" element={<SignInPage />} />
              <Route path="/sign-up/*" element={<SignUpPage />} />
              <Route
                path="/my-tickets"
                element={
                  <SignedIn>
                    <MyTicketsPage />
                  </SignedIn>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <SignedIn>
                    <OrganizerDashboardPage />
                  </SignedIn>
                }
              />
            </Routes>
          </main>
        </div>
      </AppProvider>
    </ClerkProvider>
  );
}


function App() {
  return (
    <HashRouter>
      <ClerkProviderWithRoutes />
    </HashRouter>
  );
}

export default App;