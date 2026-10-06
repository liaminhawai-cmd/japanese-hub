/* people.js — the six, the rules, and the sentences that get built.

   Each person is a set of facts, not a set of sentences. The drawing is
   generated from the facts and so is every answer key, which is what makes
   step 6 honest: the student types a sentence, and the page can check both
   whether it is Japanese and whether it is true of the figure on screen.
   Nothing is hard-coded twice.

   Facts, and the only sentences that are true of them:
     hair    long   かみが 長[なが]いです      short  かみが 短[みじか]いです
     colour  black  かみが くろいです      brown  かみが ちゃいろいです
     eyes    big    目[め]が 大[おお]きいです  small  目[め]が 小[ちい]さいです
     height  tall   せが 高[たか]いです      not    せが 高[たか]くないです

   Short height is せが 高くないです rather than a new word, so the negative
   earns its place instead of being drilled in the abstract.

   Clothing is a second set of facts on the same figures: a top, a
   bottom, shoes and sometimes a hat or a watch, each with a colour.
   The drawing reads the colours and so does the marker, so a student
   who writes あかい シャツを きています is checked against the shirt that
   is actually on screen.

   めがねを かけています is outside the 〜です grammar and is taught
   here as a fixed chunk. If your Year 8 has not met it, delete the
   glasses line from the rules and set every "glasses" below to false.

   One window. line, then pure JSON. No comments inside the object.      */

