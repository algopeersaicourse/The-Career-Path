
import { TalentArchetype, Career, QuizQuestion } from './types';

export interface Proverb {
  text: string;
  author: string;
}

export const DAILY_PROVERBS: Proverb[] = [
  {
    text: "Knowledge is like a garden: if it is not cultivated, it cannot be harvested.",
    author: "Traditional Ghanaian Wisdom"
  },
  {
    text: "One who follows the path of his elders does not get lost in the forest.",
    author: "Akan Proverb"
  },
  {
    text: "The ruin of a nation begins in the homes of its people.",
    author: "Ashanti Proverb"
  },
  {
    text: "Knowledge is power. Information is liberating. Education is the premise of progress.",
    author: "Kofi Annan"
  },
  {
    text: "We face neither East nor West; we face Forward.",
    author: "Kwame Nkrumah"
  },
  {
    text: "If you understand the beginning well, the end will not trouble you.",
    author: "Ewe Proverb"
  },
  {
    text: "God gives nothing to those who keep their arms crossed.",
    author: "Akan Proverb"
  },
  {
    text: "Education is a human right with immense power to transform.",
    author: "Kofi Annan"
  },
  {
    text: "The path of the heart is the path of the soul.",
    author: "Ga Proverb"
  },
  {
    text: "When you follow in the path of your father, you learn to walk like him.",
    author: "Ashanti Proverb"
  }
];

