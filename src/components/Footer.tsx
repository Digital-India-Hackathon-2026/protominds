import { Shield, Mail, Phone, MapPin, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setPage } = useApp();

  return (
    <footer className="relative mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/30 hover:scale-110 hover:rotate-6 transition-all duration-300">
                <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-sans font-extrabold text-lg text-slate-800 dark:text-white">
                JanMitra<span className="text-gradient"> AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering citizens to discover and access government schemes with AI-powered guidance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setPage('landing')} className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setPage('form')} className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Check Eligibility
                </button>
              </li>
              <li>
                <button onClick={() => setPage('dashboard')} className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wide">
              Schemes
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-slate-500 dark:text-slate-400">PM Kisan</li>
              <li className="text-sm text-slate-500 dark:text-slate-400">PM Awas Yojana</li>
              <li className="text-sm text-slate-500 dark:text-slate-400">Ayushman Bharat</li>
              <li className="text-sm text-slate-500 dark:text-slate-400">Mudra Loan</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-brand-500" />
                help@janmitra.ai
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Phone className="w-4 h-4 text-brand-500" />
                1800-XXX-XXXX (Toll Free)
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-brand-500" />
                New Delhi, India
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/40 dark:hover:text-brand-400 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/40 dark:hover:text-brand-400 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/40 dark:hover:text-brand-400 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © 2025 JanMitra AI. Built for citizens of India. This is a demonstration project.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1">
              Privacy Policy <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#" className="text-xs text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1">
              Terms of Use <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
