import { useMemo } from 'react';
import {
  CheckCircle2, Bookmark, FileText, CalendarClock,
  TrendingUp, ArrowRight, Sparkles, Clock, Award,
  ExternalLink, Bot, User, Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { checkEligibility } from '../utils/eligibility';
import { schemes } from '../data/schemes';
import type { GovernmentScheme } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat: Sparkles, Home: Sparkles, GraduationCap: Sparkles, Heart: Sparkles,
  ShieldPlus: CheckCircle2, Briefcase: Sparkles, Landmark: Sparkles, Zap: Sparkles,
};

export default function Dashboard() {
  const { citizen, savedSchemes, applications, setPage, toggleSaveScheme } = useApp();

  const eligibleResults = useMemo(() => {
    if (!citizen) return [];
    return checkEligibility(citizen).filter((r) => r.isEligible);
  }, [citizen]);

  const upcomingDeadlines = useMemo(() => {
    const now = new Date();
    const allSchemes: GovernmentScheme[] = [
      ...eligibleResults.map((r) => r.scheme),
      ...savedSchemes
        .map((s) => schemes.find((sc) => sc.id === s.schemeId))
        .filter((s): s is GovernmentScheme => s !== undefined),
    ];
    return Array.from(new Set(allSchemes))
      .filter((s) => new Date(s.lastDate) > now)
      .sort((a, b) => new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime())
      .slice(0, 5);
  }, [eligibleResults, savedSchemes]);

  const stats = [
    {
      label: 'Eligible Schemes',
      value: eligibleResults.length,
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Saved Schemes',
      value: savedSchemes.length,
      icon: Bookmark,
      color: 'from-orange-500 to-amber-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      text: 'text-orange-600 dark:text-orange-400',
    },
    {
      label: 'Recent Applications',
      value: applications.length,
      icon: FileText,
      color: 'from-brand-500 to-cyan-600',
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      text: 'text-brand-600 dark:text-brand-400',
    },
    {
      label: 'Upcoming Deadlines',
      value: upcomingDeadlines.length,
      icon: CalendarClock,
      color: 'from-violet-500 to-fuchsia-600',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      text: 'text-violet-600 dark:text-violet-400',
    },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 gradient-mesh">
      <div className="section-container">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700/50 mb-4 animate-glow-pulse">
            <TrendingUp className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Your Dashboard</span>
          </div>
          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">
            Welcome back{citizen ? `, ${citizen.name}` : ''}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your eligible schemes, saved items, applications, and upcoming deadlines all in one place.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="glass-card p-5 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-slate-800 dark:text-white leading-none animate-count-up">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* No Citizen Data State */}
        {!citizen && (
          <div className="glass-card p-8 rounded-2xl text-center mb-8 animate-fade-in-up">
            <Info className="w-12 h-12 text-brand-300 dark:text-brand-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">No profile data yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Fill out the citizen details form to see your eligible schemes and personalized dashboard.
            </p>
            <button onClick={() => setPage('form')} className="btn-primary">
              <User className="w-5 h-5" />
              Fill Your Details
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Eligible Schemes */}
          <div className="glass-card p-6 rounded-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sans font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Eligible Schemes
              </h2>
              {citizen && eligibleResults.length > 0 && (
                <button onClick={() => setPage('results')} className="text-sm text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {eligibleResults.length === 0 ? (
              <div className="text-center py-8">
                <Award className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {citizen ? 'No eligible schemes found for your profile.' : 'Fill the form to see eligible schemes.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {eligibleResults.slice(0, 4).map((result, i) => {
                  const Icon = iconMap[result.scheme.icon] || Sparkles;
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${result.scheme.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{result.scheme.shortName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{result.scheme.category}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Saved Schemes */}
          <div className="glass-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sans font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-orange-500" />
                Saved Schemes
              </h2>
              {savedSchemes.length > 0 && (
                <span className="badge bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                  {savedSchemes.length} Saved
                </span>
              )}
            </div>

            {savedSchemes.length === 0 ? (
              <div className="text-center py-8">
                <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No saved schemes yet. Save schemes from the results page to find them here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedSchemes.map((saved) => {
                  const scheme = schemes.find((s) => s.id === saved.schemeId);
                  if (!scheme) return null;
                  const Icon = iconMap[scheme.icon] || Sparkles;
                  return (
                    <div key={saved.schemeId} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${scheme.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{scheme.shortName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Saved {new Date(saved.savedAt).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => toggleSaveScheme(saved.schemeId)}
                        className="text-orange-500 hover:text-orange-600 hover:scale-110 transition-all"
                        aria-label="Remove from saved"
                      >
                        <Bookmark className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Applications */}
          <div className="glass-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sans font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-500" />
                Recent Applications
              </h2>
              {applications.length > 0 && (
                <span className="badge bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
                  {applications.length} Total
                </span>
              )}
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No applications yet. Apply for schemes from the results page.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{app.schemeName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`badge ${
                      app.status === 'Submitted'
                        ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                        : app.status === 'Approved'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Deadlines */}
          <div className="glass-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sans font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-violet-500" />
                Upcoming Deadlines
              </h2>
            </div>

            {upcomingDeadlines.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No upcoming deadlines. Check your eligible schemes to see deadlines.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map((scheme) => {
                  const Icon = iconMap[scheme.icon] || Sparkles;
                  const daysLeft = Math.ceil((new Date(scheme.lastDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={scheme.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${scheme.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{scheme.shortName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Last date: {scheme.lastDate}</p>
                      </div>
                      <span className={`badge ${daysLeft < 30 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'}`}>
                        {daysLeft}d left
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* AI Assistant CTA */}
        <div className="mt-8 glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/30 animate-glow-pulse">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-sans font-bold text-base text-slate-800 dark:text-white">Need help understanding a scheme?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Our AI assistant can explain any scheme, list documents, and guide you through the application process.</p>
          </div>
          <button onClick={() => setPage('form')} className="btn-secondary flex-shrink-0">
            <ExternalLink className="w-4 h-4" />
            Check Eligibility
          </button>
        </div>
      </div>
    </div>
  );
}
