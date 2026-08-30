import { motion, AnimatePresence } from "framer-motion";
import { C, hexA, useT } from "../tokens";
import { Badge, Btn, Card, CardHeader, Counter, Icon, PageHeader, ProgressBar, ScoreRing } from "../primitives";
import { LineChart, Radar, Waveform } from "../charts";
import { Shell } from "../Shell";
import { makeTimeline } from "../Stage";
import { CALL, SCORECARD, SENTIMENT_TL, TRANSCRIPT, VIOLATIONS, WAVE } from "../data";

const timeline = makeTimeline([
  ["open", 0, { focus: "hdr+player", focusMobile: "player" }],
  ["metaZoom", 800, { focus: "meta" }],
  ["metaHold", 1600, {}],
  ["transcriptZoom", 2900, { focus: "transcript" }],
  ["tabClick", 3600, { click: "tab-transcript" }],
  // Give the click + its pulse a beat to register before content starts
  // moving — the previous version started the same instant as the click.
  ["playing", 4700, { playing: true, progress: 0 }],
  ["l1", 4800, { lines: 1 }],
  ["l2", 5350, { lines: 2 }],
  ["l3", 5900, { lines: 3 }],
  ["l4", 6450, { lines: 4 }],
  ["l5", 7000, { lines: 5 }],
  ["l6", 7550, { lines: 6 }],
  ["l7", 8100, { lines: 7 }],
  ["l8", 8650, { lines: 8 }],
  ["l9", 9200, { lines: 9, progress: 1 }],
  ["transcriptHold", 10400, {}],
  ["tabClick2", 11500, { click: "tab-rules" }],
  ["rulesTab", 12500, { tab: "rules" }],
  ["rulesHold", 15700, { focus: "transcript" }],
  ["scoreZoom", 17000, { focus: "scorecard" }],
  ["scoreDraw", 17700, { score: true }],
  ["scoreHold", 20100, { focus: "scorecard" }],
  ["wide", 21500, { focus: "player+transcript", hideCursor: true }],
  ["flagMount", 22700, { flagged: true }],
  ["flagZoom", 23300, { focus: "flagged" }],
  ["flagHold", 26600, { focus: "flagged" }],
  ["clipClick", 27800, { click: "listen-clip" }],
  ["clipPlay", 28850, { clip: true, clipProgress: 0 }],
  ["clipEnd", 31450, { clipProgress: 1 }],
  ["quoteZoom", 31850, { focus: "flag-quote" }],
  ["outro", 34350, { focus: "flagged", hideCursor: true }],
]);

const CANVAS_H = 1215;
const SCENE_DURATION = 36800;

const RULE_MATCHES = [
  { id: "R-01", label: "Recording notice at call start", ok: true, at: "00:02" },
  { id: "R-02", label: "Identity verification before data", ok: true, at: "00:19" },
  { id: "R-04", label: "Customer not interrupted", ok: true, at: "—" },
  { id: "R-07", label: "Clear and actionable resolution", ok: true, at: "00:55" },
  { id: "R-08", label: "Closing confirmation captured", ok: true, at: "01:18" },
  { id: "R-05", label: "No pressure or threatening language", ok: true, at: "—" },
];

function MetaCell({ label, value, wide }) {
  const T = useT();
  return (
    <div
      className={`rounded-xl px-3.5 py-2.5 ${wide ? "col-span-1" : ""}`}
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
        {label}
      </p>
      <p className="mt-1 truncate text-[12.5px] font-semibold" style={{ color: T.text }}>
        {value}
      </p>
    </div>
  );
}

