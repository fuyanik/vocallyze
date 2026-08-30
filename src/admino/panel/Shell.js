import { C, hexA, useT } from "./tokens";
import { Icon } from "./primitives";
import { NAV, ORG } from "./data";

/** Canvas is authored narrow on purpose: the demo frame is portrait, so a
 *  full-width card must still read when the camera pulls back. */
export const CANVAS_W = 860;
export const RAIL_W = 148;
export const CONTENT_W = CANVAS_W - RAIL_W - 48;

function Rail({ active }) {
  const T = useT();
  return (
    <aside
      className="flex h-full shrink-0 flex-col"
      style={{ width: RAIL_W, background: T.rail, borderRight: `1px solid ${T.border}` }}
    >
      <div className="flex items-center gap-2.5 px-4 py-4" style={{ borderBottom: `1px solid ${T.border}` }}>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `linear-gradient(135deg, ${C.blue} 0%, ${C.navy} 100%)`, boxShadow: `0 3px 10px ${hexA(C.navy, 0.35)}` }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 15v-4M9.5 17v-8M13 18.5v-11M16.5 15.5v-5M20 13.5v-1" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-[11.5px] font-bold leading-tight" style={{ color: T.light ? C.navy : T.text }}>
            {ORG.name}
          </span>
          <span className="block text-[9px] leading-tight" style={{ color: T.faint }}>
            {ORG.sub}
          </span>
        </span>
      </div>

      <nav className="flex-1 overflow-hidden px-2.5 py-3">
        {NAV.map((group) => (
          <div key={group.group} className="mb-2.5">
            <p className="mb-1 px-2 text-[8.5px] font-bold uppercase tracking-[0.14em]" style={{ color: T.faint }}>
              {group.group}
            </p>
            {group.items.map((item) => {
              const on = item.id === active;
              return (
                <div
                  key={item.id}
                  data-click={`nav-${item.id}`}
                  className="mb-[2px] flex items-center gap-2 rounded-[10px] px-2 py-[6px]"
                  style={{
                    background: on ? C.blue : "transparent",
                    color: on ? "#fff" : T.sub,
                    boxShadow: on ? `0 4px 12px ${hexA(C.blue, 0.28)}` : "none",
                  }}
                >
                  <Icon name={item.icon} size={13} strokeWidth={on ? 2 : 1.6} />
                  <span className={`truncate text-[11px] ${on ? "font-semibold" : "font-medium"}`}>{item.label}</span>
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2 px-3 py-3" style={{ borderTop: `1px solid ${T.border}` }}>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          style={{ background: hexA(C.blue, 0.14), color: C.blue }}
        >
          <Icon name="user" size={13} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[9.5px] font-semibold" style={{ color: T.textSoft }}>
            {ORG.user}
          </span>
          <span className="block text-[8.5px]" style={{ color: T.faint }}>
            {ORG.role}
          </span>
        </span>
        <Icon name="logOut" size={12} color={T.faint} />
      </div>
    </aside>
  );
}

/** Panel frame every scene renders inside of. */
export function Shell({ active, children, height }) {
  const T = useT();
  return (
    <div className="flex" style={{ width: CANVAS_W, height, background: T.bg }}>
      <Rail active={active} />
      <div className="min-w-0 flex-1 px-6 py-6">{children}</div>
    </div>
  );
}
