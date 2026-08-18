# CLAUDE.md

This is the **deploy target** for the Japanese Grammar Hub — a public repo
serving the live site via GitHub Pages. Do not develop here.

- Source of truth: the private development repo (`08598176-design/Grammar-hub`),
  which contains SPEC.md, DESIGN_RULES.md and the collab/ workflow.
- A deploy = copy `index.html`, `engine.js`, `tasktypes.js`, `data/skills.js`
  verbatim from the dev repo (after its sanity check passes), bump the build
  tag date in `index.html` if it wasn't already bumped, commit, push to main.
- Never commit anything here that isn't part of the running app. This repo
  is public: no teaching materials, no scans, no student data, no internal
  links.
