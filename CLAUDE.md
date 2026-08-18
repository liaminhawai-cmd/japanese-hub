# CLAUDE.md

This is the **deploy target** for the Japanese Hub — a public repo serving
the live site via GitHub Pages. Do not develop here.

- Source of truth: the private development repo (`08598176-design/Grammar-hub`),
  which holds SPEC.md, DESIGN_RULES.md and the collab/ workflow.
- Layout: `/index.html` is the hub landing page; each tool lives in its own
  folder (`/grammar/` today). A new tool = a new folder plus a card on the
  landing page. Never move an existing tool's folder — links go out on
  worksheets.
- A grammar deploy = copy `index.html`, `engine.js`, `tasktypes.js`,
  `data/skills.js` verbatim from the dev repo root into `/grammar/` (after
  its sanity check passes), bump the build tag date, commit, push to `main`.
- Never commit anything here that isn't part of a running app. This repo is
  public: no teaching materials, no scans, no student data, no internal links.
