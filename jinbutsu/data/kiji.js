/* data/kiji.js — Year 9 Unit 12, historical figures.

   SIX ARTICLES, EXACTLY AS ANDREW WROTE THEM. Every Japanese sentence in
   this file was lifted out of his Word documents, not written here. The
   furigana came across from the EQ ruby fields Word had left in them and
   is in the same base[reading] notation the other apps use. If a
   sentence here differs from the worksheet, this file is wrong and the
   worksheet is right.

   Source documents, on main:
     Unit 11 and 12 Historical Figures CAT 2023 MODIFIED.docx
       — Iwasaki Yatarō, Sakamoto Ryōma, Miyamoto Musashi
     Unit 11 and 12 Historical Figures Asako Hirooka ... Vocab list.docx
     Unit 12 Saigo Takamori ONLY 2025.docx
     Unit 11 and 12 Reading historical figures LED light inventors CLEAN.docx

   THE FRAME IS THE POINT. Five of the six are first-person
   じこしょうかい built on one frame: name, 生まれました, 才, what they are,
   住んでいました / 住んでいます, 毎日 routine, 〜た後で, 〜たり〜たり,
   〜が好きです, a past event, しょうらい〜たいです, よろしく. Once a student
   owns the frame every new person is new facts in known slots, and the
   paper test's question types are the same every time too. The LED
   article is the odd one out, third person and expository, which is why
   it comes last.

   《 》 MARKS A SPAN THE WORKSHEET UNDERLINED for translation. The
   underlines were recovered from the run properties in the .docx rather
   than guessed, so the translate step asks for the same sentences the
   paper does.

   ANSWERS. Each question carries a model answer and the key content the
   marker looks for, never a single accepted string: a short Japanese
   answer has too many right forms for an exact match to be fair. Where
   a question cannot be answered from the article at all — question 8 on
   Iwasaki asks what Mitsubishi makes today — it says so rather than
   marking a student wrong for not finding it.


   KANJI THE WORKSHEETS LEAVE BARE. A worksheet rubies a kanji the first
   time it appears and leaves it bare after that, which is right on
   paper. Two of them are never rubied at all: the Iwasaki article writes
   1835年 and never gives 年 a reading, though the Sakamoto article does,
   and question 7 drops the reading on 何 that question 6 has. Those are
   gaps in the documents, not in the transcription, and they are left
   alone here — the app supplies the reading instead, from the table
   below, so a student who needs ruby gets it on every line.

   何 is the one that needs a rule rather than a lookup: 何ですか is
   なん, 何を is なに. The app reads what follows it.

   NOTHING HERE IS ASSESSED. The app records nothing and sends nothing.
*/