window.HITO_PEOPLE = {
  "schema_version": 1,
  "people": [
    {
      "id": "yuki",
      "name": "ゆうき",
      "facts": {
        "hair": "long",
        "colour": "black",
        "eyes": "big",
        "tall": true,
        "glasses": false,
        "clothes": {
          "top": [
            "シャツ",
            "あかい"
          ],
          "bottom": [
            "ズボン",
            "くろい"
          ],
          "shoes": [
            "くつ",
            "しろい"
          ]
        }
      },
      "traits": [
        "genki",
        "akarui"
      ],
      "blurb_en": "long black hair, big eyes, tall"
    },
    {
      "id": "haruka",
      "name": "はるか",
      "facts": {
        "hair": "short",
        "colour": "brown",
        "eyes": "small",
        "tall": false,
        "glasses": true,
        "clothes": {
          "top": [
            "セーター",
            "みどり"
          ],
          "bottom": [
            "スカート",
            "くろい"
          ],
          "shoes": [
            "くつ",
            "ちゃいろい"
          ]
        }
      },
      "traits": [
        "majime",
        "shizuka"
      ],
      "blurb_en": "short brown hair, small eyes, not tall, glasses"
    },
    {
      "id": "kenta",
      "name": "けんた",
      "facts": {
        "hair": "short",
        "colour": "black",
        "eyes": "small",
        "tall": true,
        "glasses": false,
        "clothes": {
          "top": [
            "Tシャツ",
            "あおい"
          ],
          "bottom": [
            "ズボン",
            "ちゃいろい"
          ],
          "shoes": [
            "くつ",
            "くろい"
          ],
          "extra": [
            "とけい",
            null
          ]
        }
      },
      "traits": [
        "omoshiroi",
        "nigiyaka"
      ],
      "blurb_en": "short black hair, small eyes, tall"
    },
    {
      "id": "midori",
      "name": "みどり",
      "facts": {
        "hair": "long",
        "colour": "brown",
        "eyes": "big",
        "tall": false,
        "glasses": false,
        "clothes": {
          "top": [
            "シャツ",
            "ピンク"
          ],
          "bottom": [
            "スカート",
            "しろい"
          ],
          "shoes": [
            "くつ",
            "くろい"
          ]
        }
      },
      "traits": [
        "yasashii",
        "shinsetsu"
      ],
      "blurb_en": "long brown hair, big eyes, not tall"
    },
    {
      "id": "sota",
      "name": "そうた",
      "facts": {
        "hair": "long",
        "colour": "black",
        "eyes": "small",
        "tall": false,
        "glasses": true,
        "clothes": {
          "top": [
            "セーター",
            "きいろい"
          ],
          "bottom": [
            "ズボン",
            "あおい"
          ],
          "shoes": [
            "くつ",
            "しろい"
          ]
        }
      },
      "traits": [
        "majime",
        "yasashii"
      ],
      "blurb_en": "long black hair, small eyes, not tall, glasses"
    },
    {
      "id": "aoi",
      "name": "あおい",
      "facts": {
        "hair": "short",
        "colour": "brown",
        "eyes": "big",
        "tall": true,
        "glasses": false,
        "clothes": {
          "top": [
            "Tシャツ",
            "むらさき"
          ],
          "bottom": [
            "ズボン",
            "くろい"
          ],
          "shoes": [
            "くつ",
            "しろい"
          ],
          "hat": [
            "ぼうし",
            "あかい"
          ]
        }
      },
      "traits": [
        "genki",
        "nigiyaka"
      ],
      "blurb_en": "short brown hair, big eyes, tall"
    }
  ],
  "traits": {
    "genki": {
      "ja": "元気[げんき]",
      "kind": "na",
      "en": "full of energy"
    },
    "akarui": {
      "ja": "あかるい",
      "kind": "i",
      "en": "cheerful"
    },
    "majime": {
      "ja": "まじめ",
      "kind": "na",
      "en": "hard-working"
    },
    "shizuka": {
      "ja": "しずか",
      "kind": "na",
      "en": "quiet"
    },
    "omoshiroi": {
      "ja": "おもしろい",
      "kind": "i",
      "en": "funny"
    },
    "nigiyaka": {
      "ja": "にぎやか",
      "kind": "na",
      "en": "lively"
    },
    "yasashii": {
      "ja": "やさしい",
      "kind": "i",
      "en": "kind"
    },
    "shinsetsu": {
      "ja": "親切[しんせつ]",
      "kind": "na",
      "en": "helpful"
    }
  },
  "rules": [
    {
      "step": "sort",
      "title": "い か な",
      "title_en": "い or な",
      "rule": "An い adjective ends in い and changes its own ending. A な adjective needs な before a noun and does not change. きれい and ゆうめい end in い and are still な adjectives, which is why the kind is worth learning with the word.",
      "eg": [
        {
          "ja": "やさしい 人[ひと]",
          "en": "a kind person (い adjective, nothing added)"
        },
        {
          "ja": "親切[しんせつ]な 人[ひと]",
          "en": "a helpful person (な adjective, な added)"
        }
      ]
    },
    {
      "step": "part",
      "title": "〜が 〜です",
      "title_en": "Part by part",
      "rule": "To describe one part of a person, name the part with が, then the adjective. The person is still the topic, so は and が appear in the same sentence.",
      "eg": [
        {
          "ja": "ゆうきさんは かみが 長[なが]いです。",
          "en": "Yuki's hair is long."
        },
        {
          "ja": "はるかさんは せが 高[たか]くないです。",
          "en": "Haruka is not tall."
        },
        {
          "ja": "そうたさんは めがねを かけています。",
          "en": "Sota wears glasses. (a set phrase)"
        }
      ]
    },
    {
      "step": "join",
      "title": "〜くて・〜で",
      "title_en": "Joining two",
      "rule": "To put two descriptions in one sentence, change the first one. An い adjective drops い and takes くて. A な adjective takes で.",
      "eg": [
        {
          "ja": "やさしくて おもしろいです。",
          "en": "kind and funny (い → くて)"
        },
        {
          "ja": "元気[げんき]で にぎやかです。",
          "en": "energetic and lively (な → で)"
        }
      ]
    },
    {
      "step": "who",
      "title": "だれですか",
      "title_en": "Who is it?",
      "rule": "Read the description and find the person. Every sentence below is true of exactly one of them.",
      "eg": []
    },
    {
      "step": "write",
      "title": "かいてみよう",
      "title_en": "Write it",
      "rule": "Three sentences about the person on screen. No words are given. Use が for a part, and join two descriptions with くて or で at least once.",
      "eg": []
    },
    {
      "step": "colour",
      "title": "いろ",
      "title_en": "Colours",
      "rule": "Some colour words are い adjectives and go straight in front of the thing. The rest are nouns and need の first. There is no rule for telling which is which: it comes with the word, like い and な.",
      "eg": [
        {
          "ja": "あかい シャツ",
          "en": "a red shirt (い adjective, nothing added)"
        },
        {
          "ja": "みどりの セーター",
          "en": "a green jumper (noun, の added)"
        }
      ]
    },
    {
      "step": "wear",
      "title": "きています",
      "title_en": "Wearing",
      "rule": "Japanese picks the verb by where on the body the thing goes, not by what it is. All five are in the ています form here, which is what you use for what someone has on right now.",
      "eg": [
        {
          "ja": "あかい シャツを きています。",
          "en": "upper body"
        },
        {
          "ja": "くろい ズボンを はいています。",
          "en": "lower body and feet"
        },
        {
          "ja": "あかい ぼうしを かぶっています。",
          "en": "head"
        },
        {
          "ja": "めがねを かけています。",
          "en": "glasses"
        },
        {
          "ja": "とけいを しています。",
          "en": "a watch, a tie"
        }
      ]
    }
  ],
  "builder": [
    {
      "person": "yuki",
      "ja": "ゆうきさんは 元気[げんき]で あかるいです。",
      "en": "Yuki is energetic and cheerful."
    },
    {
      "person": "midori",
      "ja": "みどりさんは やさしくて 親切[しんせつ]です。",
      "en": "Midori is kind and helpful."
    },
    {
      "person": "kenta",
      "ja": "けんたさんは おもしろくて にぎやかです。",
      "en": "Kenta is funny and lively."
    },
    {
      "person": "haruka",
      "ja": "はるかさんは まじめで しずかです。",
      "en": "Haruka is hard-working and quiet."
    },
    {
      "person": "sota",
      "ja": "そうたさんは まじめで やさしいです。",
      "en": "Sota is hard-working and kind."
    },
    {
      "person": "aoi",
      "ja": "あおいさんは 元気[げんき]で にぎやかです。",
      "en": "Aoi is energetic and lively."
    }
  ]
};
