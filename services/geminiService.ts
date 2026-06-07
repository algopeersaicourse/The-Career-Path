import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "The Career Path Counselor", an expert AI career guide specifically for students in Ghana. 
Your goal is to help Junior High, Senior High, and University students discover their career paths based on their talents and the local job market.

Context for Ghana:
- You know about WASSCE, BECE, and the Free SHS system.
- You are familiar with top universities like KNUST (Kumasi), University of Ghana (Legon), UCC (Cape Coast), Ashesi, UPSA, and UENR.
- You understand current job market trends in Ghana: FinTech in Accra, modern Agribusiness, renewable energy, mining, and the creative industry boom.
- Provide advice that is culturally relevant, encouraging, and highly practical.
- Use Google Search to find current internship opportunities, recent scholarship announcements in Ghana, or new degree programs.
- If a student mentions their grades (e.g., aggregate 12), suggest courses they might qualify for at top universities.
- Always be polite, professional, and helpful.
`;

/**
 * Heuristic fallback counseling mechanism to handle missing/faulty API keys.
 * Captures Ghanaian vocabulary, schools, streams, and career-oriented cues 
 * to provide a high-fidelity, polished, and extremely relevant response.
 */
function getHeuristicCareerGuidance(message: string): { text: string; sources: any[] } {
  const query = message.toLowerCase().trim();

  // 1. WASSCE, BECE, Grades, Aggregates, Admissions
  if (
    query.includes("grade") || 
    query.includes("wassce") || 
    query.includes("bece") || 
    query.includes("aggregate") || 
    query.includes("admission") || 
    query.includes("requirement") ||
    query.includes("shs") ||
    /\b\d{1,2}\b/.test(query) // Mentions numerical aggregates
  ) {
    return {
      text: `Academic qualifications are the key entry gateways to tertiary education in Ghana. Here is a definitive guide to help you navitgate your grades:

1. **WASSCE Grading Scale:**
   - **A1** (Excellent, 1) through **C6** (Credit, 6) are the passing grades accepted for direct Bachelor's degree admissions.
   - Grades **D7**, **E8**, and **F9** do not qualify for direct public university degree entries, but are eligible for premium **Diploma streams**, technical colleges, or certificate pathways.
   - For most Bachelor's courses at **University of Ghana (Legon)** or **KNUST**, you need passes (A1–C6) in 3 Core subjects (Core Math, English, Integrated Science or Social Studies) and 3 Elective subjects related to your course.

2. **Aggregates Logic:**
   - Your aggregate is calculated by adding the numerical values of your best 3 core subjects and best 3 electives. Lower sums represent higher performance (e.g., Aggregate 6 is the perfect score).
   - **Aggregate 6–15:** Extremely competitive. Qualifies you for top-tier courses like Medicine, Law, BSc. Computer Science, Actuarial Science, or Civil Engineering.
   - **Aggregate 16–24:** Excellent placement. Well-positioned for Nursing, Agribusiness, Business Administration, Graphic Design, or Information Technology.
   - **Aggregate 25–36:** Ideal for standard undergraduate courses, vocational training colleges, teacher training, or premium applied Diplomas.

Would you like me to recommend a specific university course based on your electives or current aggregate?`,
      sources: [
        { web: { title: "University of Ghana Portal", uri: "https://admission.ug.edu.gh" } },
        { web: { title: "KNUST Admissions Requirements", uri: "https://www.knust.edu.gh/admissions" } }
      ]
    };
  }

  // 2. High-Tech, Software, Computer, Developer, Web, App
  if (
    query.includes("computer") || 
    query.includes("software") || 
    query.includes("developer") || 
    query.includes("tech") || 
    query.includes("program") || 
    query.includes("engineer") ||
    query.includes("coding") ||
    query.includes("code") ||
    query.includes("ai") ||
    query.includes("it")
  ) {
    return {
      text: `Technology and software engineering represent one of the fastest-growing and highest-paying career sectors in Ghana today!

### Recommend Tertiary Courses:
- **BSc. Computer Science / BSc. Computer Engineering** (Premier programs at **KNUST** and **Ashesi University**).
- **BSc. Information Technology** (Available at **GCTU** and **Academic City University College**).

