export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  pdfUrl: string;
  previewImage: string;
  category: string;
  duration?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  content?: string; // Detailed content for article-style courses
  date: string; // ISO format YYYY-MM-DD
}

export const courses: Course[] = [
  {
    id: "neti-prelims-environment-ecology-magazine",
    title: "Neti Prelims: Environment & Ecology Magazine",
    description: "Comprehensive 18-month coverage (Oct 2024 – March 2026) for UPSC Prelims 2026. Prioritized, syllabus-connected, and built for recall.",
    price: 0,
    pdfUrl: "/Magazines/NetiPrelims-Environment.pdf",
    previewImage: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1000",
    category: "Magazine",
    duration: "70 Pages",
    level: "Advanced",
    date: "2026-04-15",
    content: `You are holding the first edition of **Neti Prelims — Environment & Ecology**. 

This magazine covers the eighteen months of environment current affairs most likely to be tested in UPSC Prelims 2026: **October 2024 to March 2026**. It is built on one core idea: you do not need more information; you need less information, presented better.

### What's Inside the 70-Page Edition:
1.  **International Conventions & COPs**: Detailed outcomes of COP29 Baku, COP30 Belém, and CBD COP16.
2.  **Climate Change & India's Commitments**: Tracking India's NDC progress, Panchamrit goals, and the new Carbon Credit Trading Scheme (CCTS).
3.  **Biodiversity & Species**: Latest IUCN Red List updates, Project Cheetah milestones, and Invasive Species reports.
4.  **Protected Areas**: Coverage of India's 98 Ramsar sites and 58 Tiger Reserves.
5.  **Governance & Tech**: PM Surya Ghar Muft Bijli Yojana, Green Hydrogen Mission, and E-Waste Rules 2024.
6.  **Quick Revision**: The **Top 30 Must-Know Facts** for the night before the exam.
7.  **Assessment**: A **Grand Practice Test** with 25 UPSC-pattern MCQs and detailed explanations.`
  },
  {
    id: "revision-military-exercises",
    title: "Neti Revision 01: Military Exercises",
    description: "A specialized revision module covering all major bilateral and multilateral military exercises relevant for UPSC Prelims.",
    price: 0,
    pdfUrl: "/Revision_series/Neti Revision 01 Military_Exercises.pdf",
    previewImage: "/images/military_exercises.png",
    category: "Revision Series",
    duration: "Quick Read",
    level: "Intermediate",
    date: "2026-04-20",
    content: `Military exercises are a recurring theme in UPSC Prelims. This module consolidates all major bilateral and multilateral exercises involving India from **October 2024 to April 2026**.

### Key Highlights:
1.  **Bilateral Exercises**: Updated list of exercises with USA, Russia, France, Japan, and neighboring countries.
2.  **Multilateral Drills**: Comprehensive coverage of Malabar, MILAN, and SCO-led exercises.
3.  **Domestic Drills**: Major tri-services exercises conducted on Indian soil.
4.  **Strategic Context**: Brief notes on why these exercises matter for regional security.

This module is designed for quick recall in the final weeks of preparation.`
  },
  {
    id: "revision-places-in-news",
    title: "Neti Revision 02: Places in News",
    description: "A specialized revision module covering all major domestic and international places in news relevant for UPSC Prelims.",
    price: 0,
    pdfUrl: "/Revision_series/Neti Revision 02 Places in News.pdf",
    previewImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    category: "Revision Series",
    duration: "Quick Read",
    level: "Intermediate",
    date: "2026-04-22",
    content: `Places in News is one of the most high-yield areas for UPSC Prelims. This module consolidates all major geographical locations, conflict zones, and environmental hotspots in the news from **October 2024 to April 2026**.

### Key Highlights:
1.  **International Hotspots**: Conflict zones in West Asia, Eastern Europe, and the Indo-Pacific.
2.  **Domestic Geography**: New tiger reserves, Ramsar sites, and infrastructure projects across India.
3.  **Environmental Sites**: Locations of major ecological shifts, natural disasters, and conservation efforts.
4.  **Mapping Exercises**: Curated list of locations to practice on physical and political maps.

This module is optimized for spatial memory and quick visual recall.`
  },
  {
    id: "revision-species-in-news",
    title: "Neti Revision 03: Species in News",
    description: "A specialized revision module covering all major species in news, IUCN status, and conservation efforts for UPSC Prelims.",
    price: 0,
    pdfUrl: "/Revision_series/Neti Revision 03 Species in News.pdf",
    previewImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1200",
    category: "Revision Series",
    duration: "Quick Read",
    level: "Intermediate",
    date: "2026-04-24",
    content: `Species in News is a critical part of the Environment & Ecology section in UPSC Prelims. This module consolidates all major flora and fauna that were in the news from **October 2024 to April 2026**.

### Key Highlights:
1.  **IUCN Red List Updates**: Key changes in the conservation status of prominent species.
2.  **Endemic Species**: Focus on species found only in specific Indian landscapes (Western Ghats, Himalayas, etc.).
3.  **Project-based Species**: Updates on Project Tiger, Project Elephant, Project Cheetah, and Project Great Indian Bustard.
4.  **Conservation Sites**: Linking species to their specific National Parks and Wildlife Sanctuaries.

This module is designed to help you master the 'Species' dimension of the Environment paper.`
  },
  {
    id: "revision-rivers-of-india",
    title: "Neti Revision 04: Rivers of India",
    description: "A specialized revision module covering all major river systems, tributaries, and multipurpose projects in India for UPSC Prelims.",
    price: 0,
    pdfUrl: "/Revision_series/Neti Revision 04 Rivers of India.pdf",
    previewImage: "/images/rivers_of_india.png",
    category: "Revision Series",
    duration: "Quick Read",
    level: "Intermediate",
    date: "2026-04-27",
    content: `Rivers of India is a foundational topic for UPSC Prelims Geography. This module provides a structured revision of all major Himalayan and Peninsular river systems.

### Key Highlights:
1.  **Himalayan Rivers**: Detailed mapping of the Indus, Ganga, and Brahmaputra systems with all major left and right bank tributaries.
2.  **Peninsular Rivers**: West-flowing (Narmada, Tapi) and East-flowing (Mahanadi, Godavari, Krishna, Kaveri) systems.
3.  **Multipurpose Projects**: Key dams, reservoirs, and hydro-electric projects categorized by river basins.
4.  **Interlinking of Rivers**: Status of major interlinking projects and their geographical impact.
5.  **Water Disputes**: Summary of ongoing inter-state water sharing disputes and relevant tribunals.

This module is optimized for visual mapping and quick factual recall of drainage patterns.`
  }
];
