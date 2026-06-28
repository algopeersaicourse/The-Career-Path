import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "The Career Path Counselor", an exceptionally helpful, professional, and conversational AI career intelligence assistant styled in the spirit of ChatGPT, designed specifically for students in Ghana.

Core Directives on Style & Persona (Answer like ChatGPT):
- **Structured and Detailed Responses:** Break down complex topics into clear markdown headers, bold bullet points, and actionable numbered steps. Feel free to explain concepts thoroughly, provide background context, and detail strategic pathways.
- **Supportive and Professional Tone:** Speak with high emotional intelligence, professional empathy, and encouraging clarity. Frame advice as actionable masterclasses or strategic career roadmaps.
- **Ghanaian Employment Context:** Focus your mentoring on top Ghanaian institutions (e.g., University of Ghana (Legon), KNUST, UCC, Ashesi, UPSA, UENR, Academic City), active industrial opportunities (Accra's Tech & FinTech scene, Agribusiness export, Creative Arts & Design, Mineral Engineering), and emerging career disciplines.
- **NO standardized exam stress:** NEVER refer to WASSCE, BECE, or stress-inducing high school grade aggregate points. Do not prompt users for aggregate scores or results. Instead, ask about their favorite high school academic electives or broad streams (e.g., General Science, Visual Arts, General Arts, Business) or academic interests.
- **Active search & Grounding:** Leverage search results to find current scholarship timelines, real internship opportunities, and new degree programs in Ghana.
`;

/**
 * Heuristic fallback counseling mechanism to handle missing/faulty API keys.
 * Captures Ghanaian vocabulary, schools, streams, and career-oriented cues 
 * to provide a high-fidelity, polished, and extremely relevant response.
 */
function getHeuristicCareerGuidance(message: string): { text: string; sources: any[] } {
  const query = message.toLowerCase().trim();

  // 1. High School Tracks, University Courses, and General Admissions (No WASSCE)
  if (
    query.includes("grade") || 
    query.includes("admission") || 
    query.includes("requirement") ||
    query.includes("university") ||
    query.includes("college") ||
    query.includes("course") ||
    query.includes("study") ||
    query.includes("track") ||
    query.includes("elective")
  ) {
    return {
      text: `Hello! Let's explore university programs and career choices in Ghana together. Researching tertiary entry pathways is the first step toward building a successful legacy, and doing this in a structured, strategic way is critical!

Choosing the right course in Ghana is typically aligned with your High School elective tracks (such as General Science, General Arts, Business, or Visual Arts). Here is a comprehensive career-matching guide for these tracks:

### 🌟 1. General Science Track
If you have a strong background in science and mathematics, there are multiple high-value pathways open to you:
- **Engineering & Tech:** Consider pursuing **BSc. Computer Engineering**, **Software Engineering**, or **Civil Engineering** at specialized institutions such as **KNUST** or **Ashesi University**.
- **Clinical Sciences:** Professional degree tracks in **Medicine (MBChB)**, **Doctor of Pharmacy (PharmD)**, or **BSc. Nursing** at the **University of Ghana (Legon)** or **UCC** are excellent choices for medical leadership.
- **Agribusiness & Applied Sciences:** Fields like **BSc. Biotechnology** or **Agribusiness Management** open the door to modern, tech-driven resource management.

### 🎨 2. Visual Arts & Creative Tracks
Ghana is witnessing a massive boom in the creative industry:
- **Design & Architecture:** The premium route is **BSc. Architecture** or **BSc. Development Planning** at **KNUST**.
- **Multimedia & Film:** Specialized tracks like **Film Directing**, **Animation**, or **Digital Communications** at **UniMAC / NAFTI** or **Academic City** are incredibly in-demand.

### 💼 3. Business & Commerce Tracks
Highly coveted corporate paths for analytical and organization-oriented minds:
- **Corporate Accounting & Auditing:** Pursuing a **BSc. Accounting** or **BSc. Finance** at **UPSA** (premier for professional courses) or **UG Business School** sets a solid foundation. *Tip: Pairing this degree with professional charters (like ICAG or ACCA) early on is highly recommended.*
- **E-Commerce & Management:** **BSc. Business Administration** with a dual focus on digital marketing or logistics.

### 📚 4. General Arts Track
An incredibly versatile track leading to high-impact societal and leadership roles:
- **Law & Public Policy:** Pursuing a Bachelor of Laws (LLB) at **UG** or **GIMPA**, leading to professional legal practice.
- **Modern Languages & Communications:** High-demand translation, international relations, and corporate communications roles.

**💡 Step-by-Step Strategic Advice:**
1. **Choose Your Core Area of Passion:** Identify if you are more of an Analyst, Builder, or Caregiver.
2. **Review University Admission Timelines:** Check UG, KNUST, and UCC portals between February and June each year for current entry brochures.
3. **Verify Program Accreditations:** Always ensure your chosen university program is fully certified by the **Ghana Tertiary Education Commission (GTEC)**.

Would you like to focus on a particular university, or would you like to explore matching courses for your favorite high school subjects?`,
      sources: [
        { web: { title: "Ghana Tertiary Education Commission (GTEC)", uri: "https://gtec.edu.gh" } },
        { web: { title: "University of Ghana Admissions", uri: "https://admission.ug.edu.gh" } }
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

### Recommended Tertiary Courses:
- **BSc. Computer Science / BSc. Computer Engineering** (Premier programs at **KNUST** and **Ashesi University**).
- **BSc. Information Technology** (Available at **GCTU** and **Academic City University College**).

### Navigating the Ghanaian Tech Workspace:
1. **The FinTech Explosion:** Accra is one of the most vibrant FinTech centers in West Africa. Well-paying roles are constantly opening up at leading local firms like **Hubtel**, **ExpressPay**, **Zeepay**, and **mPharma**.
2. **Bankable Skills to Learn:** Build proficiency in JavaScript/TypeScript (React, Node.js), Python (for Analytics and AI), or Flutter/React Native (for mobile apps, which are highly dominant as African markets are mobile-first).
3. **API Integrations:** Mastering mobile payment frameworks and Mobile Money (MoMo) API integrations makes you incredibly marketable to Ghanaian businesses and startups.

Starting a GitHub portfolio and contributing to open-source projects early will set you apart from other graduates. Are you more drawn to software development, cybersecurity, or data analytics?`,
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
2. **Food Processing & Brand Export:** Producing retail-ready, locally packaged brands (like Ghanaian chocolate, organic shea butter, and spices) instead of exporting raw materials. This adds massive value to local communities.
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
1. **Professional Registration:** To practice, you must sit for and pass licensing exams with the **Nurses and Midwifery Council (NMC)** of Ghana, or the **Medical and Dental Council (MDC)**.
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

### Key Career Requirements:
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
   - **Ghana Scholarship Secretariat:** A dedicated government body that offers applications for local tuition support and bilateral international fellowships for high school graduates and university students.
   - **GETFund (Ghana Education Trust Fund):** Distributes essential funding support to students specializing in science, mathematics, and high-impact vocational routes.

2. **Corporate Placements:**
   - Telecom operators (MTN Ghana, Telecel, AT) and multi-national banks run popular annual vacation internship intakes.
   - Accra's creative networks (like MEST, iSpace) provide early-access product management and tech internship placements.

3. **In-Demand Fellowships:**
   - The Mastercard Foundation Scholars Program has magnificent, fully-funded collaborations with **Ashesi University** and **KNUST** targeting high-performing students.

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
3. **Ask specialized questions:** Ask me about KNUST admission forms, learning how to code in Accra, professional certifications, or agribusiness strategies!

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
