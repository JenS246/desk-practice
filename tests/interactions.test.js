const assert = require("node:assert/strict");
const { Attempt, alignText, compareText, drawFromDeck, formatTime, hasReachedEnd } = require("../typing-engine.js");

let now = 0;
const attempt = new Attempt(() => now);
const first = { id: "first", text: "abcde" };
const second = { id: "second", text: "vwxyz" };
const source = "The court entered judgment.";

function enter(character) {
  attempt.recordInsertion(character);
  return attempt.updateValue(attempt.value + character);
}

function typeThrough(text) {
  let completedAt = -1;
  [...text].forEach((character, index) => {
    if (enter(character) && completedAt === -1) completedAt = index;
  });
  return completedAt;
}

function backspace() {
  attempt.updateValue(attempt.value.slice(0, -1));
}

// 1. A perfect passage completes at the final character with perfect results.
attempt.begin(first);
enter("a");
now += 12000;
for (const character of "bcde") enter(character);
assert.equal(attempt.phase, "complete");
assert.deepEqual(attempt.metrics(), { wpm: 5, accuracy: 100, errors: 0, elapsed: 12000 });

// 2. A final substitution completes without requiring correction.
now = 0;
attempt.begin({ id: "substitution", text: source });
assert.equal(typeThrough(source.slice(0, -2) + "x."), source.length - 1);
assert.equal(attempt.metrics().errors, 1);
assert.equal(attempt.metrics().accuracy, 96);

// 3. A missing middle character realigns and completes at the source ending.
attempt.begin({ id: "missing", text: source });
const missingText = source.replace("court", "cort");
assert.equal(typeThrough(missingText), missingText.length - 1);
assert.equal(attempt.metrics().errors, 1);
assert.equal(compareText(source, missingText, true).editDistance, 1);

// 4. An extra middle character is retained, realigned, and scored once.
attempt.begin({ id: "extra", text: source });
const extraText = source.replace("court", "courtt");
assert.equal(typeThrough(extraText), extraText.length - 1);
assert.equal(attempt.value, extraText);
assert.equal(attempt.metrics().errors, 1);
assert.equal(compareText(source, extraText, true).editDistance, 1);

// 5. Several unresolved mistakes complete and are scored from the final text.
attempt.begin({ id: "several", text: source });
const severalMistakes = "The xourt entyred judgmenz.";
typeThrough(severalMistakes);
assert.equal(attempt.phase, "complete");
assert.equal(attempt.metrics().errors, 3);
assert.equal(attempt.metrics().accuracy, 89);

// 6. A corrected mistake is absent from final Errors and Accuracy.
attempt.begin(first);
enter("a");
enter("x");
backspace();
for (const character of "bcde") enter(character);
assert.equal(attempt.phase, "complete");
assert.equal(attempt.metrics().errors, 0);
assert.equal(attempt.metrics().accuracy, 100);

// 7. Paused time remains excluded.
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

// 8. Restart resets the same document and attempt state.
attempt.begin(first);
enter("x");
attempt.begin(first);
assert.equal(attempt.passage.id, first.id);
assert.equal(attempt.value, "");
assert.equal(attempt.elapsedMs(), 0);

// 9. Confirmation, Try again, and Next document keep their existing behavior.
enter("a");
attempt.requestConfirmation();
assert.equal(attempt.phase, "confirming");
const replacement = drawFromDeck([first, second], [first.id, second.id], first.id, () => 0).passage;
attempt.begin(replacement);
assert.equal(attempt.passage.id, second.id);
typeThrough(second.text);
attempt.begin(second);
assert.equal(attempt.phase, "active");
assert.equal(attempt.value, "");
assert.equal(drawFromDeck([first, second], [second.id, first.id], second.id, () => 0).passage.id, first.id);

// 10. Alignment localizes missing, extra, and replaced characters.
const missing = alignText(source, missingText, true).filter((operation) => operation.type !== "equal");
const extra = alignText(source, extraText, true).filter((operation) => operation.type !== "equal");
const replaced = alignText("abcde", "abcdx", true).filter((operation) => operation.type !== "equal");
assert.deepEqual(missing.map((operation) => [operation.type, operation.sourceCharacter]), [["delete", "u"]]);
assert.deepEqual(extra.map((operation) => [operation.type, operation.typedCharacter]), [["insert", "t"]]);
assert.deepEqual(replaced.map((operation) => [operation.type, operation.sourceCharacter, operation.typedCharacter]), [["replace", "e", "x"]]);

// 11. Completion follows aligned progress, not exact equality.
assert.equal(hasReachedEnd(source, source.slice(0, -1)), false);
assert.equal(hasReachedEnd(source, missingText), true);
assert.equal(hasReachedEnd(source, extraText), true);
assert.equal(hasReachedEnd(source, source.slice(0, -1) + "x"), true);
assert.equal(formatTime(94000), "1:34");

console.log("Validated all eleven gameplay interaction sequences.");