window.KIJI = {
  "schema_version": 1,
  "people": [
    {
      "id": "iwasaki",
      "name_ja": "いわさき　やたろう",
      "name_en": "Iwasaki Yatarō",
      "what_en": "Samurai who founded Mitsubishi",
      "born": 1835,
      "age": 48,
      "source": "CAT 2023 MODIFIED",
      "paras": [
        "みなさん、おはようございます。私[わたし]の　名前[なまえ]は、いわさき　やたろうです。48才[さい]です。1835年に　生[う]まれました。とさに　住[す]んでいました。しかし、今[いま]は　ながさきに　住んでいます。さかもと　りょうまの　友[とも]だちでした。私[わたし]は　さむらいでした。しかし、《みつびしの　しゃちょうに　なりました。毎日[まいにち]　とても　いそがしいです。5時半[じはん]に　おきます。あさごはんを　食[た]べた後[あと]、しごとに　行きます。しごとで、人[ひと]と　話[はな]したり、けいやくを　作[つく]ったり　します。ものを　売[う]ることが　好[す]きです。しょうらい、外国[がいこく]に　行[い]きたいです。》",
        "よろしく　おねがいします。"
      ],
      "questions": [
        {
          "q": "いわさきやたろうは、いつ生[う]まれましたか。",
          "lang": "ja",
          "model": "1835年に　生[う]まれました。",
          "key": [
            "1835"
          ]
        },
        {
          "q": "しごとは、何[なん]ですか。",
          "lang": "ja",
          "model": "みつびしの　しゃちょうです。",
          "key": [
            "しゃちょう"
          ]
        },
        {
          "q": "どこに　住[す]んでいますか。",
          "lang": "ja",
          "model": "ながさきに　住[す]んでいます。",
          "key": [
            "ながさき"
          ]
        },
        {
          "q": "だれの　ともだちでしたか。",
          "lang": "ja",
          "model": "さかもと　りょうまの　友[とも]だちでした。",
          "key": [
            "さかもと",
            "りょうま"
          ]
        },
        {
          "q": "あさごはんの後[あと]で、どこに　行[い]きますか。",
          "lang": "ja",
          "model": "しごとに　行[い]きます。",
          "key": [
            "しごと"
          ]
        },
        {
          "q": "しごとで　何[なに]を　しますか。",
          "lang": "ja",
          "model": "人[ひと]と　話[はな]したり、けいやくを　作[つく]ったり　します。",
          "key": [
            "話",
            "はな"
          ],
          "key2": [
            "けいやく"
          ]
        },
        {
          "q": "しょうらい、何を　したいですか。",
          "lang": "ja",
          "model": "外国[がいこく]に　行[い]きたいです。",
          "key": [
            "外国",
            "がいこく"
          ]
        },
        {
          "q": "今[いま]の　みつびしは　何を　作[つく]りますか。",
          "lang": "en",
          "model": "Cars, ships, aircraft, electronics and heavy machinery.",
          "note": "Not in the article: this one is general knowledge, and the app says so."
        }
      ]
    },
    {
      "id": "sakamoto",
      "name_ja": "さかもと　りょうま",
      "name_en": "Sakamoto Ryōma",
      "what_en": "Samurai, swordsman, reformer",
      "born": 1836,
      "age": 25,
      "source": "CAT 2023 MODIFIED",
      "paras": [
        "みなさん、おはようございます。私[わたし]の　名前[なまえ]は　さかもと　りょうまです。私は、1836年[ねん]に　生[う]まれました。25才[さい]です。さむらいです。",
        "とさに　住[す]んでいます。毎日[まいにち]、6時[じ]に　おきます。あさごはんを　食[た]べた後[ご]、父[ちち]と　話[はな]したり、さんぽに　行[い]ったりします。その後[あと]、けんどうを　練習[れんしゅう]したり、本[ほん]を　読[よ]んだり　します。しょうらい、けんどうの　先生[せんせい]に　なりたいです。えどに　ゆうめいな　けんどうの　学校[がっこう]が　あります。しかし、えどに　行[い]ったことが　ありません。とても　行きたいです。上手[じょうず]に　なりたいです。よろしく　おねがいします。"
      ],
      "questions": [
        {
          "q": "Who is the article about?",
          "lang": "en",
          "model": "Sakamoto Ryōma.",
          "key": [
            "sakamoto",
            "ryoma",
            "ryōma"
          ]
        },
        {
          "q": "Where does he live?",
          "lang": "en",
          "model": "Tosa.",
          "key": [
            "tosa"
          ]
        },
        {
          "q": "What four things does he do after breakfast?",
          "lang": "en",
          "model": "Talks with his father, goes for a walk, practises kendo, reads books.",
          "key": [
            "father",
            "walk",
            "kendo",
            "read"
          ]
        },
        {
          "q": "In the future, what does he want to become?",
          "lang": "en",
          "model": "A kendo teacher.",
          "key": [
            "kendo"
          ],
          "key2": [
            "teacher"
          ]
        },
        {
          "q": "What is in Edo? What is Edo called now?",
          "lang": "en",
          "model": "A famous kendo school. Edo is now called Tokyo.",
          "key": [
            "school"
          ],
          "key2": [
            "tokyo"
          ]
        },
        {
          "q": "Has he been to Edo?",
          "lang": "en",
          "model": "No, he has never been to Edo.",
          "key": [
            "no",
            "not",
            "never",
            "hasn't",
            "has not"
          ]
        },
        {
          "q": "In the second last sentence, he says he wants to become something. What is it?",
          "lang": "en",
          "model": "He wants to become good at kendo (skilful).",
          "key": [
            "good",
            "skil",
            "better"
          ]
        }
      ]
    },
    {
      "id": "musashi",
      "name_ja": "みやもと　むさし",
      "name_en": "Miyamoto Musashi",
      "what_en": "Swordsman and writer",
      "born": 1584,
      "age": 21,
      "source": "CAT 2023 MODIFIED",
      "paras": [
        "みなさん、おはようございます。私[わたし]の　名前[なまえ]は　みやもと　むさしです。1584年[ねん]に　生[う]まれました。21才[さい]です。さむらいです。こどもの　時[とき]　みやもとに　住[す]んでいました。しかし、今[いま]は、京都[きょうと]に　住[す]んでいます。毎日[まいにち]、6時[じ]に　おきます。あさごはんを　食[た]べた後[あと]、けんどうを　れんしゅう　します。その後[ご]、人[ひと]と　話[はな]したり、本[ほん]を　読[よ]んだり　します。時々[ときどき]、手紙[てがみ]を　書[か]きます。てがみを　書[か]くことが　好[す]きです。私[わたし]は、5年前[ねんまえ]、せきがはらで　たたかいました。いしだの　西軍[せいぐん]と　いっしょに　たたかいました。とても　わるかったです。たくさんの　人が　しにました。せっぷくも　しました。わすれたいです。しょうらい、しずかな　ところに　住[す]みたいです。本[ほん]も　書[か]きたいです。よろしく　おねがいします。"
      ],
      "questions": [
        {
          "q": "みやもとむさしは、いつ生[う]まれましたか。",
          "lang": "ja",
          "model": "1584年[ねん]に　生[う]まれました。",
          "key": [
            "1584"
          ]
        },
        {
          "q": "みやもとむさしは、なんですか。",
          "lang": "ja",
          "model": "さむらいです。",
          "key": [
            "さむらい"
          ]
        },
        {
          "q": "どこに　住[す]んでいますか。",
          "lang": "ja",
          "model": "京都[きょうと]に　住[す]んでいます。",
          "key": [
            "京都",
            "きょうと"
          ]
        },
        {
          "q": "あさごはんの　後[あと]で、何[なに]を　しますか。",
          "lang": "ja",
          "model": "けんどうを　れんしゅう　します。",
          "key": [
            "けんどう"
          ]
        },
        {
          "q": "その後[ご]、何[なに]を　しますか。",
          "lang": "ja",
          "model": "人[ひと]と　話[はな]したり、本[ほん]を　読[よ]んだり　します。",
          "key": [
            "話",
            "はな"
          ],
          "key2": [
            "本",
            "ほん",
            "読",
            "よ"
          ]
        },
        {
          "q": "何[なに]が　好[す]きですか。",
          "lang": "ja",
          "model": "てがみを　書[か]くことが　好[す]きです。",
          "key": [
            "てがみ",
            "手紙"
          ]
        },
        {
          "q": "5年前[ねんまえ]、何[なに]を　しましたか。",
          "lang": "ja",
          "model": "せきがはらで　たたかいました。",
          "key": [
            "せきがはら",
            "たたか"
          ]
        },
        {
          "q": "どうでしたか。",
          "lang": "ja",
          "model": "とても　わるかったです。",
          "key": [
            "わる"
          ]
        },
        {
          "q": "なぜですか。",
          "lang": "ja",
          "model": "たくさんの　人[ひと]が　しにました。",
          "key": [
            "しに"
          ]
        },
        {
          "q": "しょうらい、どこに　住[す]みたいですか。",
          "lang": "ja",
          "model": "しずかな　ところに　住[す]みたいです。",
          "key": [
            "しずか"
          ]
        },
        {
          "q": "何[なに]を　したいですか。",
          "lang": "ja",
          "model": "本[ほん]を　書[か]きたいです。",
          "key": [
            "本",
            "ほん"
          ],
          "key2": [
            "書",
            "か"
          ]
        }
      ]
    },
    {
      "id": "hirooka",
      "name_ja": "ひろおか　あさこ",
      "name_en": "Hirooka Asako",
      "what_en": "Entrepreneur, banker, founder of a women's university",
      "born": 1849,
      "age": 50,
      "source": "Hirooka Asako respond in J and Trans and Vocab list",
      "paras": [
        "みなさん、こんにちは。私[わたし]の　名前[なまえ]は　ひろおか　あさこ　です。千八百四十九年[ねん]に　京都[きょうと]で　生[う]まれました。五十才[さい]です。",
        "子[こ]どもの　時[とき]、京都[きょうと]に　住[す]んでいました。しかし、今[いま]は、大阪[おおさか]に　住[す]んでいます。《毎日[まいにち]、6時半[じはん]に　おきます。》あさごはんを　食[た]べた後[あと]、しごとに　行[い]きます。《しごとで、人[ひと]と　話[はな]したり、ものを　売[う]ったり　します。時々[ときどき]、けいやくを　書[か]きます。》お金[かね]を　作[つく]ることが　好[す]きです。",
        "私[わたし]は　じぎょう家[か]　です。１０年前[ねんまえ]、ぎんこうを　作[つく]りました。《たいへんでしたが、ビジネスが　好[す]きです。》今年[ことし]、《女子大学[じょしだいがく]を　作[つく]りたいです。》大学[だいがく]は　とても　高[たか]いです。でも、お金[かね]が　ありません。だから、友[とも]だちに　たのみます。",
        "しょう来[らい]、外国[がいこく]に　行[い]きたいです。本[ほん]も　書[か]きたいです。",
        "よろしく　おねがいします。"
      ],
      "questions": [
        {
          "q": "ひろおかさんは、いつ生[う]まれましたか。",
          "lang": "ja",
          "model": "千八百四十九年[ねん]に　生[う]まれました。",
          "key": [
            "千八百四十九",
            "1849"
          ]
        },
        {
          "q": "今[いま]、どこに　住[す]んでいますか。",
          "lang": "ja",
          "model": "大阪[おおさか]に　住[す]んでいます。",
          "key": [
            "大阪",
            "おおさか"
          ]
        },
        {
          "q": "あさごはんの　後[あと]で、何[なに]を　しますか。",
          "lang": "ja",
          "model": "しごとに　行[い]きます。",
          "key": [
            "しごと"
          ]
        },
        {
          "q": "しごとで　何[なに]を　しますか。",
          "lang": "ja",
          "model": "人[ひと]と　話[はな]したり、ものを　売[う]ったり　します。",
          "key": [
            "話",
            "はな"
          ],
          "key2": [
            "売",
            "う"
          ]
        },
        {
          "q": "何[なに]を　することが　好[す]きですか。",
          "lang": "ja",
          "model": "お金[かね]を　作[つく]ることが　好[す]きです。",
          "key": [
            "金",
            "かね"
          ]
        },
        {
          "q": "ひろおかさんは、何[なん]ですか。",
          "lang": "ja",
          "model": "じぎょう家[か]です。",
          "key": [
            "じぎょう"
          ]
        },
        {
          "q": "１０年前[ねんまえ]　何[なに]を　しましたか。",
          "lang": "ja",
          "model": "ぎんこうを　作[つく]りました。",
          "key": [
            "ぎんこう"
          ]
        },
        {
          "q": "どうでしたか。",
          "lang": "ja",
          "model": "たいへんでした。",
          "key": [
            "たいへん"
          ]
        },
        {
          "q": "今年[ことし]、何[なに]を　したいですか。",
          "lang": "ja",
          "model": "女子大学[じょしだいがく]を　作[つく]りたいです。",
          "key": [
            "大学",
            "だいがく"
          ]
        },
        {
          "q": "お金[かね]は　だれに　たのみますか。",
          "lang": "ja",
          "model": "友[とも]だちに　たのみます。",
          "key": [
            "友",
            "とも"
          ]
        }
      ]
    },
    {
      "id": "saigo",
      "name_ja": "さいごう　たかもり",
      "name_en": "Saigō Takamori",
      "what_en": "Samurai who became a politician",
      "born": 1828,
      "age": 43,
      "source": "Unit 12 Saigo Takamori ONLY 2025",
      "paras": [
        "みなさん、おはようございます。",
        "私[わたし]の　名前[なまえ]は、さいごう　たかもりです。《４３才[さい]です。》１８２８年[ねん]に　生[う]まれました。《さつまに　住[す]んでいました。》しかし、今[いま]は　東京[とうきょう]に　住[す]んでいます。さかもと　りょうまの　ともだちです。私[わたし]も　侍[さむらい]でした。しかし、せいじ家[か]に　なりました。",
        "《毎日[まいにち]　とても　いそがしいです。》６時[じ]に　おきます。あさごはんを　食[た]べた後[あと]、しごとに　行[い]きます。しごとで、人[ひと]と　話[はな]したり、ほうりつを　作[つく]ったり　します。人[ひと]を　たすけることが　好[す]きです。しゃしんが　好[す]きじゃないです。しょう来[らい]、さつまに　帰[かえ]りたいです。犬[いぬ]と　さんぽしたい　です。",
        "《よろしく　おねがいします。》"
      ],
      "questions": [
        {
          "q": "When was Saigo born?",
          "lang": "en",
          "model": "1828.",
          "key": [
            "1828"
          ]
        },
        {
          "q": "Where does he live now?",
          "lang": "en",
          "model": "Tokyo.",
          "key": [
            "tokyo",
            "edo"
          ]
        },
        {
          "q": "What does he do now?",
          "lang": "en",
          "model": "He is a politician.",
          "key": [
            "politic"
          ]
        },
        {
          "q": "Whose friend is he?",
          "lang": "en",
          "model": "Sakamoto Ryōma's.",
          "key": [
            "sakamoto",
            "ryoma",
            "ryōma"
          ]
        },
        {
          "q": "After breakfast, where does he go?",
          "lang": "en",
          "model": "To work.",
          "key": [
            "work",
            "job"
          ]
        },
        {
          "q": "What does he do when he is there?",
          "lang": "en",
          "model": "He talks with people and makes laws.",
          "key": [
            "talk",
            "speak"
          ],
          "key2": [
            "law"
          ]
        },
        {
          "q": "What does he like to do?",
          "lang": "en",
          "model": "He likes helping people.",
          "key": [
            "help"
          ]
        },
        {
          "q": "What does he dislike?",
          "lang": "en",
          "model": "Photographs.",
          "key": [
            "photo",
            "picture",
            "camera"
          ]
        },
        {
          "q": "In the future what does he want to do? (2)",
          "lang": "en",
          "model": "Return to Satsuma, and walk with his dog.",
          "key": [
            "satsuma",
            "return",
            "home"
          ],
          "key2": [
            "dog",
            "walk"
          ]
        }
      ]
    },
    {
      "id": "led",
      "name_ja": "青[あお]色[いろ]LEDの　発明者[はつめいしゃ]",
      "name_en": "The inventors of the blue LED",
      "what_en": "Akasaki, Amano and Nakamura, Nobel Prize 2014",
      "born": 1989,
      "age": null,
      "third_person": true,
      "source": "Reading historical figures LED light inventors CLEAN",
      "paras": [
        "みなさん、LEDを　知[し]っていますか。LEDの　電[でん]きゅうや　スマートフォンを　つかっていませんか。世界中[せかいじゅう]で　よく　使[つか]われていますね。",
        "LEDは　英語[えいご]の　Light Emitting Diodeから　できた　ことばです。《千九百八十九年[ねん]まで、あかいLEDや　みどりのLEDは　ありましたが、青[あお]いLEDは　ありませんでした。青[あお]いLEDを　つくることが　とても　むずかしかったからです。》たくさんの　科学者[かがくしゃ]が　青[あお]いLEDを　作[つく]ろうと　しましたが、なかなか　できませんでした。《でも、やっと　日本[にほん]の　科学者[かがくしゃ]が　青[あお]いLEDを　つくることが　できました。》",
        "赤崎[あかさき]さんと、天野[あまの]さんと、中村[なかむら]さんです。かれらは、《じっけんを　したり、かんがえなおしたり》して、やっと　青[あお]いLEDが　できました。",
        "その後[あと]、LEDの　電[でん]きゅうが　できました。それは、今[いま]までの　電[でん]きゅうの　電気[でんき]の　10%だけ　使[つか]います。それから、LEDの　テレビや　コンピューター画面[がめん]や　スマートフォンの　画面[がめん]などが　できました。青[あお]いLEDが　ないと、LEDの　カラーテレビが　できません。だから、青[あお]いLEDは　すごいですね。",
        "この　三人[さんにん]の　日本人[にほんじん]の　科学者[かがくしゃ]は、こんな　すごい　物[もの]を　発明[はつめい]して、二千十四年[ねん]に　ノーベルしょうを　もらいました。おめでとうございます。"
      ],
      "questions": [
        {
          "q": "What does LED stand for?",
          "lang": "en",
          "model": "Light Emitting Diode.",
          "key": [
            "light emitting"
          ]
        },
        {
          "q": "Until 1989, which colours of LED existed?",
          "lang": "en",
          "model": "Red and green.",
          "key": [
            "red"
          ],
          "key2": [
            "green"
          ]
        },
        {
          "q": "Why was there no blue LED?",
          "lang": "en",
          "model": "Because making a blue LED was very difficult.",
          "key": [
            "difficult",
            "hard"
          ]
        },
        {
          "q": "Who finally made it?",
          "lang": "en",
          "model": "Akasaki, Amano and Nakamura.",
          "key": [
            "akasaki",
            "amano",
            "nakamura"
          ]
        },
        {
          "q": "What did they do, over and over?",
          "lang": "en",
          "model": "Experiments, and rethinking.",
          "key": [
            "experiment"
          ],
          "key2": [
            "rethink",
            "think again",
            "reconsider"
          ]
        },
        {
          "q": "How much electricity does an LED bulb use?",
          "lang": "en",
          "model": "Ten per cent of the old bulbs.",
          "key": [
            "10",
            "ten"
          ]
        },
        {
          "q": "What could not exist without the blue LED?",
          "lang": "en",
          "model": "LED colour television.",
          "key": [
            "colour tv",
            "color tv",
            "television",
            "カラーテレビ"
          ]
        },
        {
          "q": "What did they receive in 2014?",
          "lang": "en",
          "model": "The Nobel Prize.",
          "key": [
            "nobel"
          ]
        }
      ]
    }
  ],
  "vocab": [
    {
      "ja": "じこしょうかい",
      "en": "self-introduction",
      "group": "frame"
    },
    {
      "ja": "生[う]まれました",
      "en": "was born",
      "group": "frame"
    },
    {
      "ja": "才[さい]",
      "en": "years old",
      "group": "frame"
    },
    {
      "ja": "住[す]んでいました",
      "en": "lived in (a place)",
      "group": "frame"
    },
    {
      "ja": "住[す]んでいます",
      "en": "lives in (a place)",
      "group": "frame"
    },
    {
      "ja": "しかし",
      "en": "however",
      "group": "frame"
    },
    {
      "ja": "今[いま]",
      "en": "now",
      "group": "frame"
    },
    {
      "ja": "子[こ]どもの　時[とき]",
      "en": "when I was a child",
      "group": "frame"
    },
    {
      "ja": "毎日[まいにち]",
      "en": "every day",
      "group": "frame"
    },
    {
      "ja": "おきます",
      "en": "to get up",
      "group": "frame"
    },
    {
      "ja": "あさごはん",
      "en": "breakfast",
      "group": "frame"
    },
    {
      "ja": "食[た]べた後[あと]",
      "en": "after eating",
      "group": "frame"
    },
    {
      "ja": "しごと",
      "en": "job, work",
      "group": "frame"
    },
    {
      "ja": "〜たり　〜たり　します",
      "en": "do things like A and B",
      "group": "frame"
    },
    {
      "ja": "〜ことが　好[す]きです",
      "en": "likes doing ~",
      "group": "frame"
    },
    {
      "ja": "しょうらい",
      "en": "in the future",
      "group": "frame"
    },
    {
      "ja": "〜たいです",
      "en": "want to (do)",
      "group": "frame"
    },
    {
      "ja": "なりたいです",
      "en": "want to become",
      "group": "frame"
    },
    {
      "ja": "なりました",
      "en": "became",
      "group": "frame"
    },
    {
      "ja": "よろしく　おねがいします",
      "en": "pleased to meet you",
      "group": "frame"
    },
    {
      "ja": "さむらい",
      "en": "samurai",
      "group": "people"
    },
    {
      "ja": "侍[さむらい]",
      "en": "samurai",
      "group": "people"
    },
    {
      "ja": "社長[しゃちょう]",
      "en": "company president",
      "group": "people"
    },
    {
      "ja": "じぎょう家[か]",
      "en": "entrepreneur",
      "group": "people"
    },
    {
      "ja": "せいじ家[か]",
      "en": "politician",
      "group": "people"
    },
    {
      "ja": "科学者[かがくしゃ]",
      "en": "scientist",
      "group": "people"
    },
    {
      "ja": "発明者[はつめいしゃ]",
      "en": "inventor",
      "group": "people"
    },
    {
      "ja": "先生[せんせい]",
      "en": "teacher",
      "group": "people"
    },
    {
      "ja": "友[とも]だち",
      "en": "friend",
      "group": "people"
    },
    {
      "ja": "父[ちち]",
      "en": "my father",
      "group": "people"
    },
    {
      "ja": "話[はな]します",
      "en": "to speak",
      "group": "doing"
    },
    {
      "ja": "作[つく]ります",
      "en": "to make",
      "group": "doing"
    },
    {
      "ja": "売[う]ります",
      "en": "to sell",
      "group": "doing"
    },
    {
      "ja": "書[か]きます",
      "en": "to write",
      "group": "doing"
    },
    {
      "ja": "読[よ]みます",
      "en": "to read",
      "group": "doing"
    },
    {
      "ja": "練習[れんしゅう]します",
      "en": "to practise",
      "group": "doing"
    },
    {
      "ja": "さんぽに　行[い]きます",
      "en": "to go for a walk",
      "group": "doing"
    },
    {
      "ja": "たすけます",
      "en": "to help",
      "group": "doing"
    },
    {
      "ja": "たたかいました",
      "en": "fought",
      "group": "doing"
    },
    {
      "ja": "たのみます",
      "en": "to ask a favour",
      "group": "doing"
    },
    {
      "ja": "帰[かえ]りたい",
      "en": "want to go home",
      "group": "doing"
    },
    {
      "ja": "行[い]ったことが　あります",
      "en": "have been to",
      "group": "doing"
    },
    {
      "ja": "行[い]ったことが　ありません",
      "en": "have never been to",
      "group": "doing"
    },
    {
      "ja": "けいやく",
      "en": "contract",
      "group": "things"
    },
    {
      "ja": "ぎんこう",
      "en": "bank",
      "group": "things"
    },
    {
      "ja": "お金[かね]",
      "en": "money",
      "group": "things"
    },
    {
      "ja": "ほうりつ",
      "en": "law",
      "group": "things"
    },
    {
      "ja": "手紙[てがみ]",
      "en": "letter",
      "group": "things"
    },
    {
      "ja": "本[ほん]",
      "en": "book",
      "group": "things"
    },
    {
      "ja": "けんどう",
      "en": "kendo",
      "group": "things"
    },
    {
      "ja": "学校[がっこう]",
      "en": "school",
      "group": "things"
    },
    {
      "ja": "大学[だいがく]",
      "en": "university",
      "group": "things"
    },
    {
      "ja": "女子大学[じょしだいがく]",
      "en": "women's university",
      "group": "things"
    },
    {
      "ja": "しゃしん",
      "en": "photograph",
      "group": "things"
    },
    {
      "ja": "犬[いぬ]",
      "en": "dog",
      "group": "things"
    },
    {
      "ja": "外国[がいこく]",
      "en": "foreign country",
      "group": "things"
    },
    {
      "ja": "いそがしい",
      "en": "busy",
      "group": "describing"
    },
    {
      "ja": "たいへん",
      "en": "hard going, tough",
      "group": "describing"
    },
    {
      "ja": "ゆうめい",
      "en": "famous",
      "group": "describing"
    },
    {
      "ja": "上手[じょうず]",
      "en": "good at",
      "group": "describing"
    },
    {
      "ja": "しずか",
      "en": "quiet",
      "group": "describing"
    },
    {
      "ja": "高[たか]い",
      "en": "expensive, high",
      "group": "describing"
    },
    {
      "ja": "わるかったです",
      "en": "was bad",
      "group": "describing"
    },
    {
      "ja": "でも",
      "en": "but",
      "group": "describing"
    },
    {
      "ja": "だから",
      "en": "so, therefore",
      "group": "describing"
    },
    {
      "ja": "時々[ときどき]",
      "en": "sometimes",
      "group": "describing"
    },
    {
      "ja": "電[でん]きゅう",
      "en": "light bulb",
      "group": "led"
    },
    {
      "ja": "世界中[せかいじゅう]",
      "en": "worldwide",
      "group": "led"
    },
    {
      "ja": "使[つか]われています",
      "en": "is used",
      "group": "led"
    },
    {
      "ja": "ことば",
      "en": "word",
      "group": "led"
    },
    {
      "ja": "作[つく]ろうと　しました",
      "en": "tried to make",
      "group": "led"
    },
    {
      "ja": "なかなか",
      "en": "not easily",
      "group": "led"
    },
    {
      "ja": "やっと",
      "en": "finally",
      "group": "led"
    },
    {
      "ja": "じっけん",
      "en": "experiment",
      "group": "led"
    },
    {
      "ja": "かんがえなおします",
      "en": "to rethink",
      "group": "led"
    },
    {
      "ja": "電気[でんき]",
      "en": "electricity",
      "group": "led"
    },
    {
      "ja": "だけ",
      "en": "only",
      "group": "led"
    },
    {
      "ja": "画面[がめん]",
      "en": "screen",
      "group": "led"
    },
    {
      "ja": "発明[はつめい]します",
      "en": "to invent",
      "group": "led"
    },
    {
      "ja": "しょう",
      "en": "prize",
      "group": "led"
    },
    {
      "ja": "おめでとうございます",
      "en": "congratulations",
      "group": "led"
    }
  ],
  "readings": {
    "年": "ねん",
    "何": "なに",
    "人": "ひと",
    "私": "わたし",
    "行": "い",
    "住": "す",
    "時": "じ",
    "後": "あと",
    "本": "ほん",
    "作": "つく",
    "話": "はな",
    "好": "す",
    "生": "う",
    "才": "さい",
    "金": "かね",
    "食": "た"
  }
};
