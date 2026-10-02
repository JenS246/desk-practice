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

  function compareText(source, typed, requireSourceEnd = false) {
    const sourceLength = source.length;
    const typedLength = typed.length;
    const distances = Array.from({ length: sourceLength + 1 }, () => new Uint16Array(typedLength + 1));

    for (let sourceIndex = 0; sourceIndex <= sourceLength; sourceIndex += 1) distances[sourceIndex][0] = sourceIndex;
    for (let typedIndex = 0; typedIndex <= typedLength; typedIndex += 1) distances[0][typedIndex] = typedIndex;

    for (let sourceIndex = 1; sourceIndex <= sourceLength; sourceIndex += 1) {
      for (let typedIndex = 1; typedIndex <= typedLength; typedIndex += 1) {
        const substitution = distances[sourceIndex - 1][typedIndex - 1] + (source[sourceIndex - 1] === typed[typedIndex - 1] ? 0 : 1);
        const insertion = distances[sourceIndex][typedIndex - 1] + 1;
        const deletion = distances[sourceIndex - 1][typedIndex] + 1;
        distances[sourceIndex][typedIndex] = Math.min(substitution, insertion, deletion);
      }
    }

    const operations = [];
    let sourceIndex = sourceLength;
    if (!requireSourceEnd) {
      let bestDistance = distances[0][typedLength];
      sourceIndex = 0;
      for (let candidate = 1; candidate <= sourceLength; candidate += 1) {
        if (distances[candidate][typedLength] <= bestDistance) {
          sourceIndex = candidate;
          bestDistance = distances[candidate][typedLength];
        }
      }
    }
    const alignedSourceEnd = sourceIndex;
    const editDistance = distances[alignedSourceEnd][typedLength];
    let typedIndex = typedLength;

    while (sourceIndex > 0 || typedIndex > 0) {
      const sourceCharacter = source[sourceIndex - 1];
      const typedCharacter = typed[typedIndex - 1];

      if (
        sourceIndex > 0 &&
        typedIndex > 0 &&
        sourceCharacter === typedCharacter &&
        distances[sourceIndex][typedIndex] === distances[sourceIndex - 1][typedIndex - 1]
      ) {
        operations.push({ type: "equal", sourceCharacter, typedCharacter, sourceIndex: sourceIndex - 1, typedIndex: typedIndex - 1 });
        sourceIndex -= 1;
        typedIndex -= 1;
      } else if (
        sourceIndex > 0 &&
        typedIndex > 0 &&
        distances[sourceIndex][typedIndex] === distances[sourceIndex - 1][typedIndex - 1] + 1
      ) {
        operations.push({ type: "replace", sourceCharacter, typedCharacter, sourceIndex: sourceIndex - 1, typedIndex: typedIndex - 1 });
        sourceIndex -= 1;
        typedIndex -= 1;
      } else if (
        typedIndex > 0 &&
        distances[sourceIndex][typedIndex] === distances[sourceIndex][typedIndex - 1] + 1
      ) {
        operations.push({ type: "insert", typedCharacter, sourceIndex, typedIndex: typedIndex - 1 });
        typedIndex -= 1;
      } else {
        operations.push({ type: "delete", sourceCharacter, sourceIndex: sourceIndex - 1, typedIndex });
        sourceIndex -= 1;
      }
    }

    operations.reverse();
    for (let trailingIndex = alignedSourceEnd; trailingIndex < sourceLength; trailingIndex += 1) {
      operations.push({
        type: "delete",
        sourceCharacter: source[trailingIndex],
        sourceIndex: trailingIndex,
        typedIndex: typedLength
      });
    }
    return { alignedSourceEnd, editDistance, operations };
  }

  function alignText(source, typed, requireSourceEnd = false) {
    return compareText(source, typed, requireSourceEnd).operations;
  }

  function hasReachedEnd(source, typed) {
    if (!typed.length) return false;
    const comparison = compareText(source, typed);
    const insertionAllowance = Math.min(5, Math.max(1, Math.ceil(source.length * 0.02)));
    return comparison.alignedSourceEnd === source.length || typed.length >= source.length + insertionAllowance;
  }

  function sourcePositionForTypedPosition(operations, typedPosition) {
    let sourcePosition = 0;
    let currentTypedPosition = 0;

    for (const operation of operations) {
      if (currentTypedPosition >= typedPosition) return sourcePosition;
      if (operation.type !== "insert") sourcePosition += 1;
      if (operation.type !== "delete") currentTypedPosition += 1;
    }

    return sourcePosition;
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
      this.value = "";
    }

    recordInsertion(text) {
      if (this.phase !== "active" || !text) return;
      this.startClock();
    }

    updateValue(value) {
      if (this.phase !== "active") return false;
      this.value = value;
      if (hasReachedEnd(this.passage.text, this.value)) {
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
      const comparison = compareText(this.passage.text, this.value, true);
      const errors = comparison.editDistance;
      const accuracy = this.passage.text.length
        ? Math.max(0, Math.round((1 - errors / this.passage.text.length) * 100))
        : 100;
      const elapsed = this.elapsedMs();
      const elapsedMinutes = Math.max(elapsed, 1000) / 60000;
      const acceptedCharacters = Math.min(this.value.length, this.passage.text.length);
      const wpm = Math.round((acceptedCharacters / 5) / elapsedMinutes);
      return { wpm, accuracy, errors, elapsed };
    }
  }

  return { Attempt, alignText, compareText, drawFromDeck, formatTime, hasReachedEnd, sourcePositionForTypedPosition };
});
