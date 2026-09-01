import { motion, AnimatePresence } from "framer-motion";
import { C, hexA, scoreColor, useT } from "../tokens";
import { Avatar, Badge, Btn, Card, CardHeader, Counter, Icon, PageHeader, ProgressBar, ScoreRing, StatCard } from "../primitives";
import { BarChart, Bubbles, Legend, LineChart, Radar, Sparkline } from "../charts";
import { Shell } from "../Shell";
import { makeTimeline } from "../Stage";
import { usePanelData } from "../useLocalizedPanelData";
import { useLocale } from "../../LocaleProvider";

const CANVAS_H = 1975;
const SCENE_DURATION = 36300;

const timeline = makeTimeline([
  ["open", 0, { focus: "hdr+kpis", focusMobile: "kpis" }],
  ["kpis", 800, { focus: "kpis" }],
  ["kpiDraw", 1200, { kpi: true }],
  ["trendZoom", 2800, { focus: "trend" }],
  ["trendDraw", 3500, { trend: true }],
  ["distZoom", 5900, { focus: "dist", hideCursor: true }],
  ["distDraw", 6600, { dist: true }],
  ["podiumZoom", 9000, { focus: "podium" }],
  ["podiumDraw", 9700, { podium: true }],
  ["tableZoom", 11700, { focus: "table" }],
  ["tableDraw", 12300, { table: true }],
  ["tableBottom", 14300, { focus: "table-bottom" }],
  ["rowClick", 15900, { click: "row-AGT-031" }],
  ["detailMount", 16950, { detail: true }],
  ["detailZoom", 17650, { focus: "detail" }],
  ["radarZoom", 19850, { focus: "detail-radar" }],
  ["radarDraw", 20550, { radar: true }],
  ["notesZoom", 22550, { focus: "notes", hideCursor: true }],
  ["notesDraw", 23150, { notes: true }],
  ["notesHold", 25950, { focus: "notes" }],
  ["repZoom", 27350, { focus: "repetitive" }],
  ["repDraw", 27950, { rep: true }],
  ["handoverClick", 30350, { click: "to-automation" }],
  ["handedOver", 31400, { handedOver: true }],
  ["wide", 33500, { focus: "repetitive", hideCursor: true }],
]);

const COPY = {
  en: {
    header: { title: "Agent Scorecards", subtitle: "Every agent measured on the same rubric, across every single call", export: "Export", compareTeams: "Compare teams" },
    kpis: {
      averageScore: "Average score",
      callsAnalysed: "Calls analysed",
      fullCoverage: "100% coverage",
      firstContact: "First-contact resolution",
      openFindings: "Open findings",
    },
    trend: {
      title: "Quality and resolution over time",
      subtitle: "Monthly averages against the violation count",
      badge: "+14 points since February",
      qualityScore: "Quality score",
      resolutionRate: "Resolution rate",
    },
    dist: { title: "Score distribution", subtitle: "Agents per score band", volumeVsQuality: "Volume vs quality", bubbleHint: "Bubble size shows the number of findings" },
    table: {
      title: "All agents",
      subtitle: "Sorted by score · findings column counts evidence-backed violations",
      activeBadge: "8 active",
      headers: ["Agent", "Team", "Calls", "Findings", "Score", "7-week trend"],
    },
    detail: {
      lowestScore: "lowest score",
      criticalFindings: (n) => `${n} critical findings`,
      callsFindings: (calls, vio) => `${calls} calls · ${vio} findings this month`,
      openCoachingPlan: "Open coaching plan",
      radarSubtitle: "Criteria breakdown vs team average",
      teamAverage: "Team average",
      notesTitle: "Coaching notes",
      notesBadge: "generated from evidence",
      calls: "calls",
      crit: "crit",
    },
    repetitive: {
      pct: (n) => `${n}% of this agent's calls are repetitive, script-driven intents`,
      note: "Debt inquiry, receipt verification and payment plan questions — where 11 of the 14 findings happened. Complex enforcement files stay with the human.",
      handOver: "Hand over to the assistant",
      handedOver: "Handed over to the assistant",
    },
  },
  tr: {
    header: { title: "Temsilci Puan Kartları", subtitle: "Her temsilci, her tek çağrıda aynı ölçütlerle değerlendirilir", export: "Dışa Aktar", compareTeams: "Takımları karşılaştır" },
    kpis: {
      averageScore: "Ortalama puan",
      callsAnalysed: "Analiz edilen çağrı",
      fullCoverage: "%100 kapsama",
      firstContact: "İlk temasta çözüm",
      openFindings: "Açık bulgular",
    },
    trend: {
      title: "Zaman içinde kalite ve çözüm oranı",
      subtitle: "İhlal sayısına karşı aylık ortalamalar",
      badge: "Şubat'tan bu yana +14 puan",
      qualityScore: "Kalite puanı",
      resolutionRate: "Çözüm oranı",
    },
    dist: { title: "Puan dağılımı", subtitle: "Puan aralığına göre temsilci sayısı", volumeVsQuality: "Hacim ve kalite", bubbleHint: "Baloncuk boyutu bulgu sayısını gösterir" },
    table: {
      title: "Tüm temsilciler",
      subtitle: "Puana göre sıralı · bulgular sütunu kanıta dayalı ihlalleri sayar",
      activeBadge: "8 aktif",
      headers: ["Temsilci", "Takım", "Çağrı", "Bulgu", "Puan", "7 haftalık trend"],
    },
    detail: {
      lowestScore: "en düşük puan",
      criticalFindings: (n) => `${n} kritik bulgu`,
      callsFindings: (calls, vio) => `${calls} çağrı · bu ay ${vio} bulgu`,
      openCoachingPlan: "Koçluk planını aç",
      radarSubtitle: "Kriter dağılımı — takım ortalamasına göre",
      teamAverage: "Takım ortalaması",
      notesTitle: "Koçluk notları",
      notesBadge: "kanıtlardan oluşturuldu",
      calls: "çağrı",
      crit: "kritik",
    },
    repetitive: {
      pct: (n) => `Bu temsilcinin çağrılarının %${n}'i tekrarlayan, senaryo bazlı isteklerden oluşuyor`,
      note: "Borç sorgusu, makbuz doğrulama ve ödeme planı soruları — 14 bulgunun 11'i burada gerçekleşti. Karmaşık icra dosyaları insanda kalıyor.",
      handOver: "Asistana devret",
      handedOver: "Asistana devredildi",
    },
  },
};

