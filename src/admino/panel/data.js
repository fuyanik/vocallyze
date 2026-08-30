import { C } from "./tokens";

/* ───────────────────────── org / shell ───────────────────────── */

export const ORG = {
  name: "ACAR LEGAL",
  sub: "Legal & Advisory",
  user: "quality@acarlegal.com",
  role: "Quality Manager",
};

export const NAV = [
  {
    group: "ANALYTICS",
    items: [
      { id: "overview", label: "Overview", icon: "chart" },
      { id: "weekly", label: "Weekly Report", icon: "calendar" },
      { id: "trends", label: "Trends", icon: "hash" },
      { id: "root", label: "Root Cause", icon: "bulb" },
    ],
  },
  {
    group: "PEOPLE",
    items: [
      { id: "agents", label: "Agents", icon: "users" },
      { id: "agent", label: "Agent Detail", icon: "user" },
      { id: "teams", label: "Teams", icon: "team" },
    ],
  },
  {
    group: "AUDIT",
    items: [
      { id: "compliance", label: "Compliance", icon: "shield" },
      { id: "call", label: "Call Detail", icon: "phone" },
      { id: "rulebook", label: "Rulebook", icon: "book" },
    ],
  },
  {
    group: "AUTOMATION",
    items: [
      { id: "live", label: "Live Monitor", icon: "activity" },
      { id: "ai", label: "AI Assistant", icon: "bot" },
    ],
  },
];

/* ───────────────────────── scene 1 · one call ───────────────────────── */

/** Deterministic pseudo-waveform so SSR/CSR and replays stay identical. */
export const WAVE = Array.from({ length: 84 }, (_, i) => {
  const s = Math.sin(i * 0.7) * 0.5 + Math.sin(i * 0.31 + 1.2) * 0.3 + Math.sin(i * 1.9) * 0.2;
  return Math.round(26 + Math.abs(s) * 68);
});

export const CALL = {
  id: "20260814-1104-AGT014",
  agent: "Elif Kaya",
  team: "Customer Care",
  date: "Aug 14, 2026 · 11:04",
  duration: "1:22",
  topic: "Payment verification",
  outcome: "Resolved on first contact",
  score: 96,
  rules: 32,
  diarization: 98,
};

export const TRANSCRIPT = [
  {
    t: "00:02",
    who: "Agent",
    text: "Acar Legal, this is Elif. This call is being recorded for quality purposes. How can I help you today?",
    flag: { good: true, label: "Recording notice given" },
  },
  { t: "00:11", who: "Customer", text: "Hi — I made a payment on my file but it doesn't seem to show up in the system.", mood: "neg" },
  {
    t: "00:19",
    who: "Agent",
    text: "Let me check right away. For your security I first need to verify your identity — may I have the first three and last two digits of your ID number?",
    flag: { good: true, label: "Identity verification followed" },
  },
  { t: "00:31", who: "Customer", text: "Sure, 123 and 45." },
  {
    t: "00:36",
    who: "Agent",
    text: "Thank you, verified. I can see your file. Your payment landed yesterday at 16:40 — only the confirmation message hasn't gone out yet.",
    mood: "pos",
  },
  { t: "00:49", who: "Customer", text: "Oh, what a relief. I've been worrying about this for three days.", mood: "pos" },
  {
    t: "00:55",
    who: "Agent",
    text: "I completely understand — there is nothing to worry about. If you'd like, I can email the receipt to your registered address right now.",
    flag: { good: true, label: "Proactive resolution offered" },
    mood: "pos",
  },
  { t: "01:10", who: "Customer", text: "That would be great, thank you.", mood: "pos" },
  {
    t: "01:18",
    who: "Agent",
    text: "Sent. Is there anything else I can help you with today?",
    flag: { good: true, label: "Closing confirmation taken" },
  },
];

export const SCORECARD = [
  { k: "Content & Tone", v: 96 },
  { k: "Procedure", v: 100 },
  { k: "Accuracy", v: 94 },
  { k: "Empathy", v: 92 },
  { k: "Closing", v: 98 },
];

