/* data.js — ひと. Describing people, Year 8.

   KANJI. A draft set, chosen for this topic and nothing else. Strike any
   that are too early for your Year 8 and the page will fall back to kana,
   because every kanji here carries its reading in brackets and the page
   can render either:

       人  目  手  大  小  高  長  短  元気  親切

   VOCABULARY. Twenty-four for appearance and personality, then a second
   set for clothing: eight garments, ten colours and the five wearing
   verbs. Two sets rather than one long list, each with its own routes.

   COLOURS come in two kinds and the split is the teaching point:
   あかい and くろい behave like any other い adjective, while みどり and
   ピンク are nouns and need の before the garment.

   WEARING VERBS are chosen by where on the body the thing goes, not by
   what it is. Each garment records its verb and each verb its zone, so
   the page and the marker read the same table.

   The old note, still true of the first twenty-four:
   Twenty-four words, deliberately. Each one is met six ways:
   matched to its meaning, sorted by its type, heard, used inside a frame,
   negated, and finally produced cold with nothing on screen to copy. Ten
   words with six routes outlast fifty with one.

   DESCRIPTORS. Hair, eyes, height, glasses, age and personality. No body
   size and no skin colour: a Year 8 room is the wrong place to hand out
   vocabulary that can be aimed at the person at the next desk.

   CURRICULUM. Victorian Curriculum Japanese, Levels 7 and 8. The relevant
   part of the achievement standard: students "select and use vocabulary,
   sentence structures and expressions to create texts in Hiragana,
   Katakana and some Kanji, which are appropriate to context, purpose and
   audience", and they "comment on structures and features of Japanese
   text, using some metalanguage". Steps 1 to 5 build the vocabulary and
   the structures; step 6 is where a text actually gets created. The
   い/な sort is the metalanguage. Quoted from the VCAA Japanese F–10
   sequence; this note is for teachers and is not shown to students.

   One window. line, then pure JSON. No comments inside the object.      */