function CoachScene({ tl, beat }) {
  const T = useT();
  const { locale } = useLocale();
  const c = COPY[locale] ?? COPY.en;
  const { AGENTS, MONTHLY, QUALITY_BUBBLES, SCORE_DIST, WEAK_AGENT } = usePanelData();
  const kpi = tl.val(beat, "kpi", false);
  const trend = tl.val(beat, "trend", false);
  const dist = tl.val(beat, "dist", false);
  const podium = tl.val(beat, "podium", false);
  const table = tl.val(beat, "table", false);
  const detail = tl.val(beat, "detail", false);
  const radar = tl.val(beat, "radar", false);
  const notes = tl.val(beat, "notes", false);
  const rep = tl.val(beat, "rep", false);
  const handedOver = tl.val(beat, "handedOver", false);

  const noteTone = { risk: C.red, growth: C.orange, good: C.green };

  return (
    <Shell active="agents" height={CANVAS_H}>
      <div data-shot="hdr">
        <PageHeader
          title={c.header.title}
          subtitle={c.header.subtitle}
          actions={
            <>
              <Btn icon="download">{c.header.export}</Btn>
              <Btn primary icon="users">
                {c.header.compareTeams}
              </Btn>
            </>
          }
        />
      </div>

      <div data-shot="kpis" className="mb-3.5 grid grid-cols-4 gap-2.5">
        <StatCard label={c.kpis.averageScore} value={<Counter to={86} play={kpi} />} unit="/100" delta={3} icon="target" tone="blue" />
        <StatCard label={c.kpis.callsAnalysed} value={<Counter to={2551} play={kpi} />} delta={12} icon="phone" tone="teal" hint={c.kpis.fullCoverage} />
        <StatCard label={c.kpis.firstContact} value="79%" delta={6} icon="checkCircle" tone="green" />
        <StatCard label={c.kpis.openFindings} value={<Counter to={27} play={kpi} />} delta={-34} invertDelta icon="alert" tone="orange" />
      </div>

      <div className="mb-3.5 flex gap-3.5">
        <Card shot="trend" className="min-w-0 flex-1">
          <CardHeader
            title={c.trend.title}
            subtitle={c.trend.subtitle}
            right={<Badge tone="green">{c.trend.badge}</Badge>}
          />
          <LineChart
            w={356}
            h={200}
            min={50}
            max={100}
            ticks={5}
            xLabels={MONTHLY.x}
            series={[
              { label: c.trend.qualityScore, color: C.blue, data: MONTHLY.score },
              { label: c.trend.resolutionRate, color: C.green, data: MONTHLY.resolution },
            ]}
            dots
            play={trend}
          />
          <Legend
            className="mt-2"
            items={[
              { label: c.trend.qualityScore, color: C.blue },
              { label: c.trend.resolutionRate, color: C.green },
            ]}
          />
        </Card>

        <Card shot="dist" className="w-[248px] shrink-0">
          <CardHeader title={c.dist.title} subtitle={c.dist.subtitle} />
          <BarChart w={206} h={140} bars={SCORE_DIST} play={dist} ticks={2} />
          <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
              {c.dist.volumeVsQuality}
            </p>
            <Bubbles
              w={206}
              h={122}
              points={QUALITY_BUBBLES}
              play={dist}
              xTicks={[
                { v: "150", p: 0.05 },
                { v: "250", p: 0.5 },
                { v: "350", p: 0.95 },
              ]}
              yTicks={[
                { v: 70, p: 0 },
                { v: 85, p: 0.55 },
                { v: 98, p: 1 },
              ]}
            />
            <p className="mt-1 text-[10px]" style={{ color: T.faint }}>
              {c.dist.bubbleHint}
            </p>
          </div>
        </Card>
      </div>

      {/* podium */}
      <div data-shot="podium" className="mb-3.5 grid grid-cols-3 gap-2.5">
        {AGENTS.slice(0, 3).map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 16 }}
            animate={podium ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar name={a.name} size={32} color={C.navy} ring={i === 0 ? C.green : undefined} />
                  {i === 0 && (
                    <span
                      className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                      style={{ background: C.green }}
                    >
                      1
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold" style={{ color: T.text }}>
                    #{i + 1} {a.name}
                  </p>
                  <p className="text-[10.5px]" style={{ color: T.faint }}>
                    {a.team} · {a.calls} {c.detail.calls}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Counter
                    to={a.score}
                    play={podium}
                    className="text-[22px] font-semibold leading-none tabular-nums"
                    style={{ color: scoreColor(a.score) }}
                  />
                  <Sparkline data={a.trend} w={40} h={22} color={scoreColor(a.score)} play={podium} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* table */}
      <Card shot="table" className="mb-3.5" pad={false}>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h3 className="text-[13px] font-semibold" style={{ color: T.textSoft }}>
              {c.table.title}
            </h3>
            <p className="mt-0.5 text-[11px]" style={{ color: T.faint }}>
              {c.table.subtitle}
            </p>
          </div>
          <Badge tone="gray">{c.table.activeBadge}</Badge>
        </div>
        <div className="grid grid-cols-[1.7fr_1fr_60px_70px_64px_86px] items-center gap-2 px-5 pb-2">
          {c.table.headers.map((h) => (
            <span key={h} className="text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
              {h}
            </span>
          ))}
        </div>
        <div>
          {AGENTS.map((a, i) => {
            const isWeak = a.id === "AGT-031";
            const highlight = isWeak && detail;
            return (
              <motion.div
                key={a.id}
                data-shot={i === AGENTS.length - 1 ? "table-bottom" : undefined}
                data-click={`row-${a.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={table ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="grid grid-cols-[1.7fr_1fr_60px_70px_64px_86px] items-center gap-2 px-5 py-2.5"
                style={{
                  borderTop: `1px solid ${T.border}`,
                  background: highlight ? hexA(C.red, T.light ? 0.05 : 0.12) : "transparent",
                }}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <Avatar name={a.name} size={26} color={isWeak ? C.red : C.navy} />
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-medium" style={{ color: T.text }}>
                      {a.name}
                    </span>
                    <span className="block font-mono text-[9px]" style={{ color: T.faint }}>
                      {a.id}
                    </span>
                  </span>
                </span>
                <span className="truncate text-[11px]" style={{ color: T.sub }}>
                  {a.team}
                </span>
                <span className="text-[11.5px] tabular-nums" style={{ color: T.sub }}>
                  {a.calls}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[11.5px] font-semibold tabular-nums" style={{ color: a.vio > 8 ? C.red : T.sub }}>
                    {a.vio}
                  </span>
                  {a.crit > 0 && <Badge tone="red">{a.crit} {c.detail.crit}</Badge>}
                </span>
                <span
                  className="inline-flex w-fit items-center rounded-lg px-2 py-[3px] text-[11.5px] font-bold tabular-nums"
                  style={{ background: hexA(scoreColor(a.score), T.light ? 0.1 : 0.18), color: scoreColor(a.score) }}
                >
                  {a.score}
                </span>
                <Sparkline data={a.trend} w={58} h={20} color={scoreColor(a.score)} play={table} />
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* agent detail */}
      <div data-shot="detail" style={{ minHeight: 4 }}>
        <AnimatePresence>
          {detail && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <Card glow={C.red}>
                <div className="flex items-center gap-3.5">
                  <Avatar name={WEAK_AGENT.name} size={44} color={C.red} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[16px] font-semibold" style={{ color: T.text }}>
                        {WEAK_AGENT.name}
                      </p>
                      <Badge tone="red" solid>
                        {c.detail.lowestScore}
                      </Badge>
                      <Badge tone="red">{c.detail.criticalFindings(WEAK_AGENT.crit)}</Badge>
                    </div>
                    <p className="mt-0.5 text-[11.5px]" style={{ color: T.faint }}>
                      {WEAK_AGENT.team} · {WEAK_AGENT.id} · {c.detail.callsFindings(WEAK_AGENT.calls, WEAK_AGENT.vio)}
                    </p>
                  </div>
                  <ScoreRing value={WEAK_AGENT.score} size={58} stroke={6} color={C.red} label="score" play={detail} />
                  <Btn icon="send">{c.detail.openCoachingPlan}</Btn>
                </div>

                <div className="mt-4 flex gap-3.5">
                  <div data-shot="detail-radar" className="w-[236px] shrink-0">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                      {c.detail.radarSubtitle}
                    </p>
                    <div className="flex justify-center">
                      <Radar
                        size={200}
                        axes={WEAK_AGENT.breakdown.map((b) => b.k)}
                        series={[
                          { label: "team", color: C.blue, values: [89, 90, 88, 86, 88] },
                          { label: "agent", color: C.red, values: WEAK_AGENT.breakdown.map((b) => b.v) },
                        ]}
                        play={radar}
                      />
                    </div>
                    <Legend
                      className="mt-1"
                      items={[
                        { label: c.detail.teamAverage, color: C.blue },
                        { label: WEAK_AGENT.name, color: C.red },
                      ]}
                    />
                  </div>

                  <div data-shot="notes" className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                        {c.detail.notesTitle}
                      </p>
                      <Badge tone="blue">{c.detail.notesBadge}</Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      {WEAK_AGENT.coaching.map((n, i) => (
                        <motion.div
                          key={n.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={notes ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.4, delay: i * 0.12 }}
                          className="rounded-xl px-3.5 py-2.5"
                          style={{
                            background: T.cardAlt,
                            borderLeft: `3px solid ${noteTone[n.kind]}`,
                            border: `1px solid ${T.border}`,
                            borderLeftWidth: 3,
                            borderLeftColor: noteTone[n.kind],
                          }}
                        >
                          <p className="text-[12px] font-semibold" style={{ color: T.text }}>
                            {n.title}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: T.sub }}>
                            {n.body}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* repetitive share → sets up automation */}
                <div
                  data-shot="repetitive"
                  className="mt-3.5 flex items-center gap-4 rounded-xl px-4 py-3.5"
                  style={{ background: hexA(C.purple, T.light ? 0.07 : 0.14), border: `1px solid ${hexA(C.purple, 0.28)}` }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: hexA(C.purple, 0.18), color: C.purple }}
                  >
                    <Icon name="bot" size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold" style={{ color: T.text }}>
                      {c.repetitive.pct(WEAK_AGENT.repetitive)}
                    </p>
                    <div className="mt-2 max-w-[300px]">
                      <ProgressBar value={WEAK_AGENT.repetitive} color={C.purple} height={6} play={rep} />
                    </div>
                    <p className="mt-1.5 text-[11px]" style={{ color: T.sub }}>
                      {c.repetitive.note}
                    </p>
                  </div>
                  <span data-click="to-automation">
                    <Btn primary={!handedOver} tone={C.purple} icon={handedOver ? "check" : "arrowRight"}>
                      {handedOver ? c.repetitive.handedOver : c.repetitive.handOver}
                    </Btn>
                  </span>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}

export const coachScene = {
  id: "coach",
  duration: SCENE_DURATION,
  canvasH: CANVAS_H,
  timeline,
  Scene: CoachScene,
};
