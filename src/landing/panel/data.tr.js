import { C } from "./tokens";

/* ───────────────────────── org / shell ───────────────────────── */

export const ORG = {
  name: "ACAR LEGAL",
  sub: "Hukuk & Danışmanlık",
  user: "quality@acarlegal.com",
  role: "Kalite Yöneticisi",
};

export const NAV = [
  {
    group: "ANALİTİK",
    items: [
      { id: "overview", label: "Genel Bakış", icon: "chart" },
      { id: "weekly", label: "Haftalık Rapor", icon: "calendar" },
      { id: "trends", label: "Trendler", icon: "hash" },
      { id: "root", label: "Kök Neden", icon: "bulb" },
    ],
  },
  {
    group: "EKİP",
    items: [
      { id: "agents", label: "Temsilciler", icon: "users" },
      { id: "agent", label: "Temsilci Detayı", icon: "user" },
      { id: "teams", label: "Takımlar", icon: "team" },
    ],
  },
  {
    group: "DENETİM",
    items: [
      { id: "compliance", label: "Uyumluluk", icon: "shield" },
      { id: "call", label: "Çağrı Detayı", icon: "phone" },
      { id: "rulebook", label: "Kural Kitabı", icon: "book" },
    ],
  },
  {
    group: "OTOMASYON",
    items: [
      { id: "live", label: "Canlı İzleme", icon: "activity" },
      { id: "ai", label: "Yapay Zeka Asistanı", icon: "bot" },
    ],
  },
];

/* ───────────────────────── scene 1 · one call ───────────────────────── */

/** Same deterministic pseudo-waveform as the EN dataset — purely visual. */
export const WAVE = Array.from({ length: 84 }, (_, i) => {
  const s = Math.sin(i * 0.7) * 0.5 + Math.sin(i * 0.31 + 1.2) * 0.3 + Math.sin(i * 1.9) * 0.2;
  return Math.round(26 + Math.abs(s) * 68);
});

export const CALL = {
  id: "20260814-1104-AGT014",
  agent: "Elif Kaya",
  team: "Müşteri Hizmetleri",
  date: "14 Ağu 2026 · 11:04",
  duration: "1:22",
  topic: "Ödeme doğrulama",
  outcome: "İlk temasta çözüldü",
  score: 96,
  rules: 32,
  diarization: 98,
};

export const TRANSCRIPT = [
  {
    t: "00:02",
    who: "agent",
    text: "Acar Legal, ben Elif. Bu görüşme kalite amacıyla kaydedilmektedir. Size bugün nasıl yardımcı olabilirim?",
    flag: { good: true, label: "Kayıt bildirimi yapıldı" },
  },
  { t: "00:11", who: "customer", text: "Merhaba — dosyama bir ödeme yaptım ama sistemde görünmüyor gibi.", mood: "neg" },
  {
    t: "00:19",
    who: "agent",
    text: "Hemen kontrol ediyorum. Güvenliğiniz için önce kimliğinizi doğrulamam gerekiyor — kimlik numaranızın ilk üç ve son iki hanesini alabilir miyim?",
    flag: { good: true, label: "Kimlik doğrulama uygulandı" },
  },
  { t: "00:31", who: "customer", text: "Tabii, 123 ve 45." },
  {
    t: "00:36",
    who: "agent",
    text: "Teşekkürler, doğrulandı. Dosyanızı görebiliyorum. Ödemeniz dün saat 16:40'ta düşmüş — sadece onay mesajı henüz gitmemiş.",
    mood: "pos",
  },
  { t: "00:49", who: "customer", text: "Ah, çok rahatladım. Üç gündür bunun için endişeleniyordum.", mood: "pos" },
  {
    t: "00:55",
    who: "agent",
    text: "Anlıyorum — endişelenecek bir şey yok. İsterseniz makbuzu kayıtlı adresinize hemen e-posta ile gönderebilirim.",
    flag: { good: true, label: "Proaktif çözüm sunuldu" },
    mood: "pos",
  },
  { t: "01:10", who: "customer", text: "Bu harika olur, teşekkür ederim.", mood: "pos" },
  {
    t: "01:18",
    who: "agent",
    text: "Gönderildi. Bugün başka bir konuda yardımcı olabileceğim bir şey var mı?",
    flag: { good: true, label: "Kapanış onayı alındı" },
  },
];

