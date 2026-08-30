import { motion, AnimatePresence } from "framer-motion";
import { C, hexA, useT } from "../tokens";
import { Badge, Btn, Card, CardHeader, Counter, Icon, PageHeader, ProgressBar, ScoreRing, StatCard } from "../primitives";
import { Legend, Radar, StackedArea, Waveform } from "../charts";
import { Shell } from "../Shell";
import { makeTimeline } from "../Stage";
import { AI_DIALOG, AI_HANDOVER, AI_INTENTS, AI_VS_HUMAN, GUARDRAILS, REASSIGNMENT, WAVE } from "../data";

const CANVAS_H = 2250;
const SCENE_DURATION = 42700;

const MOVE_1 = "File status";
const MOVE_2 = "Restructuring request";

const timeline = makeTimeline([
  ["open", 0, { focus: "hdr+kpis", focusMobile: "kpis" }],
  ["kpis", 800, { focus: "kpis" }],
  ["kpiDraw", 1200, { kpi: true }],
  ["intentsZoom", 3000, { focus: "intents" }],
  ["intentsDraw", 3700, { intents: true }],
  ["sw1", 5800, { click: `switch-${MOVE_1}` }],
  ["sw1on", 6850, { moved: 1 }],
  ["sw2", 8450, { click: `switch-${MOVE_2}` }],
  ["sw2on", 9500, { moved: 2 }],
  ["handoverZoom", 11300, { focus: "handover", hideCursor: true }],
  ["handoverDraw", 12000, { handover: true, boost: true, savings: 268 }],
  ["handoverBadge", 14300, { focus: "handover-badge" }],
  ["rubricZoom", 16300, { focus: "rubric" }],
  ["rubricDraw", 17000, { rubric: true }],
  ["rubricNote", 18900, { focus: "rubric-note" }],
  ["guardsZoom", 20900, { focus: "guards" }],
  ["guardsDraw", 21600, { guards: true }],
  ["guardsHold", 24100, { focus: "guards" }],
  ["dialogZoom", 25500, { focus: "dialog" }],
  ["d1", 26200, { dialog: 1 }],
  ["d2", 27500, { dialog: 2 }],
  ["d3", 28800, { dialog: 3 }],
  ["d4", 30100, { dialog: 4 }],
  ["d5", 31400, { dialog: 5 }],
  ["dialogHold", 33200, { focus: "dialog" }],
  ["swapMount", 34800, { swap: true }],
  ["swapZoom", 35500, { focus: "swap" }],
  ["swapNums", 37200, { focus: "swap-nums", swapNums: true }],
  ["swapHold", 39900, { focus: "swap", hideCursor: true }],
]);

const STATE_TONE = { live: "green", pilot: "blue", training: "orange", human: "gray" };

