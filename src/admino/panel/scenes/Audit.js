import { motion, AnimatePresence } from "framer-motion";
import { C, hexA, severityColor, useT } from "../tokens";
import { Badge, Btn, Card, CardHeader, Counter, Icon, PageHeader, ProgressBar, Segmented, StatCard } from "../primitives";
import { Donut, DonutLegend, Legend, StackedArea, Waveform } from "../charts";
import { Shell } from "../Shell";
import { makeTimeline } from "../Stage";
import { COMPLIANCE_KEYS, COMPLIANCE_TREND, COMPLIANCE_TREND_30, MASKING, VIOLATIONS, VIOLATION_CATS, WAVE } from "../data";

const CANVAS_H = 1560;
const SCENE_DURATION = 37000;

const timeline = makeTimeline([
  ["open", 0, { focus: "hdr+kpis", focusMobile: "kpis" }],
  ["kpis", 700, { focus: "kpis" }],
  ["kpiDraw", 1000, { kpi: true }],
  ["kpisHold", 1900, { focus: "kpis" }],
  ["trendZoom", 2800, { focus: "trend" }],
  ["trendDraw", 3500, { trend: true }],
  ["rangeClick", 5600, { click: "seg-30 days" }],
  ["range", 6650, { range: "30 days" }],
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

function AuditScene({ tl, beat, elapsedMs = 0 }) {
  const T = useT();
  const kpi = tl.val(beat, "kpi", false);
  const trend = tl.val(beat, "trend", false);
  const cats = tl.val(beat, "cats", false);
  const queue = tl.val(beat, "queue", false);
  const open = tl.val(beat, "open", null);
  const clip = tl.val(beat, "clip", false);
  const clipProgress = tl.smooth(elapsedMs, "clipProgress", 0);
  const mask = tl.val(beat, "mask", false);
  const range = tl.val(beat, "range", "7 days");
  const trendData = range === "30 days" ? COMPLIANCE_TREND_30 : COMPLIANCE_TREND;
  const total = VIOLATION_CATS.reduce((a, s) => a + s.value, 0);

  return (
    <Shell active="compliance" height={CANVAS_H}>
      <div data-shot="hdr">
        <PageHeader
          title="Compliance & Data Privacy"
          subtitle="Every finding carries a quote, a timestamp and the audio it came from"
          actions={
            <>
              <Btn icon="file">Audit log</Btn>
              <Btn primary icon="users">
                Bulk assign
              </Btn>
            </>
          }
        />
      </div>

      <div data-shot="kpis" className="mb-3.5 grid grid-cols-3 gap-2.5">
        <StatCard label="Compliance score" value={<Counter to={94} play={kpi} />} unit="/100" delta={7} icon="shield" tone="green" />
        <StatCard label="Open violations" value={<Counter to={27} play={kpi} />} delta={-34} invertDelta icon="alert" tone="red" />
        <StatCard label="Critical" value={<Counter to={3} play={kpi} />} delta={-40} invertDelta icon="shieldOff" tone="orange" />
        <StatCard label="Avg. closure" value="1.4" unit="days" delta={-22} invertDelta icon="clock" tone="blue" />
        <StatCard label="Masking success" value="99.9%" icon="lock" tone="purple" hint="on-premise" />
        <StatCard label="Calls audited" value={<Counter to={2551} play={kpi} />} delta={12} icon="phone" tone="teal" hint="100% of volume" />
      </div>

      <div className="mb-3.5 flex gap-3.5">
        <Card shot="trend" className="min-w-0 flex-1">
          <CardHeader
            title="Violation trend"
            subtitle="Weekly findings by category"
            right={<Segmented options={["7 days", "30 days"]} value={range} size="sm" />}
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
            <Badge tone="green">71% fewer findings in 8 weeks</Badge>
          </div>
        </Card>

        <Card shot="cats" className="w-[248px] shrink-0">
          <CardHeader title="Category split" subtitle={`${total} findings this month`} />
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
                    findings
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
              Evidence queue
            </h3>
            <p className="mt-0.5 text-[11px]" style={{ color: T.faint }}>
              Ordered by severity · click a finding to open its proof
            </p>
          </div>
          <Badge tone="red">3 critical open</Badge>
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
                      <Badge tone={v.sev === "critical" ? "red" : v.sev === "high" ? "orange" : "gray"}>{v.sev}</Badge>
                      <span className="text-[10px]" style={{ color: T.faint }}>
                        {v.cat} · {v.agent} · {v.time}
                      </span>
                    </span>
                  </span>
                  <Badge tone={v.status === "open" ? "orange" : v.status === "closed" ? "gray" : "blue"}>{v.status}</Badge>
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
                                {v.call} · {v.at} · rule R-03 · weight 25
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
                              {clip ? "Playing" : "Listen"}
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
                              Open case
                            </Btn>
                            <Btn icon="users">Assign to team lead</Btn>
                            <Btn icon="check">Close</Btn>
                            <span className="ml-auto text-[10px]" style={{ color: T.faint }}>
                              Evidence exported with the transcript excerpt and the audio segment
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
          title="Personal data masking"
          subtitle="Fields stripped from every transcript before analysis"
          right={<Badge tone="green">processed fully on-premise</Badge>}
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
            No recording, transcript or identifier left the institution's network. Zero bytes sent to external AI services.
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
