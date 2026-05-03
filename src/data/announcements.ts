export interface Announcement {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  pdfUrl?: string; // Optional PDF link
}

export const platformAnnouncements: Announcement[] = [
  {
    id: "welcome-to-neti-academy",
    title: "Welcome to Neti Academy",
    category: "Platform Update",
    excerpt: "Neti Academy is a platform built for students who take their preparation seriously — not just as an exam, but as a commitment to something larger.",
    content: `Something brought you here. That's a good start.

Neti Academy is a platform built for students who take their preparation seriously — not just as an exam, but as a commitment to something larger. A commitment to understanding deeply, thinking clearly, and becoming someone ready to contribute to public life in a meaningful way.

We want to be part of that journey.

### Why we exist

The name comes from a phrase in the Brihadaranyaka Upanishad — नेति नेति — not this, not this. It is a method of arriving at truth by removing what is unnecessary, not by adding more.

We borrowed this idea directly for how we think about preparation.

The problem with most preparation resources today is not that they are bad. It is that there are too many of them, pulling in too many directions. A student can spend more time managing resources than actually studying. More time deciding what to read than reading. More time feeling busy than feeling prepared.

Neti Academy exists to remove that problem. We focus on what genuinely matters. We say no to everything else.

### The logo

Look at our logo carefully.

![Neti Logo](/Neti_logo.jpeg)

The arrow points upward. That is intentional.

Every serious aspirant is on an upward journey — not just in rank or score, but in thinking, in character, in the quality of their understanding. The arrow is not about beating others. It is about becoming better than you were yesterday.

The M at the center stands for movement. Constant, deliberate, upward movement.

And the circle around it is the boundary — the discipline of staying focused, not chasing every direction at once. Moving up, but within a clear and chosen path.

That is what we stand for.

### On mental health and balance

We will write about this, and we mean it sincerely.

This journey is long. Sometimes it is full of momentum and clarity. Sometimes it is slow and heavy. Both are normal. What matters is having a preparation system stable enough to carry you through both kinds of days.

We believe clarity, structure, and emotional steadiness are not separate from preparation. They are preparation. A calm mind reads better, retains more, and performs under pressure. We will talk about how to build that — regularly and honestly on our dedicated [Mind](/mind).

### On Plan B — and why we take it seriously

Most platforms will never bring this up. We will.

This exam is uncertain. Not because you lack ability — but because even serious, hardworking people do not always make it through. The outcome is never fully in your control.

A Plan B does not pull you away from your preparation. It gives your mind a place to stand. When you know you have options — even if you never use them — the fear of failure quietly decreases. And when that fear decreases, you prepare with more confidence, not less.

We are one of the very few platforms that will sit with you on this honestly — without pressure, without judgment, and without pulling you away from what you are working toward. You can explore these structured alternatives on our [Plan B](/plan-b).

### What we are building

We are not trying to be the largest platform. We are trying to be the most genuinely useful one — for the students who find us and stay.

Everything here is built for the long term. We are not chasing trends or exam seasons. We are building something that gets better over time, quietly and consistently.

If that sounds like what you are looking for, you are in the right place.

Explore the blog. Read the current affairs. Visit the Mind section when the journey feels heavy. And when you are ready to think about Plan B — that page is there too, without judgment.

Join our [Telegram Channel](https://t.me/netiacademy) for daily updates. And if something we write helps you, [Write to us via Email](mailto:contact@netiacademy.com). We are always listening.

Welcome. We are glad you are here.
— Team, Neti Academy`,
    date: "April 10, 2026",
    author: "Neti Founder",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "neti-prelims-environment-ecology-magazine",
    title: "Neti Prelims: Environment & Ecology Magazine Released",
    category: "Magazine",
    excerpt: "Comprehensive 18-month coverage (Oct 2024 – March 2026) for UPSC Prelims 2026. Prioritized, syllabus-connected, and built for recall.",
    content: `You are holding the first edition of **Neti Prelims — Environment & Ecology**. 

This magazine covers the eighteen months of environment current affairs most likely to be tested in UPSC Prelims 2026: **October 2024 to March 2026**. It is built on one core idea: you do not need more information; you need less information, presented better.

### What's Inside the 70-Page Edition:
1.  **International Conventions & COPs**: Detailed outcomes of COP29 Baku, COP30 Belém, and CBD COP16.
2.  **Climate Change & India's Commitments**: Tracking India's NDC progress, Panchamrit goals, and the new Carbon Credit Trading Scheme (CCTS).
3.  **Biodiversity & Species**: Latest IUCN Red List updates, Project Cheetah milestones, and Invasive Species reports.
4.  **Protected Areas**: Coverage of India's 98 Ramsar sites and 58 Tiger Reserves (including new additions like Madhav and Guru Ghasidas).
5.  **Governance & Tech**: PM Surya Ghar Muft Bijli Yojana, Green Hydrogen Mission, and E-Waste Rules 2024.
6.  **Quick Revision**: The **Top 30 Must-Know Facts** for the night before the exam.
7.  **Assessment**: A **Grand Practice Test** with 25 UPSC-pattern MCQs and detailed explanations.

### The Neti Priority System
Every topic in this magazine is labeled to help you manage your time:
-   **MUST-KNOW**: High probability of direct questions.
-   **SHOULD-KNOW**: Moderate probability; do not skip.
-   **GOOD-TO-KNOW**: Useful for elimination in Prelims.

### Note on Secure Access
To maintain the integrity of our research, this PDF is protected against text copying. We recommend using Adobe Acrobat or Google Chrome for the best viewing experience.

Stay Focused. Stay Neti.
— Team Neti Academy`,
    date: "April 24, 2026",
    author: "Neti Content Team",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1000",
    pdfUrl: "/Magazines/NetiPrelims-Environment.pdf"
  }
];
