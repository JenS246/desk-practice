# Desk Practice

Desk Practice is a quiet, document-first typing game for paralegal students in a Legal Internship course. It places a short legal-office document on a modest desk, gives the student a second sheet for typing, and reports words per minute, accuracy, and errors when the document is complete.

## How it works

- Selects randomly from 60 locally stored passages.
- Cycles through the full passage bank before repeating a document when browser storage is available.
- Marks the current source character and shows incorrect typed characters with color plus an underline.
- Allows normal backspacing and correction at any point.
- Calculates standard five-character words per minute, keystroke accuracy, and errors.
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

The content test confirms the passage count, unique identifiers, 60-180 word range, headings, and punctuation requirements.

## Files

- `index.html`: semantic desk and document structure
- `styles.css`: responsive desk scene, paper surfaces, focus states, and reduced-motion support
- `passages.js`: local passage bank
- `app.js`: deck randomization, typing behavior, and results
- `tests/content.test.js`: passage validation

## Deployment

The site is static. The GitHub Actions workflow publishes the repository root to GitHub Pages whenever `main` is updated.

Public site: `https://jens246.github.io/desk-practice/`

Repository: `https://github.com/JenS246/desk-practice`
