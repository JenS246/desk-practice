const assert = require("node:assert/strict");
const { Attempt, drawFromDeck, formatTime } = require("../typing-engine.js");

let now = 0;
const attempt = new Attempt(() => now);
const first = { id: "first", text: "abcde" };
const second = { id: "second", text: "vwxyz" };

function enter(character) {
  attempt.recordInsertion(character, attempt.value.length);
  return attempt.updateValue(attempt.value + character);
}

function backspace() {
  attempt.updateValue(attempt.value.slice(0, -1));
}

// 1. Correct completion produces all final measures and a different next document.
attempt.begin(first);
enter("a");
now += 12000;
for (const character of "bcde") enter(character);
assert.equal(attempt.phase, "complete");
assert.deepEqual(attempt.metrics(), { wpm: 5, accuracy: 100, corrections: 0, elapsed: 12000 });
assert.equal(drawFromDeck([first, second], [first.id, second.id], first.id, () => 0).passage.id, second.id);
assert.equal(drawFromDeck([first, second], [first.id], first.id, () => 0).passage.id, second.id);

// 2. Incorrect entries remain reflected after Backspace and correction.
now = 0;
attempt.begin(first);
enter("a");
enter("x");
backspace();
for (const character of "bcde") enter(character);
assert.equal(attempt.phase, "complete");
assert.equal(attempt.metrics().corrections, 1);
assert.equal(attempt.metrics().accuracy, 83);

// 3. Paused time is excluded, and Resume continues the same attempt.
now = 0;
attempt.begin(first);
enter("a");
now = 4000;
attempt.pause();
now = 24000;
assert.equal(attempt.elapsedMs(), 4000);
attempt.resume();
now = 30000;
for (const character of "bcde") enter(character);
assert.equal(attempt.metrics().elapsed, 10000);

// 4. Restarting the same document clears text, time, and correction counts.
attempt.begin(first);
enter("x");
attempt.begin(first);
assert.equal(attempt.passage.id, first.id);
assert.equal(attempt.value, "");
assert.equal(attempt.elapsedMs(), 0);
assert.equal(attempt.corrections, 0);

// 5. A partial attempt can be suspended for confirmation, then replaced.
enter("a");
attempt.requestConfirmation();
assert.equal(attempt.phase, "confirming");
const replacement = drawFromDeck([first, second], [first.id, second.id], first.id, () => 0).passage;
attempt.begin(replacement);
assert.equal(attempt.passage.id, second.id);
assert.equal(attempt.value, "");

// 6. Try again keeps the completed passage and resets the attempt.
for (const character of second.text) enter(character);
assert.equal(attempt.phase, "complete");
attempt.begin(second);
assert.equal(attempt.passage.id, second.id);
assert.equal(attempt.phase, "active");
assert.equal(attempt.value, "");

// 7. Next document excludes the document that was just completed.
for (const character of second.text) enter(character);
const next = drawFromDeck([first, second], [second.id, first.id], second.id, () => 0).passage;
assert.equal(next.id, first.id);
assert.equal(formatTime(94000), "1:34");

console.log("Validated all seven requested interaction sequences.");
