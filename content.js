/* =====================================================================
   content.js — EDIT THIS FILE to update the site. No HTML needed.
   ---------------------------------------------------------------------
   To fill in an artifact card when you finish it:
     1. Find it in ARTIFACTS below.
     2. Change status from "idea" to "shipped".
     3. Set title, link, and reflection (a few sentences).
     4. Commit + push. GitHub Pages redeploys in ~1 minute.
   ===================================================================== */

const SITE = {
  name: "Bryan Huynh",
    email: "bryanhuynh1276@gmail.com",
  github: "https://github.com/bryanhuynh11",
  linkedin: "https://www.linkedin.com/in/bhuynh11",
  resumeUrl: "", // drop resume.pdf in the repo and set this to "resume.pdf" to show the Resume button
  location: "Seattle / Tacoma, WA",
  roles: [
    "CS student @ UW Tacoma",
    "AI/ML for financial markets",
    "Future quant engineer",
    "Multi-agent systems builder",
  ],
};

/* ---------- TCSS 490 artifact cards ---------- */
const ARTIFACTS = [
  {
    n: 1,
    theme: "Your Portfolio",
    status: "shipped", // "shipped" or "idea"
    title: "This portfolio site",
    link: "https://github.com/bryanhuynh11/bryanhuynh11.github.io",
    linkLabel: "Source on GitHub",
    reflection:
      "I built this with Claude as my chat AI. I started by comparing three visual directions side by side, then pointed it at a portfolio I admired and rebuilt that feel from scratch in plain HTML, CSS, and JavaScript. The biggest lesson was that a vague prompt gets a generic page, while a reference site plus my real projects got something that sounds like me. I also moved all the card text into one content file so updating it each week takes two minutes.",
    tags: ["HTML", "CSS", "JavaScript", "Canvas", "GitHub Pages"],
  },
  {
    n: 2,
    theme: "Something You Will Use",
    status: "idea",
    title: "Morning market brief",
    ideas: [
      "One page that pulls overnight index futures moves, the day's economic calendar, and earnings into a 60-second read before class.",
      "Or: a Canvas + calendar deadline radar that texts me what's due in the next 72 hours.",
    ],
  },
  {
    n: 3,
    theme: "AI Inside It",
    status: "idea",
    title: "10-K question answerer",
    ideas: [
      "A RAG app over SEC filings and earnings-call transcripts that answers questions like \"how did margins change?\" with citations to the exact paragraph.",
      "Stretch: compare two companies' risk-factor sections side by side.",
    ],
  },
  {
    n: 4,
    theme: "For Someone Else",
    status: "idea",
    title: "Little Saigon storefronts",
    ideas: [
      "A bilingual (English / Vietnamese) site builder for small businesses in Seattle's Little Saigon: menu, hours, photos, and a map, editable by the owner from a phone.",
      "Grows out of Project LS, the platform I co-founded.",
    ],
  },
  {
    n: 5,
    theme: "The Moonshot",
    status: "idea",
    title: "Ace-local, deployed",
    ideas: [
      "Take my multi-agent market research system from local scripts to a hosted app: agents for scanning, risk, and journaling, a backtest runner, and an eval dashboard that scores each agent's calls.",
      "The goal is a demo a quant recruiter can click through in two minutes.",
    ],
  },
];