export const GHANAIAN_CAREERS: Career[] = [
  {
    id: '1',
    title: 'Software Engineer',
    sector: 'Technology',
    description: 'Design and develop software solutions. Crucial for Ghana\'s growing FinTech, HealthTech, and eCommerce ecosystems.',
    educationNeeded: ['BSc. Computer Science', 'Software Engineering Certifications'],
    localUniversities: ['KNUST', 'Ashesi University', 'UG', 'GCTU'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '9',
    title: 'Architect',
    sector: 'Construction',
    description: 'Design iconic structures and sustainable living spaces. Help shape the skyline of cities like Accra and Kumasi while preserving cultural heritage.',
    educationNeeded: ['BSc. Architecture', 'Postgraduate Diploma/M.Arch', 'ARC Ghana Certification'],
    localUniversities: ['KNUST', 'Central University', 'Radford University College'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1518005020251-58c03ba8a241?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600'
    ],
    detailedNotes: [
      "Architecture in Ghana is shifting towards 'Tropical Modernism', balancing contemporary aesthetics with local climate needs.",
      "Professional practice requires registration with the Architects Registration Council (ARC) of Ghana after a mandatory 2-year internship period.",
      "Sustainability is a major focus: using local materials like compressed earth bricks (CEB), timber, and bamboo is becoming a high-demand skill to reduce carbon footprints.",
      "Urban planning in Accra requires architects to think deeply about drainage, solar orientation, and high-density living to combat annual flooding and rising energy costs.",
      "The role involves both artistic creativity and rigorous technical knowledge of structural integrity and building codes (Ghana Building Code).",
      "Future architects must master BIM (Building Information Modeling) and CAD software to compete in the global market and handle complex projects.",
      "Landscaping and interior design are growing sub-sectors for architects in the Ghanaian luxury real estate market and boutique hotel industry.",
      "Restoration of heritage sites, such as the historic buildings in Jamestown and the coastal forts, is a niche but vital field for cultural tourism.",
      "Architects often work closely with Civil Engineers and Quantity Surveyors to ensure projects stay within the budgets typical of the Ghanaian economy.",
      "A significant part of the job involves navigating the local permit process with Metropolitan, Municipal, and District Assemblies (MMDAs).",
      "Membership in the Ghana Institute of Architects (GIA) is crucial for professional networking and staying updated on local industry regulations.",
      "The trend of 'Green Building' certification (like EDGE) is gaining traction in Ghana, creating new roles for sustainable design specialists.",
      "Architectural photography and visualization are emerging as valuable side-skills for modern practitioners to market their portfolios.",
      "The shift towards smart cities in West Africa means architects must now integrate IoT and renewable energy systems into residential designs."
    ]
  },
  {
    id: '10',
    title: '3D Animator',
    sector: 'Digital Creative',
    description: 'Create high-quality animations for films, advertisements, and gaming. Ghana\'s animation scene is exploding with global acclaim (e.g., Disney+ Kizazi Moto).',
    educationNeeded: ['BSc. Creative Multimedia', 'Animation Certifications', 'Portfolio of Work'],
    localUniversities: ['NAFTI', 'KNUST', 'BlueCrest College'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    detailedNotes: [
      "Ghanaian animators are increasingly working remotely for international studios.",
      "Key software skills include Maya, Blender, and Unreal Engine.",
      "The industry is moving towards telling local folklore (Ananse stories) through 3D mediums.",
      "Character rigging and lighting specialists are currently in high demand locally."
    ]
  },
  {
    id: '11',
    title: 'Mobile App Developer',
    sector: 'Technology',
    description: 'Build applications for iOS and Android. Mobile-first is the standard in Africa, making this one of the most bankable skills.',
    educationNeeded: ['BSc. Information Technology', 'Flutter/React Native Certification'],
    localUniversities: ['GCTU', 'Academic City University College', 'Ashesi'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600',
    detailedNotes: [
      "Focus on low-bandwidth and offline-first capabilities for Ghanaian users.",
      "High integration with Mobile Money (MoMo) APIs is essential.",
      "Growing opportunities in building Super Apps for local logistics and commerce."
    ]
  },
  {
    id: '12',
    title: 'Data Scientist',
    sector: 'Technology/Finance',
    description: 'Use statistics and AI to analyze data and predict trends. Banks and retailers in Accra are actively seeking data experts.',
    educationNeeded: ['BSc. Mathematics/Stats', 'MSc. Data Science', 'Python/R Proficiency'],
    localUniversities: ['AIMS Ghana', 'University of Ghana', 'KNUST'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '13',
    title: 'Game Developer',
    sector: 'Entertainment Tech',
    description: 'Design and code interactive video games. Local studios are creating games that resonate with West African culture.',
    educationNeeded: ['BSc. Computer Science', 'Game Design Diploma', 'Unity/C# Skills'],
    localUniversities: ['BlueCrest College', 'NAFTI (Game Dev tracks)'],
    growthPotential: 'Medium',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '14',
    title: 'Cloud Engineer',
    sector: 'Technology',
    description: 'Manage and scale servers on platforms like AWS and Azure. Vital for Ghanaian startups moving away from on-premise hardware.',
    educationNeeded: ['BSc. Computer Engineering', 'AWS/Azure Certified Solutions Architect'],
    localUniversities: ['GCTU', 'KNUST', 'Academic City'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    title: 'Agricultural Entrepreneur',
    sector: 'Agriculture',
    description: 'Transform traditional farming into high-yield businesses through technology, irrigation, and modern supply chain management.',
    educationNeeded: ['BSc. Agribusiness', 'Crop Science', 'Animal Science'],
    localUniversities: ['UCC', 'KNUST', 'University of Ghana'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1594488651083-023b8a40d282?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    title: 'Chartered Accountant',
    sector: 'Finance',
    description: 'Manage financial records, audits, and taxes for corporations and government agencies. A highly respected and stable path.',
    educationNeeded: ['BSc. Accounting', 'ICAG Professional Program', 'ACCA'],
    localUniversities: ['UPSA', 'UGBS', 'UCC'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    title: 'Graphic & Digital Designer',
    sector: 'Creative Arts',
    description: 'Create visual concepts to communicate ideas that inspire and captivate consumers in the advertising and media sectors.',
    educationNeeded: ['BA. Communication Design', 'Fine Arts', 'Graphic Design Certs'],
    localUniversities: ['KNUST', 'NAFTI', 'BlueCrest College'],
    growthPotential: 'Medium',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '5',
    title: 'Registered Nurse',
    sector: 'Healthcare',
    description: 'Provide essential medical care and support to patients across Ghana\'s hospitals and clinics.',
    educationNeeded: ['BSc. Nursing', 'Diploma in Nursing'],
    localUniversities: ['NMC Training Colleges', 'UG', 'KNUST'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '6',
    title: 'Civil Engineer',
    sector: 'Construction',
    description: 'Design and supervise the building of infrastructure like roads, bridges, and housing developments across the nation.',
    educationNeeded: ['BSc. Civil Engineering'],
    localUniversities: ['KNUST', 'UENR'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '7',
    title: 'Fashion Designer',
    sector: 'Creative Arts',
    description: 'Blend traditional Ghanaian textiles like Kente and Smock with modern styles to create global fashion trends.',
    educationNeeded: ['BSc. Fashion Design', 'Technical Training (NVTI)'],
    localUniversities: ['Accra Technical University', 'KNUST', 'Radford'],
    growthPotential: 'Medium',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '8',
    title: 'Cyber Security Analyst',
    sector: 'Technology',
    description: 'Protect government and private organizations from data breaches and cyber threats in an increasingly digital Ghana.',
    educationNeeded: ['BSc. IT', 'Computer Science', 'CompTIA Security+'],
    localUniversities: ['GCTU', 'Ashesi', 'KNUST'],
    growthPotential: 'High',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "In a group project, what is your preferred role?",
    options: [
      { text: "Organizing the tasks and leading the team", archetype: TalentArchetype.THE_LEADER },
      { text: "Designing the posters or the presentation slides", archetype: TalentArchetype.THE_CREATOR },
      { text: "Finding data and verifying facts", archetype: TalentArchetype.THE_ANALYST },
      { text: "Making sure everyone feels included and happy", archetype: TalentArchetype.THE_CAREGIVER },
      { text: "Building the physical model or the prototype", archetype: TalentArchetype.THE_BUILDER }
    ]
  },
  {
    id: 2,
    question: "Which subject in school do you enjoy most?",
    options: [
      { text: "Visual Arts or Music", archetype: TalentArchetype.THE_CREATOR },
      { text: "Mathematics or Integrated Science", archetype: TalentArchetype.THE_ANALYST },
      { text: "History or Government", archetype: TalentArchetype.THE_LEADER },
      { text: "Social Studies or Biology", archetype: TalentArchetype.THE_CAREGIVER },
      { text: "Applied Science or Technical Drawing", archetype: TalentArchetype.THE_BUILDER }
    ]
  }
];
