import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DemoLiquidPillNav } from '../../../landing/DemoLiquidPillNav'
import gV from '../../../gV'
import Navbar from '../../../landing/Navbar'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Helmet } from 'react-helmet'
import FooterGen from '../../../homeComponents/FooterGen/FooterGen'
import vocallyzeBg from '../../../assets/images/vocallyze-bg.png'
import logo from '../../../assets/images/logos.png'
import logoWhite from '../../../assets/images/logos-white.png'
import { useLocale } from '../../../landing/LocaleProvider'

// Short labels for the mobile liquid pill nav (same component/shell as the
// Listen/Audit/Understand/Coach/Automate row in the platform demo), so all
// four fit comfortably on narrow phones without wrapping.
const REPORT_TABS_MOBILE = {
  en: ["Privacy", "Notice", "Pressure", "Legal"],
  tr: ["Gizlilik", "Bildirim", "Baskı", "Hukuki"],
}

const pillShellClassName = "relative z-10 flex w-full min-w-0 items-center justify-between gap-0.5 rounded-full border border-border bg-surface/90 p-[clamp(4px,1.6vw,7px)] shadow-sm backdrop-blur-xl"
const pillButtonClassName = (_, active) => `relative z-10 flex-1 rounded-full px-[clamp(6px,2.4vw,14px)] py-[7px] text-[clamp(10px,3vw,12px)] font-medium text-center transition-colors cursor-pointer ${active ? "text-white" : "text-foreground/60"}`

// Deterministic bar heights for the evidence waveform strip.
const WAVE = [26,41,58,33,70,47,76,61,37,64,82,49,30,57,71,44,35,62,78,52,28,46,66,39,58,74,45,32,54,68]

const SEVERITY = {
  critical: { chip: "bg-red-50 text-red-700 border-red-200", bar: "bg-red-500", score: "text-red-600" },
  high:     { chip: "bg-orange-50 text-orange-700 border-orange-200", bar: "bg-orange-500", score: "text-orange-600" },
  medium:   { chip: "bg-amber-50 text-amber-700 border-amber-200", bar: "bg-amber-500", score: "text-amber-600" },
}

// `severity` and `who` stay identical, lowercase machine keys across both
// catalogs (used for color/tone lookups and comparisons); only their
// on-screen labels are translated, via SEVERITY_LABEL / WHO_LABEL below.
const SEVERITY_LABEL = {
  en: { critical: "critical", high: "high", medium: "medium" },
  tr: { critical: "kritik", high: "yüksek", medium: "orta" },
}
const WHO_LABEL = {
  en: { Agent: "Agent", Customer: "Customer" },
  tr: { Agent: "Temsilci", Customer: "Müşteri" },
}

