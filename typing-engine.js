(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.DeskTyping = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function shuffle(values, random = Math.random) {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function drawFromDeck(passages, savedIds, excludeId, random = Math.random) {
    const validIds = new Set(passages.map((passage) => passage.id));
    let deck = Array.isArray(savedIds) ? savedIds.filter((id) => validIds.has(id)) : [];
    if (!deck.length) deck = shuffle([...validIds], random);

    if (deck.length === 1 && deck[0] === excludeId && passages.length > 1) {
      deck = shuffle([...validIds], random);
    }

    if (deck.length > 1 && deck[0] === excludeId) {
      const replacement = deck.findIndex((id) => id !== excludeId);
      [deck[0], deck[replacement]] = [deck[replacement], deck[0]];
    }

    const id = deck.shift();
    return {
      passage: passages.find((passage) => passage.id === id) || passages[0],
      remaining: deck
    };
  }

  function formatTime(milliseconds) {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  class Attempt {
    constructor(now = () => performance.now()) {
      this.now = now;
      this.begin({ id: "", text: "" });
    }

    begin(passage) {
      this.passage = passage;
      this.phase = "active";
      this.returnPhase = "active";
      this.timerStarted = false;
      this.activeStartedAt = null;
      this.elapsedBeforePeriod = 0;
      this.correctEntries = 0;
      this.corrections = 0;
      this.value = "";
    }

    recordInsertion(text, position) {
      if (this.phase !== "active" || !text) return;
      this.startClock();
      [...text].forEach((character, index) => {
        if (character === this.passage.text[position + index]) this.correctEntries += 1;
        else this.corrections += 1;
      });
    }

    updateValue(value) {
      if (this.phase !== "active") return false;
      this.value = value.slice(0, this.passage.text.length);
      if (this.value === this.passage.text) {
        this.stopClock();
        this.phase = "complete";
        return true;
      }
      return false;
    }

    startClock() {
      if (!this.timerStarted) this.timerStarted = true;
      if (this.activeStartedAt === null) this.activeStartedAt = this.now();
    }

    stopClock() {
      if (this.activeStartedAt !== null) {
        this.elapsedBeforePeriod += this.now() - this.activeStartedAt;
        this.activeStartedAt = null;
      }
    }

    pause() {
      if (this.phase !== "active") return;
      this.stopClock();
      this.phase = "paused";
    }

    resume() {
      if (this.phase !== "paused") return;
      this.phase = "active";
      if (this.timerStarted) this.activeStartedAt = this.now();
    }

    requestConfirmation() {
      if (this.phase !== "active" && this.phase !== "paused") return;
      this.returnPhase = this.phase;
      this.stopClock();
      this.phase = "confirming";
    }

    cancelConfirmation() {
      if (this.phase !== "confirming") return;
      this.phase = this.returnPhase;
      if (this.phase === "active" && this.timerStarted) this.activeStartedAt = this.now();
    }

    elapsedMs() {
      if (this.activeStartedAt === null) return this.elapsedBeforePeriod;
      return this.elapsedBeforePeriod + (this.now() - this.activeStartedAt);
    }

    metrics() {
      const relevantEntries = this.correctEntries + this.corrections;
      const accuracy = relevantEntries ? Math.round((this.correctEntries / relevantEntries) * 100) : 100;
      const elapsed = this.elapsedMs();
      const elapsedMinutes = Math.max(elapsed, 1000) / 60000;
      const wpm = Math.round((this.passage.text.length / 5) / elapsedMinutes);
      return { wpm, accuracy, corrections: this.corrections, elapsed };
    }
  }

  return { Attempt, drawFromDeck, formatTime };
});
