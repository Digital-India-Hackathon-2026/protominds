import React from 'react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';

interface DashboardProps {
  setActiveTab: (tab: 'dashboard' | 'documents') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const { documents, notifications, recentActivities, calculateProgress } = useApp();

  const totalRequired = documents.filter(d => d.required).length;
  const uploadedRequired = documents.filter(d => d.required && d.status !== 'Missing').length;
  const missingRequiredCount = totalRequired - uploadedRequired;

  const currentProgress = calculateProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Applicant Command Core</h1>
          <p className="text-sm font-medium text-slate-500 mt-0.5">Manage tracking information, review requests, and active processing states.</p>
        </div>
        <div className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-md self-start md:self-auto border border-slate-200">
          Refreshed: July 09, 2026
        </div>
      </div>

      <ProgressBar />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 tracking-wider uppercase">Application Rank</span>
            <span className="text-xl font-bold text-slate-800">{currentProgress}% Processed</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className={`p-3 rounded-lg ${missingRequiredCount > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 tracking-wider uppercase">Missing Mandatory</span>
            <span className={`text-xl font-bold ${missingRequiredCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {missingRequiredCount} Requirements
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 tracking-wider uppercase">Target Deadlines</span>
            <span className="text-xl font-bold text-slate-800">July 31, 2026</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 tracking-wider uppercase">Verification State</span>
            <span className="text-xl font-bold text-teal-700">Under Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Quick Summary Action Cards
            </h2>
            <div className="p-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800">Verify & Cross-Check Upload State</h4>
                <p className="text-xs text-slate-500 mt-1">
                  {missingRequiredCount > 0 
                    ? `You currently have ${missingRequiredCount} required structural document objects missing from the cloud registry.`
                    : 'All requested system validation files have been uploaded correctly.'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap shadow-sm transition-all ${
                  missingRequiredCount > 0 
                    ? 'bg-rose-600 text-white hover:bg-rose-700' 
                    : 'bg-slate-800 text-white hover:bg-slate-900'
                }`}
              >
                {missingRequiredCount > 0 ? 'Resolve Missing Docs' : 'View File Registry'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Audit Footprints
            </h2>
            <div className="relative border-l-2 border-slate-100 pl-4 space-y-5 ml-2">
              {recentActivities.map((act) => (
                <div key={act.id} className="relative group">
                  <div className="absolute -left-[21px] mt-1.5 w-2 h-2 rounded-full bg-slate-400 group-hover:bg-emerald-500 transition-colors" />
                  <span className="block text-xs font-semibold text-slate-400">{act.time}</span>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{act.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Broadcast Center
            </h2>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                    notif.type === 'warning'
                      ? 'bg-rose-50 border-rose-100 text-rose-800'
                      : notif.type === 'success'
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                      : 'bg-slate-50 border-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold tracking-tight">
                      {notif.type === 'warning' ? 'System Warning' : notif.type === 'success' ? 'Task Settled' : 'System Notice'}
                    </span>
                    <span className="text-[10px] font-semibold opacity-60">{notif.time}</span>
                  </div>
                  <p className="leading-normal">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;