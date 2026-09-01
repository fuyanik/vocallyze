import { motion, AnimatePresence } from "framer-motion";
import { C, hexA, severityColor, useT } from "../tokens";
import { Badge, Btn, Card, CardHeader, Counter, Icon, PageHeader, ProgressBar, Segmented, StatCard } from "../primitives";
import { Donut, DonutLegend, Legend, StackedArea, Waveform } from "../charts";
import { Shell } from "../Shell";
import { makeTimeline } from "../Stage";
import { usePanelData } from "../useLocalizedPanelData";
import { useLocale } from "../../LocaleProvider";

const CANVAS_H = 1560;
const SCENE_DURATION = 37000;

const timeline = makeTimeline([
  ["open", 0, { focus: "hdr+kpis", focusMobile: "kpis" }],
  ["kpis", 700, { focus: "kpis" }],
  ["kpiDraw", 1000, { kpi: true }],
  ["kpisHold", 1900, { focus: "kpis" }],
  ["trendZoom", 2800, { focus: "trend" }],
  ["trendDraw", 3500, { trend: true }],
  ["rangeClick", 5600, { click: "seg-30d" }],
  ["range", 6650, { range: "30d" }],
  ["dropBadge", 8050, { focus: "trend-badge" }],
  ["catsZoom", 9450, { focus: "cats" }],
  ["catsDraw", 10150, { cats: true, hideCursor: true }],
  ["catsHold", 12350, { focus: "cats" }],
  ["queueZoom", 13750, { focus: "queue" }],
  ["queueDraw", 14350, { queue: true }],
  ["queueHold", 16950, { focus: "queue" }],
  ["rowClick", 18550, { click: "row-VIO-2839" }],
  ["rowOpenMount", 19600, { open: "VIO-2839" }],
  ["rowOpenZoom", 20300, { focus: "queue-open" }],
  ["rowOpenHold", 23400, { focus: "queue-open" }],
  ["clipClick", 24800, { click: "q-clip" }],
  ["clipPlay", 25850, { clip: true, clipProgress: 0 }],
  ["clipEnd", 28450, { clipProgress: 1 }],
  ["maskZoom", 29250, { focus: "masking", hideCursor: true }],
  ["maskDraw", 29950, { mask: true }],
  ["maskHold", 32150, { focus: "masking" }],
  ["wide", 34150, { focus: "kpis", hideCursor: true }],
]);

