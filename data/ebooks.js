/* ============================================================
   data/ebooks.js
   ════════════════════════════════════════════════════════════
   THIS IS YOUR MAIN CONTENT FILE.
   Edit this file to change every ebook on the platform.

   FIELDS EXPLAINED:
   ─────────────────
   id       → unique number, never duplicate
   name     → title shown on the card and in the modal
   niche    → category used for filter buttons
   desc     → short description shown on the card
   pages    → displayed as metadata (e.g. "47 pages")
   bg       → hex background colour for the card when no cover image
   emoji    → shown when no cover image is set
   cover    → (OPTIONAL) path to a cover image.
              Example: "assets/images/covers/wealth-blueprint.jpg"
              Recommended size: 420×280px, PNG or JPG
              Leave as "" or null to show emoji instead.
   price    → suggested resell price shown in preview modal
   tableOfContents → array of chapter titles shown in preview
   previewText     → the first few lines shown in the preview panel

   HOW TO ADD A NEW EBOOK:
   ───────────────────────
   1. Copy any entry below
   2. Give it a new unique id (increment the last one)
   3. Fill in name, niche, desc, etc.
   4. (Optional) Add a cover image to assets/images/covers/
      and set the cover field to "assets/images/covers/your-file.jpg"
   5. Save the file — it appears in the dashboard automatically.

   HOW TO CHANGE THE ACTUAL EBOOK FILE PEOPLE DOWNLOAD:
   ──────────────────────────────────────────────────────
   Option A – Replace the generated text file:
     Edit the `previewText` and `tableOfContents` fields here.
     The download generates a .txt file from these fields.

   Option B – Serve a real PDF/DOCX:
     1. Put your file in assets/files/  (e.g. wealth-blueprint.pdf)
     2. Set the "file" field:  file: "assets/files/wealth-blueprint.pdf"
     3. js/dashboard.js will download that file instead of generating text.

   ============================================================ */