const REPORTS_EN = [
  {
    id: "VOC-2841",
    date: "Aug 14, 2026",
    callId: "20260814-1042-AGT031",
    agent: "Kaan Özkan",
    team: "Legal Advisory",
    datetime: "Aug 14, 2026 · 10:42",
    duration: "3:48",
    topic: "Debt inquiry",
    outcome: "Escalated to compliance",
    score: 34,
    rulesChecked: 32,
    failed: "1 critical finding",
    severity: "critical",
    category: "Data privacy",
    status: "Open · assigned",
    rule: "KR-02 · Personal data shared before identity verification",
    source: "KVKK Compliance Policy · art. 5 — quote verified against the recording",
    at: "01:12",
    quote: "Your total debt appears to be ₺47,850 — I can tell you even without your ID number.",
    scorecard: [
      { k: "Content & Tone", v: 71 }, { k: "Procedure", v: 38 }, { k: "Accuracy", v: 64 },
      { k: "Empathy", v: 70 }, { k: "Closing", v: 66 },
    ],
    actions: [
      "Notify the data protection officer within 24 hours.",
      "Third failure of the same rule by this agent this month — assign KR-02 refresher.",
      "Auto-queue the agent's next 20 calls for priority review.",
    ],
    transcript: [
      { t: "00:03", who: "Agent", text: "Acar Legal, this is Kaan speaking. This call is being recorded for quality purposes.", flag: "Recording notice given" },
      { t: "00:58", who: "Customer", text: "I just want to know how much is left on the file, I don't have my ID with me right now." },
      { t: "01:12", who: "Agent", text: "Your total debt appears to be ₺47,850 — I can tell you even without your ID number.", violation: "KR-02 · Identity not verified before disclosure" },
      { t: "01:26", who: "Customer", text: "Alright. And how much is the interest on top of that?" },
      { t: "01:31", who: "Agent", text: "Interest brings it to ₺51,200 today. I can text the breakdown to the number you are calling from.", violation: "KR-02 · Further personal data disclosed" },
      { t: "03:40", who: "Agent", text: "Anything else I can help with? Have a good day.", flag: "Closing confirmation taken" },
    ],
    rules: [
      { id: "KR-01", label: "Recording notice at call start", ok: true, at: "00:03" },
      { id: "KR-02", label: "Identity verification before data", ok: false, at: "01:12" },
      { id: "KR-03", label: "No disclosure to third parties", ok: true, at: "—" },
      { id: "KR-04", label: "Customer not interrupted", ok: true, at: "—" },
      { id: "KR-08", label: "Closing confirmation captured", ok: true, at: "03:40" },
    ],
    cluster: { id: "RC-021", title: "Identity check skipped on inbound balance calls", meta: "38 similar calls this month · 4 agents" },
  },
  {
    id: "VOC-2836",
    date: "Aug 13, 2026",
    callId: "20260813-1618-AGT009",
    agent: "Onur Çelik",
    team: "Enforcement",
    datetime: "Aug 13, 2026 · 16:18",
    duration: "2:16",
    topic: "File status",
    outcome: "Resolved on first contact",
    score: 62,
    rulesChecked: 32,
    failed: "1 high · 1 medium finding",
    severity: "high",
    category: "Procedure",
    status: "In review",
    rule: "KR-01 · Call-recording notice missing at call start",
    source: "Quality Guideline v4 · art. 2.1 — quote verified against the recording",
    at: "00:04",
    quote: "Go ahead, what is this about?",
    scorecard: [
      { k: "Content & Tone", v: 78 }, { k: "Procedure", v: 41 }, { k: "Accuracy", v: 84 },
      { k: "Empathy", v: 72 }, { k: "Closing", v: 80 },
    ],
    actions: [
      "Consent to recording cannot be evidenced for this call.",
      "Opening script missing in 9 of this agent's 31 audited calls.",
      "Enable the mandatory opening prompt on the agent desktop.",
    ],
    transcript: [
      { t: "00:04", who: "Agent", text: "Go ahead, what is this about?", violation: "KR-01 · Recording notice never given" },
      { t: "00:09", who: "Customer", text: "I received a notice this morning, I want to understand what stage my file is at." },
      { t: "00:21", who: "Agent", text: "May I take the first three and last two digits of your ID number?", flag: "Identity verification followed" },
      { t: "00:44", who: "Agent", text: "Verified. Your file moved to the payment plan stage on August 11.", flag: "Accurate file information" },
      { t: "01:52", who: "Customer", text: "So do I need to do anything else, or —", violation: "KR-04 · Customer cut off mid-sentence" },
      { t: "02:11", who: "Agent", text: "That's all, goodbye.", violation: "KR-08 · Closing confirmation not taken" },
    ],
    rules: [
      { id: "KR-01", label: "Recording notice at call start", ok: false, at: "00:04" },
      { id: "KR-02", label: "Identity verification before data", ok: true, at: "00:21" },
      { id: "KR-04", label: "Customer not interrupted", ok: false, at: "01:52" },
      { id: "KR-07", label: "Clear and actionable resolution", ok: true, at: "00:44" },
      { id: "KR-08", label: "Closing confirmation captured", ok: false, at: "02:11" },
    ],
    cluster: { id: "RC-009", title: "Opening script skipped on the enforcement queue", meta: "124 similar calls this month · 6 agents" },
  },
  {
    id: "VOC-2824",
    date: "Aug 12, 2026",
    callId: "20260812-1509-AGT025",
    agent: "Ayşe Demir",
    team: "Collections",
    datetime: "Aug 12, 2026 · 15:09",
    duration: "5:34",
    topic: "Payment plan",
    outcome: "Complaint risk · customer hung up",
    score: 41,
    rulesChecked: 32,
    failed: "1 critical · 1 medium finding",
    severity: "critical",
    category: "Tone & manner",
    status: "Open · escalated",
    rule: "KR-05 · Pressure and threatening language used",
    source: "Enforcement & Bankruptcy Law · art. 337 — quote verified against the recording",
    at: "02:14",
    quote: "If you don't pay today your house gets sealed tomorrow — you should know that.",
    scorecard: [
      { k: "Content & Tone", v: 44 }, { k: "Procedure", v: 76 }, { k: "Accuracy", v: 81 },
      { k: "Empathy", v: 29 }, { k: "Closing", v: 58 },
    ],
    actions: [
      "Statement is legally inaccurate and coercive — legal exposure confirmed.",
      "Suspend outbound collection calls for this agent pending coaching.",
      "Empathy score drops below 40 on every call longer than five minutes.",
    ],
    transcript: [
      { t: "00:06", who: "Agent", text: "Acar Legal, Ayşe speaking. This call is recorded for quality purposes.", flag: "Recording notice given" },
      { t: "01:48", who: "Customer", text: "I lost my job last month, I can pay part of it at the start of next month." },
      { t: "02:14", who: "Agent", text: "If you don't pay today your house gets sealed tomorrow — you should know that.", violation: "KR-05 · Threatening and legally inaccurate statement" },
      { t: "02:39", who: "Customer", text: "That can't be right, no one told me anything about a seizure —" },
      { t: "03:21", who: "Agent", text: "One second, one second — you listen to me now.", violation: "KR-04 · Customer interrupted three or more times" },
      { t: "05:30", who: "Customer", text: "I'm not going to talk like this. I'll file a complaint." },
    ],
    rules: [
      { id: "KR-01", label: "Recording notice at call start", ok: true, at: "00:06" },
      { id: "KR-02", label: "Identity verification before data", ok: true, at: "00:33" },
      { id: "KR-04", label: "Customer not interrupted", ok: false, at: "03:21" },
      { id: "KR-05", label: "No pressure or threatening language", ok: false, at: "02:14" },
      { id: "KR-07", label: "Clear and actionable resolution", ok: true, at: "04:12" },
    ],
    cluster: { id: "RC-017", title: "Pressure language on hardship-declared files", meta: "26 similar calls this month · 3 agents" },
  },
  {
    id: "VOC-2830",
    date: "Aug 13, 2026",
    callId: "20260813-1122-AGT031",
    agent: "Kaan Özkan",
    team: "Legal Advisory",
    datetime: "Aug 13, 2026 · 11:22",
    duration: "6:02",
    topic: "Objection process",
    outcome: "Incorrect information given",
    score: 55,
    rulesChecked: 32,
    failed: "1 high finding",
    severity: "high",
    category: "Regulation",
    status: "In review",
    rule: "KR-06 · Statutory objection period stated incorrectly",
    source: "Enforcement & Bankruptcy Law · art. 62 — quote verified against the recording",
    at: "04:56",
    quote: "You can't object anymore — I believe that deadline has passed.",
    scorecard: [
      { k: "Content & Tone", v: 74 }, { k: "Procedure", v: 68 }, { k: "Accuracy", v: 39 },
      { k: "Empathy", v: 76 }, { k: "Closing", v: 71 },
    ],
    actions: [
      "Notice was served on August 11 — the seven-day objection period was still open.",
      "Send a written correction to the customer and log it on the file.",
      "Add the objection-period wording to the mandatory answer library.",
    ],
    transcript: [
      { t: "00:05", who: "Agent", text: "Acar Legal, this is Kaan. This call is being recorded for quality purposes.", flag: "Recording notice given" },
      { t: "04:31", who: "Customer", text: "The notice reached me on Monday. Can I still object to this debt?" },
      { t: "04:56", who: "Agent", text: "You can't object anymore — I believe that deadline has passed.", violation: "KR-06 · Objection period misstated, uncertain wording" },
      { t: "05:14", who: "Customer", text: "So what am I supposed to do now?" },
      { t: "05:22", who: "Agent", text: "Making the payment is the healthiest route at this point.", violation: "KR-06 · Customer steered away from a legal right" },
      { t: "05:51", who: "Agent", text: "Is there anything else you'd like to ask before we finish?", flag: "Closing confirmation taken" },
    ],
    rules: [
      { id: "KR-01", label: "Recording notice at call start", ok: true, at: "00:05" },
      { id: "KR-02", label: "Identity verification before data", ok: true, at: "00:26" },
      { id: "KR-05", label: "No pressure or threatening language", ok: true, at: "—" },
      { id: "KR-06", label: "Objection period stated correctly", ok: false, at: "04:56" },
      { id: "KR-08", label: "Closing confirmation captured", ok: true, at: "05:51" },
    ],
    cluster: { id: "RC-006", title: "Objection period explained inconsistently", meta: "61 similar calls this month · 5 agents" },
  },
]

