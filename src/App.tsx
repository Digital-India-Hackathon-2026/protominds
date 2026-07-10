import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CitizenForm from './pages/CitizenForm';
import ResultsPage from './pages/ResultsPage';
import Dashboard from './components/Dashboard';
import Documents from './components/Documents';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans transition-colors duration-200 flex flex-col">
      <Navbar />
      
      <main className="focus:outline-none flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<CitizenForm />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs font-medium text-slate-400">
        <div>&copy; 2026 JanMithra AI Platform. Secure Framework. All rights reserved.</div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;