# Desk Practice

Desk Practice is a quiet, document-first typing game for paralegal students in a Legal Internship course. It places a short legal-office document on a modest desk, gives the student a second sheet for typing, and reports words per minute, alignment-based accuracy, final errors, and elapsed time when the document is complete.

## How it works

- Selects randomly from 67 locally stored passages.
- Cycles through the full passage bank before repeating a document when browser storage is available.
- Marks the current source character and shows incorrect typed characters with color plus an underline.
- Allows normal backspacing and correction at any point.
- Provides Pause, Resume, Restart, and New document controls without leaving the desk.
- Excludes paused and confirmation time from elapsed typing time.
- Completes when aligned typing reaches the end of the source, without requiring mistakes to be corrected.
- Calculates five-character words per minute, alignment-based final accuracy, and unresolved insertions, deletions, and substitutions.
- Reflows the active game into a full-width paper stack on phones, with no decorative folder footprint, 16px minimum input text, 44px controls, natural page scrolling, and keyboard-height source access.
- Uses no backend, account, analytics, or third-party runtime dependency.

Passages are fictional classroom materials representing client notes, email drafts, letters, case summaries, procedural summaries, docket entries, research notes, and several common practice areas. The short court-opinion passages are original instructional text, not quotations from actual opinions.

## Run locally

From this directory:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Test

```bash
npm test
```

The test suite confirms the passage bank, interface requirements, and eleven gameplay, scoring, pause, restart, confirmation, retry, and next-document sequences.

## Files

- `index.html`: semantic desk and document structure
- `styles.css`: responsive desk scene, paper surfaces, focus states, and reduced-motion support
- `favicon.svg`: simple paper-file browser icon
- `passages.js`: local passage bank
- `typing-engine.js`: timer, alignment scoring, attempt state, and non-repeating deck logic
- `app.js`: desk rendering, keyboard input, controls, and results
- `tests/content.test.js`: passage validation
- `tests/interactions.test.js`: required interaction-sequence coverage

## Deployment

The site is static. The GitHub Actions workflow publishes the repository root to GitHub Pages whenever `main` is updated.

Public site: `https://jens246.github.io/desk-practice/`

Repository: `https://github.com/JenS246/desk-practice`
