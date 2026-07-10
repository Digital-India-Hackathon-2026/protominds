import { getEligibleSchemes } from "../utils/gemini";
import { useState } from 'react';
import {
  User, MapPin, Briefcase, IndianRupee,
  Tag, GraduationCap, Wheat, Accessibility, ArrowRight,
  AlertCircle, CheckCircle2, Loader2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { indianStates, stateDistricts, occupations } from '../data/schemes';
import type { CitizenDetails, Category, Gender } from '../types';

interface FormErrors {
  [key: string]: string;
}

export default function CitizenForm() {
const { setCitizen, setPage, setAiResponse } = useApp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<CitizenDetails>({
    name: '',
    age: 0,
    gender: 'Male',
    state: '',
    district: '',
    occupation: '',
    annualIncome: 0,
    category: 'General',
    isStudent: false,
    isFarmer: false,
    hasDisability: false,
  });

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';

    if (!form.age || form.age < 1) errs.age = 'Age is required';
    else if (form.age > 120) errs.age = 'Please enter a valid age';

    if (!form.state) errs.state = 'Please select your state';
    if (!form.district.trim()) errs.district = 'District is required';
    if (!form.occupation) errs.occupation = 'Please select your occupation';

    if (!form.annualIncome || form.annualIncome < 0) errs.annualIncome = 'Annual income is required';
    else if (form.annualIncome > 100000000) errs.annualIncome = 'Please enter a valid amount';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Button Clicked");
    if (!validate()) return;

    setLoading(true);
    setLoading(true);

try {
  const aiResponse = await getEligibleSchemes({
    age: form.age,
    gender: form.gender,
    state: form.state,
    occupation: form.occupation,
    income: form.annualIncome,
    category: form.category,
    student: form.isStudent,
    farmer: form.isFarmer,
    disability: form.hasDisability,
  });
  console.log("AI Response:", aiResponse);
  setAiResponse(aiResponse);


  setCitizen(form);

  setPage("results");
} catch (error) {
  console.error("Gemini Error:", error);
} finally {
  setLoading(false);
}
  };

  const update = (field: keyof CitizenDetails, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClass = (field: string) =>
    `input-field ${errors[field] ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : ''}`;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 gradient-mesh">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-10 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700/50 mb-4 animate-glow-pulse">
            <User className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Citizen Details</span>
          </div>
          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-3">
            Tell Us About <span className="text-gradient">Yourself</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Fill in your details below and we will match you with government schemes you are eligible for. Your data stays on your device.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl animate-fade-in-up hover:shadow-brand-500/10 transition-shadow duration-500">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-lg text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </span>
              Personal Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Age *</label>
                <input
                  type="number"
                  value={form.age || ''}
                  onChange={(e) => update('age', parseInt(e.target.value) || 0)}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  className={inputClass('age')}
                />
                {errors.age && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => update('gender', e.target.value as Gender)}
                  className="select-field"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => update('category', e.target.value as Category)}
                  className="select-field"
                >
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-lg text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <MapPin className="w-4 h-4 text-white" />
              </span>
              Location
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">State *</label>
                <select
                  value={form.state}
                  onChange={(e) => {
                    update('state', e.target.value);
                    update('district', '');
                  }}
                  className={inputClass('state')}
                >
                  <option value="">Select your state</option>
                  {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">District *</label>
                <select
                  value={form.district}
                  onChange={(e) => update('district', e.target.value)}
                  disabled={!form.state}
                  className={`${inputClass('district')} ${!form.state ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">{form.state ? 'Select your district' : 'Select state first'}</option>
                  {(stateDistricts[form.state] || []).map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.district && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.district}</p>}
              </div>
            </div>
          </div>

          {/* Occupation & Income */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-lg text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md">
                <Briefcase className="w-4 h-4 text-white" />
              </span>
              Occupation & Income
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Occupation *</label>
                <select
                  value={form.occupation}
                  onChange={(e) => update('occupation', e.target.value)}
                  className={inputClass('occupation')}
                >
                  <option value="">Select your occupation</option>
                  {occupations.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.occupation && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.occupation}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Annual Family Income (₹) *</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={form.annualIncome || ''}
                    onChange={(e) => update('annualIncome', parseInt(e.target.value) || 0)}
                    placeholder="Enter annual family income"
                    min="0"
                    className={`${inputClass('annualIncome')} pl-10`}
                  />
                </div>
                {errors.annualIncome && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.annualIncome}</p>}
              </div>
            </div>
          </div>

          {/* Additional Criteria */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-lg text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-md">
                <Tag className="w-4 h-4 text-white" />
              </span>
              Additional Criteria
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <ToggleCard
                icon={GraduationCap}
                label="Are you a student?"
                value={form.isStudent}
                onChange={(v) => update('isStudent', v)}
              />
              <ToggleCard
                icon={Wheat}
                label="Are you a farmer?"
                value={form.isFarmer}
                onChange={(v) => update('isFarmer', v)}
              />
              <ToggleCard
                icon={Accessibility}
                label="Person with disability?"
                value={form.hasDisability}
                onChange={(v) => update('hasDisability', v)}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full sm:w-auto group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking Eligibility...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Check My Eligibility
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
              Your data is stored locally and never sent to any server.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function ToggleCard({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-[1.02] ${
        value
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 shadow-md shadow-brand-500/20'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-brand-300 dark:hover:border-brand-600'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
        value ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
      }`}>
        <Icon className={`w-5 h-5 transition-transform duration-300 ${value ? 'scale-110' : ''}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
        <p className={`text-xs font-semibold ${value ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`}>
          {value ? 'Yes' : 'No'}
        </p>
      </div>
      <div className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 relative ${value ? 'bg-gradient-to-r from-brand-500 to-brand-400' : 'bg-slate-300 dark:bg-slate-600'}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
    </button>
  );
}
