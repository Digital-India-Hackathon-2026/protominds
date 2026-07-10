import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Input Field States
  const [fullName, setFullName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');

  // Auxiliary UI States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password Strength Evaluator
  const passwordStrength = useMemo(() => {
    if (!password) return { label: 'None', score: 0, color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 1: return { label: 'Weak', score: 25, color: 'bg-rose-500' };
      case 2: return { label: 'Fair', score: 50, color: 'bg-amber-500' };
      case 3: return { label: 'Good', score: 75, color: 'bg-blue-500' };
      case 4: return { label: 'Strong', score: 100, color: 'bg-emerald-500' };
      default: return { label: 'Weak', score: 25, color: 'bg-rose-500' };
    }
  }, [password]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Field Validations
    if (!fullName || !aadhaar || !mobile || !email || !password || !confirmPassword || !gender || !dob || !stateName || !district) {
      setValidationError('All mandatory system registration fields must be provided.');
      return;
    }

    if (aadhaar.replace(/\s/g, '').length !== 12 || !/^\d+$/.test(aadhaar.replace(/\s/g, ''))) {
      setValidationError('Please enter a valid 12-digit UIDAI identity identifier configuration.');
      return;
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setValidationError('Please specify a standard 10-digit primary communication link index.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Target operational passkeys mismatch. Please check verification configurations.');
      return;
    }

    if (passwordStrength.score < 50) {
      setValidationError('Security threshold validation rejected. Please configure a stronger authentication key.');
      return;
    }

    setIsLoading(true);

    // Simulate backend submission process
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Account securely provisioned onto JanMithra Cloud Node. Redirecting...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1800);
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        {/* Emblem/Gov Header accent bar */}
        <div className="bg-gradient-to-r from-emerald-700 to-slate-900 text-white px-6 py-5 flex items-center space-x-4">
          <div className="p-2 bg-white/10 rounded-lg font-bold tracking-wider text-xl">
            GOV
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Citizen Core Enrollment Hub</h2>
            <p className="text-xs text-emerald-300">National Unified Digital Identity Framework Provisioning</p>
          </div>
        </div>

        <form onSubmit={handleRegisterSubmit} className="p-6 space-y-6">
          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center space-x-2 text-rose-700 text-sm" role="alert">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{validationError}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2 text-emerald-700 text-sm animate-pulse" role="status">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Section 1: Demographics */}
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 pb-1 border-b border-slate-100">1. Demographics & Identification</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name (As in ID document) <span className="text-rose-500">*</span></label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full legal designation" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" required aria-required="true" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Aadhaar Number (12-digit Identity) <span className="text-rose-500">*</span></label>
                <input type="text" maxLength={12} value={aadhaar} onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))} placeholder="000000000000" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono tracking-widest" required aria-required="true" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date of Birth <span className="text-rose-500">*</span></label>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" required aria-required="true" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender <span className="text-rose-500">*</span></label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" required aria-required="true">
                  <option value="">Select Option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Non-Binary</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Geography */}
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 pb-1 border-b border-slate-100">2. Contact Info & Jurisdiction</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mobile Number <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm text-slate-400 font-medium">+91</span>
                  <input type="tel" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))} placeholder="9876543210" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono" required aria-required="true" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="citizen@domain.in" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" required aria-required="true" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">State Territory <span className="text-rose-500">*</span></label>
                <input type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder="e.g. Maharashtra" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" required aria-required="true" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">District Jurisdiction <span className="text-rose-500">*</span></label>
                <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="e.g. Nagpur" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" required aria-required="true" />
              </div>
            </div>
          </div>

          {/* Section 3: Credentials */}
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 pb-1 border-b border-slate-100">3. Portal Passkey Setup</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Create Secure Password <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 characters" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono" required aria-required="true" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none" aria-label={showPassword ? 'Hide security key string' : 'Show security key string'}>
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
                {/* Strength Meter Bar layout */}
                {password && (
                  <div className="mt-2">
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${passwordStrength.color} transition-all duration-300`} style={{ width: `${passwordStrength.score}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block font-medium">Security Matrix Strength: <span className="font-bold">{passwordStrength.label}</span></span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Verify Password <span className="text-rose-500">*</span></label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter security passphrase" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono" required aria-required="true" />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-xs text-slate-500">By establishing access configurations, you assert compliance with national portal infrastructure policies.</span>
            <button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-lg transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-70 flex-shrink-0">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Provisioning Terminal Node...</span>
                </>
              ) : (
                <span>Create Core Account</span>
              )}
            </button>
          </div>
        </form>

        <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-100 text-sm text-slate-600">
          Already have an operational account profile?{' '}
          <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;