# Japanese Grammar Hub — live site

This repo is the **deploy target only**. The page served from it is the one
canonical version of the Japanese Grammar Hub:

**https://liaminhawai-cmd.github.io/japanese-grammar-hub/**

If a classroom screen shows a different build tag (bottom-left corner of the
app) than the live site, the classroom copy is stale — the live URL wins.

## Rules for this repo

- **Do not develop here.** All development, content editing and discussion
  happens in the private development repo; changes arrive here as whole-file
  copies (see DEPLOYING.md there). Direct edits here will be overwritten by
  the next deploy.
- **This repo is public.** Only the app itself lives here: `index.html`,
  `engine.js`, `tasktypes.js`, `data/skills.js` (and, later, app audio).
  Never add teaching materials, textbook scans, student anything, or
  internal documents.
- No accounts, no analytics, no tracking. The app runs entirely in the
  browser.
