import { motion, AnimatePresence } from "framer-motion";
import { C, hexA, useT } from "../tokens";
import { Badge, Btn, Card, CardHeader, Counter, Icon, PageHeader, ProgressBar, StatCard } from "../primitives";
import { Legend, LineChart, Sparkline, Treemap, WordCloud } from "../charts";
import { Shell } from "../Shell";
import { makeTimeline } from "../Stage";
import { usePanelData } from "../useLocalizedPanelData";
import { useLocale } from "../../LocaleProvider";

const CANVAS_H = 1550;
const SCENE_DURATION = 41300;

const timeline = makeTimeline([
  ["open", 0, { focus: "hdr+kpis", focusMobile: "kpis" }],
  ["kpis", 800, { focus: "kpis" }],
  ["kpiDraw", 1200, { kpi: true }],
  ["cloudZoom", 2700, { focus: "cloud" }],
  ["w3", 3400, { words: 3 }],
  ["w7", 4200, { words: 7 }],
  ["w11", 5000, { words: 11 }],
  ["w15", 5800, { words: 15 }],
  ["cloudHold", 7300, { focus: "cloud" }],
  ["spikesZoom", 8700, { focus: "spikes" }],
  ["spikesDraw", 9400, { spikes: true }],
  ["treeZoom", 11800, { focus: "treemap" }],
  ["treeDraw", 12400, { tree: true }],
  ["alertMount", 14200, { alert: true }],
  ["alertZoom", 14900, { focus: "alert-core" }],
  ["alertHold", 17300, { focus: "alert-core" }],
  ["alertClick", 18700, { click: "show-related", focus: "alert" }],
  ["rootMount", 19900, { root: true, hideCursor: true }],
  ["rootZoom", 20600, { focus: "root-head" }],
  ["metrics", 22200, { focus: "root-metrics" }],
  ["metricsHold", 23900, { focus: "root-metrics" }],
  ["evidenceZoom", 25300, { focus: "root-evidence" }],
  ["evidenceDraw", 25900, { evidence: true }],
  ["evidenceHold", 29200, { focus: "root-evidence" }],
  ["impactZoom", 30600, { focus: "impact" }],
  ["impactDraw", 31300, { impact: true }],
  ["dropBadge", 33300, { focus: "impact-badge" }],
  ["assignClick", 34900, { focus: "root-head", click: "assign-owner" }],
  ["assigned", 35950, { assigned: true }],
  ["assignedHold", 36400, { focus: "root-head" }],
  ["wide", 38400, { focus: "cloud", hideCursor: true }],
]);

