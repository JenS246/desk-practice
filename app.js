(function () {
  "use strict";

  const STORAGE_KEY = "desk-practice-deck-v1";
  const home = document.querySelector('[data-screen="home"]');
  const practice = document.querySelector('[data-screen="practice"]');
  const startButton = document.querySelector("[data-start]");
  const nextButton = document.querySelector("[data-next]");
  const retryButton = document.querySelector("[data-retry]");
  const input = document.querySelector("[data-input]");
  const sourceText = document.querySelector("[data-source-text]");
  const typedPage = document.querySelector("[data-typed-page]");
  const documentType = document.querySelector("[data-document-type]");
  const typingHelp = document.querySelector("[data-typing-help]");
  const sourceLine = document.querySelector("[data-source]");
  const results = document.querySelector("[data-results]");
  const resultSource = document.querySelector("[data-result-source]");
  const typingSheet = document.querySelector("[data-typing-sheet]");
  const paperStack = document.querySelector(".paper-stack");

  let current = null;
  let startedAt = 0;
  let keystrokes = 0;
  let errors = 0;
  let complete = false;

  function shuffle(values) {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function loadDeck() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const valid = Array.isArray(saved) && saved.every((id) => DESK_PASSAGES.some((item) => item.id === id));
      if (valid && saved.length) return saved;
    } catch (error) {
      // A fresh deck is safe when browser storage is unavailable or malformed.
    }
    return shuffle(DESK_PASSAGES.map((item) => item.id));
  }

  function drawPassage() {
    let deck = loadDeck();
    const id = deck.shift();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
    } catch (error) {
      // The game still works when private browsing blocks persistent storage.
    }
    return DESK_PASSAGES.find((item) => item.id === id) || DESK_PASSAGES[0];
  }

  function makeSpan(text, className) {
    const span = document.createElement("span");
    span.textContent = text;
    if (className) span.className = className;
    return span;
  }

  function renderSource(position) {
    sourceText.replaceChildren();
    [...current.text].forEach((character, index) => {
      sourceText.append(makeSpan(character, index === position && !complete ? "current-char" : ""));
    });
  }

  function renderTyped(value) {
    typedPage.replaceChildren();
    [...value].forEach((character, index) => {
      typedPage.append(makeSpan(character, character === current.text[index] ? "correct" : "wrong"));
    });
    if (!complete) typedPage.append(makeSpan("", "caret"));
  }

  function begin(passage) {
    current = passage;
    startedAt = 0;
    keystrokes = 0;
    errors = 0;
    complete = false;
    input.value = "";
    input.disabled = false;
    documentType.textContent = current.type;
    typingHelp.textContent = "Begin typing. Backspace corrects a mistake.";
    sourceLine.hidden = true;
    sourceLine.textContent = "";
    results.hidden = true;
    resultSource.hidden = true;
    resultSource.replaceChildren();
    practice.classList.remove("is-complete");
    paperStack.scrollTop = 0;
    renderSource(0);
    renderTyped("");
    requestAnimationFrame(() => input.focus());
  }

  function showPractice() {
    home.hidden = true;
    practice.hidden = false;
    begin(drawPassage());
  }

  function finish() {
    complete = true;
    input.disabled = true;
    const elapsedMinutes = Math.max((performance.now() - startedAt) / 60000, 1 / 60);
    const wpm = Math.round((current.text.length / 5) / elapsedMinutes);
    const accuracy = keystrokes ? Math.max(0, Math.round(((keystrokes - errors) / keystrokes) * 100)) : 100;

    document.querySelector("[data-wpm]").textContent = String(wpm);
    document.querySelector("[data-accuracy]").textContent = `${accuracy}%`;
    document.querySelector("[data-errors]").textContent = String(errors);
    typingHelp.textContent = "Document complete.";

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

    renderSource(current.text.length);
    renderTyped(current.text);
    results.hidden = false;
    practice.classList.add("is-complete");
    nextButton.focus();
  }

  input.addEventListener("beforeinput", (event) => {
    if (complete || event.inputType.startsWith("delete")) return;
    if (!startedAt) startedAt = performance.now();
    const inserted = event.data || "";
    const position = input.value.length;
    for (let index = 0; index < inserted.length; index += 1) {
      keystrokes += 1;
      if (inserted[index] !== current.text[position + index]) errors += 1;
    }
  });

  input.addEventListener("input", () => {
    if (complete) return;
    if (input.value.length > current.text.length) input.value = input.value.slice(0, current.text.length);
    renderSource(input.value.length);
    renderTyped(input.value);
    if (input.value === current.text) finish();
  });

  input.addEventListener("paste", (event) => event.preventDefault());
  typingSheet.addEventListener("click", () => { if (!complete) input.focus(); });
  startButton.addEventListener("click", showPractice);
  nextButton.addEventListener("click", () => begin(drawPassage()));
  retryButton.addEventListener("click", () => begin(current));
})();
