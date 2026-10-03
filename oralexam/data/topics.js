/* topics.js — the eight cultural products and practices this cohort chose
   for the oral SAC, with the questions an assessor could ask about each.

   These now run both halves of the app, which is the point of the file:

     the four minute SAC run takes a ladder of them, general to specific
     Section 2 of the whole examination walks the nine discussion stages
     and asks each one about the student's own topic

   The generic Section 2 bank in questions.js is still there for a student
   who has not chosen a topic yet, but a student who has chosen one gets
   their own topic asked about, which is what actually happens in the room.

   Every question carries both a stage and a width, and the width is derived
   from the stage so the two cannot drift apart:

     image, what-it-is                    open
     history, who-and-when, change        shape
     values, compare, personal, future    deep

   open questions are answerable from the topic alone, which is why
   `from_topic` is true on them: there is no honest way to back out of
   「コンビニとは何ですか」 when your topic is コンビニ.

   Two questions at every stage, so two runs on one topic are not the same
   run, and `key_vocab` per topic because the mock assessors' first note was
   that students who did not have the words could not explain what they had
   researched.

   No model answers here, deliberately. The student researched this and the
   app did not; offering one would be inventing their content for them.

   Same shape as the other data files: one window. line, then pure JSON, so
   no comments may appear inside the object.                               */