function ListenScene({ tl, beat, elapsedMs = 0 }) {
  const T = useT();
  const playing = tl.val(beat, "playing", false);
  const progress = tl.smooth(elapsedMs, "progress", 0);
  const clipProgress = tl.smooth(elapsedMs, "clipProgress", 0);
  const lines = tl.val(beat, "lines", 0);
  const tab = tl.val(beat, "tab", "transcript");
  const score = tl.val(beat, "score", false);
  const flagged = tl.val(beat, "flagged", false);
  const clip = tl.val(beat, "clip", false);
  const vio = VIOLATIONS[0];

  const elapsed = Math.round(82 * progress);
  const clock = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <Shell active="call" height={CANVAS_H}>
      <div data-shot="hdr">
        <PageHeader
          title="Call Detail"
          subtitle={`${CALL.id} · evaluated on the masked transcript`}
          actions={
            <>
              <Btn icon="file">Save</Btn>
              <Btn icon="download">Export</Btn>
            </>
          }
        />
      </div>

      {/* ── player ── */}
      <Card shot="player" className="mb-3.5">
        <div className="flex items-center gap-2.5">
          <Icon name="skipBack" size={15} color={T.faint} />
          <span
            data-click="play"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ background: C.blue, boxShadow: `0 6px 18px ${hexA(C.blue, 0.35)}` }}
          >
            {playing ? (
              <Icon name="pause" size={16} color="#fff" strokeWidth={2.4} />
            ) : (
              <Icon name="play" size={16} color="#fff" fill="#fff" strokeWidth={0} />
            )}
          </span>
          <Icon name="skipFwd" size={15} color={T.faint} />

          <Waveform bars={WAVE.slice(0, 64)} progress={progress} playing={playing} color={C.blue} height={34} />

          <div className="flex shrink-0 flex-col items-end">
            <span className="whitespace-nowrap text-[10.5px] font-semibold tabular-nums" style={{ color: T.textSoft }}>
              {clock} / {CALL.duration}
            </span>
            <span className="text-[9.5px]" style={{ color: T.faint }}>
              1.0x
            </span>
          </div>

          <div className="h-12 w-px shrink-0" style={{ background: T.border }} />

          <div className="flex shrink-0 items-center gap-2.5">
            <ScoreRing value={CALL.score} size={54} stroke={5} color={C.green} label="score" play={playing} />
            <div>
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-[11.5px] font-semibold" style={{ color: C.green }}>
                <Icon name="checkCircle" size={12} /> No violations
              </span>
              <p className="mt-0.5 whitespace-nowrap text-[10px]" style={{ color: T.faint }}>
                {CALL.rules} rules checked
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ── meta ── */}
      <div data-shot="meta" className="mb-3.5 grid grid-cols-3 gap-2.5">
        <MetaCell label="Agent" value={CALL.agent} />
        <MetaCell label="Team" value={CALL.team} />
        <MetaCell label="Date" value={CALL.date} />
        <MetaCell label="Duration" value={CALL.duration} />
        <MetaCell label="Topic" value={CALL.topic} />
        <MetaCell label="Outcome" value={CALL.outcome} />
      </div>

      {/* ── transcript + scorecard ── */}
      <div className="mb-3.5 flex gap-3.5">
        <Card shot="transcript" className="min-w-0 flex-1" pad={false}>
          <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
            <div className="flex shrink-0 items-center gap-1.5">
              {[
                { id: "transcript", label: "Transcript" },
                { id: "summary", label: "Summary" },
                { id: "rules", label: "Rule matches" },
              ].map((t) => {
                const on = t.id === tab;
                return (
                  <span
                    key={t.id}
                    data-click={`tab-${t.id}`}
                    className="whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold"
                    style={{
                      background: on ? (T.light ? "#EEF2F7" : "rgba(255,255,255,0.08)") : "transparent",
                      color: on ? T.text : T.faint,
                    }}
                  >
                    {t.label}
                  </span>
                );
              })}
            </div>
            <span className="min-w-0 shrink truncate text-[10px]" style={{ color: T.faint }}>
              Speaker separation {CALL.diarization}% confidence
            </span>
          </div>

          <div className="relative overflow-hidden px-5 pb-4" style={{ height: 452 }}>
            <AnimatePresence exitBeforeEnter>
              {tab === "rules" ? (
                <motion.div
                  key="rules"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  {RULE_MATCHES.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.1 }}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-3"
                      style={{ border: `1px solid ${T.border}`, background: T.cardAlt }}
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: hexA(C.green, T.light ? 0.12 : 0.2), color: C.green }}
                      >
                        <Icon name="check" size={12} strokeWidth={2.6} />
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: T.faint }}>
                        {r.id}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[12px] font-medium" style={{ color: T.textSoft }}>
                        {r.label}
                      </span>
                      <span className="font-mono text-[10px] tabular-nums" style={{ color: T.faint }}>
                        {r.at}
                      </span>
                      <Badge tone="green">pass</Badge>
                    </motion.div>
                  ))}
                  <div
                    className="mt-1 flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                    style={{ background: hexA(C.green, T.light ? 0.08 : 0.14) }}
                  >
                    <Icon name="checkCircle" size={13} color={C.green} />
                    <p className="text-[11px]" style={{ color: T.light ? "#1B7F3B" : C.green }}>
                      All {CALL.rules} rules in the active rulebook were evaluated against this transcript.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="lines"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    animate={{ y: -Math.max(0, lines - 5) * 86 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-2.5"
                  >
                    {TRANSCRIPT.map((l, i) => {
                      const on = i < lines;
                      const isAgent = l.who === "Agent";
                      return (
                        <motion.div
                          key={l.t}
                          className="flex gap-2.5"
                          initial={{ opacity: 0, y: 14 }}
                          animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <span className="w-9 shrink-0 pt-1 font-mono text-[9.5px] tabular-nums" style={{ color: T.faint }}>
                            {l.t}
                          </span>
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                            style={{ background: isAgent ? C.blue : T.faint }}
                          >
                            {isAgent ? "EK" : "C"}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-1.5">
                              <span className="text-[11px] font-semibold" style={{ color: isAgent ? C.blue : T.sub }}>
                                {l.who}
                              </span>
                              {l.mood && (
                                <Badge tone={l.mood === "pos" ? "green" : l.mood === "neg" ? "orange" : "gray"}>
                                  {l.mood === "pos" ? "positive" : l.mood === "neg" ? "negative" : "neutral"}
                                </Badge>
                              )}
                            </span>
                            <span className="mt-0.5 block text-[12px] leading-[1.5]" style={{ color: T.textSoft }}>
                              {l.text}
                            </span>
                            {l.flag && (
                              <motion.span
                                className="mt-1.5 inline-flex items-center gap-1 rounded-md px-2 py-[3px] text-[10px] font-semibold"
                                style={{ background: hexA(C.green, T.light ? 0.1 : 0.18), color: C.green }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: 0.35 }}
                              >
                                <Icon name="check" size={10} strokeWidth={3} /> {l.flag.label}
                              </motion.span>
                            )}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-8"
                    style={{ background: `linear-gradient(${T.card}, ${hexA(T.light ? "#ffffff" : "#0F1725", 0)})` }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* scorecard */}
        <Card shot="scorecard" className="w-[248px] shrink-0">
          <CardHeader title="Scorecard" subtitle="Five weighted criteria" />
          <div className="flex justify-center">
            <Radar
              size={200}
              axes={SCORECARD.map((s) => s.k)}
              series={[{ label: "call", color: C.green, values: SCORECARD.map((s) => s.v) }]}
              play={score}
            />
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {SCORECARD.map((s, i) => (
              <div key={s.k}>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-[11px]" style={{ color: T.sub }}>
                    {s.k}
                  </span>
                  <Counter
                    to={s.v}
                    play={score}
                    duration={0.9}
                    className="text-[11px] font-semibold tabular-nums"
                    style={{ color: T.text }}
                  />
                </div>
                <ProgressBar value={s.v} color={s.v >= 95 ? C.green : C.blue} height={5} play={score} delay={i * 0.08} />
              </div>
            ))}
          </div>
          <div className="mt-3.5 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: T.faint }}>
              Sentiment over time
            </p>
            <LineChart
              w={206}
              h={88}
              min={-60}
              max={100}
              ticks={2}
              xLabels={["0:00", "0:40", "1:22"]}
              series={[{ label: "sentiment", color: C.purple, data: SENTIMENT_TL }]}
              area
              play={score}
            />
          </div>
        </Card>
      </div>

      {/* ── flagged call ── */}
      <div data-shot="flagged" style={{ minHeight: 4 }}>
        <AnimatePresence>
          {flagged && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card glow={C.red}>
                <div className="flex items-start gap-3.5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: hexA(C.red, T.light ? 0.1 : 0.2), color: C.red }}
                  >
                    <Icon name="alert" size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px]" style={{ color: T.faint }}>
                        {vio.id}
                      </span>
                      <Badge tone="red" solid>
                        critical
                      </Badge>
                      <Badge tone="red">data privacy</Badge>
                      <Badge tone="orange">{vio.status}</Badge>
                      <span className="text-[10px]" style={{ color: T.faint }}>
                        next call in the same queue
                      </span>
                    </div>
                    <p className="mt-1.5 text-[15px] font-semibold leading-snug" style={{ color: T.text }}>
                      {vio.rule}
                    </p>

                    <div
                      data-shot="flag-quote"
                      className="mt-2.5 rounded-xl px-3.5 py-3"
                      style={{ background: T.cardAlt, border: `1px solid ${T.border}` }}
                    >
                      <div className="flex gap-2.5">
                        <Icon name="quote" size={14} color={T.faint} />
                        <div className="min-w-0">
                          <p className="text-[13px] italic leading-relaxed" style={{ color: T.textSoft }}>
                            “{vio.quote}”
                          </p>
                          <p className="mt-1.5 font-mono text-[10px]" style={{ color: T.faint }}>
                            {vio.call} · {vio.at}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center gap-2.5 pt-2.5" style={{ borderTop: `1px solid ${T.border}` }}>
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[8.5px] font-bold text-white"
                          style={{ background: C.navy }}
                        >
                          KÖ
                        </span>
                        <span className="text-[11px] font-medium" style={{ color: T.sub }}>
                          {vio.agent} · {vio.time}
                        </span>
                        <span
                          data-click="listen-clip"
                          className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold"
                          style={{
                            background: clip ? C.blue : hexA(C.blue, T.light ? 0.1 : 0.18),
                            color: clip ? "#fff" : C.blue,
                          }}
                        >
                          <Icon name={clip ? "pause" : "play"} size={11} strokeWidth={2.4} />
                          {clip ? "Playing evidence clip" : "Listen to clip"}
                        </span>
                      </div>
                      {clip && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 26 }}
                          transition={{ duration: 0.35 }}
                          className="mt-2.5 flex items-center gap-2 overflow-hidden"
                        >
                          <Waveform bars={WAVE.slice(0, 54)} progress={clipProgress} playing color={C.red} height={22} />
                          <span className="font-mono text-[9.5px] tabular-nums" style={{ color: T.faint }}>
                            01:12
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <Btn primary tone={C.red} icon="search">
                      Review
                    </Btn>
                    <Btn icon="check">Assign</Btn>
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

export const listenScene = {
  id: "listen",
  duration: SCENE_DURATION,
  canvasH: CANVAS_H,
  timeline,
  Scene: ListenScene,
};