export const SENTIMENT_TL = [0, -32, -18, 24, 58, 74, 82];

/* ───────────────────────── scene 2 · compliance ───────────────────────── */

export const VIOLATIONS = [
  {
    id: "VIO-2841",
    rule: "Debt information shared before identity verification",
    cat: "KVKK",
    sev: "critical",
    agent: "Kaan Özkan",
    call: "20260814-1042-AGT031",
    time: "Aug 14, 10:42",
    at: "01:12",
    quote: "Your total debt appears to be ₺47,850 — I can tell you even without your ID number.",
    status: "open",
  },
  {
    id: "VIO-2839",
    rule: "Debtor information disclosed to a third party",
    cat: "KVKK",
    sev: "critical",
    agent: "Ayşe Demir",
    call: "20260814-0931-AGT025",
    time: "Aug 14, 09:31",
    at: "02:47",
    quote: "There are two separate enforcement files for your spouse — I can give you the details if you like.",
    status: "in review",
  },
  {
    id: "VIO-2836",
    rule: "Call-recording notice missing at call start",
    cat: "Procedure",
    sev: "high",
    agent: "Onur Çelik",
    call: "20260813-1618-AGT009",
    time: "Aug 13, 16:18",
    at: "00:04",
    quote: "Go ahead, what is this about?",
    status: "open",
  },
  {
    id: "VIO-2833",
    rule: "Customer interrupted three or more times",
    cat: "Tone",
    sev: "medium",
    agent: "Burak Şahin",
    call: "20260813-1405-AGT003",
    time: "Aug 13, 14:05",
    at: "03:21",
    quote: "One second, one second — you listen to me now.",
    status: "closed",
  },
  {
    id: "VIO-2830",
    rule: "Incomplete notice on the legal objection period",
    cat: "Regulation",
    sev: "high",
    agent: "Kaan Özkan",
    call: "20260813-1122-AGT031",
    time: "Aug 13, 11:22",
    at: "04:56",
    quote: "You can't object anymore — I believe that deadline has passed.",
    status: "in review",
  },
  {
    id: "VIO-2824",
    rule: "Raised voice and pressure tactics",
    cat: "Tone",
    sev: "medium",
    agent: "Ayşe Demir",
    call: "20260812-1509-AGT025",
    time: "Aug 12, 15:09",
    at: "02:14",
    quote: "If you don't pay today your house gets sealed tomorrow — you should know that.",
    status: "open",
  },
];

export const VIOLATION_CATS = [
  { label: "Procedure", value: 41, color: C.orange },
  { label: "Tone & Manner", value: 34, color: C.purple },
  { label: "Data privacy", value: 18, color: C.red },
  { label: "Regulation", value: 12, color: C.teal },
];

export const COMPLIANCE_TREND = [
  { x: "W-7", privacy: 9, procedure: 22, tone: 19, regulation: 8 },
  { x: "W-6", privacy: 8, procedure: 20, tone: 17, regulation: 7 },
  { x: "W-5", privacy: 7, procedure: 19, tone: 18, regulation: 6 },
  { x: "W-4", privacy: 6, procedure: 16, tone: 15, regulation: 5 },
  { x: "W-3", privacy: 5, procedure: 14, tone: 13, regulation: 5 },
  { x: "W-2", privacy: 4, procedure: 11, tone: 11, regulation: 3 },
  { x: "W-1", privacy: 2, procedure: 8, tone: 9, regulation: 2 },
];

/** Same series, zoomed out to a full quarter — swapped in when "30 days" is selected. */
export const COMPLIANCE_TREND_30 = [
  { x: "W-12", privacy: 16, procedure: 34, tone: 29, regulation: 14 },
  { x: "W-11", privacy: 15, procedure: 32, tone: 27, regulation: 13 },
  { x: "W-10", privacy: 14, procedure: 29, tone: 26, regulation: 12 },
  { x: "W-9", privacy: 12, procedure: 27, tone: 24, regulation: 11 },
  { x: "W-8", privacy: 11, procedure: 25, tone: 22, regulation: 9 },
  { x: "W-7", privacy: 9, procedure: 22, tone: 19, regulation: 8 },
  { x: "W-6", privacy: 8, procedure: 20, tone: 17, regulation: 7 },
  { x: "W-5", privacy: 7, procedure: 19, tone: 18, regulation: 6 },
  { x: "W-4", privacy: 6, procedure: 16, tone: 15, regulation: 5 },
  { x: "W-3", privacy: 5, procedure: 14, tone: 13, regulation: 5 },
  { x: "W-2", privacy: 4, procedure: 11, tone: 11, regulation: 3 },
  { x: "W-1", privacy: 2, procedure: 8, tone: 9, regulation: 2 },
];

