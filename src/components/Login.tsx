import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-slate-200 rounded-xl shadow-xl">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Portal Authentication</h2>
        <p className="text-sm text-slate-500">Sign in to access your dashboard account node</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
          <input 
            type="email" 
            placeholder="applicant@domain.in" 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
            required 
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Access Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg transition-colors shadow-md mt-2 flex items-center justify-center space-x-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Verifying Framework...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default Login;