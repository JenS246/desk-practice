const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("passages.js", "utf8") + "\n;globalThis.__passages = DESK_PASSAGES;";
const context = {};
vm.createContext(context);
vm.runInContext(source, context);

const passages = context.__passages;
if (!Array.isArray(passages) || passages.length < 60) throw new Error("Passage bank must contain at least 60 passages.");

const ids = new Set();
for (const passage of passages) {
  const words = passage.text.trim().split(/\s+/).length;
  if (!passage.id || ids.has(passage.id)) throw new Error(`Duplicate or missing id: ${passage.id}`);
  if (!passage.type || passage.type !== passage.type.toUpperCase()) throw new Error(`Invalid type for ${passage.id}`);
  if (words < 60 || words > 180) throw new Error(`${passage.id} has ${words} words; expected 60-180.`);
  if (/[—–]/.test(passage.text)) throw new Error(`${passage.id} contains a forbidden dash character.`);
  ids.add(passage.id);
}

console.log(`Validated ${passages.length} passages.`);
