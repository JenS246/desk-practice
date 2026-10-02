const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const app = fs.readFileSync("app.js", "utf8");

const requirements = [
  [html.includes('data-start'), "Start control is missing."],
  [html.includes('data-next'), "Next document control is missing."],
  [html.includes('data-retry'), "Try again control is missing."],
  [html.includes('aria-label="Text to type"'), "Source text label is missing."],
  [html.includes('label for="typing-input"'), "Typing field label is missing."],
  [css.includes("prefers-reduced-motion"), "Reduced motion support is missing."],
  [css.includes(":focus-visible"), "Visible keyboard focus is missing."],
  [app.includes("localStorage"), "Passage deck persistence is missing."],
  [app.includes('inputType.startsWith("delete")'), "Editable mistake handling is missing."]
];

for (const [passes, message] of requirements) {
  if (!passes) throw new Error(message);
}

if (/[—–]/.test(html + css)) throw new Error("Visible interface source contains a forbidden dash character.");
if (/gradient\(/.test(css)) throw new Error("Gradient styling is not permitted in this design.");

console.log("Validated interface structure and accessibility hooks.");