### Navigating the Ghanaian Tech Workspace:
1. **The FinTech Explosion:** Accra is one of the most vibrant FinTech centers in West Africa. Well-paying roles are constantly opening up at leading local firms like **Hubtel**, **ExpressPay**, **Zeepay**, and **mPharma**.
2. **Bankable Skills to Learn:** Build proficiency in JavaScript/TypeScript (React, Node.js), Python (for Analytics and AI), or Flutter/React Native (for mobile apps, which are highly dominant as African markets are mobile-first).
3. **API Integrations:** Mastering mobile payment frameworks and Mobile Money (MoMo) API integrations makes you incredibly marketable to Ghanaian businesses and startups.

Starting a GitHub portfolio and contributing to open-source project lines early will set you apart from other graduates. Are you more drawn to software development, cybersecurity, or data analytics?`,
      sources: [
        { web: { title: "Ashesi University Computer Science", uri: "https://www.ashesi.edu.gh" } },
        { web: { title: "Ghana Communication Technology University", uri: "https://gctu.edu.gh" } }
      ]
    };
  }

  // 3. Farming, Agribusiness, Agriculture, Livestock, Cocoa
  if (
    query.includes("agri") || 
    query.includes("farm") || 
    query.includes("cocoa") || 
    query.includes("crop") || 
    query.includes("agriculture") ||
    query.includes("livestock") ||
    query.includes("shea")
  ) {
    return {
      text: `Modern Agribusiness in Ghana is moving rapidly beyond manual labor into highly computerized, modern supply chain enterprises! It is becoming one of the most profitable sectors to invest your skills in.

### Premier Degree Programs:
- **BSc. Agribusiness Management** (Highly rated programs at **UCC** and **University of Ghana**).
- **BSc. Agriculture / Crop Science** (Offered with excellent research labs at **KNUST** and **UENR**).

### Strategic Areas of Opportunity:
1. **Agri-Tech Platforms:** Startups specializing in IoT sensors, drone surveillance, mechanized lease markets, and mobile payment platforms connecting rural farms to urban markets.
2. **Food Processing & Brand Export:** Producing premium, retail-ready locally packaged brands (like Ghanaian chocolate, organic shea butter, and spices) instead of exporting raw materials. This adds massive value to local communities.
3. **Modern Greenhouses:** Greenhouses and drip-irrigation systems are highly profitable ventures for year-round cash crop production (tomatoes, exotic peppers).

Are you interested in the scientific crop management side, mechanical farm engineering, or agribusiness trade and export?`,
      sources: [
        { web: { title: "UCC School of Agriculture", uri: "https://ucc.edu.gh" } },
        { web: { title: "Ministry of Food and Agriculture (MoFA)", uri: "https://mofa.gov.gh" } }
      ]
    };
  }

  // 4. Healthcare, Nurse, Nursing, Doctor, Medicine, Pharmacy
  if (
    query.includes("nurse") || 
    query.includes("nursing") || 
    query.includes("doctor") || 
    query.includes("medicine") || 
    query.includes("health") || 
    query.includes("clinic") || 
    query.includes("hospital") ||
    query.includes("pharmacy") ||
    query.includes("medical")
  ) {
    return {
      text: `The healthcare profession is deeply respected and maintains steady, secure demand across all 16 regions of Ghana.

### Academic Qualifications:
- **MBChB (Medicine & Surgery):** Highly competitive 6-year professional doctorate programs available at **UG (Legon)** and **KNUST School of Medicine and Dentistry**.
- **BSc. Nursing / Midwifery:** Offered at public universities and regional **Nursing and Midwifery Training Colleges** (NMTCs).
- **Doctor of Pharmacy (PharmD):** Top-tier professional programs at **KNUST** and **UG**.

### Essential Sector Realities:
1. **Professional Registration:** To practice, you must sit for and pass licencing exams with the **Nurses and Midwifery Council (NMC)** of Ghana, or the **Medical and Dental Council (MDC)**.
2. **Mandatory Rotations:** Following graduation, you will complete a structured housemanship or clinical residency before receiving official public posting or stepping into the private sector.
3. **Emerging Fields:** Public health management, biomedical engineering, and digital health startups are creating exciting alternative careers.

