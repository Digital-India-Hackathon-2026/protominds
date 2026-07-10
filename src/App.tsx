
import LandingPage from './pages/LandingPage';
import CitizenForm from './pages/CitizenForm';
import ResultsPage from './pages/ResultsPage';
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Documents from './components/Documents';


const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents'>('dashboard');
  const { page } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans transition-colors duration-200">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
<main className="focus:outline-none">
  {page === 'landing' ? (
    <LandingPage />
  ) : page === 'form' ? (
    <CitizenForm />
  ) : page === 'results' ? (
    <ResultsPage />
  ) : activeTab === 'dashboard' ? (
    <Dashboard setActiveTab={setActiveTab} />
  ) : (
    <Documents />
  )}
</main> <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs font-medium text-slate-400">
        <div>&copy; 2026 JanMithra AI Platform. Secure Framework. All rights reserved.</div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;