const COPY = {
  en: {
    header: { title: "Word & Topic Trends", subtitle: "What customers actually talk about — volume and week-over-week movement", export: "Export" },
    kpis: {
      trackedTerms: "Tracked terms",
      spikeAlerts: "Spike alerts",
      spikeHint: "30% threshold",
      newTerms: "New terms",
      newTermsHint: "this week",
      callsCovered: "Calls covered",
    },
    cloud: { title: "Keyword cloud", subtitle: "Type size shows volume, colour shows category" },
    spikes: { title: "Category spike tracking", subtitle: "Weekly mentions — categories crossing the threshold raise an alert", badge: "2 categories above threshold" },
    treemap: { title: "Term volume map", subtitle: "Area equals mention count" },
    alert: { findCause: "Find the cause", category: "Enforcement", callsInLast7Days: (n) => `${n} calls in the last 7 days` },
    root: {
      title: "Root cause analysis",
      subtitle: "Repeating demands clustered into the product and process reasons behind them",
      confidence: (n) => `${n}% confidence`,
      assign: "Assign to owner",
      assigned: (owner) => `Assigned to ${owner}`,
      callsInCluster: "Calls in cluster",
      shareOfVolume: "Share of volume",
      monthlyCost: "Monthly cost",
      verifiedDrop: "Verified drop",
      evidenceHeading: "Evidence from real calls",
      otherClusters: "Other open clusters",
      impactHeading: "Post-fix impact validation",
      fewerCalls: (n) => `${n}% fewer calls`,
      afterFix: "after fix",
      expectedWithoutFix: "expected without fix",
      impactNote: "The fix went live in week 5. The system keeps counting the related call volume, so the action proves its own impact instead of relying on a claim.",
      clusteringConfidence: (n) => `Clustering confidence ${n}%`,
    },
    rootStatusLabel: { new: "new", "in action": "in action" },
  },
  tr: {
    header: { title: "Kelime & Konu Trendleri", subtitle: "Müşteriler gerçekte ne konuşuyor — hacim ve haftalık değişim", export: "Dışa Aktar" },
    kpis: {
      trackedTerms: "İzlenen terim",
      spikeAlerts: "Ani yükseliş uyarısı",
      spikeHint: "%30 eşik",
      newTerms: "Yeni terim",
      newTermsHint: "bu hafta",
      callsCovered: "Kapsanan çağrı",
    },
    cloud: { title: "Anahtar kelime bulutu", subtitle: "Yazı boyutu hacmi, renk kategoriyi gösterir" },
    spikes: { title: "Kategori yükseliş takibi", subtitle: "Haftalık bahsedilmeler — eşiği aşan kategoriler uyarı oluşturur", badge: "2 kategori eşiğin üzerinde" },
    treemap: { title: "Terim hacim haritası", subtitle: "Alan, bahsedilme sayısına eşittir" },
    alert: { findCause: "Nedeni bul", category: "İcra", callsInLast7Days: (n) => `son 7 günde ${n} çağrı` },
    root: {
      title: "Kök neden analizi",
      subtitle: "Tekrarlayan talepler, arkasındaki ürün ve süreç nedenlerine göre kümelendi",
      confidence: (n) => `%${n} güven`,
      assign: "Sorumluya ata",
      assigned: (owner) => `${owner} birimine atandı`,
      callsInCluster: "Kümedeki çağrı",
      shareOfVolume: "Hacim payı",
      monthlyCost: "Aylık maliyet",
      verifiedDrop: "Doğrulanmış düşüş",
      evidenceHeading: "Gerçek çağrılardan kanıtlar",
      otherClusters: "Diğer açık kümeler",
      impactHeading: "Düzeltme sonrası etki doğrulaması",
      fewerCalls: (n) => `%${n} daha az çağrı`,
      afterFix: "düzeltme sonrası",
      expectedWithoutFix: "düzeltme olmasaydı beklenen",
      impactNote: "Düzeltme 5. haftada devreye alındı. Sistem ilgili çağrı hacmini saymaya devam ediyor, böylece etkiyi bir iddiaya dayanmadan kendisi kanıtlıyor.",
      clusteringConfidence: (n) => `Kümeleme güveni %${n}`,
    },
    rootStatusLabel: { new: "yeni", "in action": "işlemde" },
  },
};

