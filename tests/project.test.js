const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const engine = fs.readFileSync("typing-engine.js", "utf8");

const requirements = [
  [!html.includes("HARTWELL") && !html.includes("TRAINING COPY"), "Decorative branding must not return."],
  [!html.includes('class="pen"') && !html.includes('class="legal-pad"'), "Full-size desk props must not return."],
  [(html.match(/class="desk-fragment [^"]+" aria-hidden="true"/g) || []).length === 5, "Mobile desk fragments must be decorative and hidden from assistive technology."],
  [css.includes('.desk-fragment { display: none; pointer-events: none; }'), "Desk fragments must be hidden by default and not intercept touches."],
  [(html.match(/class="desktop-object [^"]+" aria-hidden="true"/g) || []).length === 4, "Desktop pad and pen must be decorative on both screens."],
  [css.includes('.desktop-object { display: none; pointer-events: none; }'), "Desktop objects must be hidden by default and not intercept controls."],
  [html.includes('data-start'), "Start control is missing."],
  [html.includes('data-next'), "Next document control is missing."],
  [html.includes('data-retry'), "Try again control is missing."],
  [html.includes('data-pause'), "Pause control is missing."],
  [html.includes('data-restart'), "Restart control is missing."],
  [html.includes('data-new'), "New document control is missing."],
  [html.includes('data-resume'), "Resume control is missing."],
  [html.includes('data-errors'), "Errors result is missing."],
  [html.includes('data-result-time'), "Time result is missing."],
  [!html.includes("Correct the highlighted text to finish."), "Correction-gated completion guidance must be removed."],
  [html.includes("<dt>WPM</dt>"), "The concise WPM result label is missing."],
  [!html.includes("Words per minute:"), "The long result label should not appear."],
  [html.includes('Begin typing below.'), "Typing instruction was not simplified."],
  [html.includes('aria-label="Text to type"'), "Source text label is missing."],
  [html.includes('label for="typing-input"'), "Typing field label is missing."],
  [!html.includes("data-typed-page"), "Typed text must not be duplicated into a rendered overlay."],
  [html.includes("interactive-widget=resizes-content"), "Mobile keyboard viewport resizing is not requested."],
  [css.includes("prefers-reduced-motion"), "Reduced motion support is missing."],
  [css.includes(":focus-visible"), "Visible keyboard focus is missing."],
  [css.includes("font-size: clamp(16px"), "The mobile textarea must be at least 16px."],
  [css.includes("background: transparent"), "The visible textarea must retain the paper surface."],
  [css.includes("caret-color: var(--navy)"), "The textarea needs a normal visible caret."],
  [!css.includes("caret-color: transparent"), "The native textarea caret must not be hidden."],
  [!/.typing-field textarea\s*\{[^}]*opacity:\s*0\b/s.test(css), "The native textarea must not be invisible."],
  [css.includes("min-height: 44px"), "Mobile controls need adequate touch targets."],
  [css.includes("max-height: 46dvh"), "Keyboard-height source access is missing."],
  [css.includes(".practice-folder { display: none; }"), "The active mobile folder should be removed."],
  [app.includes("localStorage"), "Passage deck persistence is missing."],
  [app.includes('inputType.startsWith("delete")'), "Editable mistake handling is missing."],
  [app.includes("resizeInput()"), "The visible textarea must grow with its typed content."],
  [!app.includes('document.querySelector("[data-next]").focus()'), "Completion must not focus Next document."],
  [engine.includes('phase = "paused"'), "Pause state is missing."],
  [engine.includes("errors / attemptedLength"), "Alignment accuracy over the attempted source is missing."],
  [!engine.includes("value.slice(0, this.passage.text.length)"), "Typed input must not be truncated to passage length."],
  [engine.includes("function alignText"), "Alignment-aware comparison is missing."],
  [engine.includes("function hasReachedEnd"), "Progress-based completion is missing."]
];

for (const [passes, message] of requirements) {
  if (!passes) throw new Error(message);
}

if (/[—–]/.test(html + css + app)) throw new Error("Visible interface source contains a forbidden dash character.");
if (/gradient\(/.test(css)) throw new Error("Gradient styling is not permitted in this design.");
if (/live.{0,8}(wpm|accuracy)|data-live/i.test(html + app)) throw new Error("Live performance scoring is not permitted.");

console.log("Validated interface structure and accessibility hooks.");
