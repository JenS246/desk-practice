const assert = require("node:assert/strict");
const { Attempt } = require("../typing-engine.js");
let now = 0;
const attempt = new Attempt(() => now);
const passage = { id: "long", text: "The court entered judgment. The clerk filed the order." };

function start(duration = 30000, value = "The court") {
  now = 0;
  attempt.begin(passage, duration);
  attempt.recordInsertion(value);
  attempt.updateValue(value);
}

// The clock starts with typing, and late callbacks clamp to the exact duration.
attempt.begin(passage, 30000);
now = 60000;
assert.equal(attempt.remainingMs(), 30000);
assert.equal(attempt.checkExpiry(), false);
start();
now = 29999;
assert.equal(attempt.checkExpiry(), false);
now = 30000;
assert.equal(attempt.checkExpiry(), true);
assert.deepEqual(attempt.metrics(), { wpm: 4, accuracy: 100, errors: 0, elapsed: 30000 });
now = 90000;
assert.equal(attempt.updateValue("late input"), false);
assert.equal(attempt.value, "The court");
assert.equal(attempt.elapsedMs(), 30000);

// Missing and extra characters realign; unattempted suffixes never count.
for (const value of ["The cort entered", "The courtt entered", "The xourt entered"]) {
  start(30000, value);
  now = 35000;
  assert.equal(attempt.checkExpiry(), true);
  assert.equal(attempt.metrics().errors, 1);
  assert.ok(attempt.metrics().accuracy >= 90);
  assert.equal(attempt.metrics().elapsed, 30000);
  assert.equal(attempt.metrics().wpm, Math.round(value.length / 5 / 0.5));
}

// Active time excludes pause and document confirmation.
start();
now = 7000;
attempt.pause();
now = 97000;
assert.equal(attempt.remainingMs(), 23000);
assert.equal(attempt.checkExpiry(), false);
attempt.resume();
now = 100000;
attempt.requestConfirmation();
now = 130000;
assert.equal(attempt.remainingMs(), 20000);
attempt.cancelConfirmation();
now = 150000;
assert.equal(attempt.checkExpiry(), true);
assert.equal(attempt.metrics().elapsed, 30000);

// Each supported duration resets cleanly on same or different passages.
for (const duration of [30000, 60000, 120000]) {
  start(duration);
  now = 10000;
  for (const next of [passage, { id: "other", text: "A different document." }, passage]) {
    attempt.begin(next, duration);
    assert.equal(attempt.durationMs, duration);
    assert.equal(attempt.remainingMs(), duration);
    assert.equal(attempt.value, "");
    assert.equal(attempt.timerStarted, false);
    assert.equal(attempt.phase, "active");
  }
}

// Early completion uses the actual active duration and full-document scoring.
start(60000, "The court");
now = 24000;
assert.equal(attempt.updateValue(passage.text), true);
assert.equal(attempt.completionReason, "document");
assert.equal(attempt.metrics().elapsed, 24000);
assert.equal(attempt.metrics().errors, 0);
assert.equal(attempt.metrics().accuracy, 100);

// Input arriving at the deadline cannot alter the final attempt.
start();
now = 30000;
assert.equal(attempt.updateValue("The courtZ"), true);
assert.equal(attempt.value, "The court");
assert.equal(attempt.completionReason, "time");

console.log("Validated timed expiry, partial scoring, pause, resets, and early completion.");