const REPORTS_TR = [
  {
    id: "VOC-2841",
    date: "14 Ağu 2026",
    callId: "20260814-1042-AGT031",
    agent: "Kaan Özkan",
    team: "Hukuk Danışmanlığı",
    datetime: "14 Ağu 2026 · 10:42",
    duration: "3:48",
    topic: "Borç sorgusu",
    outcome: "Uyumluluğa yükseltildi",
    score: 34,
    rulesChecked: 32,
    failed: "1 kritik bulgu",
    severity: "critical",
    category: "Veri gizliliği",
    status: "Açık · atandı",
    rule: "KR-02 · Kimlik doğrulanmadan önce kişisel veri paylaşıldı",
    source: "KVKK Uyumluluk Politikası · madde 5 — alıntı kayıtla doğrulandı",
    at: "01:12",
    quote: "Toplam borcunuz 47.850₺ görünüyor — kimlik numaranız olmadan da söyleyebilirim.",
    scorecard: [
      { k: "İçerik & Ton", v: 71 }, { k: "Prosedür", v: 38 }, { k: "Doğruluk", v: 64 },
      { k: "Empati", v: 70 }, { k: "Kapanış", v: 66 },
    ],
    actions: [
      "Veri koruma görevlisini 24 saat içinde bilgilendirin.",
      "Bu ay bu temsilcinin aynı kuralda üçüncü ihlali — KR-02 tazeleme eğitimi atayın.",
      "Temsilcinin sonraki 20 çağrısını öncelikli inceleme kuyruğuna otomatik ekleyin.",
    ],
    transcript: [
      { t: "00:03", who: "Agent", text: "Acar Legal, ben Kaan. Bu görüşme kalite amacıyla kaydedilmektedir.", flag: "Kayıt bildirimi yapıldı" },
      { t: "00:58", who: "Customer", text: "Sadece dosyada ne kadar kaldığını öğrenmek istiyorum, kimliğim şu an yanımda değil." },
      { t: "01:12", who: "Agent", text: "Toplam borcunuz 47.850₺ görünüyor — kimlik numaranız olmadan da söyleyebilirim.", violation: "KR-02 · Açıklamadan önce kimlik doğrulanmadı" },
      { t: "01:26", who: "Customer", text: "Peki. Üzerine faiz ne kadar?" },
      { t: "01:31", who: "Agent", text: "Faizle birlikte bugün 51.200₺ oluyor. Dökümü aradığınız numaraya SMS ile gönderebilirim.", violation: "KR-02 · Ek kişisel veri açıklandı" },
      { t: "03:40", who: "Agent", text: "Başka yardımcı olabileceğim bir şey var mı? İyi günler.", flag: "Kapanış onayı alındı" },
    ],
    rules: [
      { id: "KR-01", label: "Görüşme başında kayıt bildirimi", ok: true, at: "00:03" },
      { id: "KR-02", label: "Veri paylaşımından önce kimlik doğrulama", ok: false, at: "01:12" },
      { id: "KR-03", label: "Üçüncü taraflara açıklama yapılmadı", ok: true, at: "—" },
      { id: "KR-04", label: "Müşterinin sözü kesilmedi", ok: true, at: "—" },
      { id: "KR-08", label: "Kapanış onayı alındı", ok: true, at: "03:40" },
    ],
    cluster: { id: "RC-021", title: "Gelen bakiye çağrılarında kimlik kontrolü atlanıyor", meta: "bu ay 38 benzer çağrı · 4 temsilci" },
  },
  {
    id: "VOC-2836",
    date: "13 Ağu 2026",
    callId: "20260813-1618-AGT009",
    agent: "Onur Çelik",
    team: "İcra",
    datetime: "13 Ağu 2026 · 16:18",
    duration: "2:16",
    topic: "Dosya durumu",
    outcome: "İlk temasta çözüldü",
    score: 62,
    rulesChecked: 32,
    failed: "1 yüksek · 1 orta bulgu",
    severity: "high",
    category: "Prosedür",
    status: "İncelemede",
    rule: "KR-01 · Görüşme başında kayıt bildirimi eksik",
    source: "Kalite Kılavuzu v4 · madde 2.1 — alıntı kayıtla doğrulandı",
    at: "00:04",
    quote: "Buyurun, bu ne hakkında?",
    scorecard: [
      { k: "İçerik & Ton", v: 78 }, { k: "Prosedür", v: 41 }, { k: "Doğruluk", v: 84 },
      { k: "Empati", v: 72 }, { k: "Kapanış", v: 80 },
    ],
    actions: [
      "Bu çağrı için kayıt onayı kanıtlanamıyor.",
      "Bu temsilcinin denetlenen 31 çağrısının 9'unda açılış senaryosu eksik.",
      "Temsilci ekranında zorunlu açılış istemini etkinleştirin.",
    ],
    transcript: [
      { t: "00:04", who: "Agent", text: "Buyurun, bu ne hakkında?", violation: "KR-01 · Kayıt bildirimi hiç yapılmadı" },
      { t: "00:09", who: "Customer", text: "Bu sabah bir bildirim aldım, dosyamın hangi aşamada olduğunu anlamak istiyorum." },
      { t: "00:21", who: "Agent", text: "Kimlik numaranızın ilk üç ve son iki hanesini alabilir miyim?", flag: "Kimlik doğrulama uygulandı" },
      { t: "00:44", who: "Agent", text: "Doğrulandı. Dosyanız 11 Ağustos'ta ödeme planı aşamasına geçti.", flag: "Doğru dosya bilgisi" },
      { t: "01:52", who: "Customer", text: "Yani başka bir şey yapmam gerekiyor mu, yoksa —", violation: "KR-04 · Müşterinin sözü cümle ortasında kesildi" },
      { t: "02:11", who: "Agent", text: "Hepsi bu, hoşça kalın.", violation: "KR-08 · Kapanış onayı alınmadı" },
    ],
    rules: [
      { id: "KR-01", label: "Görüşme başında kayıt bildirimi", ok: false, at: "00:04" },
      { id: "KR-02", label: "Veri paylaşımından önce kimlik doğrulama", ok: true, at: "00:21" },
      { id: "KR-04", label: "Müşterinin sözü kesilmedi", ok: false, at: "01:52" },
      { id: "KR-07", label: "Net ve uygulanabilir çözüm", ok: true, at: "00:44" },
      { id: "KR-08", label: "Kapanış onayı alındı", ok: false, at: "02:11" },
    ],
    cluster: { id: "RC-009", title: "İcra kuyruğunda açılış senaryosu atlanıyor", meta: "bu ay 124 benzer çağrı · 6 temsilci" },
  },
  {
    id: "VOC-2824",
    date: "12 Ağu 2026",
    callId: "20260812-1509-AGT025",
    agent: "Ayşe Demir",
    team: "Tahsilat",
    datetime: "12 Ağu 2026 · 15:09",
    duration: "5:34",
    topic: "Ödeme planı",
    outcome: "Şikayet riski · müşteri telefonu kapattı",
    score: 41,
    rulesChecked: 32,
    failed: "1 kritik · 1 orta bulgu",
    severity: "critical",
    category: "Ton & tavır",
    status: "Açık · yükseltildi",
    rule: "KR-05 · Baskı ve tehdit içeren dil kullanıldı",
    source: "İcra ve İflas Kanunu · madde 337 — alıntı kayıtla doğrulandı",
    at: "02:14",
    quote: "Bugün ödemezseniz yarın eviniz mühürlenir — bunu bilmenizi isterim.",
    scorecard: [
      { k: "İçerik & Ton", v: 44 }, { k: "Prosedür", v: 76 }, { k: "Doğruluk", v: 81 },
      { k: "Empati", v: 29 }, { k: "Kapanış", v: 58 },
    ],
    actions: [
      "İfade hukuken yanlış ve zorlayıcı — hukuki risk doğrulandı.",
      "Koçluk tamamlanana kadar bu temsilcinin giden tahsilat çağrılarını durdurun.",
      "Beş dakikadan uzun her çağrıda empati puanı 40'ın altına düşüyor.",
    ],
    transcript: [
      { t: "00:06", who: "Agent", text: "Acar Legal, ben Ayşe. Bu görüşme kalite amacıyla kaydedilmektedir.", flag: "Kayıt bildirimi yapıldı" },
      { t: "01:48", who: "Customer", text: "Geçen ay işimi kaybettim, gelecek ayın başında bir kısmını ödeyebilirim." },
      { t: "02:14", who: "Agent", text: "Bugün ödemezseniz yarın eviniz mühürlenir — bunu bilmenizi isterim.", violation: "KR-05 · Tehdit içeren ve hukuken yanlış ifade" },
      { t: "02:39", who: "Customer", text: "Bu doğru olamaz, kimse bana haciz hakkında bir şey söylemedi —" },
      { t: "03:21", who: "Agent", text: "Bir saniye, bir saniye — şimdi beni dinleyin.", violation: "KR-04 · Müşterinin sözü üç veya daha fazla kez kesildi" },
      { t: "05:30", who: "Customer", text: "Böyle konuşmaya devam etmeyeceğim. Şikayette bulunacağım." },
    ],
    rules: [
      { id: "KR-01", label: "Görüşme başında kayıt bildirimi", ok: true, at: "00:06" },
      { id: "KR-02", label: "Veri paylaşımından önce kimlik doğrulama", ok: true, at: "00:33" },
      { id: "KR-04", label: "Müşterinin sözü kesilmedi", ok: false, at: "03:21" },
      { id: "KR-05", label: "Baskı veya tehdit içeren dil kullanılmadı", ok: false, at: "02:14" },
      { id: "KR-07", label: "Net ve uygulanabilir çözüm", ok: true, at: "04:12" },
    ],
    cluster: { id: "RC-017", title: "Zorluk beyan edilen dosyalarda baskı dili", meta: "bu ay 26 benzer çağrı · 3 temsilci" },
  },
  {
    id: "VOC-2830",
    date: "13 Ağu 2026",
    callId: "20260813-1122-AGT031",
    agent: "Kaan Özkan",
    team: "Hukuk Danışmanlığı",
    datetime: "13 Ağu 2026 · 11:22",
    duration: "6:02",
    topic: "İtiraz süreci",
    outcome: "Hatalı bilgi verildi",
    score: 55,
    rulesChecked: 32,
    failed: "1 yüksek bulgu",
    severity: "high",
    category: "Mevzuat",
    status: "İncelemede",
    rule: "KR-06 · Yasal itiraz süresi hatalı belirtildi",
    source: "İcra ve İflas Kanunu · madde 62 — alıntı kayıtla doğrulandı",
    at: "04:56",
    quote: "Artık itiraz edemezsiniz — sanırım o süre geçti.",
    scorecard: [
      { k: "İçerik & Ton", v: 74 }, { k: "Prosedür", v: 68 }, { k: "Doğruluk", v: 39 },
      { k: "Empati", v: 76 }, { k: "Kapanış", v: 71 },
    ],
    actions: [
      "Bildirim 11 Ağustos'ta tebliğ edildi — yedi günlük itiraz süresi hâlâ açıktı.",
      "Müşteriye yazılı bir düzeltme gönderin ve dosyaya kaydedin.",
      "İtiraz süresi ifadesini zorunlu cevap kütüphanesine ekleyin.",
    ],
    transcript: [
      { t: "00:05", who: "Agent", text: "Acar Legal, ben Kaan. Bu görüşme kalite amacıyla kaydedilmektedir.", flag: "Kayıt bildirimi yapıldı" },
      { t: "04:31", who: "Customer", text: "Bildirim bana pazartesi ulaştı. Bu borca hâlâ itiraz edebilir miyim?" },
      { t: "04:56", who: "Agent", text: "Artık itiraz edemezsiniz — sanırım o süre geçti.", violation: "KR-06 · İtiraz süresi hatalı belirtildi, belirsiz ifade" },
      { t: "05:14", who: "Customer", text: "Peki şimdi ne yapmam gerekiyor?" },
      { t: "05:22", who: "Agent", text: "Bu noktada en sağlıklısı ödemeyi yapmak.", violation: "KR-06 · Müşteri yasal bir haktan uzaklaştırıldı" },
      { t: "05:51", who: "Agent", text: "Bitirmeden önce sormak istediğiniz başka bir şey var mı?", flag: "Kapanış onayı alındı" },
    ],
    rules: [
      { id: "KR-01", label: "Görüşme başında kayıt bildirimi", ok: true, at: "00:05" },
      { id: "KR-02", label: "Veri paylaşımından önce kimlik doğrulama", ok: true, at: "00:26" },
      { id: "KR-05", label: "Baskı veya tehdit içeren dil kullanılmadı", ok: true, at: "—" },
      { id: "KR-06", label: "İtiraz süresi doğru belirtildi", ok: false, at: "04:56" },
      { id: "KR-08", label: "Kapanış onayı alındı", ok: true, at: "05:51" },
    ],
    cluster: { id: "RC-006", title: "İtiraz süresi tutarsız açıklanıyor", meta: "bu ay 61 benzer çağrı · 5 temsilci" },
  },
]

