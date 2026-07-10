import { useMemo, useState } from 'react';
import {
  CheckCircle2, XCircle, FileText, Award, Calendar, ExternalLink,
  Bookmark, BookmarkCheck, ArrowLeft, Sparkles, ChevronDown,
  ChevronUp, Search, Filter, Bot, Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { checkEligibility } from '../utils/eligibility';
import type { EligibilityResult } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat: Sparkles, Home: Sparkles, GraduationCap: Sparkles, Heart: Sparkles,
  ShieldPlus: CheckCircle2, Briefcase: Sparkles, Landmark: Sparkles, Zap: Sparkles,
};

export default function ResultsPage() {
  const { citizen, setPage, toggleSaveScheme, aiResponse, isSchemeSaved } = useApp();
  const [filter, setFilter] = useState<'eligible' | 'all'>('eligible');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!citizen) return [];
    return checkEligibility(citizen);
  }, [citizen]);

  const filteredResults = useMemo(() => {
    let r = results;
    if (filter === 'eligible') r = r.filter((res) => res.isEligible);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter((res) =>
        res.scheme.name.toLowerCase().includes(q) ||
        res.scheme.shortName.toLowerCase().includes(q) ||
        res.scheme.category.toLowerCase().includes(q),
      );
    }
    return r;
  }, [results, filter, search]);

  const eligibleCount = results.filter((r) => r.isEligible).length;

  if (!citizen) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Info className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No citizen details found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Please fill the form first to check eligibility.</p>
          <button onClick={() => setPage('form')} className="btn-primary">
            <FileText className="w-5 h-5" />
            Fill the Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 gradient-mesh">
      <div className="section-container">
        {/* AI Recommendation Box aligned inside the container */}
        {aiResponse && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900/50 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
              <span>🤖</span> AI Recommendation
            </h2>
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 dark:text-slate-300">
              {aiResponse}
            </pre>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <button
            onClick={() => setPage('form')}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit Details
          </button>

          <div className="glass-card p-6 rounded-2xl hover:shadow-brand-500/10 transition-shadow duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1">
                  Eligibility Results
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Hello <span className="font-semibold text-brand-600 dark:text-brand-400">{citizen.name}</span>, here are the schemes matched for your profile.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center px-5 py-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/40 animate-pop-in">
                  <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">{eligibleCount}</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Eligible Schemes</p>
                </div>
                <div className="text-center px-5 py-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 animate-pop-in" style={{ animationDelay: '0.1s' }}>
                  <p className="text-3xl font-extrabold text-slate-700 dark:text-slate-200 leading-none">{results.length}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total Schemes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search schemes..."
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => setFilter('eligible')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === 'eligible'
                  ? 'bg-gradient-to-r from-brand-600 to-brand-400 text-white shadow-md shadow-brand-500/30'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600'
              }`}
            >
              Eligible Only
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-brand-600 to-brand-400 text-white shadow-md shadow-brand-500/30'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600'
              }`}
            >
              All Schemes
            </button>
          </div>
        </div>

        {/* Results */}
        {filteredResults.length === 0 ? (
          <div className="glass-card p-12 rounded-2xl text-center">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-2">No schemes found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filter === 'eligible'
                ? 'You may not be eligible for any schemes currently. Try viewing all schemes.'
                : 'No schemes match your search. Try a different keyword.'}
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            {filteredResults.map((result, i) => (
              <SchemeCard
                key={result.scheme.id}
                result={result}
                index={i}
                expanded={expandedId === result.scheme.id}
                onToggle={() => setExpandedId(expandedId === result.scheme.id ? null : result.scheme.id)}
                saved={isSchemeSaved(result.scheme.id)}
                onSave={() => toggleSaveScheme(result.scheme.id)}
                onApply={() => setPage("documents")}
              />
            ))}
          </div>
        )}

        {/* AI Hint */}
        <div className="mt-8 glass-card p-5 rounded-2xl flex items-center gap-4 animate-fade-in-up">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/30 animate-glow-pulse">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-800 dark:text-white text-sm">Have questions about these schemes?</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Use the AI chat assistant in the bottom-right corner to ask about any scheme, documents, or how to apply.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SchemeCard({
  result,
  index,
  expanded,
  onToggle,
  saved,
  onSave,
  onApply,
}: {
  result: EligibilityResult;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  saved: boolean;
  onSave: () => void;
  onApply: () => void;
}) {
  const { scheme, isEligible, matchScore, matchedCriteria, unmatchedCriteria } = result;
  const Icon = iconMap[scheme.icon] || Sparkles;

  return (
    <div
      className={`glass-card group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up ${
        isEligible ? 'ring-1 ring-emerald-400/30 dark:ring-emerald-500/20' : ''
      }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${scheme.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-sans font-bold text-base text-slate-800 dark:text-white leading-tight">{scheme.shortName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{scheme.ministry}</p>
              </div>
              {isEligible ? (
                <span className="badge bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex-shrink-0 animate-pop-in">
                  <CheckCircle2 className="w-3 h-3" />
                  Eligible
                </span>
              ) : (
                <span className="badge bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 flex-shrink-0">
                  <XCircle className="w-3 h-3" />
                  {matchScore}% Match
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">{scheme.description}</p>

        {/* Match Score Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Match Score</span>
            <span className={`text-xs font-bold ${isEligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600 dark:text-orange-400'}`}>{matchScore}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isEligible ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-orange-400 to-amber-500'
              }`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Award className="w-3.5 h-3.5 text-brand-500" />
            {scheme.category}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-brand-500" />
            Last date: {scheme.lastDate}
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={onToggle}
          className="w-full mt-4 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>View Details <ChevronDown className="w-4 h-4" /></>
          )}
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4 animate-fade-in">
            {/* Benefits */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                Benefits
              </h4>
              <ul className="space-y-1.5">
                {scheme.benefits.map((b, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility Criteria */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Eligibility Criteria
              </h4>
              <ul className="space-y-1.5">
                {scheme.eligibility.map((e, i) => {
                  const matched = matchedCriteria.some((m) => m.toLowerCase().includes(e.toLowerCase().split(' ').slice(0, 3).join(' ')));
                  return (
                    <li key={i} className="text-sm flex items-start gap-2">
                      {matched ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={matched ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}>
                        {e}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {unmatchedCriteria.length > 0 && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">Not met:</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">{unmatchedCriteria.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Required Documents */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-500" />
                Required Documents
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {scheme.requiredDocuments.map((d, i) => (
                  <span key={i} className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onApply}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-400 hover:from-brand-700 hover:to-brand-500 shadow-md shadow-brand-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                Apply Now
              </button>
              <button
                onClick={onSave}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                  saved
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700'
                }`}
              >
                {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}