function AutomateScene({ tl, beat }) {
  const T = useT();
  const kpi = tl.val(beat, "kpi", false);
  const intents = tl.val(beat, "intents", false);
  const moved = tl.val(beat, "moved", 0);
  const handover = tl.val(beat, "handover", false);
  const boost = tl.val(beat, "boost", false);
  const savings = tl.val(beat, "savings", 214);
  const rubric = tl.val(beat, "rubric", false);
  const guards = tl.val(beat, "guards", false);
  const dialog = tl.val(beat, "dialog", 0);
  const swap = tl.val(beat, "swap", false);
  const swapNums = tl.val(beat, "swapNums", false);

  const rows = AI_INTENTS.map((it) => {
    if (it.intent === MOVE_1 && moved >= 1) return { ...it, state: "live", auto: 89, justMoved: true };
    if (it.intent === MOVE_2 && moved >= 2) return { ...it, state: "pilot", auto: 71, justMoved: true };
    return it;
  });

  const handoverData = boost ? [...AI_HANDOVER, { x: "Now", ai: 47, human: 53 }] : AI_HANDOVER;
  const aiShare = boost ? 47 : 34;

  return (
    <Shell active="ai" height={CANVAS_H}>
      <div data-shot="hdr">
        <PageHeader
          title="AI Assistant & Hybrid Audit"
          subtitle="The autonomous assistant is scored on exactly the same rubric as human agents"
          actions={
            <>
              <Badge tone="purple">Pilot · limited call slice</Badge>
              <Btn icon="file">Runbook</Btn>
            </>
          }
        />
      </div>

      <div data-shot="kpis" className="mb-3.5 grid grid-cols-3 gap-2.5">
        <StatCard label="AI handled" value={<Counter to={aiShare} play={kpi} suffix="%" />} delta={21} icon="bot" tone="purple" />
        <StatCard label="Assistant score" value={<Counter to={82} play={kpi} />} unit="/100" delta={11} icon="trend" tone="blue" />
        <StatCard label="First-contact resolution" value="88%" delta={9} icon="checkCircle" tone="green" />
        <StatCard label="Escalated to human" value="12%" delta={-18} invertDelta icon="branch" tone="orange" />
        <StatCard label="Avg. handled call" value="1:47" delta={-24} invertDelta icon="clock" tone="teal" />
        <StatCard
          label="Monthly saving"
          value={<Counter to={savings} play={kpi} prefix="₺" suffix="K" />}
          delta={31}
          icon="wallet"
          tone="green"
        />
      </div>

      {/* intents */}
      <Card shot="intents" className="mb-3.5" pad={false}>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h3 className="text-[13px] font-semibold" style={{ color: T.textSoft }}>
              Automation maturity by intent
            </h3>
            <p className="mt-0.5 text-[11px]" style={{ color: T.faint }}>
              Which call types the assistant can already close on its own
            </p>
          </div>
          <Badge tone="purple">{moved > 0 ? `${moved} intent${moved > 1 ? "s" : ""} promoted` : "8 intents tracked"}</Badge>
        </div>
        <div>
          {rows.map((it, i) => (
            <motion.div
              key={it.intent}
              initial={{ opacity: 0, y: 8 }}
              animate={intents ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.32, delay: i * 0.05 }}
              className="flex items-center gap-3 px-5 py-2.5"
              style={{
                borderTop: `1px solid ${T.border}`,
                background: it.justMoved ? hexA(C.purple, T.light ? 0.06 : 0.13) : "transparent",
              }}
            >
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-[12.5px] font-medium" style={{ color: T.text }}>
                    {it.intent}
                  </span>
                  <Badge tone={STATE_TONE[it.state]}>{it.state}</Badge>
                  {it.justMoved && <Badge tone="purple">promoted</Badge>}
                </span>
                <span className="mt-0.5 block text-[10px] tabular-nums" style={{ color: T.faint }}>
                  {it.volume} calls / month
                </span>
              </span>
              <span className="w-[132px] shrink-0">
                <ProgressBar
                  value={it.auto}
                  height={6}
                  play={intents}
                  color={it.auto >= 85 ? C.green : it.auto >= 60 ? C.blue : C.orange}
                />
              </span>
              <span className="w-9 shrink-0 text-right text-[12px] font-semibold tabular-nums" style={{ color: T.text }}>
                {it.auto}%
              </span>
              <span
                data-click={`switch-${it.intent}`}
                className="flex h-[22px] w-[38px] shrink-0 items-center rounded-full px-[3px]"
                style={{
                  background: it.state === "live" ? C.purple : T.chip,
                  justifyContent: it.state === "live" ? "flex-end" : "flex-start",
                }}
              >
                <motion.span layout className="h-4 w-4 rounded-full" style={{ background: "#fff" }} />
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="mb-3.5 flex gap-3.5">
        <Card shot="handover" className="min-w-0 flex-1">
          <CardHeader
            title="Share of calls handled by the assistant"
            subtitle="The audit module keeps scoring both sides every week"
            right={
              <span data-shot="handover-badge">
                <Badge tone="purple">{boost ? "4% → 47% after promotion" : "4% → 34% in 8 weeks"}</Badge>
              </span>
            }
          />
          <StackedArea
            w={356}
            h={208}
            data={handoverData}
            keys={[
              { key: "ai", label: "AI assistant", color: C.purple, opacity: 0.72 },
              { key: "human", label: "Human agent", color: C.blue, opacity: 0.26 },
            ]}
            xLabels={handoverData.map((d) => d.x)}
            play={handover}
            expand
          />
          <Legend
            className="mt-2"
            items={[
              { label: "AI assistant", color: C.purple },
              { label: "Human agent", color: C.blue },
            ]}
          />
        </Card>

        <Card shot="rubric" className="w-[248px] shrink-0">
          <CardHeader title="Same rubric, both sides" subtitle="Human agent vs AI assistant" />
          <div className="flex justify-center">
            <Radar
              size={200}
              axes={AI_VS_HUMAN.axes}
              series={[
                { label: "human", color: C.blue, values: AI_VS_HUMAN.human },
                { label: "ai", color: C.purple, values: AI_VS_HUMAN.ai },
              ]}
              play={rubric}
            />
          </div>
          <Legend
            className="mt-1"
            items={[
              { label: "Human agent", color: C.blue },
              { label: "AI assistant", color: C.purple },
            ]}
          />
          <div data-shot="rubric-note" className="mt-3 grid grid-cols-2 gap-2 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
            <div className="text-center">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                AI stronger
              </p>
              <p className="mt-0.5 text-[11.5px] font-semibold" style={{ color: C.purple }}>
                Procedure · Closing
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                Human stronger
              </p>
              <p className="mt-0.5 text-[11.5px] font-semibold" style={{ color: C.blue }}>
                Empathy · Resolution
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-3.5 flex gap-3.5">
        <Card shot="guards" className="min-w-0 flex-1">
          <CardHeader
            title="Behaviour guardrails"
            subtitle="Rule-level limits triggered this month"
            right={<Icon name="shield" size={15} color={C.green} />}
          />
          <div className="flex flex-col gap-2">
            {GUARDRAILS.map((g, i) => {
              const blocked = g.action === "blocked";
              return (
                <motion.div
                  key={g.rule}
                  initial={{ opacity: 0, x: -8 }}
                  animate={guards ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5"
                  style={{ border: `1px solid ${T.border}`, background: T.cardAlt }}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: hexA(blocked ? C.red : C.blue, T.light ? 0.1 : 0.18),
                      color: blocked ? C.red : C.blue,
                    }}
                  >
                    <Icon name={blocked ? "shieldOff" : "branch"} size={13} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-medium" style={{ color: T.text }}>
                      {g.rule}
                    </span>
                    <span className="text-[10px]" style={{ color: T.faint }}>
                      {blocked ? "blocked by policy" : "escalated to a human"}
                    </span>
                  </span>
                  <span className="text-[12px] font-semibold tabular-nums" style={{ color: T.text }}>
                    {g.count}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div
            className="mt-3 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
            style={{ background: hexA(C.green, T.light ? 0.08 : 0.14) }}
          >
            <Icon name="checkCircle" size={14} color={C.green} />
            <p className="text-[11.5px]" style={{ color: T.light ? "#1B7F3B" : C.green }}>
              No personal data was shared before identity verification in any automated call.
            </p>
          </div>
        </Card>

        <Card shot="dialog" className="w-[248px] shrink-0">
          <CardHeader
            title="Automated call sample"
            subtitle="Assistant · Ada v0.9 · debt inquiry flow"
            right={<ScoreRing value={94} size={40} stroke={4} color={C.purple} play={dialog > 0} showValue />}
          />
          <div className="flex flex-col gap-2">
            {AI_DIALOG.map((m, i) => {
              const on = i < dialog;
              const isAI = m.who === "AI";
              return (
                <motion.div
                  key={i}
                  className={`flex gap-2 ${isAI ? "" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.35 }}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: isAI ? hexA(C.purple, 0.16) : T.chip, color: isAI ? C.purple : T.sub }}
                  >
                    <Icon name={isAI ? "bot" : "user"} size={12} />
                  </span>
                  <span
                    className="max-w-[82%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed"
                    style={{
                      background: isAI ? hexA(C.purple, T.light ? 0.08 : 0.14) : T.cardAlt,
                      color: T.textSoft,
                      borderTopLeftRadius: isAI ? 4 : undefined,
                      borderTopRightRadius: isAI ? undefined : 4,
                    }}
                  >
                    {m.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-2 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
            <Icon name="mic" size={13} color={T.faint} />
            <Waveform bars={WAVE.slice(0, 40)} progress={dialog / 5} playing={dialog > 0 && dialog < 5} color={C.purple} height={20} />
            <span className="font-mono text-[9.5px] tabular-nums" style={{ color: T.faint }}>
              1:12
            </span>
          </div>
        </Card>
      </div>

      {/* the punchline */}
      <div data-shot="swap" style={{ minHeight: 4 }}>
        <AnimatePresence>
          {swap && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <Card glow={C.purple}>
                <CardHeader
                  title="Workload rebalanced"
                  subtitle={`${REASSIGNMENT.agent} keeps the complex enforcement files — the repetitive queue moves to the assistant`}
                  right={<Badge tone="purple">applied to 1 agent</Badge>}
                />
                <div data-shot="swap-nums" className="grid grid-cols-4 gap-2.5">
                  {[
                    {
                      label: "Repetitive calls moved",
                      value: <Counter to={REASSIGNMENT.movedCalls} play={swapNums} />,
                      sub: "debt inquiry · receipts · plans",
                      tone: C.purple,
                    },
                    {
                      label: "Complex files kept",
                      value: <Counter to={REASSIGNMENT.after.complex} play={swapNums} />,
                      sub: "handled by the human agent",
                      tone: C.blue,
                    },
                    {
                      label: "Projected agent score",
                      value: (
                        <span className="flex items-baseline gap-1.5">
                          <span style={{ color: C.red, fontSize: 18 }}>{REASSIGNMENT.before.score}</span>
                          <Icon name="arrowRight" size={13} color={T.faint} />
                          <Counter to={REASSIGNMENT.after.score} play={swapNums} />
                        </span>
                      ),
                      sub: "fewer procedure-driven findings",
                      tone: C.green,
                    },
                    {
                      label: "Monthly saving",
                      value: <Counter to={REASSIGNMENT.savings} play={swapNums} prefix="₺" suffix="K" />,
                      sub: "vs manual handling of the same queue",
                      tone: C.green,
                    },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl px-3.5 py-3"
                      style={{ background: T.cardAlt, border: `1px solid ${T.border}` }}
                    >
                      <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
                        {m.label}
                      </p>
                      <p className="mt-1 text-[20px] font-semibold leading-none tabular-nums" style={{ color: m.tone }}>
                        {m.value}
                      </p>
                      <p className="mt-1 text-[10px]" style={{ color: T.faint }}>
                        {m.sub}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: hexA(C.purple, T.light ? 0.07 : 0.13) }}>
                  <Icon name="brain" size={16} color={C.purple} />
                  <p className="text-[11.5px] leading-relaxed" style={{ color: T.textSoft }}>
                    Every automated call is audited by the same engine, with the same rulebook and the same evidence trail —
                    so automation never becomes a blind spot.
                  </p>
                  <Btn primary tone={C.purple} icon="arrowRight" className="ml-auto shrink-0">
                    Weekly report
                  </Btn>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}

export const automateScene = {
  id: "automate",
  duration: SCENE_DURATION,
  canvasH: CANVAS_H,
  timeline,
  Scene: AutomateScene,
};
