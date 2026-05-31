
export enum TalentArchetype {
  THE_BUILDER = 'The Builder',
  THE_CREATOR = 'The Creator',
  THE_ANALYST = 'The Analyst',
  THE_LEADER = 'The Leader',
  THE_CAREGIVER = 'The Caregiver'
}

export interface Career {
  id: string;
  title: string;
  sector: string;
  description: string;
  educationNeeded: string[];
  localUniversities: string[];
  growthPotential: 'High' | 'Medium' | 'Low';
  image: string;
  gallery?: string[];
  detailedNotes?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    archetype: TalentArchetype;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  // Added sources field to track grounding metadata (URLs, titles, etc.)
  sources?: any[];
}