/* ---------- Projects (filter tags: finance, ai, web, data) ---------- */
const PROJECTS = [
  {
    title: "ACE PO3",
    badge: "Open source",
    cats: ["finance"],
    desc: "An ICT-style signal engine (Power of 3, STDV, FVG/iFVG/OB, MMXM) for NQ futures, built twice — Python for research, C++ for production speed — with an automated parity test proving both engines produce identical trades. Backtested on 60 days of 5-minute NQ data (33 trades, +2.2R) with an interactive TradingView-style replay of every signal.",
    stack: ["Python", "C++", "pybind11", "CMake", "pandas"],
    links: [{ label: "GitHub", href: "https://github.com/bryanhuynh11/ace-po3" }],
  },
  {
    title: "Ace-local",
    badge: "In progress",
    cats: ["finance", "ai"],
    desc: "A multi-agent market research system in Python. Specialized agents (Scout, Warden, Coach, Oracle, Chronicler) feed a central decision engine, with a three-layer evaluation design to measure whether each agent actually helps.",
    stack: ["Python", "Multi-agent", "yfinance", "IBKR API", "Parquet", "SQLite"],
    links: [{ label: "GitHub", href: "https://github.com/bryanhuynh11" }],
  },
  {
    title: "Loan Amortization Calculator",
    badge: "Open source",
    cats: ["finance"],
    desc: "A Python CLI that computes fixed-rate loan payments and full amortization schedules, with typed domain models and unit-tested money math.",
    stack: ["Python", "pytest", "CLI", "Dataclasses"],
    links: [{ label: "GitHub", href: "https://github.com/bryanhuynh11/loan-amortization-calcuklator" }],
  },
  {
    title: "Killzone & Liquidity Sweep Analyzer",
    badge: "Prototype",
    cats: ["finance", "web"],
    desc: "A React tool that marks intraday session windows on index futures charts and flags liquidity sweeps of prior highs and lows, to study how price behaves around them.",
    stack: ["React", "JavaScript", "Charting", "Market data"],
    links: [],
  },
  {
    title: "Project LS",
    badge: "Co-founder",
    cats: ["web"],
    desc: "A bilingual web platform for immigrant-owned businesses in Seattle's Little Saigon, co-founded with Henry Nguyen. Wrote the executive summary and video storyboard for a startup pitch competition.",
    stack: ["Web", "Bilingual UX", "Product", "Pitching"],
    links: [],
  },
  {
    title: "Telco Customer Churn Analysis",
    badge: "Coursework",
    cats: ["data", "ai"],
    desc: "Business Data Analytics final project on the IBM Telco churn dataset: cleaning, exploratory analysis, and models that identify which customers are most likely to leave and why.",
    stack: ["Python", "Pandas", "scikit-learn", "Data viz"],
    links: [],
  },
];

/* ---------- Experience ---------- */
const EXPERIENCE = [
  {
    role: "Specialist",
    org: "Apple",
    when: "Current",
    points: [
      "Helped customers choose and set up Apple products; consistently strong attachment rate and Net Promoter Score.",
      "Collaborated with cross-functional teams to design and implement new features, optimize performance, and ensure code quality.",
      "Worked on a variety of projects, including a mobile app for tracking fitness goals, a productivity tool for managing tasks and reminders, and a game for iOS and macOS.",
      "Participated in code reviews and provided technical guidance to junior developers.",
      "Worked on a variety of projects, including a mobile app for tracking fitness goals, a productivity tool for managing tasks and reminders, and a game for iOS and macOS.",
    ],
  },
  {
    role: "Campaign Management",
    org: "Fine Line Marketing",
    when: "Previous",
    points: [
      "Coordinated marketing campaigns from planning through execution and reporting.",
    ],
  },
];

const EDUCATION = {
  school: "University of Washington Tacoma",
  degree: "B.A. Computer Science · Minors in Business Data Analytics and Economics",
  when: "Expected Spring 2027",
  courses: ["Data Structures", "Discrete Math", "Computer Organization (LC-3)", "OOP", "Software Development", "Macroeconomics"],
};

const STACK = {
  Languages: ["Python", "Java", "JavaScript", "SQL", "HTML", "CSS", "LC-3 Assembly"],
  "Data & ML": ["Pandas", "NumPy", "scikit-learn", "Parquet", "SQLite", "yfinance"],
  "Web": ["React", "Node.js", "Canvas API"],
  Tools: ["Git", "GitHub", "Docker", "VS Code", "IntelliJ", "Claude"],
};

const QUOTES = [
  ["All models are wrong, but some are useful.", "George Box"],
  ["In God we trust. All others must bring data.", "W. Edwards Deming"],
  ["The market can stay irrational longer than you can stay solvent.", "Attributed to John Maynard Keynes"],
  ["Premature optimization is the root of all evil.", "Donald Knuth"],
  ["Risk comes from not knowing what you're doing.", "Warren Buffett"],
  ["Simplicity is prerequisite for reliability.", "Edsger Dijkstra"],
];