function UnderstandScene({ tl, beat }) {
  const T = useT();
  const { locale } = useLocale();
  const c = COPY[locale] ?? COPY.en;
  const { WORD_ROWS, WORD_LEGEND, SPIKE_ALERT, SPIKE_SERIES, SPIKE_X, TREEMAP, ROOT_CAUSE, ROOT_LIST } = usePanelData();
  const kpi = tl.val(beat, "kpi", false);
  const words = tl.val(beat, "words", 0);
  const spikes = tl.val(beat, "spikes", false);
  const tree = tl.val(beat, "tree", false);
  const alert = tl.val(beat, "alert", false);
  const root = tl.val(beat, "root", false);
  const evidence = tl.val(beat, "evidence", false);
  const impact = tl.val(beat, "impact", false);
  const assigned = tl.val(beat, "assigned", false);

  return (
    <Shell active="trends" height={CANVAS_H}>
      <div data-shot="hdr">
        <PageHeader
          title={c.header.title}
          subtitle={c.header.subtitle}
          actions={<Btn icon="download">{c.header.export}</Btn>}
        />
      </div>

      <div data-shot="kpis" className="mb-3.5 grid grid-cols-4 gap-2.5">
        <StatCard label={c.kpis.trackedTerms} value={<Counter to={1284} play={kpi} />} delta={12} icon="hash" tone="blue" />
        <StatCard label={c.kpis.spikeAlerts} value={<Counter to={7} play={kpi} />} delta={40} icon="alert" tone="orange" hint={c.kpis.spikeHint} />
        <StatCard label={c.kpis.newTerms} value={<Counter to={12} play={kpi} />} delta={20} icon="sparkle" tone="green" hint={c.kpis.newTermsHint} />
        <StatCard label={c.kpis.callsCovered} value={<Counter to={2551} play={kpi} />} delta={12} icon="phone" tone="purple" />
      </div>

      {/* word cloud */}
      <Card shot="cloud" className="mb-3.5">
        <CardHeader
          title={c.cloud.title}
          subtitle={c.cloud.subtitle}
          right={<Legend items={WORD_LEGEND} />}
        />
        <WordCloud rows={WORD_ROWS} revealed={words} play={words > 0} />
      </Card>

      <div className="mb-3.5 flex gap-3.5">
        <Card shot="spikes" className="min-w-0 flex-1">
          <CardHeader
            title={c.spikes.title}
            subtitle={c.spikes.subtitle}
            right={<Badge tone="orange">{c.spikes.badge}</Badge>}
          />
          <LineChart w={356} h={208} series={SPIKE_SERIES} xLabels={SPIKE_X} play={spikes} dots ticks={4} />
          <Legend className="mt-2" items={SPIKE_SERIES.map((s) => ({ label: s.label, color: s.color }))} />
        </Card>

        <Card shot="treemap" className="w-[248px] shrink-0">
          <CardHeader title={c.treemap.title} subtitle={c.treemap.subtitle} />
          <Treemap w={206} h={214} items={TREEMAP} play={tree} />
        </Card>
      </div>

      {/* spike alert */}
      <div data-shot="alert" style={{ minHeight: 4 }} className="mb-3.5">
        <AnimatePresence>
          {alert && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card glow={C.orange}>
                <div className="flex items-center gap-3.5">
                  <div data-shot="alert-core" className="flex min-w-0 flex-1 items-center gap-3.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: hexA(C.orange, T.light ? 0.12 : 0.2), color: C.orange }}
                    >
                      <Icon name="alert" size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold" style={{ color: T.text }}>
                          “{SPIKE_ALERT.word}”
                        </span>
                        <Badge tone="orange" solid>
                          +{SPIKE_ALERT.change}%
                        </Badge>
                        <Badge tone="purple">{c.alert.category}</Badge>
                      </div>
                      <p className="mt-1 text-[11.5px]" style={{ color: T.faint }}>
                        {SPIKE_ALERT.note} · {c.alert.callsInLast7Days(SPIKE_ALERT.calls)}
                      </p>
                    </div>
                  </div>
                  <Sparkline data={[12, 15, 19, 24, 30, 36, 41]} w={110} h={34} color={C.orange} play={alert} />
                  <span data-click="show-related">
                    <Btn primary tone={C.orange} icon="arrowRight">
                      {c.alert.findCause}
                    </Btn>
                  </span>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* root cause */}
      <div data-shot="root" style={{ minHeight: 4 }}>
        <AnimatePresence>
          {root && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <Card>
                <CardHeader
                  title={c.root.title}
                  subtitle={c.root.subtitle}
                  right={<Badge tone="blue">{c.root.confidence(ROOT_CAUSE.confidence)}</Badge>}
                />

                <div className="flex items-start gap-3.5">
                  <div data-shot="root-head" className="flex min-w-0 flex-1 items-start gap-3.5">
                    <span className="font-mono text-[11px]" style={{ color: T.faint }}>
                      {ROOT_CAUSE.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15.5px] font-semibold leading-snug" style={{ color: T.text }}>
                        {ROOT_CAUSE.title}
                      </p>
                      <p className="mt-1 text-[11.5px]" style={{ color: T.faint }}>
                        {ROOT_CAUSE.cluster} · owner {ROOT_CAUSE.owner}
                      </p>
                    </div>
                  </div>
                  <span data-click="assign-owner">
                    <Btn primary={!assigned} icon={assigned ? "check" : "send"}>
                      {assigned ? c.root.assigned(ROOT_CAUSE.owner) : c.root.assign}
                    </Btn>
                  </span>
                </div>

                <div data-shot="root-metrics" className="mt-3.5 grid grid-cols-4 gap-2.5">
                  {[
                    { label: c.root.callsInCluster, value: <Counter to={ROOT_CAUSE.calls} play={root} />, tone: C.blue },
                    { label: c.root.shareOfVolume, value: `${ROOT_CAUSE.share}%`, tone: C.purple },
                    { label: c.root.monthlyCost, value: ROOT_CAUSE.cost, tone: C.orange },
                    { label: c.root.verifiedDrop, value: `${ROOT_CAUSE.drop}%`, tone: C.green },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl px-3.5 py-2.5"
                      style={{ background: T.cardAlt, border: `1px solid ${T.border}` }}
                    >
                      <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                        {m.label}
                      </p>
                      <p className="mt-1 text-[19px] font-semibold leading-none tabular-nums" style={{ color: m.tone }}>
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3.5 flex gap-3.5">
                  <div data-shot="root-evidence" className="min-w-0 flex-1">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                      {c.root.evidenceHeading}
                    </p>
                    <div className="flex flex-col gap-2">
                      {ROOT_CAUSE.evidence.map((q, i) => (
                        <motion.div
                          key={q}
                          initial={{ opacity: 0, x: -10 }}
                          animate={evidence ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.4, delay: i * 0.14 }}
                          className="flex items-start gap-2.5 rounded-xl px-3.5 py-2.5"
                          style={{ background: T.cardAlt, border: `1px solid ${T.border}` }}
                        >
                          <Icon name="quote" size={12} color={T.faint} />
                          <p className="text-[12px] italic leading-relaxed" style={{ color: T.textSoft }}>
                            {q}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <p className="mb-2 mt-3.5 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                      {c.root.otherClusters}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {ROOT_LIST.slice(1).map((r) => (
                        <div key={r.id} className="flex items-center gap-2.5">
                          <span className="w-[46px] shrink-0 font-mono text-[10px]" style={{ color: T.faint }}>
                            {r.id}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[11.5px]" style={{ color: T.sub }}>
                            {r.title}
                          </span>
                          <span className="text-[11px] font-semibold tabular-nums" style={{ color: T.text }}>
                            {r.calls}
                          </span>
                          <span className="w-[42px] text-right text-[11px] tabular-nums" style={{ color: C.orange }}>
                            {r.cost}
                          </span>
                          <Badge tone={r.status === "new" ? "blue" : "purple"}>{c.rootStatusLabel[r.status] ?? r.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div data-shot="impact" className="w-[300px] shrink-0">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                        {c.root.impactHeading}
                      </p>
                      <span data-shot="impact-badge">
                        <Badge tone="green">{c.root.fewerCalls(ROOT_CAUSE.drop)}</Badge>
                      </span>
                    </div>
                    <LineChart
                      w={296}
                      h={196}
                      series={[
                        { label: c.root.afterFix, color: C.green, data: ROOT_CAUSE.before },
                        { label: c.root.expectedWithoutFix, color: C.gray, data: ROOT_CAUSE.baseline, width: 1.6 },
                      ]}
                      dashed={[1]}
                      xLabels={ROOT_CAUSE.x}
                      play={impact}
                      area
                      ticks={4}
                    />
                    <p className="mt-2 text-[10.5px] leading-relaxed" style={{ color: T.faint }}>
                      {c.root.impactNote}
                    </p>
                    <div className="mt-2.5">
                      <ProgressBar value={ROOT_CAUSE.confidence} color={C.blue} height={5} play={impact} />
                      <p className="mt-1 text-[10px]" style={{ color: T.faint }}>
                        {c.root.clusteringConfidence(ROOT_CAUSE.confidence)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}

export const understandScene = {
  id: "understand",
  duration: SCENE_DURATION,
  canvasH: CANVAS_H,
  timeline,
  Scene: UnderstandScene,
};
