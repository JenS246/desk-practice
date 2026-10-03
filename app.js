(function () {
  "use strict";

  const STORAGE_KEY = "desk-practice-deck-v1";
  const { Attempt, alignText, drawFromDeck, formatTime, sourcePositionForTypedPosition } = DeskTyping;
  const attempt = new Attempt();

  const home = document.querySelector('[data-screen="home"]');
  const practice = document.querySelector('[data-screen="practice"]');
  const input = document.querySelector("[data-input]");
  const sourceText = document.querySelector("[data-source-text]");
  const documentType = document.querySelector("[data-document-type]");
  const sourceLine = document.querySelector("[data-source]");
  const results = document.querySelector("[data-results]");
  const resultSource = document.querySelector("[data-result-source]");
  const typingSheet = document.querySelector("[data-typing-sheet]");
  const paperStack = document.querySelector(".paper-stack");
  const attemptControls = document.querySelector("[data-attempt-controls]");
  const pauseNotice = document.querySelector("[data-pause-notice]");
  const confirmNotice = document.querySelector("[data-confirm]");
  const pauseButton = document.querySelector("[data-pause]");
  const status = document.querySelector("[data-status]");
  const timeDisplay = document.querySelector("[data-time]");
  let current = null;
  let selectedDuration = 0;
  let deadline = null;
  let ticker = null;
  let confirmationAction = "new";

  function returnHome() {
    attempt.stopClock();
    clearTimeout(deadline);
    clearInterval(ticker);
    deadline = null;
    ticker = null;
    attempt.begin({ id: "", text: "" }, selectedDuration);
    attempt.phase = "idle";
    current = null;
    input.value = "";
    input.disabled = true;
    sourceText.replaceChildren();
    results.hidden = true;
    resultSource.replaceChildren();
    resultSource.hidden = true;
    confirmNotice.hidden = true;
    pauseNotice.hidden = true;
    practice.classList.remove("is-complete");
    practice.hidden = true;
    home.hidden = false;
    document.querySelector(`input[name="practice-duration"][value="${selectedDuration}"]`).checked = true;
    paperStack.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.querySelector("[data-start]").focus({ preventScroll: true });
  }

  function requestConfirmation(action) {
    confirmationAction = action;
    document.querySelector("[data-confirm-message]").textContent = action === "home"
      ? "Return home? Your current attempt will be cleared."
      : "Start a different document? Your current attempt will be cleared.";
    document.querySelector("[data-confirm-new]").textContent = action === "home" ? "Home" : "New document";
    attempt.requestConfirmation();
    status.textContent = action === "home" ? "Confirm returning home." : "Confirm a different document.";
    syncPhase();
    document.querySelector("[data-cancel-new]").focus();
  }

  function scheduleDeadline() {
    clearTimeout(deadline);
    deadline = null;
    if (attempt.durationMs && attempt.phase === "active" && attempt.timerStarted) {
      deadline = setTimeout(() => {
        if (attempt.checkExpiry()) finish();
        else scheduleDeadline();
      }, attempt.remainingMs());
    }
  }

  function readSavedDeck() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return [];
    }
  }

  function drawPassage(excludeId = "") {
    const draw = drawFromDeck(DESK_PASSAGES, readSavedDeck(), excludeId);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draw.remaining));
    } catch (error) {
      // The game still works when private browsing blocks persistent storage.
    }
    return draw.passage;
  }

  function makeSpan(text, className) {
    const span = document.createElement("span");
    span.textContent = text;
    if (className) span.className = className;
    return span;
  }

  function renderSourceProgress(value) {
    if (!current) return;
    const operations = alignText(current.text, value, attempt.phase === "complete");
    const cursorPosition = input.selectionStart ?? value.length;
    const currentSourcePosition = sourcePositionForTypedPosition(operations, cursorPosition);

    sourceText.replaceChildren();
    [...current.text].forEach((character, index) => {
      const className = index === currentSourcePosition && attempt.phase !== "complete" ? "current-char" : "";
      sourceText.append(makeSpan(character, className));
    });
  }

  function resizeInput() {
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
  }

  function updateTime() {
    const milliseconds = attempt.durationMs ? Math.ceil(attempt.remainingMs() / 1000) * 1000 : attempt.elapsedMs();
    document.querySelector("[data-time-label]").textContent = attempt.durationMs ? "Time left" : "Time";
    timeDisplay.textContent = formatTime(milliseconds);
    timeDisplay.dateTime = `PT${Math.floor(milliseconds / 1000)}S`;
  }

  function focusInput() {
    requestAnimationFrame(() => {
      if (!practice.hidden && attempt.phase === "active") input.focus();
    });
  }

  function syncPhase() {
    scheduleDeadline();
    const isActive = attempt.phase === "active";
    const isPaused = attempt.phase === "paused";
    const isConfirming = attempt.phase === "confirming";
    const isComplete = attempt.phase === "complete";

    input.disabled = !isActive;
    pauseNotice.hidden = !isPaused;
    confirmNotice.hidden = !isConfirming;
    attemptControls.hidden = isComplete || isConfirming;
    pauseButton.hidden = isPaused;
    typingSheet.classList.toggle("is-paused", isPaused || isConfirming);
    updateTime();
  }

  function begin(passage) {
    current = passage;
    attempt.begin(passage, selectedDuration);
    clearInterval(ticker);
    ticker = setInterval(() => {
      if (attempt.checkExpiry()) { finish(); return; }
      if (attempt.phase === "active" && attempt.timerStarted) updateTime();
    }, 250);
    input.value = "";
    documentType.textContent = current.type;
    sourceLine.hidden = true;
    sourceLine.textContent = "";
    results.hidden = true;
    resultSource.hidden = true;
    resultSource.replaceChildren();
    practice.classList.remove("is-complete");
    paperStack.scrollTop = 0;
    status.textContent = "Document ready.";
    for (const selector of ["[data-wpm]", "[data-errors]"]) document.querySelector(selector).textContent = "0";
    document.querySelector("[data-accuracy]").textContent = "0%";
    document.querySelector("[data-result-time]").textContent = "0:00";
    renderSourceProgress("");
    resizeInput();
    syncPhase();
    focusInput();
  }

  function finish() {
    clearTimeout(deadline);
    clearInterval(ticker);
    ticker = null;
    document.querySelector("#results-title").textContent = attempt.durationMs ? "Practice complete" : "Completed";
    const metrics = attempt.metrics();
    document.querySelector("[data-wpm]").textContent = String(metrics.wpm);
    document.querySelector("[data-accuracy]").textContent = `${metrics.accuracy}%`;
    document.querySelector("[data-errors]").textContent = String(metrics.errors);
    document.querySelector("[data-result-time]").textContent = formatTime(metrics.elapsed);
    status.textContent = "Document complete.";

    if (current.source) {
      resultSource.append("Source: ");
      if (current.url) {
        const link = document.createElement("a");
        link.href = current.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = current.source;
        resultSource.append(link);
      } else {
        resultSource.append(current.source);
      }
      resultSource.hidden = false;
    }

    renderSourceProgress(attempt.value);
    results.hidden = false;
    practice.classList.add("is-complete");
    input.blur();
    syncPhase();
    if (window.matchMedia("(max-width: 780px)").matches) {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      requestAnimationFrame(() => {
        if (!results.hidden) results.scrollIntoView({ behavior, block: "nearest" });
      });
    }
  }

  input.addEventListener("beforeinput", (event) => {
    if (attempt.checkExpiry()) {
      event.preventDefault();
      finish();
      return;
    }
    if (attempt.phase !== "active") {
      event.preventDefault();
      return;
    }
    if (event.inputType.startsWith("delete")) return;
    const inserted = event.data ?? (event.inputType === "insertLineBreak" ? "\n" : "");
    if (inserted) attempt.recordInsertion(inserted);
    scheduleDeadline();
  });

  input.addEventListener("input", () => {
    if (attempt.phase !== "active") return;
    const finished = attempt.updateValue(input.value);
    if (finished) input.value = attempt.value;
    resizeInput();
    renderSourceProgress(attempt.value);
    if (finished) finish();
  });

  input.addEventListener("paste", (event) => event.preventDefault());
  input.addEventListener("click", () => renderSourceProgress(input.value));
  input.addEventListener("keyup", () => renderSourceProgress(input.value));
  input.addEventListener("select", () => renderSourceProgress(input.value));

  document.querySelector("[data-start]").addEventListener("click", () => {
    selectedDuration = Number(document.querySelector('input[name="practice-duration"]:checked').value);
    home.hidden = true;
    practice.hidden = false;
    begin(drawPassage());
  });

  pauseButton.addEventListener("click", () => {
    if (attempt.checkExpiry()) { finish(); return; }
    attempt.pause();
    status.textContent = "Paused.";
    syncPhase();
    document.querySelector("[data-resume]").focus();
  });

  document.querySelector("[data-resume]").addEventListener("click", () => {
    attempt.resume();
    status.textContent = "Typing resumed.";
    syncPhase();
    focusInput();
  });

  document.querySelector("[data-restart]").addEventListener("click", () => begin(current));

  document.querySelector("[data-new]").addEventListener("click", () => {
    if (attempt.checkExpiry()) { finish(); return; }
    if (!attempt.value.length) {
      begin(drawPassage(current.id));
      return;
    }
    requestConfirmation("new");
  });

  document.querySelector("[data-cancel-new]").addEventListener("click", () => {
    attempt.cancelConfirmation();
    status.textContent = attempt.phase === "paused" ? "Paused." : "Typing resumed.";
    syncPhase();
    if (attempt.phase === "active") focusInput();
    else document.querySelector("[data-resume]").focus();
  });

  document.querySelector("[data-confirm-new]").addEventListener("click", () => {
    if (confirmationAction === "home") returnHome();
    else begin(drawPassage(current.id));
  });
  document.querySelector("[data-next]").addEventListener("click", () => begin(drawPassage(current.id)));
  document.querySelector("[data-retry]").addEventListener("click", () => begin(current));

  document.querySelectorAll("[data-home]").forEach((button) => button.addEventListener("click", () => {
    if (attempt.checkExpiry()) finish();
    if (attempt.phase === "complete" || (!attempt.timerStarted && !attempt.value.length)) returnHome();
    else requestConfirmation("home");
  }));
})();
