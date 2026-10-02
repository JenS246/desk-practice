const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const engine = fs.readFileSync("typing-engine.js", "utf8");

const requirements = [
  [html.includes('data-start'), "Start control is missing."],
  [html.includes('data-next'), "Next document control is missing."],
  [html.includes('data-retry'), "Try again control is missing."],
  [html.includes('data-pause'), "Pause control is missing."],
  [html.includes('data-restart'), "Restart control is missing."],
  [html.includes('data-new'), "New document control is missing."],
  [html.includes('data-resume'), "Resume control is missing."],
  [html.includes('data-corrections'), "Corrections result is missing."],
  [html.includes('data-result-time'), "Time result is missing."],
  [html.includes('Begin typing below.'), "Typing instruction was not simplified."],
  [html.includes('aria-label="Text to type"'), "Source text label is missing."],
  [html.includes('label for="typing-input"'), "Typing field label is missing."],
  [css.includes("prefers-reduced-motion"), "Reduced motion support is missing."],
  [css.includes(":focus-visible"), "Visible keyboard focus is missing."],
  [app.includes("localStorage"), "Passage deck persistence is missing."],
  [app.includes('inputType.startsWith("delete")'), "Editable mistake handling is missing."],
  [engine.includes('phase = "paused"'), "Pause state is missing."],
  [engine.includes("correctEntries / relevantEntries"), "Behavior-based accuracy is missing."]
];

for (const [passes, message] of requirements) {
  if (!passes) throw new Error(message);
}

if (/[—–]/.test(html + css + app)) throw new Error("Visible interface source contains a forbidden dash character.");
if (/gradient\(/.test(css)) throw new Error("Gradient styling is not permitted in this design.");
if (/live.{0,8}(wpm|accuracy)|data-live/i.test(html + app)) throw new Error("Live performance scoring is not permitted.");

console.log("Validated interface structure and accessibility hooks.");