Do you see yourself pursuing direct clinical patient care, medical specialization, or community public health research?`,
      sources: [
        { web: { title: "Nurses and Midwifery Council, Ghana", uri: "http://www.nmc.gov.gh" } },
        { web: { title: "Medical and Dental Council of Ghana", uri: "https://mdcghana.org" } }
      ]
    };
  }

  // 5. Creative, Art, Creative Industries, Animation, Graphic Design, Fashion, Architect
  if (
    query.includes("creative") || 
    query.includes("design") || 
    query.includes("animator") || 
    query.includes("animation") || 
    query.includes("fashion") || 
    query.includes("architect") || 
    query.includes("art") ||
    query.includes("music") ||
    query.includes("film") ||
    query.includes("kente")
  ) {
    return {
      text: `Ghana's creative and design sectors are enjoying a global renaissance! From cinematic animation and sustainable architecture to high fashion and commercial design, local talent is highly sought after.

### Outstanding Institutions in Ghana:
- **Architecture:** **KNUST** is the leading school of architecture, alongside **Central University** and **Radford**.
- **Film, Animation & Game Design:** **NAFTI / UniMAC** offers specialized programs in cinema and digital media production. Commercial multimedia certifications are also highly respected at **BlueCrest College**.
- **Fashion & Textiles:** Premium training at the **Accra Technical University** and **Radford University College**, emphasizing a fusion of traditional Kente and Smock with modern global styles.

### Emerging Growth Areas:
1. **International Remoteness:** Ghanaian animators, UI/UX designers, and video editors are increasingly working for transatlantic agencies remotely.
2. **Tropical Modernism:** Contemporary architectural designs emphasizing local timber, bamboo, and compressed earth bricks to create sustainable building layouts.

What specific creative medium inspires you the most — digital animation, structural designing, or fashion styling?`,
      sources: [
        { web: { title: "National Film and Television Institute (NAFTI)", uri: "https://nafti.edu.gh" } },
        { web: { title: "Ghana Institute of Architects", uri: "http://arcghana.org" } }
      ]
    };
  }

  // 6. Business, Finance, Chartered Accountant, Commerce, UPSA
  if (
    query.includes("account") || 
    query.includes("finance") || 
    query.includes("business") || 
    query.includes("leader") || 
    query.includes("manage") || 
    query.includes("marketing") ||
    query.includes("bank") ||
    query.includes("economy") ||
    query.includes("audit")
  ) {
    return {
      text: `Business administration, auditing, and corporate finance remain central blocks of the Ghanaian professional workforce!

### Top Local Institutions:
- **UPSA (University of Professional Studies, Accra):** The premier national institution for professional commercial instruction and chartered accounting courses.
- **University of Ghana Business School (UGBS):** Celebrated for finance, marketing, and human resource management.
- **UCC School of Business:** Outstanding for commerce, enterprise, and management.

### Key Careers Requirements:
1. **Professional Credentials:** Getting your Bachelor's degree is useful, but completing professional exams like **ICAG (Institute of Chartered Accountants, Ghana)** or **ACCA** is what truly positions you for leadership and rapid income growth.
2. **The Job Market:** Banks, FinTech leaders, corporate agencies, and accounting firms (PwC, EY, Deloitte, KPMG) in Accra's Central Business District actively look for credentialed analysts and auditors.

Would you like advice on mapping out ICAG vs. ACCA, or landing your first financial analyst role?`,
      sources: [
        { web: { title: "Institute of Chartered Accountants, Ghana", uri: "https://icagh.com" } },
        { web: { title: "UPSA Official Entrance Portal", uri: "https://upsa.edu.gh" } }
      ]
    };
  }

  // 7. Scholarships, Internships, Jobs, Funding
  if (
    query.includes("scholarship") || 
    query.includes("internship") || 
    query.includes("job") || 
    query.includes("opportunity") || 
    query.includes("scholar") || 
    query.includes("intern") ||
    query.includes("getfund")
  ) {
    return {
      text: `Securing scholarship sponsorships and practical workplace internships is an incredibly effective way to build your CV early:

1. **National Scholarships & Support:**
   - **Ghana Scholarship Secretariat:** A dedicated government body that offers applications for local tuition support and bilateral international fellowships for WASSCE graduates and undergraduates.
   - **GETFund (Ghana Education Trust Fund):** Distributes essential funding support to students specializing in science, mathematics, and high-impact vocational routes.

