import type { CitizenDetails, EligibilityResult, GovernmentScheme } from '../types';
import { schemes } from '../data/schemes';

interface RuleResult {
  passed: boolean;
  matched: string[];
  unmatched: string[];
}

function checkRule(citizen: CitizenDetails, scheme: GovernmentScheme): RuleResult {
  const matched: string[] = [];
  const unmatched: string[] = [];

  switch (scheme.id) {
    case 'pm-kisan': {
      if (citizen.isFarmer) matched.push('Registered farmer');
      else unmatched.push('Must be a farmer');

      if (citizen.annualIncome <= 800000) matched.push('Income within ₹8 lakh limit');
      else unmatched.push('Annual family income must be up to ₹8,00,000');

      if (citizen.age >= 18) matched.push('Age 18 or above');
      else unmatched.push('Must be 18 or above');

      return { passed: unmatched.length === 0, matched, unmatched };
    }

    case 'pm-awas-yojana': {
      if (citizen.annualIncome <= 1800000) matched.push('Income within ₹18 lakh limit');
      else unmatched.push('Annual family income must be up to ₹18,00,000');

      if (citizen.age >= 18) matched.push('Age 18 or above');
      else unmatched.push('Must be 18 or above');

      return { passed: unmatched.length === 0, matched, unmatched };
    }

    case 'national-scholarship': {
      if (citizen.isStudent) matched.push('Registered student');
      else unmatched.push('Must be a student');

      if (citizen.annualIncome <= 800000) matched.push('Income within ₹8 lakh limit');
      else unmatched.push('Annual family income must be up to ₹8,00,000');

      if (citizen.age >= 10 && citizen.age <= 35) matched.push('Age between 10-35 years');
      else unmatched.push('Age must be between 10 and 35 years');

      return { passed: unmatched.length === 0, matched, unmatched };
    }

    case 'sukanya-samriddhi': {
      if (citizen.gender === 'Female') matched.push('Account for girl child');
      else unmatched.push('This scheme is for girl children only');

      if (citizen.age <= 10) matched.push('Age below 10 years');
      else unmatched.push('Girl child must be below 10 years of age');

      return { passed: unmatched.length === 0, matched, unmatched };
    }

    case 'ayushman-bharat': {
      if (citizen.annualIncome <= 300000) matched.push('Income within ₹3 lakh limit');
      else unmatched.push('Annual family income must be up to ₹3,00,000');

      return { passed: unmatched.length === 0, matched, unmatched };
    }

    case 'stand-up-india': {
      const isEligibleCategory = citizen.category === 'SC' || citizen.category === 'ST' || citizen.gender === 'Female';
      if (isEligibleCategory) matched.push('SC/ST category or woman entrepreneur');
      else unmatched.push('Must be SC/ST category or a woman entrepreneur');

      if (citizen.age >= 18) matched.push('Age 18 or above');
      else unmatched.push('Must be 18 or above');

      return { passed: unmatched.length === 0, matched, unmatched };
    }

    case 'mudra-loan': {
      if (citizen.age >= 18) matched.push('Age 18 or above');
      else unmatched.push('Must be 18 or above');

      if (!citizen.isFarmer) matched.push('Non-farm business activity');
      else unmatched.push('Not applicable for farm activities');

      if (citizen.annualIncome <= 1000000) matched.push('Income within ₹10 lakh limit');
      else unmatched.push('Annual family income must be up to ₹10,00,000');

      return { passed: unmatched.length === 0, matched, unmatched };
    }

    case 'skill-india': {
      if (citizen.age >= 15 && citizen.age <= 45) matched.push('Age between 15-45 years');
      else unmatched.push('Age must be between 15 and 45 years');

      if (citizen.isStudent || citizen.occupation === 'Unemployed') matched.push('Student or unemployed youth');
      else unmatched.push('Must be a student or unemployed youth');

      return { passed: unmatched.length === 0, matched, unmatched };
    }

    default:
      return { passed: false, matched, unmatched: ['Unknown scheme'] };
  }
}

export function checkEligibility(citizen: CitizenDetails): EligibilityResult[] {
  return schemes.map((scheme) => {
    const result = checkRule(citizen, scheme);
    const totalCriteria = result.matched.length + result.unmatched.length;
    const matchScore = totalCriteria > 0 ? (result.matched.length / totalCriteria) * 100 : 0;

    return {
      scheme,
      isEligible: result.passed,
      matchScore: Math.round(matchScore),
      matchedCriteria: result.matched,
      unmatchedCriteria: result.unmatched,
    };
  });
}

export function getEligibleSchemes(citizen: CitizenDetails): EligibilityResult[] {
  return checkEligibility(citizen).filter((r) => r.isEligible);
}

export function getAllSchemes(): GovernmentScheme[] {
  return schemes;
}