window.HITO_WORDS = {
  "schema_version": 1,
  "kanji_draft": [
    "人",
    "目",
    "手",
    "大",
    "小",
    "高",
    "長",
    "短",
    "元気",
    "親切"
  ],
  "words": [
    {
      "ja": "かみ",
      "kana": "かみ",
      "en": "hair",
      "kind": "noun",
      "group": "face"
    },
    {
      "ja": "目[め]",
      "kana": "め",
      "en": "eyes",
      "kind": "noun",
      "group": "face"
    },
    {
      "ja": "かお",
      "kana": "かお",
      "en": "face",
      "kind": "noun",
      "group": "face"
    },
    {
      "ja": "手[て]",
      "kana": "て",
      "en": "hands",
      "kind": "noun",
      "group": "face"
    },
    {
      "ja": "せ",
      "kana": "せ",
      "en": "height",
      "kind": "noun",
      "group": "body",
      "note": "せ is literally the back. せが 高いです is how you say someone is tall."
    },
    {
      "ja": "めがね",
      "kana": "めがね",
      "en": "glasses",
      "kind": "garment",
      "group": "clothes",
      "verb": "kakeru"
    },
    {
      "ja": "長[なが]い",
      "kana": "ながい",
      "en": "long",
      "kind": "i",
      "group": "look"
    },
    {
      "ja": "短[みじか]い",
      "kana": "みじかい",
      "en": "short (length)",
      "kind": "i",
      "group": "look"
    },
    {
      "ja": "大[おお]きい",
      "kana": "おおきい",
      "en": "big",
      "kind": "i",
      "group": "look"
    },
    {
      "ja": "小[ちい]さい",
      "kana": "ちいさい",
      "en": "small",
      "kind": "i",
      "group": "look"
    },
    {
      "ja": "高[たか]い",
      "kana": "たかい",
      "en": "tall, high",
      "kind": "i",
      "group": "body"
    },
    {
      "ja": "くろい",
      "kana": "くろい",
      "en": "black",
      "kind": "i",
      "group": "colour"
    },
    {
      "ja": "ちゃいろい",
      "kana": "ちゃいろい",
      "en": "brown",
      "kind": "i",
      "group": "colour"
    },
    {
      "ja": "わかい",
      "kana": "わかい",
      "en": "young",
      "kind": "i",
      "group": "body"
    },
    {
      "ja": "やさしい",
      "kana": "やさしい",
      "en": "kind, gentle",
      "kind": "i",
      "group": "person"
    },
    {
      "ja": "おもしろい",
      "kana": "おもしろい",
      "en": "funny, interesting",
      "kind": "i",
      "group": "person"
    },
    {
      "ja": "あかるい",
      "kana": "あかるい",
      "en": "cheerful, bright",
      "kind": "i",
      "group": "person"
    },
    {
      "ja": "親切[しんせつ]",
      "kana": "しんせつ",
      "en": "kind, helpful",
      "kind": "na",
      "group": "person"
    },
    {
      "ja": "元気[げんき]",
      "kana": "げんき",
      "en": "full of energy",
      "kind": "na",
      "group": "person"
    },
    {
      "ja": "まじめ",
      "kana": "まじめ",
      "en": "serious, hard-working",
      "kind": "na",
      "group": "person"
    },
    {
      "ja": "しずか",
      "kana": "しずか",
      "en": "quiet",
      "kind": "na",
      "group": "person"
    },
    {
      "ja": "にぎやか",
      "kana": "にぎやか",
      "en": "lively",
      "kind": "na",
      "group": "person"
    },
    {
      "ja": "ゆうめい",
      "kana": "ゆうめい",
      "en": "famous",
      "kind": "na",
      "group": "person"
    },
    {
      "ja": "ハンサム",
      "kana": "ハンサム",
      "en": "handsome",
      "kind": "na",
      "group": "person"
    },
    {
      "ja": "あかい",
      "kana": "あかい",
      "en": "red",
      "kind": "i",
      "group": "colour"
    },
    {
      "ja": "あおい",
      "kana": "あおい",
      "en": "blue",
      "kind": "i",
      "group": "colour"
    },
    {
      "ja": "しろい",
      "kana": "しろい",
      "en": "white",
      "kind": "i",
      "group": "colour"
    },
    {
      "ja": "きいろい",
      "kana": "きいろい",
      "en": "yellow",
      "kind": "i",
      "group": "colour"
    },
    {
      "ja": "みどり",
      "kana": "みどり",
      "en": "green",
      "kind": "noun",
      "group": "colour",
      "note": "A noun, so it needs の before the thing: みどりの セーター."
    },
    {
      "ja": "ピンク",
      "kana": "ピンク",
      "en": "pink",
      "kind": "noun",
      "group": "colour",
      "note": "A noun, so it needs の: ピンクの シャツ."
    },
    {
      "ja": "オレンジ",
      "kana": "オレンジ",
      "en": "orange",
      "kind": "noun",
      "group": "colour",
      "note": "A noun, so it needs の."
    },
    {
      "ja": "むらさき",
      "kana": "むらさき",
      "en": "purple",
      "kind": "noun",
      "group": "colour",
      "note": "A noun, so it needs の."
    },
    {
      "ja": "シャツ",
      "kana": "シャツ",
      "en": "shirt",
      "kind": "garment",
      "group": "clothes",
      "verb": "kiru"
    },
    {
      "ja": "Tシャツ",
      "kana": "Tシャツ",
      "en": "T-shirt",
      "kind": "garment",
      "group": "clothes",
      "verb": "kiru"
    },
    {
      "ja": "セーター",
      "kana": "セーター",
      "en": "jumper",
      "kind": "garment",
      "group": "clothes",
      "verb": "kiru"
    },
    {
      "ja": "ズボン",
      "kana": "ズボン",
      "en": "trousers",
      "kind": "garment",
      "group": "clothes",
      "verb": "haku"
    },
    {
      "ja": "スカート",
      "kana": "スカート",
      "en": "skirt",
      "kind": "garment",
      "group": "clothes",
      "verb": "haku"
    },
    {
      "ja": "くつ",
      "kana": "くつ",
      "en": "shoes",
      "kind": "garment",
      "group": "clothes",
      "verb": "haku"
    },
    {
      "ja": "ぼうし",
      "kana": "ぼうし",
      "en": "hat",
      "kind": "garment",
      "group": "clothes",
      "verb": "kaburu"
    },
    {
      "ja": "とけい",
      "kana": "とけい",
      "en": "watch",
      "kind": "garment",
      "group": "clothes",
      "verb": "suru"
    },
    {
      "ja": "きています",
      "kana": "きています",
      "en": "is wearing (upper body)",
      "kind": "verb",
      "group": "wearing",
      "zone": "ue"
    },
    {
      "ja": "はいています",
      "kana": "はいています",
      "en": "is wearing (lower body, feet)",
      "kind": "verb",
      "group": "wearing",
      "zone": "shita"
    },
    {
      "ja": "かぶっています",
      "kana": "かぶっています",
      "en": "is wearing (on the head)",
      "kind": "verb",
      "group": "wearing",
      "zone": "atama"
    },
    {
      "ja": "かけています",
      "kana": "かけています",
      "en": "is wearing (glasses)",
      "kind": "verb",
      "group": "wearing",
      "zone": "me"
    },
    {
      "ja": "しています",
      "kana": "しています",
      "en": "is wearing (a watch, a tie)",
      "kind": "verb",
      "group": "wearing",
      "zone": "komono"
    }
  ],
  "verbs": {
    "kiru": {
      "ja": "きています",
      "zone": "ue",
      "zone_en": "the upper body",
      "eg": "シャツ, Tシャツ, セーター"
    },
    "haku": {
      "ja": "はいています",
      "zone": "shita",
      "zone_en": "the lower body and the feet",
      "eg": "ズボン, スカート, くつ"
    },
    "kaburu": {
      "ja": "かぶっています",
      "zone": "atama",
      "zone_en": "the head",
      "eg": "ぼうし"
    },
    "kakeru": {
      "ja": "かけています",
      "zone": "me",
      "zone_en": "the eyes",
      "eg": "めがね"
    },
    "suru": {
      "ja": "しています",
      "zone": "komono",
      "zone_en": "small things you put on",
      "eg": "とけい, ネクタイ"
    }
  },
  "colour_hex": {
    "あかい": "#c0392b",
    "あおい": "#2a5fa8",
    "しろい": "#f4f3ef",
    "きいろい": "#dfb023",
    "くろい": "#2d2a28",
    "ちゃいろい": "#8a5a2b",
    "みどり": "#3f8f5a",
    "ピンク": "#e2869f",
    "オレンジ": "#d9772c",
    "むらさき": "#7a4a9e"
  }
};