const COPY = {
  en: {
    header: {
      title: "Compliance & Data Privacy",
      subtitle: "Every finding carries a quote, a timestamp and the audio it came from",
      auditLog: "Audit log",
      bulkAssign: "Bulk assign",
    },
    kpis: {
      complianceScore: "Compliance score",
      openViolations: "Open violations",
      critical: "Critical",
      avgClosure: "Avg. closure",
      days: "days",
      maskingSuccess: "Masking success",
      onPremise: "on-premise",
      callsAudited: "Calls audited",
      fullCoverage: "100% of volume",
    },
    trend: {
      title: "Violation trend",
      subtitle: "Weekly findings by category",
      range7: "7 days",
      range30: "30 days",
      dropBadge: "71% fewer findings in 8 weeks",
    },
    cats: { title: "Category split", subtitle: (n) => `${n} findings this month`, findings: "findings" },
    queue: {
      title: "Evidence queue",
      subtitle: "Ordered by severity · click a finding to open its proof",
      criticalOpen: (n) => `${n} critical open`,
      note: (id, at) => `${id} · ${at} · rule R-03 · weight 25`,
      openCase: "Open case",
      assignLead: "Assign to team lead",
      close: "Close",
      exported: "Evidence exported with the transcript excerpt and the audio segment",
      listen: "Listen",
      playing: "Playing",
    },
    masking: {
      title: "Personal data masking",
      subtitle: "Fields stripped from every transcript before analysis",
      processedOnPremise: "processed fully on-premise",
      note: "No recording, transcript or identifier left the institution's network. Zero bytes sent to external AI services.",
    },
    sevLabel: { critical: "critical", high: "high", medium: "medium" },
    statusLabel: { open: "open", "in review": "in review", closed: "closed" },
  },
  tr: {
    header: {
      title: "Uyumluluk & Veri Gizliliği",
      subtitle: "Her bulgu bir alıntı, bir zaman damgası ve geldiği ses kaydıyla birlikte gelir",
      auditLog: "Denetim kaydı",
      bulkAssign: "Toplu ata",
    },
    kpis: {
      complianceScore: "Uyumluluk puanı",
      openViolations: "Açık ihlaller",
      critical: "Kritik",
      avgClosure: "Ort. kapanış",
      days: "gün",
      maskingSuccess: "Maskeleme başarısı",
      onPremise: "kurum içi",
      callsAudited: "Denetlenen çağrı",
      fullCoverage: "hacmin %100'ü",
    },
    trend: {
      title: "İhlal trendi",
      subtitle: "Kategoriye göre haftalık bulgular",
      range7: "7 gün",
      range30: "30 gün",
      dropBadge: "8 haftada %71 daha az bulgu",
    },
    cats: { title: "Kategori dağılımı", subtitle: (n) => `bu ay ${n} bulgu`, findings: "bulgu" },
    queue: {
      title: "Kanıt kuyruğu",
      subtitle: "Şiddete göre sıralı · kanıtı açmak için bir bulguya tıklayın",
      criticalOpen: (n) => `${n} kritik açık`,
      note: (id, at) => `${id} · ${at} · kural K-03 · ağırlık 25`,
      openCase: "Vakayı aç",
      assignLead: "Takım liderine ata",
      close: "Kapat",
      exported: "Kanıt, transkript alıntısı ve ses segmentiyle birlikte dışa aktarıldı",
      listen: "Dinle",
      playing: "Oynatılıyor",
    },
    masking: {
      title: "Kişisel veri maskeleme",
      subtitle: "Analizden önce her transkriptten çıkarılan alanlar",
      processedOnPremise: "tamamen kurum içinde işlendi",
      note: "Hiçbir kayıt, transkript veya kimlik bilgisi kurumun ağından çıkmadı. Harici yapay zeka servislerine sıfır bayt gönderildi.",
    },
    sevLabel: { critical: "kritik", high: "yüksek", medium: "orta" },
    statusLabel: { open: "açık", "in review": "incelemede", closed: "kapalı" },
  },
};