const REPORTS_BY_LOCALE = { en: REPORTS_EN, tr: REPORTS_TR }

const UI_COPY = {
  en: {
    metaTitle: "Vocallyze - Sample Call Audit Reports | See Every Finding With Proof",
    metaDescription: "Explore Vocallyze's sample call audit reports to see how every violation is evidenced with a verbatim quote, a timestamp and the original audio.",
    metaOgDescription: "Explore our sample reports to see how every finding is backed by a quote, a timestamp and the recording it came from.",
    logoAlt: "sample reports",
    title: "Call Audit Report Samples",
    intro: "Every finding in a Vocallyze report is proven with a verbatim quote, its timestamp and the audio it came from. Below are four real violation types caught in calls that manual sampling never reached.",
    tabs: ["Data Privacy Gap", "Missing Notice", "Pressure & Threats", "Legal Misinfo"],
    explore: "Explore:",
    exploreRest: "Read the full report",
    fullReport: "Full Audit Report",
    close: "Close",
    reportShell: { auditReport: "CALL AUDIT REPORT", transcriptRules: "TRANSCRIPT & RULE MATCHES", page1: "Page 1 / 2", page2: "Page 2 / 2", footerNote: "Processed on-premise · no recording, transcript or identifier left the institution's network" },
    meta: { callRecord: "CALL RECORD", callId: "Call ID", agent: "Agent", team: "Team", date: "Date", duration: "Duration", topic: "Topic", outcome: "Outcome" },
    score: { title: "COMPLIANCE SCORE", rulesEvaluated: (n) => `${n} rules evaluated · ` },
    scorecardTitle: "SCORECARD",
    evidence: { label: (at) => `EVIDENCE · ${at}`, listen: "Listen to clip" },
    requiredAction: "REQUIRED ACTION",
    transcriptExcerpt: "TRANSCRIPT EXCERPT",
    diarization: "Speaker separation 98% confidence",
    ruleMatches: (n) => `RULE MATCHES · ${n} EVALUATED`,
    rootCauseCluster: "ROOT CAUSE CLUSTER",
    evidenceLinked: "Every finding above is linked to a verbatim quote, its timestamp and the original audio segment.",
  },
  tr: {
    metaTitle: "Vocallyze - Örnek Çağrı Denetim Raporları | Her Bulguyu Kanıtla Görün",
    metaDescription: "Her ihlalin birebir bir alıntı, bir zaman damgası ve orijinal ses ile nasıl kanıtlandığını görmek için Vocallyze'ın örnek çağrı denetim raporlarını inceleyin.",
    metaOgDescription: "Her bulgunun bir alıntı, bir zaman damgası ve geldiği kayıtla nasıl desteklendiğini görmek için örnek raporlarımızı inceleyin.",
    logoAlt: "örnek raporlar",
    title: "Çağrı Denetim Raporu Örnekleri",
    intro: "Bir Vocallyze raporundaki her bulgu, birebir bir alıntı, zaman damgası ve geldiği ses kaydıyla kanıtlanır. Aşağıda manuel örneklemenin asla ulaşamadığı çağrılarda yakalanan dört gerçek ihlal türü yer alıyor.",
    tabs: ["Veri Gizliliği Açığı", "Eksik Bildirim", "Baskı & Tehditler", "Hukuki Yanlış Bilgi"],
    explore: "Keşfet:",
    exploreRest: "Tam raporu okuyun",
    fullReport: "Tam Denetim Raporu",
    close: "Kapat",
    reportShell: { auditReport: "ÇAĞRI DENETİM RAPORU", transcriptRules: "TRANSKRİPT & KURAL EŞLEŞMELERİ", page1: "Sayfa 1 / 2", page2: "Sayfa 2 / 2", footerNote: "Kurum içinde işlendi · hiçbir kayıt, transkript veya kimlik bilgisi kurumun ağından çıkmadı" },
    meta: { callRecord: "ÇAĞRI KAYDI", callId: "Çağrı No", agent: "Temsilci", team: "Takım", date: "Tarih", duration: "Süre", topic: "Konu", outcome: "Sonuç" },
    score: { title: "UYUMLULUK PUANI", rulesEvaluated: (n) => `${n} kural değerlendirildi · ` },
    scorecardTitle: "PUAN KARTI",
    evidence: { label: (at) => `KANIT · ${at}`, listen: "Klibi dinle" },
    requiredAction: "GEREKLİ AKSİYON",
    transcriptExcerpt: "TRANSKRİPT ALINTISI",
    diarization: "Konuşmacı ayrımı %98 güven",
    ruleMatches: (n) => `KURAL EŞLEŞMELERİ · ${n} DEĞERLENDİRİLDİ`,
    rootCauseCluster: "KÖK NEDEN KÜMESİ",
    evidenceLinked: "Yukarıdaki her bulgu, birebir bir alıntıya, zaman damgasına ve orijinal ses segmentine bağlıdır.",
  },
}

