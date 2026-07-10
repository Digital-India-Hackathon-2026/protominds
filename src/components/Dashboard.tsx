// digital-india-hackathon-2026/protominds/protominds-ad04d013c8c86a6dbf3d3e0fd456ba7e97307d01/src/components/Dashboard.tsx

import { useApp } from '../context/AppContext';
import { Award, FileText, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { citizen, steps } = useApp();

  const name = citizen?.name || "Citizen User";
  const state = citizen?.state || "Not Selected";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase bg-white/20 text-white px-2.5 py-1 rounded-md backdrop-blur-sm">
            Digital Profile Verified
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">Welcome back, {name}!</h2>
          <p className="text-sm text-blue-100 max-w-xl">
            Your profile coordinates with your residency in <span className="font-semibold">{state}</span>. JanMitra AI has automated matches waiting for you.
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Matched Schemes</span>
            <p className="text-2xl font-black text-slate-800">8 Schemes</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Uploaded Documents</span>
            <p className="text-2xl font-black text-slate-800">3 Files</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Applications Status</span>
            <p className="text-2xl font-black text-slate-800">Active</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Timeline */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Application Progress Workflow</h3>
          </div>
          <div className="relative border-l border-slate-100 pl-5 ml-2.5 space-y-6 text-sm">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <div className={`absolute -left-[31px] top-0 w-5 h-5 rounded-full border-4 border-white shadow flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-500 text-white' : step.status === 'current' ? 'bg-brand-500 animate-pulse' : 'bg-slate-200'
                }`}>
                  {step.status === 'completed' && <CheckCircle2 className="w-2.5 h-2.5" />}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className={`font-bold ${step.status === 'current' ? 'text-brand-600' : 'text-slate-700'}`}>{step.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="p-5 rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white shadow-sm flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">DigiLocker Integration Live</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your documentation satisfies verified attributes checklist criteria. AI checks will continuously scan matches in real-time.
            </p>
          </div>
          <div className="w-full py-2.5 px-4 rounded-xl text-xs bg-slate-900 text-white font-medium flex items-center justify-center gap-1.5 opacity-80">
            Automated verification active
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}