window.ORAL_TOPICS = {
  "schema_version": 2,
  "stages": [
    "image",
    "what-it-is",
    "history",
    "who-and-when",
    "change",
    "values",
    "compare",
    "personal",
    "future"
  ],
  "topics": [
    {
      "id": "onsen",
      "name_ja": "おんせん",
      "name_en": "Hot springs",
      "blurb_en": "What they are, the rules, the health claims, and who is kept out",
      "key_vocab": [
        {
          "ja": "おんせん",
          "en": "hot spring"
        },
        {
          "ja": "ゆぶね",
          "en": "the bath itself"
        },
        {
          "ja": "せいぶん",
          "en": "mineral content"
        },
        {
          "ja": "とうじ",
          "en": "taking the waters to heal"
        },
        {
          "ja": "りょかん",
          "en": "a traditional inn"
        },
        {
          "ja": "ろてんぶろ",
          "en": "an outdoor bath"
        },
        {
          "ja": "かざん",
          "en": "volcano"
        },
        {
          "ja": "いれずみ",
          "en": "a tattoo"
        },
        {
          "ja": "マナー",
          "en": "manners, etiquette"
        },
        {
          "ja": "かんこうきゃく",
          "en": "tourists"
        }
      ],
      "questions": [
        {
          "id": "onsen-image-1",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんには おんせんの どんな ところが うつっていますか。",
          "question_en": "What part of a hot spring does your photograph show?"
        },
        {
          "id": "onsen-image-2",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この しゃしんを えらびましたか。",
          "question_en": "Why did you choose this photograph?"
        },
        {
          "id": "onsen-what-it-is-1",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "おんせんとは 何[なん]ですか。",
          "question_en": "What is an onsen?"
        },
        {
          "id": "onsen-what-it-is-2",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "onsen-history-1",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんは いつから 日本[にほん]に ありますか。",
          "question_en": "How far back do hot springs go in Japan?"
        },
        {
          "id": "onsen-history-2",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "むかしは 何[なに]の ために 使[つか]われていましたか。",
          "question_en": "What were they used for in the past?"
        },
        {
          "id": "onsen-who-and-when-1",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どんな 人[ひと]が おんせんに 行[い]きますか。",
          "question_en": "What sort of people go to a hot spring?"
        },
        {
          "id": "onsen-who-and-when-2",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんに 入[はい]る とき、どんな ルールが ありますか。",
          "question_en": "What rules are there when you get in?"
        },
        {
          "id": "onsen-change-1",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんは むかしと くらべて かわりましたか。",
          "question_en": "Have hot springs changed from how they used to be?"
        },
        {
          "id": "onsen-change-2",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "外国[がいこく]の かんこうきゃくが ふえて、何[なに]が かわりましたか。",
          "question_en": "What has changed as more overseas tourists come?"
        },
        {
          "id": "onsen-values-1",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんから 日本[にほん]の 人[ひと]の 考[かんが]え方[かた]が わかりますか。",
          "question_en": "Can you see Japanese ways of thinking in hot springs?"
        },
        {
          "id": "onsen-values-2",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "みんな はだかで 入[はい]りますが、それは どうしてだと 思[おも]いますか。",
          "question_en": "Everyone bathes undressed. Why do you think that is?"
        },
        {
          "id": "onsen-compare-1",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの おんせんと 日本[にほん]の おんせんは どう ちがいますか。",
          "question_en": "How are Australian hot springs different from Japanese ones?"
        },
        {
          "id": "onsen-compare-2",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 人[ひと]は 日本[にほん]の おんせんを 楽[たの]しめると 思[おも]いますか。",
          "question_en": "Do you think Australians could enjoy a Japanese hot spring?"
        },
        {
          "id": "onsen-personal-1",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんに 入[はい]った ことが ありますか。どうでしたか。",
          "question_en": "Have you been in one? What was it like?"
        },
        {
          "id": "onsen-personal-2",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "いれずみが ある 人[ひと]は 入[はい]れませんが、どう 思[おも]いますか。",
          "question_en": "People with tattoos are often turned away. What do you think?"
        },
        {
          "id": "onsen-future-1",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんは これから どう なると 思[おも]いますか。",
          "question_en": "What do you think will happen to hot springs?"
        },
        {
          "id": "onsen-future-2",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "いなかの 小[ちい]さい おんせんを まもる ために 何[なに]が できますか。",
          "question_en": "What could be done to keep the small country ones going?"
        }
      ]
    },
    {
      "id": "hanami",
      "name_ja": "花見[はなみ]",
      "name_en": "Cherry blossom viewing",
      "blurb_en": "When it happens, what people do, and why the season matters so much",
      "key_vocab": [
        {
          "ja": "さくら",
          "en": "cherry blossom"
        },
        {
          "ja": "花見[はなみ]",
          "en": "blossom viewing"
        },
        {
          "ja": "きせつ",
          "en": "season"
        },
        {
          "ja": "まんかい",
          "en": "full bloom"
        },
        {
          "ja": "こうえん",
          "en": "park"
        },
        {
          "ja": "おべんとう",
          "en": "a packed lunch"
        },
        {
          "ja": "ごみ",
          "en": "rubbish"
        },
        {
          "ja": "はいく",
          "en": "haiku"
        },
        {
          "ja": "はかない",
          "en": "fleeting, short-lived"
        },
        {
          "ja": "ばしょとり",
          "en": "saving a spot"
        }
      ],
      "questions": [
        {
          "id": "hanami-image-1",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんは 花見[はなみ]の どんな ようすですか。",
          "question_en": "What is happening in your photograph?"
        },
        {
          "id": "hanami-image-2",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "しゃしんの 中[なか]の 人[ひと]は 何[なに]を していますか。",
          "question_en": "What are the people in it doing?"
        },
        {
          "id": "hanami-what-it-is-1",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "花見[はなみ]とは 何[なん]ですか。",
          "question_en": "What is hanami?"
        },
        {
          "id": "hanami-what-it-is-2",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "hanami-history-1",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]は いつから 始[はじ]まりましたか。",
          "question_en": "When did hanami begin?"
        },
        {
          "id": "hanami-history-2",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "むかしは だれが 花見[はなみ]を しましたか。",
          "question_en": "Who did it in the past?"
        },
        {
          "id": "hanami-who-and-when-1",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]は 一年[いちねん]の いつ しますか。",
          "question_en": "What time of year is hanami?"
        },
        {
          "id": "hanami-who-and-when-2",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "だれと 花見[はなみ]に 行[い]きますか。",
          "question_en": "Who do people go with?"
        },
        {
          "id": "hanami-change-1",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "今[いま]の 花見[はなみ]は むかしと ちがいますか。",
          "question_en": "Is hanami today different from how it was?"
        },
        {
          "id": "hanami-change-2",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]の もんだいは 何[なん]ですか。",
          "question_en": "What problems come with hanami?"
        },
        {
          "id": "hanami-values-1",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "さくらは 日本[にほん]の 人[ひと]に とって どうして たいせつですか。",
          "question_en": "Why do cherry blossoms matter so much to Japanese people?"
        },
        {
          "id": "hanami-values-2",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "「花[はな]より だんご」と いう ことばが ありますが、どういう いみですか。",
          "question_en": "There is a saying, hana yori dango. What does it mean?"
        },
        {
          "id": "hanami-compare-1",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアにも 花見[はなみ]のような ぎょうじが ありますか。",
          "question_en": "Is there anything like hanami in Australia?"
        },
        {
          "id": "hanami-compare-2",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 人[ひと]は きせつを どのぐらい 気[き]に しますか。",
          "question_en": "How much do Australians notice the seasons?"
        },
        {
          "id": "hanami-personal-1",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "花見[はなみ]を した ことが ありますか。",
          "question_en": "Have you ever been to a hanami?"
        },
        {
          "id": "hanami-personal-2",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "しらべて 一番[いちばん] おどろいた ことは 何[なん]ですか。",
          "question_en": "What surprised you most in your research?"
        },
        {
          "id": "hanami-future-1",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "花見[はなみ]は これからも つづくと 思[おも]いますか。",
          "question_en": "Do you think hanami will continue?"
        },
        {
          "id": "hanami-future-2",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "人[ひと]が 多[おお]すぎる もんだいは どうしたら いいと 思[おも]いますか。",
          "question_en": "What should be done about the crowds?"
        }
      ]
    },
    {
      "id": "oshogatsu",
      "name_ja": "お正月[しょうがつ]",
      "name_en": "New Year",
      "blurb_en": "Three days with family, the shrine visit, and the shops all shut",
      "key_vocab": [
        {
          "ja": "お正月[しょうがつ]",
          "en": "New Year"
        },
        {
          "ja": "おせちりょうり",
          "en": "New Year food"
        },
        {
          "ja": "はつもうで",
          "en": "the first shrine visit"
        },
        {
          "ja": "おとしだま",
          "en": "New Year money"
        },
        {
          "ja": "おおそうじ",
          "en": "the big clean"
        },
        {
          "ja": "もちつき",
          "en": "pounding rice cakes"
        },
        {
          "ja": "おおみそか",
          "en": "New Year's Eve"
        },
        {
          "ja": "しんせき",
          "en": "relatives"
        },
        {
          "ja": "じんじゃ",
          "en": "shrine"
        },
        {
          "ja": "ねんがじょう",
          "en": "New Year cards"
        }
      ],
      "questions": [
        {
          "id": "oshogatsu-image-1",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんは お正月[しょうがつ]の どんな ようすですか。",
          "question_en": "What does your photograph show about New Year?"
        },
        {
          "id": "oshogatsu-image-2",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "しゃしんの 中[なか]に 何[なに]が 見[み]えますか。",
          "question_en": "What can you see in it?"
        },
        {
          "id": "oshogatsu-what-it-is-1",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "お正月[しょうがつ]とは 何[なん]ですか。",
          "question_en": "What is oshogatsu?"
        },
        {
          "id": "oshogatsu-what-it-is-2",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "oshogatsu-history-1",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]の しゅうかんは いつから ありますか。",
          "question_en": "How old are the New Year customs?"
        },
        {
          "id": "oshogatsu-history-2",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "はつもうでは どうして 始[はじ]まったと 思[おも]いますか。",
          "question_en": "Why do you think hatsumode began?"
        },
        {
          "id": "oshogatsu-who-and-when-1",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]に だれと すごしますか。",
          "question_en": "Who do people spend New Year with?"
        },
        {
          "id": "oshogatsu-who-and-when-2",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おおみそかに 日本[にほん]の 人[ひと]は 何[なに]を しますか。",
          "question_en": "What do people do on New Year's Eve?"
        },
        {
          "id": "oshogatsu-change-1",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "今[いま]の お正月[しょうがつ]は むかしと ちがいますか。",
          "question_en": "Is New Year different now from how it was?"
        },
        {
          "id": "oshogatsu-change-2",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おせちりょうりを 作[つく]る 家[いえ]は へっていますが、どうしてだと 思[おも]いますか。",
          "question_en": "Fewer homes make osechi now. Why do you think that is?"
        },
        {
          "id": "oshogatsu-values-1",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]の 人[ひと]は お正月[しょうがつ]に 家族[かぞく]と すごしますか。",
          "question_en": "Why do Japanese people spend New Year with family?"
        },
        {
          "id": "oshogatsu-values-2",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]の 前[まえ]に うちを きれいに するのは どうしてですか。",
          "question_en": "Why is the house cleaned before New Year?"
        },
        {
          "id": "oshogatsu-compare-1",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の お正月[しょうがつ]と オーストラリアの お正月[しょうがつ]は どう ちがいますか。",
          "question_en": "How is New Year in Japan different from New Year in Australia?"
        },
        {
          "id": "oshogatsu-compare-2",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おとしだまのような しゅうかんは オーストラリアに ありますか。",
          "question_en": "Is there anything like otoshidama in Australia?"
        },
        {
          "id": "oshogatsu-personal-1",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]を 日本[にほん]で すごして みたいですか。",
          "question_en": "Would you like to spend New Year in Japan?"
        },
        {
          "id": "oshogatsu-personal-2",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]に 店[みせ]が 休[やす]む ことについて、どう 思[おも]いますか。",
          "question_en": "What do you think about the shops closing?"
        },
        {
          "id": "oshogatsu-future-1",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]の しゅうかんは これからも のこると 思[おも]いますか。",
          "question_en": "Will the New Year customs last?"
        },
        {
          "id": "oshogatsu-future-2",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "わかい 人[ひと]は お正月[しょうがつ]に きょうみが あると 思[おも]いますか。",
          "question_en": "Are young people interested in New Year?"
        }
      ]
    },
    {
      "id": "bukatsu",
      "name_ja": "ぶかつどう",
      "name_en": "School club activities",
      "blurb_en": "Who runs them, how many hours, senpai and kohai, and black clubs",
      "key_vocab": [
        {
          "ja": "ぶかつどう",
          "en": "club activities"
        },
        {
          "ja": "うんどうぶ",
          "en": "a sports club"
        },
        {
          "ja": "ぶんかぶ",
          "en": "a cultural club"
        },
        {
          "ja": "せんぱい",
          "en": "a senior student"
        },
        {
          "ja": "こうはい",
          "en": "a junior student"
        },
        {
          "ja": "たいかい",
          "en": "a competition"
        },
        {
          "ja": "れんしゅう",
          "en": "practice"
        },
        {
          "ja": "きそく",
          "en": "rules"
        },
        {
          "ja": "ブラックぶかつ",
          "en": "an over-demanding club"
        },
        {
          "ja": "チームワーク",
          "en": "teamwork"
        }
      ],
      "questions": [
        {
          "id": "bukatsu-image-1",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんは どんな ぶかつどうですか。",
          "question_en": "What club does your photograph show?"
        },
        {
          "id": "bukatsu-image-2",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "しゃしんの 人[ひと]たちは 何[なに]を していますか。",
          "question_en": "What are the people in it doing?"
        },
        {
          "id": "bukatsu-what-it-is-1",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ぶかつどうとは 何[なん]ですか。",
          "question_en": "What are club activities?"
        },
        {
          "id": "bukatsu-what-it-is-2",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "bukatsu-history-1",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ぶかつどうは いつから 日本[にほん]の 学校[がっこう]に ありますか。",
          "question_en": "How long have clubs been part of Japanese schools?"
        },
        {
          "id": "bukatsu-history-2",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして 学校[がっこう]で する ように なったと 思[おも]いますか。",
          "question_en": "Why do you think they became a school thing?"
        },
        {
          "id": "bukatsu-who-and-when-1",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 高校生[こうこうせい]は 週[しゅう]に 何回[なんかい] ぶかつどうを しますか。",
          "question_en": "How many times a week do Japanese senior students have club?"
        },
        {
          "id": "bukatsu-who-and-when-2",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "せんぱいと こうはいは どんな かんけいですか。",
          "question_en": "What is the relationship between senpai and kohai?"
        },
        {
          "id": "bukatsu-change-1",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ぶかつどうは さいきん かわってきましたか。",
          "question_en": "Have clubs been changing lately?"
        },
        {
          "id": "bukatsu-change-2",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "「ブラックぶかつ」とは 何[なん]ですか。",
          "question_en": "What is a black club?"
        },
        {
          "id": "bukatsu-values-1",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうから 日本[にほん]の 社会[しゃかい]の 何[なに]が わかりますか。",
          "question_en": "What do clubs tell you about Japanese society?"
        },
        {
          "id": "bukatsu-values-2",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]の 学校[がっこう]は チームワークを たいせつに しますか。",
          "question_en": "Why do Japanese schools make so much of teamwork?"
        },
        {
          "id": "bukatsu-compare-1",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 学校[がっこう]の スポーツと どう ちがいますか。",
          "question_en": "How is it different from sport at an Australian school?"
        },
        {
          "id": "bukatsu-compare-2",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 学校[がっこう]にも ぶかつどうが あった ほうが いいと 思[おも]いますか。",
          "question_en": "Should Australian schools have clubs too?"
        },
        {
          "id": "bukatsu-personal-1",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうは 勉強[べんきょう]の じゃまに なると 思[おも]いますか。",
          "question_en": "Do you think clubs get in the way of study?"
        },
        {
          "id": "bukatsu-personal-2",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 学校[がっこう]で ぶかつどうを して みたいですか。",
          "question_en": "Would you like to join a club at a Japanese school?"
        },
        {
          "id": "bukatsu-future-1",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうは これから どう なると 思[おも]いますか。",
          "question_en": "What will happen to club activities?"
        },
        {
          "id": "bukatsu-future-2",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "れんしゅうの 時間[じかん]を へらした ほうが いいと 思[おも]いますか。",
          "question_en": "Should the practice hours be cut?"
        }
      ]
    },
    {
      "id": "shougakkou",
      "name_ja": "小学校[しょうがっこう]の 一日[いちにち]",
      "name_en": "A day at primary school",
      "blurb_en": "Walking there in groups, school lunch, cleaning the classroom",
      "key_vocab": [
        {
          "ja": "きゅうしょく",
          "en": "school lunch"
        },
        {
          "ja": "そうじ",
          "en": "cleaning"
        },
        {
          "ja": "しゅうだんとうこう",
          "en": "walking to school in a group"
        },
        {
          "ja": "ランドセル",
          "en": "the school satchel"
        },
        {
          "ja": "かもく",
          "en": "a subject"
        },
        {
          "ja": "ほうかご",
          "en": "after school"
        },
        {
          "ja": "きゅうけい",
          "en": "a break"
        },
        {
          "ja": "せいと",
          "en": "a pupil"
        },
        {
          "ja": "たんにん",
          "en": "the class teacher"
        },
        {
          "ja": "きそく",
          "en": "rules"
        }
      ],
      "questions": [
        {
          "id": "shougakkou-image-1",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんは 学校[がっこう]の どんな 時間[じかん]ですか。",
          "question_en": "What part of the school day does your photograph show?"
        },
        {
          "id": "shougakkou-image-2",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "しゃしんの 子[こ]どもたちは 何[なに]を していますか。",
          "question_en": "What are the children doing?"
        },
        {
          "id": "shougakkou-what-it-is-1",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "日本[にほん]の 小学生[しょうがくせい]の 一日[いちにち]は どんな 一日[いちにち]ですか。",
          "question_en": "What is a Japanese primary school student's day like?"
        },
        {
          "id": "shougakkou-what-it-is-2",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "shougakkou-history-1",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "きゅうしょくは いつから 始[はじ]まりましたか。",
          "question_en": "When did school lunches start?"
        },
        {
          "id": "shougakkou-history-2",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして 子[こ]どもが そうじを する ように なったと 思[おも]いますか。",
          "question_en": "Why do you think the children came to do the cleaning?"
        },
        {
          "id": "shougakkou-who-and-when-1",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "小学生[しょうがくせい]は どうやって 学校[がっこう]に 行[い]きますか。",
          "question_en": "How do they get to school?"
        },
        {
          "id": "shougakkou-who-and-when-2",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "学校[がっこう]が 終[お]わってから 何[なに]を しますか。",
          "question_en": "What do they do after school?"
        },
        {
          "id": "shougakkou-change-1",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]は かわってきていますか。",
          "question_en": "Are Japanese primary schools changing?"
        },
        {
          "id": "shougakkou-change-2",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "子[こ]どもだけで 学校[がっこう]に 行[い]くのは あぶないと 思[おも]いますか。",
          "question_en": "Do you think walking to school alone is unsafe?"
        },
        {
          "id": "shougakkou-values-1",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "小学校[しょうがっこう]の 生活[せいかつ]から 日本[にほん]の 社会[しゃかい]の 何[なに]が わかりますか。",
          "question_en": "What does primary school life tell you about Japanese society?"
        },
        {
          "id": "shougakkou-values-2",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "そうじや きゅうしょくで 子[こ]どもは 何[なに]を 学[まな]びますか。",
          "question_en": "What do the children learn from cleaning and from lunch?"
        },
        {
          "id": "shougakkou-compare-1",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]と オーストラリアの 小学校[しょうがっこう]は どう ちがいますか。",
          "question_en": "How is a Japanese primary school different from an Australian one?"
        },
        {
          "id": "shougakkou-compare-2",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 学校[がっこう]でも やって みたい しゅうかんは ありますか。",
          "question_en": "Is there a custom you would bring to an Australian school?"
        },
        {
          "id": "shougakkou-personal-1",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]に 行[い]って みたいですか。",
          "question_en": "Would you like to attend a Japanese primary school?"
        },
        {
          "id": "shougakkou-personal-2",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "しらべて 一番[いちばん] おどろいた ことは 何[なん]ですか。",
          "question_en": "What surprised you most in your research?"
        },
        {
          "id": "shougakkou-future-1",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "これから 日本[にほん]の 小学校[しょうがっこう]は どう なると 思[おも]いますか。",
          "question_en": "How will Japanese primary schools change?"
        },
        {
          "id": "shougakkou-future-2",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "子[こ]どもが へっている ことは 学校[がっこう]に どんな えいきょうが ありますか。",
          "question_en": "How does the falling birth rate affect schools?"
        }
      ]
    },
    {
      "id": "shichigosan",
      "name_ja": "七五三[しちごさん]",
      "name_en": "The 7-5-3 festival",
      "blurb_en": "Why those ages, the shrine visit, the sweets, and the photo business",
      "key_vocab": [
        {
          "ja": "七五三[しちごさん]",
          "en": "the 7-5-3 festival"
        },
        {
          "ja": "じんじゃ",
          "en": "shrine"
        },
        {
          "ja": "きもの",
          "en": "kimono"
        },
        {
          "ja": "はかま",
          "en": "hakama trousers"
        },
        {
          "ja": "ちとせあめ",
          "en": "the long red and white sweet"
        },
        {
          "ja": "せいちょう",
          "en": "growing up"
        },
        {
          "ja": "おいわい",
          "en": "a celebration"
        },
        {
          "ja": "えんぎが いい",
          "en": "lucky, auspicious"
        },
        {
          "ja": "きねんしゃしん",
          "en": "a commemorative photograph"
        },
        {
          "ja": "しゃしんかん",
          "en": "a photo studio"
        }
      ],
      "questions": [
        {
          "id": "shichigosan-image-1",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんには だれが うつっていますか。",
          "question_en": "Who is in your photograph?"
        },
        {
          "id": "shichigosan-image-2",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "子[こ]どもは どんな ふくを 着[き]ていますか。",
          "question_en": "What are the children wearing?"
        },
        {
          "id": "shichigosan-what-it-is-1",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "七五三[しちごさん]とは 何[なん]ですか。",
          "question_en": "What is shichigosan?"
        },
        {
          "id": "shichigosan-what-it-is-2",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "shichigosan-history-1",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]は いつから ありますか。",
          "question_en": "How far back does shichigosan go?"
        },
        {
          "id": "shichigosan-history-2",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして 七[なな]さいと 五[ご]さいと 三[さん]さいですか。",
          "question_en": "Why those three ages?"
        },
        {
          "id": "shichigosan-who-and-when-1",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]は 一年[いちねん]の いつ ありますか。",
          "question_en": "What time of year is it?"
        },
        {
          "id": "shichigosan-who-and-when-2",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]の 日[ひ]に 家族[かぞく]は 何[なに]を しますか。",
          "question_en": "What does a family do on the day?"
        },
        {
          "id": "shichigosan-change-1",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "今[いま]の 七五三[しちごさん]は むかしと ちがいますか。",
          "question_en": "Is shichigosan different now?"
        },
        {
          "id": "shichigosan-change-2",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "しゃしんの ために 七五三[しちごさん]を する 家族[かぞく]も いますが、どう 思[おも]いますか。",
          "question_en": "Some families do it for the photographs. What do you think?"
        },
        {
          "id": "shichigosan-values-1",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]から 日本[にほん]の 家族[かぞく]について 何[なに]が わかりますか。",
          "question_en": "What does shichigosan tell you about Japanese families?"
        },
        {
          "id": "shichigosan-values-2",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]の 人[ひと]は 子[こ]どもの せいちょうを いわいますか。",
          "question_en": "Why do Japanese people mark a child growing up?"
        },
        {
          "id": "shichigosan-compare-1",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアにも 子[こ]どもの せいちょうを いわう ぎょうじが ありますか。",
          "question_en": "Is there anything in Australia that marks a child growing up?"
        },
        {
          "id": "shichigosan-compare-2",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の おいわいと オーストラリアの おいわいは どう ちがいますか。",
          "question_en": "How do Japanese and Australian celebrations differ?"
        },
        {
          "id": "shichigosan-personal-1",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]を 見[み]て みたいですか。",
          "question_en": "Would you like to see a shichigosan?"
        },
        {
          "id": "shichigosan-personal-2",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おかねが かかる ことについて どう 思[おも]いますか。",
          "question_en": "What do you think about how much it costs?"
        },
        {
          "id": "shichigosan-future-1",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]は これからも つづくと 思[おも]いますか。",
          "question_en": "Will shichigosan continue?"
        },
        {
          "id": "shichigosan-future-2",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "しゃしんの 会社[かいしゃ]が ふえた ことは いい ことですか。",
          "question_en": "Is the growth of the photo studios a good thing?"
        }
      ]
    },
    {
      "id": "konbini",
      "name_ja": "コンビニ",
      "name_en": "Convenience stores and plastic",
      "blurb_en": "What they sell, why they are everywhere, and the packaging problem",
      "key_vocab": [
        {
          "ja": "コンビニ",
          "en": "convenience store"
        },
        {
          "ja": "べんり",
          "en": "convenient"
        },
        {
          "ja": "ほうそう",
          "en": "packaging"
        },
        {
          "ja": "プラスチック",
          "en": "plastic"
        },
        {
          "ja": "ごみ",
          "en": "rubbish"
        },
        {
          "ja": "レジぶくろ",
          "en": "a carrier bag"
        },
        {
          "ja": "マイバッグ",
          "en": "your own bag"
        },
        {
          "ja": "しょうひきげん",
          "en": "use-by date"
        },
        {
          "ja": "フードロス",
          "en": "food waste"
        },
        {
          "ja": "かんきょう",
          "en": "the environment"
        }
      ],
      "questions": [
        {
          "id": "konbini-image-1",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんには コンビニの 何[なに]が うつっていますか。",
          "question_en": "What does your photograph show about convenience stores?"
        },
        {
          "id": "konbini-image-2",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この しゃしんを えらびましたか。",
          "question_en": "Why did you choose this photograph?"
        },
        {
          "id": "konbini-what-it-is-1",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "コンビニとは 何[なん]ですか。",
          "question_en": "What is a convenience store?"
        },
        {
          "id": "konbini-what-it-is-2",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "konbini-history-1",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニは いつから 日本[にほん]に ありますか。",
          "question_en": "How long have convenience stores been in Japan?"
        },
        {
          "id": "konbini-history-2",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして こんなに ふえたと 思[おも]いますか。",
          "question_en": "Why do you think there are so many now?"
        },
        {
          "id": "konbini-who-and-when-1",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "だれが コンビニを 使[つか]いますか。",
          "question_en": "Who uses them?"
        },
        {
          "id": "konbini-who-and-when-2",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニでは どんな ものが 買[か]えますか。",
          "question_en": "What can you buy there?"
        },
        {
          "id": "konbini-change-1",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニは さいきん かわってきましたか。",
          "question_en": "Have they been changing lately?"
        },
        {
          "id": "konbini-change-2",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニの もんだいは 何[なん]ですか。",
          "question_en": "What is the problem with them?"
        },
        {
          "id": "konbini-values-1",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "コンビニから 日本[にほん]の 社会[しゃかい]の 何[なに]が わかりますか。",
          "question_en": "What do they tell you about Japanese society?"
        },
        {
          "id": "konbini-values-2",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 人[ひと]は どうして ていねいな ほうそうが 好[す]きだと 思[おも]いますか。",
          "question_en": "Why do you think Japanese shoppers like careful packaging?"
        },
        {
          "id": "konbini-compare-1",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 店[みせ]と くらべて、コンビニは どう ちがいますか。",
          "question_en": "How are they different from Australian shops?"
        },
        {
          "id": "konbini-compare-2",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの プラスチックの ルールは どうですか。",
          "question_en": "What are the plastic rules like in Australia?"
        },
        {
          "id": "konbini-personal-1",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の コンビニを 使[つか]って みたいですか。",
          "question_en": "Would you like to use a Japanese convenience store?"
        },
        {
          "id": "konbini-personal-2",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "自分[じぶん]は ごみを へらす ために 何[なに]が できますか。",
          "question_en": "What can you do yourself to cut waste?"
        },
        {
          "id": "konbini-future-1",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "コンビニの 会社[かいしゃ]は どんな ことを していますか。",
          "question_en": "What are the companies doing about it?"
        },
        {
          "id": "konbini-future-2",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "これから コンビニは どう なると 思[おも]いますか。",
          "question_en": "What will happen to convenience stores?"
        }
      ]
    },
    {
      "id": "washlet",
      "name_ja": "ウォシュレット",
      "name_en": "Japanese toilets",
      "blurb_en": "What the buttons do, where they came from, and omotenashi",
      "key_vocab": [
        {
          "ja": "ウォシュレット",
          "en": "a washlet"
        },
        {
          "ja": "べんざ",
          "en": "the seat"
        },
        {
          "ja": "きのう",
          "en": "a function"
        },
        {
          "ja": "おとひめ",
          "en": "the sound button"
        },
        {
          "ja": "せいけつ",
          "en": "cleanliness"
        },
        {
          "ja": "おもてなし",
          "en": "hospitality"
        },
        {
          "ja": "せつでん",
          "en": "saving power"
        },
        {
          "ja": "しゅうり",
          "en": "repair"
        },
        {
          "ja": "こうれいしゃ",
          "en": "older people"
        },
        {
          "ja": "わしきトイレ",
          "en": "a squat toilet"
        }
      ],
      "questions": [
        {
          "id": "washlet-image-1",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんには 何[なに]が うつっていますか。",
          "question_en": "What is in your photograph?"
        },
        {
          "id": "washlet-image-2",
          "stage": "image",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ボタンが たくさん 見[み]えますが、何[なに]が できますか。",
          "question_en": "There are a lot of buttons. What do they do?"
        },
        {
          "id": "washlet-what-it-is-1",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ウォシュレットとは 何[なん]ですか。",
          "question_en": "What is a washlet?"
        },
        {
          "id": "washlet-what-it-is-2",
          "stage": "what-it-is",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "washlet-history-1",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットは いつから 日本[にほん]に ありますか。",
          "question_en": "How long have they been in Japan?"
        },
        {
          "id": "washlet-history-2",
          "stage": "history",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の トイレは むかし どんな トイレでしたか。",
          "question_en": "What were Japanese toilets like before?"
        },
        {
          "id": "washlet-who-and-when-1",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 家[いえ]には どのぐらい ありますか。",
          "question_en": "How many Japanese homes have one?"
        },
        {
          "id": "washlet-who-and-when-2",
          "stage": "who-and-when",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どこで ウォシュレットを 見[み]る ことが できますか。",
          "question_en": "Where do you come across them?"
        },
        {
          "id": "washlet-change-1",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットは どんな ふうに かわってきましたか。",
          "question_en": "How have they changed over the years?"
        },
        {
          "id": "washlet-change-2",
          "stage": "change",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットの もんだいは 何[なん]ですか。",
          "question_en": "What are the drawbacks?"
        },
        {
          "id": "washlet-values-1",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ウォシュレットから 日本[にほん]の 「おもてなし」の 考[かんが]え方[かた]が わかりますか。",
          "question_en": "Can you see the idea of omotenashi in the washlet?"
        },
        {
          "id": "washlet-values-2",
          "stage": "values",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]では せいけつが たいせつに されていますか。",
          "question_en": "Why is cleanliness held to matter so much in Japan?"
        },
        {
          "id": "washlet-compare-1",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の トイレと オーストラリアの トイレは どう ちがいますか。",
          "question_en": "How are Japanese and Australian toilets different?"
        },
        {
          "id": "washlet-compare-2",
          "stage": "compare",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアでも 人気[にんき]に なると 思[おも]いますか。",
          "question_en": "Do you think they would catch on in Australia?"
        },
        {
          "id": "washlet-personal-1",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ウォシュレットを 使[つか]った ことが ありますか。",
          "question_en": "Have you ever used one?"
        },
        {
          "id": "washlet-personal-2",
          "stage": "personal",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "電気[でんき]や 水[みず]を 使[つか]いますが、かんきょうに いいと 思[おも]いますか。",
          "question_en": "They use power and water. Are they good for the environment?"
        },
        {
          "id": "washlet-future-1",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ウォシュレットは これから どう なると 思[おも]いますか。",
          "question_en": "What will happen to the washlet?"
        },
        {
          "id": "washlet-future-2",
          "stage": "future",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "こうれいしゃが ふえると、トイレは どう かわりますか。",
          "question_en": "How will toilets change as the population ages?"
        }
      ]
    }
  ]
};
