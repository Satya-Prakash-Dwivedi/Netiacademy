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
    previewImage: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&q=80&w=1000",
    category: "Revision Series",
    duration: "Quick Read",
    level: "Intermediate",
    content: `Military exercises are a recurring theme in UPSC Prelims. This module consolidates all major bilateral and multilateral exercises involving India from **October 2024 to April 2026**.

### Key Highlights:
1.  **Bilateral Exercises**: Updated list of exercises with USA, Russia, France, Japan, and neighboring countries.
2.  **Multilateral Drills**: Comprehensive coverage of Malabar, MILAN, and SCO-led exercises.
3.  **Domestic Drills**: Major tri-services exercises conducted on Indian soil.
4.  **Strategic Context**: Brief notes on why these exercises matter for regional security.

This module is designed for quick recall in the final weeks of preparation.`
  }
];