export const COMPLIANCE_KEYS = [
  { key: "privacy", label: "Data privacy", color: C.red },
  { key: "regulation", label: "Regulation", color: C.teal },
  { key: "procedure", label: "Procedure", color: C.orange },
  { key: "tone", label: "Tone & Manner", color: C.purple },
];

export const MASKING = [
  { label: "National ID", value: 100 },
  { label: "IBAN / card", value: 100 },
  { label: "Address", value: 99.8 },
  { label: "Phone number", value: 100 },
  { label: "Date of birth", value: 99.6 },
];

/* ───────────────────────── scene 3 · trends & root cause ───────────────────────── */

const KW = {
  payment: C.blue,
  enforcement: C.purple,
  document: C.teal,
  complaint: C.orange,
  info: C.green,
};

export const WORD_ROWS = [
  [
    { word: "payment plan", size: 30, color: KW.payment },
    { word: "garnishment notice", size: 27, color: KW.enforcement },
    { word: "restructuring", size: 25, color: KW.payment },
  ],
  [
    { word: "payment receipt", size: 22, color: KW.document },
    { word: "e-government", size: 21, color: KW.info },
    { word: "interest calculation", size: 20, color: KW.payment },
    { word: "attorney fee", size: 18, color: KW.document },
  ],
  [
    { word: "objection period", size: 17, color: KW.enforcement },
    { word: "bank freeze", size: 17, color: KW.enforcement },
    { word: "no SMS received", size: 16, color: KW.complaint },
    { word: "installment cancelled", size: 15, color: KW.payment },
  ],
  [
    { word: "attorney call", size: 14, color: KW.info },
    { word: "debt inquiry", size: 14, color: KW.info },
    { word: "address change", size: 13, color: KW.document },
    { word: "hold time", size: 13, color: KW.complaint },
  ],
];

export const WORD_LEGEND = [
  { label: "Payment", color: KW.payment },
  { label: "Enforcement", color: KW.enforcement },
  { label: "Document", color: KW.document },
  { label: "Complaint", color: KW.complaint },
  { label: "Info", color: KW.info },
];

export const SPIKE_SERIES = [
  { label: "Payment", color: C.blue, data: [62, 71, 68, 84, 92, 108, 128] },
  { label: "Enforcement", color: C.purple, data: [58, 61, 66, 70, 74, 82, 96] },
  { label: "Document", color: C.teal, data: [88, 84, 81, 78, 76, 74, 74] },
  { label: "Complaint", color: C.orange, data: [16, 19, 23, 27, 31, 35, 38] },
];

export const SPIKE_X = ["W-6", "W-5", "W-4", "W-3", "W-2", "W-1", "This week"];

export const TREEMAP = [
  { label: "payment plan", sub: "1,284", x: 0, y: 0, w: 42, h: 50, color: C.blue },
  { label: "garnishment", sub: "967", x: 42, y: 0, w: 30, h: 34, color: C.teal },
  { label: "e-government", sub: "689", x: 72, y: 0, w: 28, h: 34, color: C.green },
  { label: "restructuring", sub: "812", x: 42, y: 34, w: 32, h: 32, color: C.purple },
  { label: "attorney fee", sub: "521", x: 74, y: 34, w: 26, h: 32, color: C.orange },
  { label: "bank freeze", sub: "412", x: 0, y: 50, w: 26, h: 50, color: C.blue },
  { label: "objection period", sub: "478", x: 26, y: 50, w: 26, h: 50, color: C.purple },
  { label: "no SMS received", sub: "386", x: 52, y: 66, w: 24, h: 34, color: C.orange },
  { label: "debt inquiry", sub: "268", x: 76, y: 66, w: 24, h: 34, color: C.green },
];

