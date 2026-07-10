import type { CitizenDetails, GovernmentScheme } from '../types';
import { schemes } from '../data/schemes';
import { getEligibleSchemes } from './eligibility';

interface ChatContext {
  citizen: CitizenDetails | null;
}

function findSchemeByName(query: string): GovernmentScheme | undefined {
  const lower = query.toLowerCase();
  return schemes.find(
    (s) =>
      lower.includes(s.shortName.toLowerCase()) ||
      lower.includes(s.name.toLowerCase()) ||
      lower.includes(s.id),
  );
}

export function generateChatResponse(message: string, context: ChatContext): string {
  const lower = message.toLowerCase().trim();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('namaste')) {
    return 'Hello! I am JanMitra AI, your government scheme assistant. I can help you find eligible schemes, understand benefits, check required documents, and guide you on how to apply. What would you like to know?';
  }

  if (lower.includes('eligible') || lower.includes('eligibility') || lower.includes('which scheme')) {
    if (!context.citizen) {
      return 'To check which schemes you are eligible for, please fill out the Citizen Details form first. I can also tell you about general eligibility criteria for any specific scheme. Which scheme would you like to know about?';
    }
    const eligible = getEligibleSchemes(context.citizen);
    if (eligible.length === 0) {
      return 'Based on your details, you may not be eligible for the schemes currently in our database. However, new schemes are added regularly. I recommend checking with your local government office or revisiting your form details.';
    }
    const names = eligible.map((e) => e.scheme.shortName).join(', ');
    return `Based on your details, you are eligible for ${eligible.length} scheme(s): ${names}. Would you like me to explain any of these in detail?`;
  }

  if (lower.includes('document') || lower.includes('paper') || lower.includes('required')) {
    const scheme = findSchemeByName(lower);
    if (scheme) {
      return `For ${scheme.name}, you will need the following documents:\n\n${scheme.requiredDocuments.map((d) => `• ${d}`).join('\n')}\n\nMake sure all documents are up to date and carry photocopies along with originals when applying.`;
    }
    return 'Each scheme requires different documents. Generally, you will need:\n\n• Aadhaar Card\n• Income certificate\n• Caste certificate (if applicable)\n• Bank account details\n• Address proof\n\nTell me a specific scheme name, and I will list the exact documents needed.';
  }

  if (lower.includes('apply') || lower.includes('how to') || lower.includes('application')) {
    const scheme = findSchemeByName(lower);
    if (scheme) {
      return `To apply for ${scheme.name}:\n\n1. Visit the official portal: ${scheme.applyUrl}\n2. Register with your mobile number and Aadhaar\n3. Fill in the application form with required details\n4. Upload the necessary documents\n5. Submit and note your application/reference number\n\nThe last date to apply is ${scheme.lastDate}. Apply early to avoid last-minute issues.`;
    }
    return 'To apply for any government scheme:\n\n1. Visit the official scheme portal\n2. Register using your mobile number and Aadhaar\n3. Fill in the application form\n4. Upload required documents (Aadhaar, income certificate, etc.)\n5. Submit and save your reference number\n\nWould you like to know the apply process for a specific scheme? Just mention the scheme name.';
  }

  if (lower.includes('explain') || lower.includes('what is') || lower.includes('tell me about') || lower.includes('simple')) {
    const scheme = findSchemeByName(lower);
    if (scheme) {
      return `${scheme.name} in simple terms:\n\n${scheme.description}\n\nKey benefits:\n${scheme.benefits.map((b) => `• ${b}`).join('\n')}\n\nThis scheme is run by the ${scheme.ministry}. The last date to apply is ${scheme.lastDate}.`;
    }
    return 'I can explain any government scheme in simple language. Some popular schemes I know about:\n\n• PM Kisan - Income support for farmers\n• PM Awas Yojana - Affordable housing\n• National Scholarship - Education scholarships\n• Sukanya Samriddhi - Savings for girl child\n• Ayushman Bharat - Health insurance\n• Stand-Up India - Business loans for SC/ST and women\n• Mudra Loan - Small business loans\n• Skill India - Free skill training\n\nWhich one would you like me to explain?';
  }

  if (lower.includes('benefit') || lower.includes('benefits')) {
    const scheme = findSchemeByName(lower);
    if (scheme) {
      return `Benefits of ${scheme.name}:\n\n${scheme.benefits.map((b) => `• ${b}`).join('\n')}`;
    }
    return 'Each scheme offers different benefits like cash assistance, subsidies, loans, insurance, or training. Tell me a specific scheme name and I will list its exact benefits.';
  }

  if (lower.includes('last date') || lower.includes('deadline') || lower.includes('date')) {
    const scheme = findSchemeByName(lower);
    if (scheme) {
      return `The last date to apply for ${scheme.name} is ${scheme.lastDate}. I recommend applying well before the deadline to avoid any last-minute issues.`;
    }
    return 'Each scheme has its own deadline. Tell me a specific scheme name and I will tell you its last date to apply.';
  }

  if (lower.includes('pm kisan') || lower.includes('farmer')) {
    const s = schemes.find((x) => x.id === 'pm-kisan')!;
    return `${s.name}:\n\n${s.description}\n\nBenefits:\n${s.benefits.map((b) => `• ${b}`).join('\n')}\n\nEligibility:\n${s.eligibility.map((e) => `• ${e}`).join('\n')}\n\nDocuments needed:\n${s.requiredDocuments.map((d) => `• ${d}`).join('\n')}\n\nApply at: ${s.applyUrl}\nLast date: ${s.lastDate}`;
  }

  if (lower.includes('scholarship') || lower.includes('student')) {
    const s = schemes.find((x) => x.id === 'national-scholarship')!;
    return `${s.name}:\n\n${s.description}\n\nBenefits:\n${s.benefits.map((b) => `• ${b}`).join('\n')}\n\nEligibility:\n${s.eligibility.map((e) => `• ${e}`).join('\n')}\n\nApply at: ${s.applyUrl}`;
  }

  if (lower.includes('health') || lower.includes('medical') || lower.includes('hospital') || lower.includes('ayushman')) {
    const s = schemes.find((x) => x.id === 'ayushman-bharat')!;
    return `${s.name}:\n\n${s.description}\n\nBenefits:\n${s.benefits.map((b) => `• ${b}`).join('\n')}\n\nEligibility:\n${s.eligibility.map((e) => `• ${e}`).join('\n')}\n\nApply at: ${s.applyUrl}`;
  }

  if (lower.includes('loan') || lower.includes('business') || lower.includes('mudra')) {
    const s = schemes.find((x) => x.id === 'mudra-loan')!;
    return `${s.name}:\n\n${s.description}\n\nBenefits:\n${s.benefits.map((b) => `• ${b}`).join('\n')}\n\nEligibility:\n${s.eligibility.map((e) => `• ${e}`).join('\n')}\n\nApply at: ${s.applyUrl}`;
  }

  if (lower.includes('housing') || lower.includes('home') || lower.includes('awas')) {
    const s = schemes.find((x) => x.id === 'pm-awas-yojana')!;
    return `${s.name}:\n\n${s.description}\n\nBenefits:\n${s.benefits.map((b) => `• ${b}`).join('\n')}\n\nEligibility:\n${s.eligibility.map((e) => `• ${e}`).join('\n')}\n\nApply at: ${s.applyUrl}`;
  }

  if (lower.includes('thank')) {
    return 'You are welcome! I am always here to help you with government schemes. Feel free to ask if you have any more questions.';
  }

  if (lower.includes('help') || lower.includes('what can you do')) {
    return 'I can help you with:\n\n• Finding schemes you are eligible for\n• Explaining any scheme in simple language\n• Listing required documents for a scheme\n• Guiding you on how to apply\n• Telling you about scheme benefits and deadlines\n\nJust ask me a question, or mention a scheme name like "PM Kisan" or "Mudra Loan".';
  }

  return 'I am here to help with government schemes. You can ask me things like:\n\n• "Which schemes am I eligible for?"\n• "What documents are required for PM Kisan?"\n• "How do I apply for Mudra Loan?"\n• "Explain Ayushman Bharat in simple language"\n• "What are the benefits of National Scholarship?"\n\nTry asking about any of the 8 schemes in our database.';
}