const EBOOKS = [
  {
    id: 1,
    emoji: "💰",
    name: "Wealth Building Blueprint",
    niche: "Finance",
    desc: "A complete roadmap to building multiple income streams and investing for long-term wealth.",
    pages: "47 pages",
    bg: "#1a1f12",
    cover: "assets/images/image.png",          /* ← set to "assets/images/covers/wealth-blueprint.jpg" to use an image */
    file: "",           /* ← set to "assets/files/wealth-blueprint.pdf" to use a real PDF */
    price: "$47",
    tableOfContents: [
      "1. The Wealth Mindset",
      "2. Budgeting for Growth",
      "3. Income Streams 101",
      "4. Investing Basics",
      "5. Real Estate Fundamentals",
      "6. Building Passive Income",
      "7. Your 12-Month Action Plan"
    ],
    previewText: `CHAPTER 1: THE WEALTH MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━

The single biggest barrier between you and financial freedom
isn't your income, your credit score, or your zip code.

It's your relationship with money.

Most people were never taught how money actually works.
They were taught to get a job, pay their bills, and maybe
save a little. That's a recipe for staying exactly where you are.

Wealthy people think differently. They don't trade time for
money — they build systems that generate money while they sleep.

In this chapter, you'll discover the 5 core beliefs that
separate the financially free from everyone else...`
  },
  {
    id: 2,
    emoji: "🥑",
    name: "Keto Starter Guide",
    niche: "Health",
    desc: "Everything a beginner needs to start a ketogenic diet and lose weight in 30 days.",
    pages: "38 pages",
    bg: "#12201a",
    cover: "",
    file: "",
    price: "$27",
    tableOfContents: [
      "1. What Is Keto?",
      "2. Foods To Eat & Avoid",
      "3. Your First Week Meal Plan",
      "4. Beating the Keto Flu",
      "5. Macros & Tracking",
      "6. 30-Day Progress Plan"
    ],
    previewText: `CHAPTER 1: WHAT IS KETO?
━━━━━━━━━━━━━━━━━━━━━━━━

The ketogenic diet is a high-fat, moderate-protein, very
low-carbohydrate eating plan that forces your body into a
metabolic state called ketosis.

In ketosis, your body burns fat for fuel instead of glucose.
The result? Rapid fat loss, stable energy levels, and
reduced cravings throughout the day.

Here's the basic breakdown of your daily macros on keto:

  • Fat:     70–75% of calories
  • Protein: 20–25% of calories
  • Carbs:   5–10% of calories (typically under 25g net carbs)

The science is simple. When carbs are restricted, insulin
levels drop, and your body shifts from burning sugar to
burning stored body fat...`
  },
  {
    id: 3,
    emoji: "📱",
    name: "Social Media Mastery",
    niche: "Marketing",
    desc: "How to grow from 0 to 10K followers and monetize your audience on any platform.",
    pages: "52 pages",
    bg: "#121820",
    cover: "",
    file: "",
    price: "$57",
    tableOfContents: [
      "1. Choosing Your Platform",
      "2. Profile Optimization",
      "3. Content Strategy",
      "4. The Posting Formula",
      "5. Growing Your Following Fast",
      "6. Monetization Methods",
      "7. Analytics & Iteration"
    ],
    previewText: `CHAPTER 1: CHOOSING YOUR PLATFORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The biggest mistake new creators make is trying to be
everywhere at once.

Pick ONE platform. Master it. Then expand.

Here's the quick breakdown:

  INSTAGRAM  → Best for visual products, fashion, food, lifestyle
  TIKTOK     → Best for entertainment, viral reach, younger audiences
  YOUTUBE    → Best for long-form education, reviews, tutorials
  PINTEREST  → Best for passive traffic (still generates sales years later)
  TWITTER/X  → Best for personal brand, B2B, thought leadership

For digital products specifically, Instagram + Pinterest
is the most profitable combination in 2025...`
  },
  {
    id: 4,
    emoji: "🧠",
    name: "Mindset Reset Guide",
    niche: "Self-Help",
    desc: "Rewire your mindset for success, abundance, and peak mental performance.",
    pages: "44 pages",
    bg: "#1a1218",
    cover: "",
    file: "",
    price: "$37",
    tableOfContents: [
      "1. Why Mindset Is Everything",
      "2. Identifying Limiting Beliefs",
      "3. The Reframe Technique",
      "4. Morning Mental Habits",
      "5. Visualization Practices",
      "6. Building Unshakeable Confidence"
    ],
    previewText: `CHAPTER 1: WHY MINDSET IS EVERYTHING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Two people can start with identical circumstances —
same city, same education, same resources — and end up
in completely different places in life.

The difference is almost never luck. It's mindset.

Your mindset is the lens through which you interpret
every experience. It determines whether you see an
obstacle as a roadblock or a stepping stone.

Fixed Mindset vs Growth Mindset:
  ✗ Fixed: "I'm not good at this."
  ✓ Growth: "I'm not good at this YET."

This one-word shift — YET — changes everything...`
  },
  {
    id: 5,
    emoji: "💪",
    name: "30-Day Fitness Transformation",
    niche: "Fitness",
    desc: "A proven 30-day workout and nutrition plan for total body transformation.",
    pages: "61 pages",
    bg: "#1f1a12",
    cover: "",
    file: "",
    price: "$47",
    tableOfContents: [
      "1. Setting Your Goal",
      "2. Week 1: Foundation",
      "3. Week 2: Building Momentum",
      "4. Week 3: Intensity Phase",
      "5. Week 4: Peak Performance",
      "6. Nutrition Protocol",
      "7. Recovery & Sleep"
    ],
    previewText: `YOUR 30-DAY TRANSFORMATION PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This program is designed for all fitness levels.
No gym required. Just 30–45 minutes per day.

WEEK 1 OVERVIEW (Foundation Phase):
  Mon → Full Body Circuit (30 mins)
  Tue → Active Recovery / Walk
  Wed → Upper Body Focus (35 mins)
  Thu → Core & Mobility (25 mins)
  Fri → Lower Body Focus (35 mins)
  Sat → HIIT Cardio (20 mins)
  Sun → Rest

Nutrition Rule #1:
  Eat protein with every single meal.
  Target: 0.8g of protein per pound of bodyweight.

The most important meal? The one right after your workout...`
  },
  {
    id: 6,
    emoji: "📊",
    name: "Passive Income Bible",
    niche: "Finance",
    desc: "12 proven passive income streams you can start building this weekend.",
    pages: "78 pages",
    bg: "#14121f",
    cover: "",
    file: "",
    price: "$97",
    tableOfContents: [
      "1. The Passive Income Mindset",
      "2. Digital Products",
      "3. Affiliate Marketing",
      "4. Dividend Investing",
      "5. Rental Income",
      "6. YouTube & Content",
      "7. Online Courses",
      "8. Print on Demand",
      "9. SaaS & Software",
      "10. Licensing",
      "11. Your Income Stack Plan"
    ],
    previewText: `THE 12 PASSIVE INCOME STREAMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Not all passive income is created equal.

Some streams require significant upfront work.
Others require upfront capital. Some require both.

Here's how to think about it using the EFFORT SCORE:
  (1 = low effort, 10 = high initial effort)

  1. Digital Products          → Effort: 4 | Potential: ★★★★★
  2. Affiliate Marketing       → Effort: 5 | Potential: ★★★★☆
  3. Dividend Investing        → Effort: 2 | Potential: ★★★☆☆
  4. Online Courses            → Effort: 7 | Potential: ★★★★★
  5. Print on Demand           → Effort: 3 | Potential: ★★★☆☆
  6. YouTube Ad Revenue        → Effort: 8 | Potential: ★★★★☆

The fastest way to start? Digital products.
No inventory. No shipping. 100% profit. Starting today...`
  },
  {
    id: 7,
    emoji: "☀️",
    name: "Morning Routine Blueprint",
    niche: "Productivity",
    desc: "The science-backed morning routine used by top performers and CEOs worldwide.",
    pages: "35 pages",
    bg: "#1f1a12",
    cover: "",
    file: "",
    price: "$17",
    tableOfContents: [
      "1. Why Mornings Matter",
      "2. The Night-Before Protocol",
      "3. The First 5 Minutes",
      "4. Movement & Exercise",
      "5. Mindfulness Practice",
      "6. Nutrition & Hydration",
      "7. Deep Work Block",
      "8. Building Your Custom Routine"
    ],
    previewText: `THE PERFECT MORNING IN 7 STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

How you start your morning sets the tone for your entire day.

High performers don't wing it. They design it.

Here is the evidence-based sequence:

  6:00am → Wake without alarm (train your body)
  6:05am → Hydrate: 500ml water + pinch of salt
  6:15am → 10 minutes of movement (walk, stretch, or yoga)
  6:25am → Journal: 3 gratitudes + 1 intention for the day
  6:35am → Cold exposure: 2-min cold shower
  6:40am → Nutrient-dense breakfast (high protein)
  7:00am → 90-minute deep work block (phone on airplane mode)

You don't need to follow this exactly.
Build your own version using these principles...`
  },
  {
    id: 8,
    emoji: "🧘",
    name: "Anxiety Freedom Guide",
    niche: "Wellness",
    desc: "Natural techniques to overcome anxiety, fear, and panic attacks without medication.",
    pages: "49 pages",
    bg: "#121f1a",
    cover: "",
    file: "",
    price: "$37",
    tableOfContents: [
      "1. Understanding Anxiety",
      "2. The Nervous System Explained",
      "3. Breathing Techniques",
      "4. Cognitive Reframing",
      "5. Body-Based Practices",
      "6. Sleep & Anxiety",
      "7. Long-Term Management Plan"
    ],
    previewText: `CHAPTER 1: UNDERSTANDING ANXIETY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Anxiety is not weakness. It is your nervous system
doing exactly what it was designed to do.

The problem? It can't tell the difference between
a sabre-tooth tiger and an unanswered email.

The physiological response is identical:
  → Heart rate increases
  → Breathing becomes shallow
  → Muscles tense
  → Mind races for threats

This is the Fight-or-Flight response. And in small
doses, it's useful. But when it fires constantly
for low-level modern stressors, it becomes chronic
anxiety — and it destroys quality of life.

The good news: you can retrain your nervous system.
Here's how...`
  },
  {
    id: 9,
    emoji: "₿",
    name: "Crypto for Beginners",
    niche: "Finance",
    desc: "Understand Bitcoin, Ethereum, and altcoins — and how to invest safely.",
    pages: "55 pages",
    bg: "#14121a",
    cover: "",
    file: "",
    price: "$57",
    tableOfContents: [
      "1. What is Blockchain?",
      "2. Bitcoin Explained",
      "3. Ethereum & Smart Contracts",
      "4. How to Buy Safely",
      "5. Wallets & Security",
      "6. DeFi Basics",
      "7. Risk Management",
      "8. Tax Considerations"
    ],
    previewText: `CHAPTER 1: WHAT IS BLOCKCHAIN?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before you buy a single dollar of crypto, you need
to understand what you're actually buying.

A blockchain is a distributed ledger — a database
that is shared and synchronized across thousands
of computers worldwide.

Why does this matter?
  → No single company or government controls it
  → Transactions can't be reversed or faked
  → The record is permanent and transparent

Think of it like a Google Doc that:
  ✓ Everyone can read
  ✓ No one can delete
  ✓ Has no single owner

Bitcoin was the first application of this technology,
created in 2009 by the pseudonymous Satoshi Nakamoto...`
  },
  {
    id: 10,
    emoji: "💻",
    name: "Freelancing Fast Track",
    niche: "Business",
    desc: "Land your first $1,000 freelance client in 30 days — step-by-step playbook.",
    pages: "42 pages",
    bg: "#12181f",
    cover: "",
    file: "",
    price: "$37",
    tableOfContents: [
      "1. Choosing Your Service",
      "2. Positioning & Niche",
      "3. Building Your Portfolio",
      "4. Finding Clients Fast",
      "5. The Perfect Pitch",
      "6. Pricing Your Services",
      "7. Delivering & Getting Referrals"
    ],
    previewText: `CHAPTER 1: CHOOSING YOUR SERVICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You don't need to be world-class to land $1,000 clients.
You just need to be better than the average person
at ONE specific thing.

The best freelance services to start with in 2025:
  💎 High demand, easy to learn:
     → Copywriting / email marketing
     → Social media management
     → Video editing
     → Graphic design (Canva is enough to start)
     → Website design (no-code tools)

  💎 Higher skill, higher pay:
     → SEO & content strategy
     → Paid advertising (Meta, Google)
     → Web development

The rule: pick the overlap between what you already
know and what businesses will pay for...`
  },
  {
    id: 11,
    emoji: "🛒",
    name: "Etsy Empire Blueprint",
    niche: "Business",
    desc: "Build a 6-figure Etsy shop selling digital downloads from scratch.",
    pages: "58 pages",
    bg: "#1f1218",
    cover: "",
    file: "",
    price: "$57",
    tableOfContents: [
      "1. Why Etsy for Digital Products",
      "2. Setting Up Your Shop",
      "3. SEO & Keyword Research",
      "4. Product Photography",
      "5. Pricing Strategy",
      "6. First 100 Sales Plan",
      "7. Scaling to 6 Figures"
    ],
    previewText: `CHAPTER 1: WHY ETSY FOR DIGITAL PRODUCTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Etsy has 90+ million active buyers and is the world's
largest marketplace for creative products.

Here's the secret most sellers don't know:
Digital downloads are Etsy's most profitable product category.

Why?
  ✓ Zero production cost
  ✓ Instant automated delivery
  ✓ No handling, shipping, or returns
  ✓ Sell the same file millions of times
  ✓ Low competition vs physical products

The top digital categories on Etsy right now:
  1. Printables (planners, journals, wall art)
  2. Digital templates (Canva, Notion, Google Sheets)
  3. eBooks and guides (that's YOU)
  4. Stock photos and fonts
  5. SVG files for crafters

With the right SEO, a single listing can generate
$500–$5,000 per month on autopilot...`
  },
  {
    id: 12,
    emoji: "🎯",
    name: "Goal Setting System",
    niche: "Productivity",
    desc: "The exact framework top achievers use to set and crush goals every year.",
    pages: "33 pages",
    bg: "#1a121f",
    cover: "",
    file: "",
    price: "$17",
    tableOfContents: [
      "1. Why Most Goals Fail",
      "2. The SMART+ Framework",
      "3. Annual Life Audit",
      "4. Quarterly Reviews",
      "5. Weekly Planning System",
      "6. Daily Non-Negotiables"
    ],
    previewText: `CHAPTER 1: WHY MOST GOALS FAIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

92% of people who set New Year's resolutions fail.

The problem isn't motivation. It's system design.

Most goals fail for 3 reasons:
  1. They're too vague ("get fit", "make more money")
  2. They have no deadline pressure
  3. There's no review process built in

A goal without a system is just a wish.

The high performers I've studied don't just set goals —
they build environments and habits that make the goal
the path of least resistance.

In this guide, you'll get the exact goal framework
I've used to 10x my results in just 12 months...`
  }
];

/* ── UTILITY: get ebooks filtered by plan ───────────────────
   Starter plan: first 250 (or all if fewer)
   Pro plan:     all ebooks
   ─────────────────────────────────────────────────────── */
function getEbooksForPlan(plan) {
  if (plan === 'starter') return EBOOKS.slice(0, 6); /* limit for starter */
  return EBOOKS; /* pro gets everything */
}