/** Rule-match list for the Listen scene's "Rule matches" tab. */
export const RULE_MATCHES = [
  { id: "R-01", label: "Görüşme başında kayıt bildirimi", ok: true, at: "00:02" },
  { id: "R-02", label: "Veri paylaşımından önce kimlik doğrulama", ok: true, at: "00:19" },
  { id: "R-04", label: "Müşterinin sözü kesilmedi", ok: true, at: "—" },
  { id: "R-07", label: "Net ve uygulanabilir çözüm", ok: true, at: "00:55" },
  { id: "R-08", label: "Kapanış onayı alındı", ok: true, at: "01:18" },
  { id: "R-05", label: "Baskı veya tehdit içeren dil kullanılmadı", ok: true, at: "—" },
];

export const SCORECARD = [
  { k: "İçerik & Ton", v: 96 },
  { k: "Prosedür", v: 100 },
  { k: "Doğruluk", v: 94 },
  { k: "Empati", v: 92 },
  { k: "Kapanış", v: 98 },
];

export const SENTIMENT_TL = [0, -32, -18, 24, 58, 74, 82];

/* ───────────────────────── scene 2 · compliance ───────────────────────── */

export const VIOLATIONS = [
  {
    id: "VIO-2841",
    rule: "Kimlik doğrulanmadan önce borç bilgisi paylaşıldı",
    cat: "KVKK",
    sev: "critical",
    agent: "Kaan Özkan",
    call: "20260814-1042-AGT031",
    time: "14 Ağu, 10:42",
    at: "01:12",
    quote: "Toplam borcunuz 47.850₺ görünüyor — kimlik numaranız olmadan da size söyleyebilirim.",
    status: "open",
  },
  {
    id: "VIO-2839",
    rule: "Borçlu bilgisi üçüncü bir kişiye açıklandı",
    cat: "KVKK",
    sev: "critical",
    agent: "Ayşe Demir",
    call: "20260814-0931-AGT025",
    time: "14 Ağu, 09:31",
    at: "02:47",
    quote: "Eşiniz için iki ayrı icra dosyası var — isterseniz detayları verebilirim.",
    status: "in review",
  },
  {
    id: "VIO-2836",
    rule: "Görüşme başında kayıt bildirimi eksik",
    cat: "Prosedür",
    sev: "high",
    agent: "Onur Çelik",
    call: "20260813-1618-AGT009",
    time: "13 Ağu, 16:18",
    at: "00:04",
    quote: "Buyurun, bu ne hakkında?",
    status: "open",
  },
  {
    id: "VIO-2833",
    rule: "Müşterinin sözü üç veya daha fazla kez kesildi",
    cat: "Ton",
    sev: "medium",
    agent: "Burak Şahin",
    call: "20260813-1405-AGT003",
    time: "13 Ağu, 14:05",
    at: "03:21",
    quote: "Bir saniye, bir saniye — şimdi beni dinleyin.",
    status: "closed",
  },
  {
    id: "VIO-2830",
    rule: "Yasal itiraz süresi hakkında eksik bilgilendirme",
    cat: "Mevzuat",
    sev: "high",
    agent: "Kaan Özkan",
    call: "20260813-1122-AGT031",
    time: "13 Ağu, 11:22",
    at: "04:56",
    quote: "Artık itiraz edemezsiniz — sanırım o süre geçti.",
    status: "in review",
  },
  {
    id: "VIO-2824",
    rule: "Yükseltilmiş ses tonu ve baskı taktikleri",
    cat: "Ton",
    sev: "medium",
    agent: "Ayşe Demir",
    call: "20260812-1509-AGT025",
    time: "12 Ağu, 15:09",
    at: "02:14",
    quote: "Bugün ödemezseniz yarın eviniz mühürlenir — bunu bilmenizi isterim.",
    status: "open",
  },
];

export const VIOLATION_CATS = [
  { label: "Prosedür", value: 41, color: C.orange },
  { label: "Ton & Tavır", value: 34, color: C.purple },
  { label: "Veri gizliliği", value: 18, color: C.red },
  { label: "Mevzuat", value: 12, color: C.teal },
];

export const COMPLIANCE_TREND = [
  { x: "H-7", privacy: 9, procedure: 22, tone: 19, regulation: 8 },
  { x: "H-6", privacy: 8, procedure: 20, tone: 17, regulation: 7 },
  { x: "H-5", privacy: 7, procedure: 19, tone: 18, regulation: 6 },
  { x: "H-4", privacy: 6, procedure: 16, tone: 15, regulation: 5 },
  { x: "H-3", privacy: 5, procedure: 14, tone: 13, regulation: 5 },
  { x: "H-2", privacy: 4, procedure: 11, tone: 11, regulation: 3 },
  { x: "H-1", privacy: 2, procedure: 8, tone: 9, regulation: 2 },
];

