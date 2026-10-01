/* ============================================================================
   readings.js — the words the device voice says wrongly, and nothing else.
   ----------------------------------------------------------------------------
   A Japanese voice on a phone reads kanji using its own dictionary, and it is
   right nearly all of the time. Where it is wrong it is badly wrong, because a
   kanji compound has more than one reading and it picks the other one: 何年
   came out as なんとし rather than なんねん.

   The fix is NOT to hand the voice kana for everything. A Japanese voice is
   built to read kanji, and that is where it gets its pitch accent and its
   phrasing from; feed it kana only and the readings come out right but the
   intonation goes flat. So the app speaks the ordinary written form and swaps
   in a reading only for the handful of words below.

   To add one: hear a word read wrongly, add a line here, nothing else. `ja` is
   the word exactly as it appears in the data WITHOUT its furigana brackets and
   WITHOUT the spaces, because the spoken form has both of those removed before
   this list is applied. Longest entries are applied first, so 何年生 can differ
   from 何年.

   `why` is for the next person reading this file, and is never spoken.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.ORAL_READINGS = {
  "schema_version": 1,
  "overrides": [
    {
      "ja": "何年生",
      "say": "なんねんせい",
      "why": "Kept beside 何年 so the longer word is matched first."
    },
    {
      "ja": "何年",
      "say": "なんねん",
      "why": "Heard as なんとし on a phone. 年 is ねん in a counting question."
    },
    {
      "ja": "一日中",
      "say": "いちにちじゅう",
      "why": "Kept beside 一日 so the longer word is matched first; without it the override cut this one in half."
    },
    {
      "ja": "一日",
      "say": "いちにち",
      "why": "ついたち is the first of the month, which is not what is meant here."
    },
    {
      "ja": "人気",
      "say": "にんき",
      "why": "ひとけ means a sign of anyone being about, which is the other reading."
    },
    {
      "ja": "山火事",
      "say": "やまかじ",
      "why": "さんかじ is the on reading and is not the word."
    },
    {
      "ja": "勉強した年",
      "say": "べんきょうしたとし",
      "why": "年 standing alone after a verb is とし, not ねん."
    },
    {
      "ja": "十年の間",
      "say": "じゅうねんのあいだ",
      "why": "間 on its own is あいだ; かん only works as part of a counter."
    },
    {
      "ja": "大好き",
      "say": "だいすき",
      "why": "おおすき is a common wrong guess."
    }
  ]
};