export const SPIKE_ALERT = {
  word: "bank freeze",
  change: 88,
  calls: 412,
  note: "Weekly mentions crossed the 30% jump threshold",
};

export const ROOT_CAUSE = {
  id: "RC-014",
  title: "Post-payment confirmation SMS is delayed by 24 hours",
  cluster: "Payment & Restructuring",
  calls: 386,
  share: 12.4,
  cost: "₺148,000",
  owner: "IT Operations",
  confidence: 94,
  status: "in action",
  evidence: [
    "“I paid yesterday but no message came — did it not go through?”",
    "“I sent the receipt and you tell me it isn't in the system.”",
    "“This is the third time I'm calling about the same thing.”",
  ],
  before: [186, 188, 181, 172, 141, 96, 52, 38],
  baseline: [186, 184, 180, 179, 177, 176, 174, 172],
  x: ["W-8", "W-7", "W-6", "W-5", "W-4", "W-3", "W-2", "W-1"],
  drop: 79,
};

export const ROOT_LIST = [
  { id: "RC-014", title: "Payment confirmation SMS delayed 24h", calls: 386, cost: "₺148K", status: "in action" },
  { id: "RC-011", title: "e-Government file lookup step unclear", calls: 274, cost: "₺96K", status: "new" },
  { id: "RC-009", title: "No written procedure for lifting bank freeze", calls: 231, cost: "₺112K", status: "in action" },
  { id: "RC-006", title: "Interest breakdown not explainable to customer", calls: 198, cost: "₺74K", status: "new" },
];

/* ───────────────────────── scene 4 · people ───────────────────────── */

export const AGENTS = [
  { id: "AGT-014", name: "Elif Kaya", team: "Customer Care", score: 94, calls: 312, vio: 2, crit: 0, trend: [86, 88, 87, 90, 92, 91, 94] },
  { id: "AGT-007", name: "Mert Doğan", team: "Enforcement", score: 91, calls: 287, vio: 4, crit: 0, trend: [88, 89, 91, 90, 89, 92, 91] },
  { id: "AGT-021", name: "Zeynep Arslan", team: "Legal Advisory", score: 89, calls: 198, vio: 3, crit: 0, trend: [81, 83, 84, 86, 87, 88, 89] },
  { id: "AGT-003", name: "Burak Şahin", team: "Collections", score: 86, calls: 341, vio: 6, crit: 1, trend: [88, 87, 88, 86, 85, 87, 86] },
  { id: "AGT-018", name: "Selin Yıldız", team: "Customer Care", score: 84, calls: 264, vio: 5, crit: 0, trend: [78, 79, 81, 80, 82, 83, 84] },
  { id: "AGT-009", name: "Onur Çelik", team: "Enforcement", score: 81, calls: 229, vio: 9, crit: 1, trend: [85, 84, 83, 82, 83, 81, 81] },
  { id: "AGT-025", name: "Ayşe Demir", team: "Collections", score: 78, calls: 305, vio: 11, crit: 2, trend: [82, 80, 79, 77, 76, 77, 78] },
  { id: "AGT-031", name: "Kaan Özkan", team: "Legal Advisory", score: 73, calls: 156, vio: 14, crit: 3, trend: [79, 78, 77, 75, 74, 74, 73] },
];

export const MONTHLY = {
  x: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  score: [74, 77, 79, 82, 84, 86, 88],
  resolution: [68, 71, 74, 77, 79, 82, 85],
  violations: [142, 128, 116, 98, 87, 74, 61],
};

export const SCORE_DIST = [
  { label: "60–69", value: 0, color: C.red },
  { label: "70–79", value: 2, color: C.orange },
  { label: "80–89", value: 4, color: C.blue },
  { label: "90–100", value: 2, color: C.green },
];