/** Same series, zoomed out to a full quarter — swapped in when 30 days is selected. */
export const COMPLIANCE_TREND_30 = [
  { x: "H-12", privacy: 16, procedure: 34, tone: 29, regulation: 14 },
  { x: "H-11", privacy: 15, procedure: 32, tone: 27, regulation: 13 },
  { x: "H-10", privacy: 14, procedure: 29, tone: 26, regulation: 12 },
  { x: "H-9", privacy: 12, procedure: 27, tone: 24, regulation: 11 },
  { x: "H-8", privacy: 11, procedure: 25, tone: 22, regulation: 9 },
  { x: "H-7", privacy: 9, procedure: 22, tone: 19, regulation: 8 },
  { x: "H-6", privacy: 8, procedure: 20, tone: 17, regulation: 7 },
  { x: "H-5", privacy: 7, procedure: 19, tone: 18, regulation: 6 },
  { x: "H-4", privacy: 6, procedure: 16, tone: 15, regulation: 5 },
  { x: "H-3", privacy: 5, procedure: 14, tone: 13, regulation: 5 },
  { x: "H-2", privacy: 4, procedure: 11, tone: 11, regulation: 3 },
  { x: "H-1", privacy: 2, procedure: 8, tone: 9, regulation: 2 },
];

export const COMPLIANCE_KEYS = [
  { key: "privacy", label: "Veri gizliliği", color: C.red },
  { key: "regulation", label: "Mevzuat", color: C.teal },
  { key: "procedure", label: "Prosedür", color: C.orange },
  { key: "tone", label: "Ton & Tavır", color: C.purple },
];

export const MASKING = [
  { label: "T.C. kimlik no", value: 100 },
  { label: "IBAN / kart", value: 100 },
  { label: "Adres", value: 99.8 },
  { label: "Telefon numarası", value: 100 },
  { label: "Doğum tarihi", value: 99.6 },
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
    { word: "ödeme planı", size: 30, color: KW.payment },
    { word: "haciz bildirimi", size: 27, color: KW.enforcement },
    { word: "yeniden yapılandırma", size: 25, color: KW.payment },
  ],
  [
    { word: "ödeme makbuzu", size: 22, color: KW.document },
    { word: "e-devlet", size: 21, color: KW.info },
    { word: "faiz hesaplama", size: 20, color: KW.payment },
    { word: "avukatlık ücreti", size: 18, color: KW.document },
  ],
  [
    { word: "itiraz süresi", size: 17, color: KW.enforcement },
    { word: "hesap bloke", size: 17, color: KW.enforcement },
    { word: "SMS gelmedi", size: 16, color: KW.complaint },
    { word: "taksit iptal edildi", size: 15, color: KW.payment },
  ],
  [
    { word: "avukat araması", size: 14, color: KW.info },
    { word: "borç sorgusu", size: 14, color: KW.info },
    { word: "adres değişikliği", size: 13, color: KW.document },
    { word: "bekleme süresi", size: 13, color: KW.complaint },
  ],
];

export const WORD_LEGEND = [
  { label: "Ödeme", color: KW.payment },
  { label: "İcra", color: KW.enforcement },
  { label: "Belge", color: KW.document },
  { label: "Şikayet", color: KW.complaint },
  { label: "Bilgi", color: KW.info },
];

export const SPIKE_SERIES = [
  { label: "Ödeme", color: C.blue, data: [62, 71, 68, 84, 92, 108, 128] },
  { label: "İcra", color: C.purple, data: [58, 61, 66, 70, 74, 82, 96] },
  { label: "Belge", color: C.teal, data: [88, 84, 81, 78, 76, 74, 74] },
  { label: "Şikayet", color: C.orange, data: [16, 19, 23, 27, 31, 35, 38] },
];

export const SPIKE_X = ["H-6", "H-5", "H-4", "H-3", "H-2", "H-1", "Bu hafta"];