const ReportShell = ({ title, meta, page, children, wide = true, footerNote }) => (
  <div className={`${wide ? "w-[94vw] lg:w-[72vw]" : "w-full"} shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-white text-left shadow-xl`}>
    <div className="flex items-center justify-between bg-second px-3 py-2.5 lg:px-6 lg:py-3">
      <div className="flex items-center gap-2 lg:gap-3">
        <img src={logoWhite} alt="Vocallyze" className="h-3.5 w-auto object-contain lg:h-4" />
        <span className="hidden h-4 w-px bg-white/30 sm:block" />
        <p className="text-[9px] font-semibold tracking-[0.18em] text-white lg:text-[11px]">{title}</p>
      </div>
      <p className="text-[8px] tracking-wide text-white/75 lg:text-[10px]">{meta}</p>
    </div>
    {children}
    <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-3 py-2 lg:px-6">
      <p className="text-[8px] text-neutral-500 lg:text-[9px]">{footerNote}</p>
      <p className="text-[8px] text-neutral-400 lg:text-[9px]">{page}</p>
    </div>
  </div>
)

const MetaRow = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-neutral-200 py-1.5 last:border-0">
    <span className="shrink-0 text-[9px] uppercase tracking-wide text-neutral-400 lg:text-[10px]">{label}</span>
    <span className="truncate text-[10px] font-medium text-neutral-700 lg:text-[11.5px]">{value}</span>
  </div>
)

