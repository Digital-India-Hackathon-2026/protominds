// digital-india-hackathon-2026/protominds/protominds-ad04d013c8c86a6dbf3d3e0fd456ba7e97307d01/src/pages/LandingPage.tsx

import { useNavigate } from 'react-router-dom';
import {
  Shield, Search, FileText, Bot, CheckCircle2, ArrowRight,
  Users, Award, Clock, Sparkles, TrendingUp, BookOpen, Heart,
  Building2, GraduationCap, Briefcase, Zap, Home as HomeIcon,
} from 'lucide-react';
import { schemes } from '../data/schemes';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat: Sparkles, Home: HomeIcon, GraduationCap, Heart: Heart,
  ShieldPlus: Shield, Briefcase, Landmark: Building2, Zap,
};

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: Search, title: 'Smart Eligibility Check', desc: 'Answer a few questions and instantly discover which government schemes you qualify for.', color: 'from-brand-500 to-cyan-600' },
    { icon: Bot, title: 'AI Chat Assistant', desc: 'Get instant answers about any scheme, documents required, and how to apply — in simple language.', color: 'from-violet-500 to-fuchsia-600' },
    { icon: FileText, title: 'Document Guidance', desc: 'Know exactly which documents you need before you apply. No more guesswork or rejected applications.', color: 'from-emerald-500 to-teal-600' },
    { icon: TrendingUp, title: 'Personal Dashboard', desc: 'Track your eligible schemes, saved schemes, applications, and upcoming deadlines in one place.', color: 'from-orange-500 to-amber-600' },
  ];

  const steps = [
    { num: '01', icon: FileText, title: 'Fill Your Details', desc: 'Enter your basic information like age, state, occupation, income, and category.' },
    { num: '02', icon: CheckCircle2, title: 'Get Matched Schemes', desc: 'Our system matches your profile against all available schemes and shows eligible ones.' },
    { num: '03', icon: Bot, title: 'Ask AI for Help', desc: 'Use the AI chatbot to understand schemes, check documents, and get application guidance.' },
    { num: '04', icon: ArrowRight, title: 'Apply & Track', desc: 'Click apply to visit the official portal, then track your applications from the dashboard.' },
  ];

  const stats = [
    { value: '8+', label: 'Government Schemes', icon: Award, color: 'from-brand-500 to-cyan-600' },
    { value: '28', label: 'States Covered', icon: Users, color: 'from-emerald-500 to-teal-600' },
    { value: '100%', label: 'Free to Use', icon: Heart, color: 'from-rose-500 to-pink-600' },
    { value: '24/7', label: 'AI Assistance', icon: Clock, color: 'from-orange-500 to-amber-600' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-brand-300/20 dark:bg-brand-700/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-accent-300/15 dark:bg-accent-700/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-emerald-300/10 dark:bg-emerald-700/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative section-container py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700/50 mb-6 animate-glow-pulse">
                <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span className="text-sm font-medium text-brand-700 dark:text-brand-300">AI-Powered Scheme Discovery</span>
              </div>

              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight text-slate-900 dark:text-white mb-6">
                Find Government Schemes
                <span className="block text-gradient-animated">You Are Eligible For</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl">
                JanMitra AI helps you discover government schemes, understand benefits, check required documents, and get AI guidance — all in one place. Built for every citizen of India.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('/form')} className="btn-primary group">
                  <Search className="w-5 h-5" />
                  Check Eligibility
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                  <TrendingUp className="w-5 h-5" />
                  View Dashboard
                </button>
              </div>

              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {['from-brand-500 to-cyan-600', 'from-emerald-500 to-teal-600', 'from-orange-500 to-amber-600', 'from-rose-500 to-pink-600'].map((g, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${g} border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold hover:scale-110 hover:z-10 transition-transform cursor-default`}>
                      {['A', 'R', 'S', 'M'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Trusted by citizens</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">across 28 states & 8 UTs</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up stagger-2">
              <div className="relative">
                <div className="glass-card p-6 rounded-3xl shadow-2xl shadow-brand-900/10 hover:shadow-brand-500/20 transition-shadow duration-500">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400 hover:scale-125 transition-transform cursor-default" />
                      <div className="w-3 h-3 rounded-full bg-amber-400 hover:scale-125 transition-transform cursor-default" />
                      <div className="w-3 h-3 rounded-full bg-green-400 hover:scale-125 transition-transform cursor-default" />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Eligibility Results</span>
                  </div>

                  <div className="space-y-3">
                    {schemes.slice(0, 4).map((scheme, i) => (
                      <div key={scheme.id} className={`flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:scale-[1.03] hover:shadow-md hover:border-brand-300 dark:hover:border-brand-600 transition-all duration-300 callback-stagger animate-fade-in-up`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${scheme.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                          {(() => {
                            const Icon = iconMap[scheme.icon] || Sparkles;
                            return <Icon className="w-5 h-5 text-white" />;
                          })()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{scheme.shortName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{scheme.ministry}</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 animate-pop-in" style={{ animationDelay: `${0.5 + i * 0.1}s` }} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/30 dark:to-accent-900/20 border border-brand-200/50 dark:border-brand-700/30">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      <p className="text-xs text-brand-700 dark:text-brand-300 font-medium">AI Assistant: "You are eligible for 4 schemes!"</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 glass-card px-4 py-3 rounded-2xl shadow-xl animate-float">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-lg font-bold text-slate-800 dark:text-white leading-none">8+</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Schemes Available</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-brand-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">AI Guide</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">24/7 Assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-container -mt-8 relative z-10">
        <div className="glass-card p-6 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-3 animate-fade-in-up group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-800 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700/50 mb-4">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Features</span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Everything You Need to Access
            <span className="block text-gradient">Government Schemes</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            From discovering eligible schemes to getting AI-powered guidance, JanMitra AI covers the entire journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="glass-card p-6 rounded-2xl hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-sans font-bold text-lg text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="section-container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700/50 mb-4">
            <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">How It Works</span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            No paperwork, no office visits. Discover your eligible schemes from the comfort of your home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-300 dark:via-brand-700 to-transparent" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="glass-card p-6 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full group">
                  <div className="relative inline-flex mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 text-white text-xs font-bold flex items-center justify-center shadow-md animate-pop-in" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-base text-slate-800 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Schemes Showcase */}
      <section className="section-container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700/50 mb-4">
            <Award className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Popular Schemes</span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Schemes We Help You Access
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {schemes.map((scheme, i) => {
            const Icon = iconMap[scheme.icon] || Sparkles;
            return (
              <div
                key={scheme.id}
                className="glass-card p-5 rounded-2xl hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scheme.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-white mb-1.5">{scheme.shortName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{scheme.description}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">{scheme.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 lg:p-16 text-center shadow-2xl shadow-brand-900/30 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="relative">
            <Building2 className="w-12 h-12 text-white/80 mx-auto mb-4 animate-float" />
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mb-4">
              Ready to Discover Your Schemes?
            </h2>
            <p className="text-cyan-100 text-lg mb-8 max-w-xl mx-auto">
              Take the first step towards accessing the benefits you are entitled to. It takes less than 2 minutes.
            </p>
            <button onClick={() => navigate('/form')} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-700 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 group">
              <Search className="w-5 h-5" />
              Check My Eligibility Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}