2. **Corporate Placements:**
   - Telecom operators (MTN Ghana, Telecel, AT) and multi-national banks run popular annual vacation internship intakes.
   - Accra's creative networks (like MEST, iSpace) provide early-access product management and tech internship placements.

3. **In-Demand Fellowships:**
   - The Mastercard Foundation Scholars Program has magnificent, fully-funded collaborations with **Ashesi University** and **KNUST** targeting high-performing student lines.

Would you like more details on crafting standard application letters or compiling your academic portfolios?`,
      sources: [
        { web: { title: "Ghana Scholarship Secretariat Portal", uri: "https://www.scholarshipgh.com" } },
        { web: { title: "Mastercard Foundation Scholars Program", uri: "https://mastercardfdn.org/all/scholars" } }
      ]
    };
  }

  // 8. General / Fallback
  return {
    text: `That is a wonderful career topic! To design a successful future in Ghana, we want to align your natural talents with the opportunities in our local and global job market.

Here are three excellent things you can do next right here in our app:
1. **Take the 2-Minute Talent Quiz:** Click **Talent Quiz** in the top navigation to determine your central archetype (Builder, Creator, Analyst, Leader, or Caregiver).
2. **Browse our Discoveries:** Go to the **Discoveries** library to find specific details, university qualifications, and growth potentials for 10+ modern careers in Ghana.
3. **Ask specialized questions:** Ask me about WASSCE aggregates, KNUST admission forms, learning how to code in Accra, or agribusiness strategies!

Tell me a bit more about your favorite school subjects or interests, and I can suggest matching career paths!`,
    sources: [
      { web: { title: "The Career Path Ghana - Discoveries Library", uri: "/careers" } },
      { web: { title: "The Career Path Ghana - Talent Quiz", uri: "/quiz" } }
    ]
  };
}

export class CareerChatService {
  private ai: GoogleGenAI | null = null;
  private chat: Chat | null = null;
  private hasApiKey: boolean = false;

  constructor() {
    // Collect possible API keys safely
    const apiKey = 
      process.env.GEMINI_API_KEY || 
      process.env.API_KEY || 
      (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
      "";

    // Clean placeholder keys if accidental string literals
    const isPlaceholder = !apiKey || 
      apiKey.trim() === "" || 
      apiKey.includes("YOUR_") || 
      apiKey.includes("PLACEHOLDER") ||
      apiKey === "undefined";

    if (!isPlaceholder) {
      try {
        this.ai = new GoogleGenAI({ 
          apiKey: apiKey.trim(),
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
        this.chat = this.ai.chats.create({
          model: 'gemini-3.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ googleSearch: {} }]
          }
        });
        this.hasApiKey = true;
      } catch (err) {
        console.warn("Unable to initiate Gemini client. Falling back to Heuristic Counselor.", err);
        this.hasApiKey = false;
      }
    } else {
      console.info("Gemini credentials not provided or empty. Engaging local intelligent heuristic mode.");
      this.hasApiKey = false;
    }
  }

  async sendMessage(message: string) {
    // If we do not have an active API key, serve the smart local counselor fallback immediately
    if (!this.hasApiKey || !this.chat) {
      return getHeuristicCareerGuidance(message);
    }

    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message });
      return {
        text: response.text || "",
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (error) {
      console.error("Gemini Live Call Failed. Engaging Fallback heuristic counselor:", error);
      // Even if the API call was supposed to work but failed (e.g. invalid key, quota, offline),
      // gracefully recover using the fallback rather than returning a broken message!
      return getHeuristicCareerGuidance(message);
    }
  }

  async sendMessageStream(message: string, onChunk: (chunk: string) => void) {
    if (!this.hasApiKey || !this.chat) {
      const localResult = getHeuristicCareerGuidance(message);
      onChunk(localResult.text);
      return;
    }

    try {
      const responseStream = await this.chat.sendMessageStream({ message });
      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          onChunk(c.text);
        }
      }
    } catch (error) {
      console.error("Gemini Stream Call Failed. Recovering with fallback counselor:", error);
      const localResult = getHeuristicCareerGuidance(message);
      onChunk(localResult.text);
    }
  }
}