export const QUALITY_BUBBLES = AGENTS.map((a) => ({
  x: (a.calls - 140) / 220,
  y: (a.score - 70) / 28,
  r: 5 + a.vio * 0.9,
  color: a.score >= 90 ? C.green : a.score >= 80 ? C.blue : C.orange,
}));

export const WEAK_AGENT = {
  ...AGENTS[7],
  breakdown: [
    { k: "Content & Tone", v: 70 },
    { k: "Procedure", v: 72 },
    { k: "Accuracy", v: 76 },
    { k: "Empathy", v: 65 },
    { k: "Closing", v: 81 },
  ],
  repetitive: 62,
  coaching: [
    { kind: "risk", title: "Critical · identity verification", body: "3 of 14 findings share the same rule: debt data shared before verification." },
    { kind: "growth", title: "Growth · objection period wording", body: "Regulatory phrasing incomplete in 2 calls; refresher training suggested." },
    { kind: "growth", title: "Growth · empathy under pressure", body: "Empathy score drops to 65 on calls longer than 5 minutes." },
    { kind: "good", title: "Strength · closing discipline", body: "Closing confirmation captured in 81% of calls, above team average." },
  ],
};

export const TEAM_ROLLUP = [
  { team: "Customer Care", score: 89, calls: 576, color: C.blue },
  { team: "Enforcement", score: 86, calls: 516, color: C.purple },
  { team: "Legal Advisory", score: 81, calls: 354, color: C.teal },
  { team: "Collections", score: 82, calls: 646, color: C.orange },
];

/* ───────────────────────── scene 5 · automation ───────────────────────── */

export const AI_INTENTS = [
  { intent: "Debt inquiry", auto: 96, volume: 428, state: "live" },
  { intent: "Payment plan info", auto: 91, volume: 384, state: "live" },
  { intent: "Receipt verification", auto: 88, volume: 297, state: "live" },
  { intent: "File status", auto: 84, volume: 264, state: "pilot" },
  { intent: "Address update", auto: 79, volume: 176, state: "pilot" },
  { intent: "Restructuring request", auto: 62, volume: 341, state: "training" },
  { intent: "Objection process", auto: 41, volume: 218, state: "training" },
  { intent: "Legal advice", auto: 12, volume: 156, state: "human" },
];

export const AI_HANDOVER = [
  { x: "W-8", ai: 4, human: 96 },
  { x: "W-7", ai: 7, human: 93 },
  { x: "W-6", ai: 11, human: 89 },
  { x: "W-5", ai: 14, human: 86 },
  { x: "W-4", ai: 19, human: 81 },
  { x: "W-3", ai: 23, human: 77 },
  { x: "W-2", ai: 28, human: 72 },
  { x: "W-1", ai: 34, human: 66 },
];

export const AI_VS_HUMAN = {
  axes: ["Score", "First-contact", "Procedure", "Empathy", "Accuracy", "Closing"],
  human: [86, 79, 84, 88, 87, 82],
  ai: [82, 88, 97, 71, 84, 94],
};

export const GUARDRAILS = [
  { rule: "Personal data before identity verification", action: "blocked", count: 412 },
  { rule: "Attempt to give legal advice", action: "blocked", count: 87 },
  { rule: "Creating a payment commitment", action: "escalated", count: 264 },
  { rule: "Confidence below threshold", action: "escalated", count: 341 },
  { rule: "Customer asked for a human", action: "escalated", count: 198 },
];

export const AI_DIALOG = [
  { who: "AI", text: "Acar Legal automated line, this is Ada. This call is recorded for quality purposes. How can I help?" },
  { who: "Customer", text: "I'd like to know the current balance on my file." },
  { who: "AI", text: "Of course. For your security I need to verify your identity first — could you enter your ID number?" },
  { who: "Customer", text: "Done." },
  { who: "AI", text: "Thank you, verified. Your current balance is ₺12,480 as of August 14. Shall I walk you through the payment plan options?" },
];

export const REASSIGNMENT = {
  agent: "Kaan Özkan",
  before: { score: 73, calls: 156, repetitive: 97, complex: 59 },
  after: { score: 88, calls: 59, repetitive: 0, complex: 59 },
  movedCalls: 97,
  savings: 214,
};
