# Japanese Hub — live site

This repo is the **deploy target only**. The pages served from it are the one
canonical version of every Japanese Hub tool:

**https://liaminhawai-cmd.github.io/japanese-hub/**

| Path | Tool |
|---|---|
| `/` | hub landing page (cards) |
| `/grammar/` | Japanese Grammar Hub |

Future tools get their own folder (`/oral/`, `/topics/`, `/writing/`) and a
card on the landing page, so no existing link ever breaks.

If a classroom screen shows a different build tag (bottom-left of the app,
footer of the landing page) than the live site, the classroom copy is stale —
the live URL wins.

## Rules for this repo

- **Do not develop here.** All development, content editing and discussion
  happens in the private development repo; changes arrive here as whole-file
  copies (see `DEPLOYING.md` there). Direct edits here get overwritten by the
  next deploy.
- **This repo is public.** Only the running apps live here. Never add
  teaching materials, textbook scans, student anything, or internal
  documents.
- No accounts, no analytics, no tracking. Everything runs in the browser.
