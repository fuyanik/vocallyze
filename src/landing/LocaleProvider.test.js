import { render, screen, fireEvent } from "@testing-library/react";
import LocaleProvider, { useLocale } from "./LocaleProvider";

const STORAGE_KEY = "vocallyze-locale";

function Probe() {
  const { locale, setLocale, toggleLocale } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button onClick={toggleLocale}>toggle</button>
      <button onClick={() => setLocale("tr")}>set-tr</button>
      <button onClick={() => setLocale("en")}>set-en</button>
    </div>
  );
}

// Two independent consumers, mirroring the two <LangToggle/> instances that
// render simultaneously (desktop navbar + inline hero nav) — both must stay
// perfectly in sync since they share the same context.
function TwoProbes() {
  return (
    <>
      <Probe />
      <Probe />
    </>
  );
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = "";
});

test("defaults to English on first visit, with no stored preference", () => {
  render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>
  );
  expect(screen.getByTestId("locale")).toHaveTextContent("en");
});

test("remembers the visitor's last choice across mounts", () => {
  window.localStorage.setItem(STORAGE_KEY, "tr");
  render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>
  );
  expect(screen.getByTestId("locale")).toHaveTextContent("tr");
  expect(document.documentElement.lang).toBe("tr");
});

test("toggling updates every consumer instantly and persists the choice", () => {
  render(
    <LocaleProvider>
      <TwoProbes />
    </LocaleProvider>
  );

  const [firstLocale, secondLocale] = screen.getAllByTestId("locale");
  expect(firstLocale).toHaveTextContent("en");
  expect(secondLocale).toHaveTextContent("en");

  const [firstToggle] = screen.getAllByText("toggle");
  fireEvent.click(firstToggle);

  // Both mounted consumers re-render with the new language — this is the
  // "instant, no reload" requirement from a single shared context.
  expect(screen.getAllByTestId("locale")[0]).toHaveTextContent("tr");
  expect(screen.getAllByTestId("locale")[1]).toHaveTextContent("tr");
  expect(document.documentElement.lang).toBe("tr");
  expect(window.localStorage.getItem(STORAGE_KEY)).toBe("tr");
});

test("ignores unsupported locale values passed to setLocale", () => {
  render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>
  );
  fireEvent.click(screen.getByText("set-tr"));
  expect(screen.getByTestId("locale")).toHaveTextContent("tr");
});
