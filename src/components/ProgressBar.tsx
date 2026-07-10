import React from 'react';
import { useApp } from '../context/AppContext';

interface StatusStyles {
  bg: string;
  text: string;
  border: string;
  badge: string;
}

const ProgressBar: React.FC = () => {
  const { steps, calculateProgress } = useApp();
  const currentProgress = calculateProgress();

  const getStatusColor = (status: 'completed' | 'current' | 'pending'): StatusStyles => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-emerald-600',
          text: 'text-emerald-600 font-semibold',
          border: 'border-emerald-600',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'current':
        return {
          bg: 'bg-blue-600',
          text: 'text-blue-600 font-bold scale-105',
          border: 'border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.2)] animate-pulse',
          badge: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      default:
        return {
          bg: 'bg-slate-300',
          text: 'text-slate-400 font-medium',
          border: 'border-slate-300',
          badge: 'bg-slate-50 text-slate-500 border-slate-200'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight">Application Lifecycle Tracking</h3>
          <p className="text-xs text-slate-500 font-medium">Automatic calculation based on updated profile credentials</p>
        </div>
        <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2 animate-ping" />
          <span className="text-sm font-bold text-slate-700">
            Progress: <span className="text-blue-600">{currentProgress}%</span> Complete
          </span>
        </div>
      </div>

      <div className="relative w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-8">
        <div
          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${currentProgress}%` }}
          role="progressbar"
          aria-valuenow={currentProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
        {steps.map((step, idx) => {
          const colors = getStatusColor(step.status);
          return (
            <div key={step.id} className="flex flex-col items-center text-center relative group">
              <div className={`w-10 h-10 rounded-full border-2 ${colors.border} ${step.status === 'completed' || step.status === 'current' ? 'bg-white' : 'bg-slate-50'} flex items-center justify-center mb-3 transition-all duration-300 z-10`}>
                {step.status === 'completed' ? (
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.status === 'current' ? (
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-scale" />
                ) : (
                  <span className="text-xs font-bold text-slate-400">{idx + 1}</span>
                )}
              </div>
              <span className={`text-xs ${colors.text} max-w-[120px] transition-colors duration-200 leading-tight`}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;