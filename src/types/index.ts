export type Gender = 'Male' | 'Female' | 'Other';
export type Category = 'General' | 'SC' | 'ST' | 'OBC';

export interface CitizenDetails {
  name: string;
  age: number;
  gender: Gender;
  state: string;
  district: string;
  occupation: string;
  annualIncome: number;
  category: Category;
  isStudent: boolean;
  isFarmer: boolean;
  hasDisability: boolean;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  shortName: string;
  description: string;
  ministry: string;
  category: string;
  benefits: string[];
  eligibility: string[];
  requiredDocuments: string[];
  lastDate: string;
  applyUrl: string;
  icon: string;
  color: string;
  tags: string[];
}

export interface EligibilityResult {
  scheme: GovernmentScheme;
  isEligible: boolean;
  matchScore: number;
  matchedCriteria: string[];
  unmatchedCriteria: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SavedScheme {
  schemeId: string;
  savedAt: number;
}

export interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  appliedAt: number;
}