export const TREEMAP = [
  { label: "ödeme planı", sub: "1.284", x: 0, y: 0, w: 42, h: 50, color: C.blue },
  { label: "haciz", sub: "967", x: 42, y: 0, w: 30, h: 34, color: C.teal },
  { label: "e-devlet", sub: "689", x: 72, y: 0, w: 28, h: 34, color: C.green },
  { label: "yeniden yapılandırma", sub: "812", x: 42, y: 34, w: 32, h: 32, color: C.purple },
  { label: "avukatlık ücreti", sub: "521", x: 74, y: 34, w: 26, h: 32, color: C.orange },
  { label: "hesap bloke", sub: "412", x: 0, y: 50, w: 26, h: 50, color: C.blue },
  { label: "itiraz süresi", sub: "478", x: 26, y: 50, w: 26, h: 50, color: C.purple },
  { label: "SMS gelmedi", sub: "386", x: 52, y: 66, w: 24, h: 34, color: C.orange },
  { label: "borç sorgusu", sub: "268", x: 76, y: 66, w: 24, h: 34, color: C.green },
];

export const SPIKE_ALERT = {
  word: "hesap bloke",
  change: 88,
  calls: 412,
  note: "Haftalık bahsedilme sayısı %30 eşik değerini aştı",
};

export const ROOT_CAUSE = {
  id: "RC-014",
  title: "Ödeme sonrası onay SMS'i 24 saat gecikiyor",
  cluster: "Ödeme & Yeniden Yapılandırma",
  calls: 386,
  share: 12.4,
  cost: "₺148.000",
  owner: "BT Operasyonları",
  confidence: 94,
  status: "in action",
  evidence: [
    "\u201cDün ödeme yaptım ama mesaj gelmedi — gitmedi mi?\u201d",
    "\u201cMakbuzu gönderdim, siz sistemde yok diyorsunuz.\u201d",
    "\u201cAynı konu için üçüncü kez arıyorum.\u201d",
  ],
  before: [186, 188, 181, 172, 141, 96, 52, 38],
  baseline: [186, 184, 180, 179, 177, 176, 174, 172],
  x: ["H-8", "H-7", "H-6", "H-5", "H-4", "H-3", "H-2", "H-1"],
  drop: 79,
};

export const ROOT_LIST = [
  { id: "RC-014", title: "Ödeme onay SMS'i 24 saat gecikiyor", calls: 386, cost: "₺148K", status: "in action" },
  { id: "RC-011", title: "e-Devlet dosya sorgulama adımı belirsiz", calls: 274, cost: "₺96K", status: "new" },
  { id: "RC-009", title: "Hesap blokesinin kaldırılması için yazılı prosedür yok", calls: 231, cost: "₺112K", status: "in action" },
  { id: "RC-006", title: "Faiz dökümü müşteriye açıklanamıyor", calls: 198, cost: "₺74K", status: "new" },
];

/* ───────────────────────── scene 4 · people ───────────────────────── */

export const AGENTS = [
  { id: "AGT-014", name: "Elif Kaya", team: "Müşteri Hizmetleri", score: 94, calls: 312, vio: 2, crit: 0, trend: [86, 88, 87, 90, 92, 91, 94] },
  { id: "AGT-007", name: "Mert Doğan", team: "İcra", score: 91, calls: 287, vio: 4, crit: 0, trend: [88, 89, 91, 90, 89, 92, 91] },
  { id: "AGT-021", name: "Zeynep Arslan", team: "Hukuk Danışmanlığı", score: 89, calls: 198, vio: 3, crit: 0, trend: [81, 83, 84, 86, 87, 88, 89] },
  { id: "AGT-003", name: "Burak Şahin", team: "Tahsilat", score: 86, calls: 341, vio: 6, crit: 1, trend: [88, 87, 88, 86, 85, 87, 86] },
  { id: "AGT-018", name: "Selin Yıldız", team: "Müşteri Hizmetleri", score: 84, calls: 264, vio: 5, crit: 0, trend: [78, 79, 81, 80, 82, 83, 84] },
  { id: "AGT-009", name: "Onur Çelik", team: "İcra", score: 81, calls: 229, vio: 9, crit: 1, trend: [85, 84, 83, 82, 83, 81, 81] },
  { id: "AGT-025", name: "Ayşe Demir", team: "Tahsilat", score: 78, calls: 305, vio: 11, crit: 2, trend: [82, 80, 79, 77, 76, 77, 78] },
  { id: "AGT-031", name: "Kaan Özkan", team: "Hukuk Danışmanlığı", score: 73, calls: 156, vio: 14, crit: 3, trend: [79, 78, 77, 75, 74, 74, 73] },
];