function AuditScene({ tl, beat, elapsedMs = 0 }) {
  const T = useT();
  const { locale } = useLocale();
  const c = COPY[locale] ?? COPY.en;
  const { COMPLIANCE_KEYS, COMPLIANCE_TREND, COMPLIANCE_TREND_30, MASKING, VIOLATIONS, VIOLATION_CATS, WAVE } = usePanelData();
  const kpi = tl.val(beat, "kpi", false);
  const trend = tl.val(beat, "trend", false);
  const cats = tl.val(beat, "cats", false);
  const queue = tl.val(beat, "queue", false);
  const open = tl.val(beat, "open", null);
  const clip = tl.val(beat, "clip", false);
  const clipProgress = tl.smooth(elapsedMs, "clipProgress", 0);
  const mask = tl.val(beat, "mask", false);
  const range = tl.val(beat, "range", "7d");
  const trendData = range === "30d" ? COMPLIANCE_TREND_30 : COMPLIANCE_TREND;
  const total = VIOLATION_CATS.reduce((a, s) => a + s.value, 0);

  return (
    <Shell active="compliance" height={CANVAS_H}>
      <div data-shot="hdr">
        <PageHeader
          title={c.header.title}
          subtitle={c.header.subtitle}
          actions={
            <>
              <Btn icon="file">{c.header.auditLog}</Btn>
              <Btn primary icon="users">
                {c.header.bulkAssign}
              </Btn>
            </>
          }
        />
      </div>

      <div data-shot="kpis" className="mb-3.5 grid grid-cols-3 gap-2.5">
        <StatCard label={c.kpis.complianceScore} value={<Counter to={94} play={kpi} />} unit="/100" delta={7} icon="shield" tone="green" />
        <StatCard label={c.kpis.openViolations} value={<Counter to={27} play={kpi} />} delta={-34} invertDelta icon="alert" tone="red" />
        <StatCard label={c.kpis.critical} value={<Counter to={3} play={kpi} />} delta={-40} invertDelta icon="shieldOff" tone="orange" />
        <StatCard label={c.kpis.avgClosure} value="1.4" unit={c.kpis.days} delta={-22} invertDelta icon="clock" tone="blue" />
        <StatCard label={c.kpis.maskingSuccess} value="99.9%" icon="lock" tone="purple" hint={c.kpis.onPremise} />
        <StatCard label={c.kpis.callsAudited} value={<Counter to={2551} play={kpi} />} delta={12} icon="phone" tone="teal" hint={c.kpis.fullCoverage} />
      </div>

      <div className="mb-3.5 flex gap-3.5">
        <Card shot="trend" className="min-w-0 flex-1">
          <CardHeader
            title={c.trend.title}
            subtitle={c.trend.subtitle}
            right={
              <Segmented
                options={[
                  { id: "7d", label: c.trend.range7 },
                  { id: "30d", label: c.trend.range30 },
                ]}
                value={range}
                size="sm"
              />
            }
          />
          <StackedArea
            key={range}
            w={356}
            h={210}
            data={trendData}
            keys={COMPLIANCE_KEYS}
            xLabels={trendData.map((d) => d.x)}
            play={trend}
            ticks={4}
          />
          <Legend className="mt-2" items={COMPLIANCE_KEYS.map((k) => ({ label: k.label, color: k.color }))} />
          <div data-shot="trend-badge" className="mt-2.5 flex justify-center">
            <Badge tone="green">{c.trend.dropBadge}</Badge>
          </div>
        </Card>

        <Card shot="cats" className="w-[248px] shrink-0">
          <CardHeader title={c.cats.title} subtitle={c.cats.subtitle(total)} />
          <div className="flex justify-center">
            <Donut
              size={150}
              thickness={20}
              segments={VIOLATION_CATS}
              play={cats}
              center={
                <>
                  <Counter
                    to={total}
                    play={cats}
                    className="text-[22px] font-semibold leading-none tabular-nums"
                    style={{ color: T.text }}
                  />
                  <span className="mt-0.5 text-[9.5px]" style={{ color: T.faint }}>
                    {c.cats.findings}
                  </span>
                </>
              }
            />
          </div>
          <div className="mt-4">
            <DonutLegend segments={VIOLATION_CATS} play={cats} />
          </div>
        </Card>
      </div>

      {/* queue */}
      <Card shot="queue" className="mb-3.5" pad={false}>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h3 className="text-[13px] font-semibold" style={{ color: T.textSoft }}>
              {c.queue.title}
            </h3>
            <p className="mt-0.5 text-[11px]" style={{ color: T.faint }}>
              {c.queue.subtitle}
            </p>
          </div>
          <Badge tone="red">{c.queue.criticalOpen(3)}</Badge>
        </div>
        <div>
          {VIOLATIONS.slice(0, 5).map((v, i) => {
            const isOpen = open === v.id;
            const sev = severityColor(v.sev);
            return (
              <motion.div
                key={v.id}
                data-shot={isOpen ? "queue-open" : undefined}
                initial={{ opacity: 0, y: 12 }}
                animate={queue ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                style={{ borderTop: `1px solid ${T.border}`, background: isOpen ? T.cardAlt : "transparent" }}
              >
                <div data-click={`row-${v.id}`} className="flex items-center gap-3 px-5 py-3">
                  <span className="h-6 w-[3px] shrink-0 rounded-full" style={{ background: sev }} />
                  <span className="w-[62px] shrink-0 font-mono text-[10px]" style={{ color: T.faint }}>
                    {v.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium" style={{ color: T.text }}>
                      {v.rule}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5">
                      <Badge tone={v.sev === "critical" ? "red" : v.sev === "high" ? "orange" : "gray"}>
                        {c.sevLabel[v.sev] ?? v.sev}
                      </Badge>
                      <span className="text-[10px]" style={{ color: T.faint }}>
                        {v.cat} · {v.agent} · {v.time}
                      </span>
                    </span>
                  </span>
                  <Badge tone={v.status === "open" ? "orange" : v.status === "closed" ? "gray" : "blue"}>
                    {c.statusLabel[v.status] ?? v.status}
                  </Badge>
                  <Icon name={isOpen ? "arrowUp" : "arrowDown"} size={14} color={T.faint} />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4">
                        <div
                          className="rounded-xl px-4 py-3.5"
                          style={{ background: T.card, border: `1px solid ${hexA(sev, 0.35)}` }}
                        >
                          <div className="flex gap-2.5">
                            <Icon name="quote" size={14} color={T.faint} />
                            <div className="min-w-0 flex-1">
                              <p className="text-[13px] italic leading-relaxed" style={{ color: T.textSoft }}>
                                “{v.quote}”
                              </p>
                              <p className="mt-1.5 font-mono text-[10px]" style={{ color: T.faint }}>
                                {c.queue.note(v.call, v.at)}
                              </p>
                            </div>
                            <span
                              data-click="q-clip"
                              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg px-2.5 py-1.5 text-[11px] font-semibold"
                              style={{
                                background: clip ? C.blue : hexA(C.blue, T.light ? 0.1 : 0.18),
                                color: clip ? "#fff" : C.blue,
                              }}
                            >
                              <Icon name={clip ? "pause" : "play"} size={11} strokeWidth={2.4} />
                              {clip ? c.queue.playing : c.queue.listen}
                            </span>
                          </div>
                          {clip && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 24 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 flex items-center gap-2 overflow-hidden"
                            >
                              <Waveform bars={WAVE.slice(0, 60)} progress={clipProgress} playing color={sev} height={20} />
                              <span className="font-mono text-[9.5px] tabular-nums" style={{ color: T.faint }}>
                                {v.at}
                              </span>
                            </motion.div>
                          )}
                          <div className="mt-3 flex items-center gap-2 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
                            <Btn primary tone={sev} icon="search">
                              {c.queue.openCase}
                            </Btn>
                            <Btn icon="users">{c.queue.assignLead}</Btn>
                            <Btn icon="check">{c.queue.close}</Btn>
                            <span className="ml-auto text-[10px]" style={{ color: T.faint }}>
                              {c.queue.exported}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* masking */}
      <Card shot="masking">
        <CardHeader
          title={c.masking.title}
          subtitle={c.masking.subtitle}
          right={<Badge tone="green">{c.masking.processedOnPremise}</Badge>}
        />
        <div className="grid grid-cols-5 gap-3">
          {MASKING.map((m, i) => (
            <div key={m.label}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="truncate text-[10.5px]" style={{ color: T.sub }}>
                  {m.label}
                </span>
                <span className="text-[11px] font-semibold tabular-nums" style={{ color: T.text }}>
                  {m.value}%
                </span>
              </div>
              <ProgressBar value={m.value} color={C.green} height={5} play={mask} delay={i * 0.08} />
            </div>
          ))}
        </div>
        <div
          className="mt-3.5 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
          style={{ background: hexA(C.green, T.light ? 0.08 : 0.14) }}
        >
          <Icon name="lock" size={14} color={C.green} />
          <p className="text-[11.5px]" style={{ color: T.light ? "#1B7F3B" : C.green }}>
            {c.masking.note}
          </p>
        </div>
      </Card>
    </Shell>
  );
}

export const auditScene = {
  id: "audit",
  duration: SCENE_DURATION,
  canvasH: CANVAS_H,
  timeline,
  Scene: AuditScene,
};