const ReportSummary = ({ r, wide = true, ui, sevLabel }) => {
  const tone = SEVERITY[r.severity]
  return (
    <ReportShell title={ui.reportShell.auditReport} meta={`${r.id} · ${r.date}`} page={ui.reportShell.page1} footerNote={ui.reportShell.footerNote} wide={wide}>
      <div className="grid grid-cols-1 divide-y divide-neutral-200 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,0.8fr)_minmax(0,1.45fr)] lg:divide-x lg:divide-y-0">

        {/* call record */}
        <div className="px-4 py-4 lg:px-5 lg:py-5">
          <p className="mb-2 text-[9px] font-semibold tracking-[0.16em] text-neutral-400">{ui.meta.callRecord}</p>
          <MetaRow label={ui.meta.callId} value={r.callId} />
          <MetaRow label={ui.meta.agent} value={r.agent} />
          <MetaRow label={ui.meta.team} value={r.team} />
          <MetaRow label={ui.meta.date} value={r.datetime} />
          <MetaRow label={ui.meta.duration} value={r.duration} />
          <MetaRow label={ui.meta.topic} value={r.topic} />
          <MetaRow label={ui.meta.outcome} value={r.outcome} />
        </div>

        {/* score + scorecard */}
        <div className="px-4 py-4 lg:px-5 lg:py-5">
          <p className="mb-2 text-[9px] font-semibold tracking-[0.16em] text-neutral-400">{ui.score.title}</p>
          <div className="flex items-end gap-1.5">
            <span className={`text-[34px] font-bold leading-none lg:text-[40px] ${tone.score}`}>{r.score}</span>
            <span className="mb-1 text-xs text-neutral-400">/ 100</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${r.score}%` }} />
          </div>
          <p className="mt-2 text-[9.5px] text-neutral-500 lg:text-[10.5px]">{ui.score.rulesEvaluated(r.rulesChecked)}{r.failed}</p>

          <p className="mb-2 mt-5 text-[9px] font-semibold tracking-[0.16em] text-neutral-400">{ui.scorecardTitle}</p>
          {r.scorecard.map((s) => (
            <div key={s.k} className="mb-2">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-[9.5px] text-neutral-500 lg:text-[10.5px]">{s.k}</span>
                <span className="text-[9.5px] font-semibold text-neutral-700 lg:text-[10.5px]">{s.v}</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
                <div className={`h-full rounded-full ${s.v >= 80 ? "bg-second" : s.v >= 60 ? "bg-prim" : tone.bar}`} style={{ width: `${s.v}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* finding + evidence + action */}
        <div className="px-4 py-4 lg:px-5 lg:py-5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full border px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wide ${tone.chip}`}>{sevLabel[r.severity] ?? r.severity}</span>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-wide text-neutral-600">{r.category}</span>
            <span className="ml-auto text-[9px] text-neutral-400">{r.status}</span>
          </div>

          <p className="mt-2.5 text-[13px] font-semibold leading-snug text-neutral-800 lg:text-[15px]">{r.rule}</p>
          <p className="mt-1 text-[9.5px] text-neutral-500 lg:text-[10.5px]">{r.source}</p>

          <div className="mt-3 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[8.5px] font-semibold tracking-[0.16em] text-neutral-400">{ui.evidence.label(r.at)}</p>
              <span className="flex items-center gap-1 text-[9px] font-semibold text-second">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-second text-[6px] text-white">▶</span>
                {ui.evidence.listen}
              </span>
            </div>
            <p className="mt-1.5 text-[11.5px] italic leading-relaxed text-neutral-700 lg:text-[13px]">“{r.quote}”</p>
            <div className="mt-2.5 flex h-6 items-end gap-[2px]">
              {WAVE.map((h, i) => (
                <span key={i} className={`flex-1 rounded-sm ${i < 11 ? tone.bar : "bg-neutral-300"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <p className="mb-1.5 mt-3.5 text-[9px] font-semibold tracking-[0.16em] text-neutral-400">{ui.requiredAction}</p>
          {r.actions.map((a) => (
            <div key={a} className="flex gap-2 py-[3px]">
              <span className={`mt-[6px] h-1 w-1 shrink-0 rounded-full ${tone.bar}`} />
              <p className="text-[10px] leading-relaxed text-neutral-600 lg:text-[11.5px]">{a}</p>
            </div>
          ))}
        </div>

      </div>
    </ReportShell>
  )
}

const ReportEvidence = ({ r, wide = true, ui, whoLabel }) => {
  const tone = SEVERITY[r.severity]
  return (
    <ReportShell title={ui.reportShell.transcriptRules} meta={`${r.id} · ${r.callId}`} page={ui.reportShell.page2} footerNote={ui.reportShell.footerNote} wide={wide}>
      <div className="grid grid-cols-1 divide-y divide-neutral-200 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:divide-x lg:divide-y-0">

        {/* transcript */}
        <div className="px-4 py-4 lg:px-5 lg:py-5">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-[9px] font-semibold tracking-[0.16em] text-neutral-400">{ui.transcriptExcerpt}</p>
            <p className="text-[9px] text-neutral-400">{ui.diarization}</p>
          </div>

          {r.transcript.map((l, i) => (
            <div key={i} className={`mb-1 flex gap-2.5 rounded-lg px-2 py-1.5 ${l.violation ? "border border-red-200 bg-red-50/60" : ""}`}>
              <span className="w-8 shrink-0 pt-[3px] text-[9px] tabular-nums text-neutral-400">{l.t}</span>
              <div className="min-w-0">
                <p className={`text-[9.5px] font-semibold ${l.who === "Agent" ? "text-second" : "text-neutral-500"}`}>{whoLabel[l.who] ?? l.who}</p>
                <p className="mt-[1px] text-[11px] leading-relaxed text-neutral-700 lg:text-[12px]">{l.text}</p>
                {l.flag && (
                  <span className="mt-1 inline-block rounded-md bg-teal-50 px-1.5 py-[2px] text-[8.5px] font-semibold text-teal-700">✓ {l.flag}</span>
                )}
                {l.violation && (
                  <span className="mt-1 inline-block rounded-md bg-red-100 px-1.5 py-[2px] text-[8.5px] font-semibold text-red-700">✕ {l.violation}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* rule matches + cluster */}
        <div className="px-4 py-4 lg:px-5 lg:py-5">
          <p className="mb-2.5 text-[9px] font-semibold tracking-[0.16em] text-neutral-400">{ui.ruleMatches(r.rulesChecked)}</p>

          {r.rules.map((rule) => (
            <div key={rule.id} className="mb-1.5 flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-2">
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md text-[8px] font-bold text-white ${rule.ok ? "bg-teal-600" : "bg-red-500"}`}>
                {rule.ok ? "✓" : "✕"}
              </span>
              <span className="shrink-0 text-[9px] text-neutral-400">{rule.id}</span>
              <span className="min-w-0 flex-1 truncate text-[10px] text-neutral-700 lg:text-[11px]">{rule.label}</span>
              <span className="shrink-0 text-[9px] tabular-nums text-neutral-400">{rule.at}</span>
            </div>
          ))}

          <p className="mb-1.5 mt-4 text-[9px] font-semibold tracking-[0.16em] text-neutral-400">{ui.rootCauseCluster}</p>
          <div className={`rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm`}>
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${tone.bar}`} />
              <span className="text-[9px] font-semibold text-neutral-400">{r.cluster.id}</span>
            </div>
            <p className="mt-1 text-[11px] font-medium leading-snug text-neutral-700 lg:text-[12px]">{r.cluster.title}</p>
            <p className="mt-1.5 text-[9.5px] text-neutral-500">{r.cluster.meta}</p>
          </div>

          <div className="mt-3 rounded-lg bg-teal-50 px-3 py-2">
            <p className="text-[9.5px] leading-relaxed text-teal-800">{ui.evidenceLinked}</p>
          </div>
        </div>

      </div>
    </ReportShell>
  )
}

const SampleReports = ({isOutside = false , isPopup = false} ) => {

    const { locale } = useLocale();
    const REPORTS = REPORTS_BY_LOCALE[locale] ?? REPORTS_EN;
    const ui = UI_COPY[locale] ?? UI_COPY.en;
    const sevLabel = SEVERITY_LABEL[locale] ?? SEVERITY_LABEL.en;
    const whoLabel = WHO_LABEL[locale] ?? WHO_LABEL.en;
    const reportTabsMobile = REPORT_TABS_MOBILE[locale] ?? REPORT_TABS_MOBILE.en;

     AOS.init();
    const [showNum, setShowNum] = useState(1)


    const [tabsNum, setTabsNum] = useState(1)
    
    const [left, setLeft] = useState("left-[1%]")
    const [width, setWidth] = useState("")

    // mobile-only: full report is shown in a bottom sheet instead of an
    // inline scroll area, so the report's own scroll never fights the page scroll.
    const [sheetOpen, setSheetOpen] = useState(false)
    const sheetScrollRef = useRef(null)

    // jump back to the top of the sheet whenever the report tab changes,
    // so switching reports never leaves you scrolled into the middle of a new one
    useEffect(() => {
      if (sheetOpen && sheetScrollRef.current) {
        sheetScrollRef.current.scrollTop = 0
      }
    }, [tabsNum, sheetOpen])

    useEffect(() => {
      if (sheetOpen) {
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
        document.documentElement.style.overflow = ""
      }
      return () => {
        document.body.style.overflow = ""
        document.documentElement.style.overflow = ""
      }
    }, [sheetOpen])


    useEffect(() => {

        if(tabsNum == 0){
          setWidth("w-[26.1%]")
          setLeft("left-[1%]")
        }

        if(tabsNum == 1){
            setWidth("w-[21.2%]")
            setLeft("left-[27%]")
        }

        if(tabsNum == 2){

            setWidth("w-[26%]")
            setLeft("left-[50.5%]")
        }

        if(tabsNum == 3){
            setWidth("w-[20.9%]")
            setLeft("left-[77.5%]")
        }

        
    }, [tabsNum])

  { !isOutside &&  window.scrollTo(0, 0);}
    

    const Ping = ({title,left,top,num,text}) => {
      return (
      <>

       <div className={`absolute ${left}  ${top} hidden    items-center w-[300px] h-[120px]`}>
        
          {/* Explanation Area */} 
           <div className={` text-[#fff] px-4 py-2 font-extralight flex flex-col   absolute lg:w-[245px]  lg:h-[120px] w-[235px] h-[120px] lg:ml-[6vw]  ml-[16vw] rounded-2xl bg-[#000] opacity-0  ${showNum == num ?  "animate-fadeIn" : "hidden" }` }>
            <div className='flex justify-between items-center pb-2 w-full border-b border-slate-50'>
              <p className=''>{title}</p>
              <p  className='hover:bg-white hover:border-[#000000] hover:text-[#000000] flex h-6 px-4 pb-1 items-center justify-center border border-[#fff] rounded-md'>x</p>
            </div>
            
            <p className='text-[13px] mt-2'>{text} </p>
          
           </div>
        
           {/* Ping */}
           <div onClick={()=>{setShowNum(num)}}>
            <span  class="relative flex h-11 w-11">
              <span  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#000000] "></span>
              <span class=" h-11 w-11 relative inline-flex items-center justify-center rounded-full  bg-[#000000e2]  pb-1 pl-[1px] cursor-pointer hover:rotate-90  duration-700 "  onMouseLeave={()=>{setShowNum(0)}} onMouseMove={()=>{setShowNum(num)} }  >
                <p className="text-[#fff] text-[28px] "> + </p>
              </span>
            </span>
          </div>
       </div>
      </>
      )
    }
   

    const TabsMenuWeb = () => {
      
      return (
        <>
          
           <div data-aos-duration="600" data-aos="fade-up"  className=" bg-[#ffffffca] shadow-md   font-product items-center justify-center  tracking-wide  lg:w-auto w-[96vw] px-6 py-3  rounded-3xl relative cursor-pointer">
          
               <div  className={`absolute ${left} ${width}  top-[6px] z-10  lg:h-[70%] h-[80%] bottom-10 bg-second rounded-2xl duration-300 ease-in-out`}   >  </div> 
          
               <div className=" w-full  relative flex items-center justify-center lg:gap-9 gap-5">
          
                  <p  className={`h-[96%]  ${tabsNum == 0 ? "text-[#ffffff]" : "text-second" } text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{ setTabsNum(0);  }  } >  {ui.tabs[0]} </p>
                  <p  className={`h-[96%]  ${tabsNum == 1 ? "text-[#ffffff]" : "text-second" }  text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{ setTabsNum(1);  } } >  {ui.tabs[1]} </p>
                  <p  className={`h-[96%]  ${tabsNum == 2 ? "text-[#ffffff]" : "text-second" }  text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{setTabsNum(2);   }} >   {ui.tabs[2]}</p>
                  <p  className={`h-[96%]   ${tabsNum == 3 ? "text-[#ffffff]" : "text-second" } text-[0.9rem]  flex items-center justify-center rounded-2xl z-30 duration-300 ease-in-out`} onClick={()=>{setTabsNum(3);   } } >  {ui.tabs[3]}  </p>
          
               </div>
          
           </div>
       
      
        </>
      )
    }

    const TabsMenuMob = () => {

      return (
        <div data-aos-duration="600" data-aos="fade-up" className="relative z-10 w-[92vw]">
          <DemoLiquidPillNav
            labels={reportTabsMobile}
            activeIndex={tabsNum}
            onSelect={(i) => { setTabsNum(i) }}
            shellClassName={pillShellClassName}
            getButtonClassName={pillButtonClassName}
          />
        </div>
      )
    }
 

  {!isOutside &&  window.scrollTo(0, 0);}

  return (
   <>
  
    {!isOutside &&  <Navbar/> }
  
   { !isOutside && <Helmet>
    <html lang={locale} />
    <title>{ui.metaTitle}</title>
    <meta name="description" content={ui.metaDescription} />
    <meta name="keywords" content="Vocallyze, call audit report, KVKK compliance, call center quality, violation evidence, conversation intelligence" />
    <meta property="og:title" content={ui.metaTitle} />
    <meta property="og:description" content={ui.metaOgDescription} />
    <meta property="og:image" content="https://vitamu.imgix.net/Second%20Opinion%20Report.png" />
    <meta property="og:url" content="https://vocallyze.com/sample-reports" />
    <meta property="og:type" content="website" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
   </Helmet>}

   
   
   

     <section className={`font-product text-black ${!isOutside ? "py-0" : "py-[0vh]"}   h-auto   lg:w-[100vw] w-[100vw] self-center bg-slate-50 rounded-md overflow-hidden   relative flex flex-col items-center gap-3 lg:gap-10 justify-center`}>
   
    
    {/*  Header */}
    
      <div className={`flex flex-col gap-4 relative ${isPopup && "hidden"} ${isOutside ? "py-10" : "py-28"}   lg:w-[100vw] w-[100vw] px-7 items-center justify-center  z-10 `}>
      <img     
             alt=''
              className=" absolute w-[98%] rounded-sm h-full object-cover -z-10 "
              src={vocallyzeBg}
            />
        
        { !isOutside && <img data-aos-duration="600" data-aos="fade-up"   className='w-48 self-center object-contain' src={logo} alt={ui.logoAlt}/>}
          <h1 data-aos-duration="600" data-aos="fade-up"  className={`lg:text-[42px]  text-[32px]  self-center tracking-wide leading-[38px] text-center  text-black font-bold`}>  {ui.title} </h1>
            <p data-aos-duration="600" data-aos="fade-up"  className="w-[90vw] lg:w-[70vw] text-center lg:text-base text-sm  text-black">
            {ui.intro}
            </p>
            
     </div>

     {gV.mq.matches ? TabsMenuMob() : TabsMenuWeb() }

     {/*  Landscape Reports · two pages per case ·
         clipped to a short preview on mobile so its own scroll never fights
         the page scroll — "Explore" opens the same reports full-height in a
         bottom sheet instead. Unclipped, freely scrollable on desktop. */}
     <div className='flex max-h-[64vh] overflow-hidden lg:h-[80vh] lg:overflow-scroll relative bottom-0 lg:bottom-12  flex-col px-2 gap-10 lg:mt-10 items-center'>

       
       {/* data privacy gap */}
      {  tabsNum == 0 && 
      <div data-aos="fade-up"   data-aos-duration="800"  className='relative flex flex-col items-center gap-6 pb-6'>
          <ReportSummary r={REPORTS[0]} ui={ui} sevLabel={sevLabel} />
          <ReportEvidence r={REPORTS[0]} ui={ui} whoLabel={whoLabel} />
       </div> }

        {/* missing notice */}
       {tabsNum == 1 &&  
       <div data-aos="fade-up"  data-aos-duration="800" className='relative flex flex-col items-center gap-6 pb-6'>
          <ReportSummary r={REPORTS[1]} ui={ui} sevLabel={sevLabel} />
          <ReportEvidence r={REPORTS[1]} ui={ui} whoLabel={whoLabel} />
       </div> }
      
      {/* pressure & threats */}
       {tabsNum == 2 &&  
       <div data-aos="fade-up"  data-aos-duration="800" className='relative flex flex-col items-center gap-6 pb-6'>
          <ReportSummary r={REPORTS[2]} ui={ui} sevLabel={sevLabel} />
          <ReportEvidence r={REPORTS[2]} ui={ui} whoLabel={whoLabel} />
        </div> }
      

        {/* legal misinfo */}
       {tabsNum == 3 &&  
        <div data-aos="fade-up"  data-aos-duration="800" className='relative flex flex-col items-center gap-6 pb-6'>
          <ReportSummary r={REPORTS[3]} ui={ui} sevLabel={sevLabel} />
          <ReportEvidence r={REPORTS[3]} ui={ui} whoLabel={whoLabel} />
         </div> }

       {/* fade-out mask so the clipped preview reads as "more below", mobile only */}
       <div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 to-transparent lg:hidden' />

     </div>

     {/* mobile-only: expands the clipped preview above into a full bottom sheet */}
     <motion.button
       whileTap={{ scale: 0.97 }}
       onClick={() => setSheetOpen(true)}
       className='relative z-10 -mt-2 mb-10 flex w-[92vw] cursor-pointer select-none items-center gap-2 overflow-hidden rounded-full lg:hidden'
       style={{
         height: 52,
         background: "linear-gradient(135deg, #93CEF9 0%, #00688F 100%)",
         boxShadow: "0 4px 14px rgba(0,104,143,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
         paddingLeft: 6,
         paddingRight: 14,
       }}
     >
       <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20'>
         <svg className='h-[18px] w-[18px] text-white' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
           <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
           <path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z" />
         </svg>
       </div>
       <span className='truncate text-left text-[13px] font-semibold text-white'>
         {ui.explore} <span className='font-normal text-white/85'>{ui.exploreRest}</span>
       </span>
     </motion.button>

     {/* mobile-only bottom sheet · full report, scrollable on its own */}
     <AnimatePresence>
       {sheetOpen && (
         <motion.div
           key="report-sheet-backdrop"
           className='fixed inset-0 z-50 lg:hidden'
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.25 }}
         >
           <div className='absolute inset-0 bg-black/50' onClick={() => setSheetOpen(false)} />

           <motion.div
             initial={{ y: "100%" }}
             animate={{ y: 0 }}
             exit={{ y: "100%" }}
             transition={{ type: "spring", stiffness: 260, damping: 32 }}
             className='absolute inset-x-0 bottom-0 flex h-[88vh] flex-col overflow-hidden rounded-t-3xl bg-slate-50 shadow-2xl'
           >
             {/* drag handle */}
             <div className='flex shrink-0 justify-center pt-2.5'>
               <div className='h-1 w-10 rounded-full bg-neutral-300' />
             </div>

             {/* header */}
             <div className='flex shrink-0 flex-col gap-3 px-4 pb-3 pt-1.5'>
               <div className='flex items-center justify-between'>
                 <p className='text-[13px] font-semibold text-black'>{ui.fullReport}</p>
                 <button onClick={() => setSheetOpen(false)} aria-label={ui.close} className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm'>
                   <svg className='h-4 w-4' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>

               {/* same nav pattern, so you can switch reports without leaving the sheet */}
               <DemoLiquidPillNav
                 labels={reportTabsMobile}
                 activeIndex={tabsNum}
                 onSelect={(i) => { setTabsNum(i) }}
                 shellClassName={pillShellClassName}
                 getButtonClassName={pillButtonClassName}
               />
             </div>

             {/* scrollable content, independent from the page scroll */}
             <div ref={sheetScrollRef} className='flex-1 overflow-y-auto px-3 pb-8'>
               <div className='flex flex-col items-center gap-5'>
                 <ReportSummary r={REPORTS[tabsNum]} wide={false} ui={ui} sevLabel={sevLabel} />
                 <ReportEvidence r={REPORTS[tabsNum]} wide={false} ui={ui} whoLabel={whoLabel} />
               </div>
             </div>
           </motion.div>
         </motion.div>
       )}
     </AnimatePresence>

  
    
     </section>

     {!isOutside &&  <FooterGen/> }
     
   </>
  );
}

export default SampleReports;