export const MONTHLY = {
  x: ["Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu"],
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
    { k: "İçerik & Ton", v: 70 },
    { k: "Prosedür", v: 72 },
    { k: "Doğruluk", v: 76 },
    { k: "Empati", v: 65 },
    { k: "Kapanış", v: 81 },
  ],
  repetitive: 62,
  coaching: [
    { kind: "risk", title: "Kritik · kimlik doğrulama", body: "14 bulgunun 3'ü aynı kuralı paylaşıyor: doğrulama öncesi borç verisi paylaşımı." },
    { kind: "growth", title: "Gelişim · itiraz süresi ifadesi", body: "2 görüşmede mevzuat ifadesi eksik; tazeleme eğitimi öneriliyor." },
    { kind: "growth", title: "Gelişim · baskı altında empati", body: "5 dakikadan uzun görüşmelerde empati puanı 65'e düşüyor." },
    { kind: "good", title: "Güçlü yön · kapanış disiplini", body: "Görüşmelerin %81'inde kapanış onayı alınmış, takım ortalamasının üzerinde." },
  ],
};

export const TEAM_ROLLUP = [
  { team: "Müşteri Hizmetleri", score: 89, calls: 576, color: C.blue },
  { team: "İcra", score: 86, calls: 516, color: C.purple },
  { team: "Hukuk Danışmanlığı", score: 81, calls: 354, color: C.teal },
  { team: "Tahsilat", score: 82, calls: 646, color: C.orange },
];

/* ───────────────────────── scene 5 · automation ───────────────────────── */

export const AI_INTENTS = [
  { id: "debt-inquiry", intent: "Borç sorgusu", auto: 96, volume: 428, state: "live" },
  { id: "payment-plan-info", intent: "Ödeme planı bilgisi", auto: 91, volume: 384, state: "live" },
  { id: "receipt-verification", intent: "Makbuz doğrulama", auto: 88, volume: 297, state: "live" },
  { id: "file-status", intent: "Dosya durumu", auto: 84, volume: 264, state: "pilot" },
  { id: "address-update", intent: "Adres güncelleme", auto: 79, volume: 176, state: "pilot" },
  { id: "restructuring-request", intent: "Yeniden yapılandırma talebi", auto: 62, volume: 341, state: "training" },
  { id: "objection-process", intent: "İtiraz süreci", auto: 41, volume: 218, state: "training" },
  { id: "legal-advice", intent: "Hukuki danışmanlık", auto: 12, volume: 156, state: "human" },
];

export const AI_HANDOVER = [
  { x: "H-8", ai: 4, human: 96 },
  { x: "H-7", ai: 7, human: 93 },
  { x: "H-6", ai: 11, human: 89 },
  { x: "H-5", ai: 14, human: 86 },
  { x: "H-4", ai: 19, human: 81 },
  { x: "H-3", ai: 23, human: 77 },
  { x: "H-2", ai: 28, human: 72 },
  { x: "H-1", ai: 34, human: 66 },
];

export const AI_VS_HUMAN = {
  axes: ["Puan", "İlk temas", "Prosedür", "Empati", "Doğruluk", "Kapanış"],
  human: [86, 79, 84, 88, 87, 82],
  ai: [82, 88, 97, 71, 84, 94],
};

export const GUARDRAILS = [
  { rule: "Kimlik doğrulanmadan önce kişisel veri paylaşımı", action: "blocked", count: 412 },
  { rule: "Hukuki danışmanlık verme girişimi", action: "blocked", count: 87 },
  { rule: "Ödeme taahhüdü oluşturma", action: "escalated", count: 264 },
  { rule: "Güven eşiğinin altında kalma", action: "escalated", count: 341 },
  { rule: "Müşterinin bir insan talep etmesi", action: "escalated", count: 198 },
];

export const AI_DIALOG = [
  { who: "AI", text: "Acar Legal otomatik hattı, ben Ada. Bu görüşme kalite amacıyla kaydedilmektedir. Nasıl yardımcı olabilirim?" },
  { who: "Customer", text: "Dosyamdaki güncel bakiyeyi öğrenmek istiyorum." },
  { who: "AI", text: "Tabii ki. Güvenliğiniz için önce kimliğinizi doğrulamam gerekiyor — kimlik numaranızı girebilir misiniz?" },
  { who: "Customer", text: "Girdim." },
  { who: "AI", text: "Teşekkürler, doğrulandı. 14 Ağustos itibarıyla güncel bakiyeniz 12.480₺. Ödeme planı seçeneklerini anlatmamı ister misiniz?" },
];

export const REASSIGNMENT = {
  agent: "Kaan Özkan",
  before: { score: 73, calls: 156, repetitive: 97, complex: 59 },
  after: { score: 88, calls: 59, repetitive: 0, complex: 59 },
  movedCalls: 97,
  savings: 214,
};
