/* topics.js — the eight cultural products and practices this cohort chose
   for the oral SAC, with the questions an assessor could ask about each.

   The SAC is not the examination. The student has researched one product or
   practice and the assessor has heard only its name, so the questions here
   are the ones anybody would reach for knowing the topic and nothing else.
   That is the point: a student who has memorised answers to their own nine
   questions has to cope with a tenth.

   Every question carries a width, and a run never goes back up:

     open    what anybody asks first. Answerable from the topic alone, which
             is why `from_topic` is true: there is no honest way to back out
             of 「コンビニとは何ですか」 when your topic is コンビニ.
     shape   who, when, how many, why popular, what goes wrong. The questions
             an assessor reaches for second.
     deep    comparison, judgement, and what the practice says about Japan.

   Within a width the order is shuffled, so two runs on the same topic feel
   like two different assessors rather than two different topics.

   No model answers here, deliberately. The student has researched this and
   the app has not; offering one would be inventing their content for them.

   Same shape as the other data files: one window. line, then pure JSON, so
   no comments may appear inside the object.                               */

window.ORAL_TOPICS = {
  "schema_version": 1,
  "topics": [
    {
      "id": "onsen",
      "name_ja": "おんせん",
      "name_en": "Hot springs",
      "blurb_en": "What they are, the rules, the health claims, and who is kept out",
      "questions": [
        {
          "id": "onsen-o-01",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "おんせんとは 何[なん]ですか。",
          "question_en": "What is an onsen?"
        },
        {
          "id": "onsen-o-02",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "onsen-o-03",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "おんせんに 入[はい]った ことが ありますか。",
          "question_en": "Have you ever been in one?"
        },
        {
          "id": "onsen-s-01",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]には おんせんが どのぐらい ありますか。",
          "question_en": "About how many hot springs are there in Japan?"
        },
        {
          "id": "onsen-s-02",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんは どんな 場所[ばしょ]に 多[おお]いですか。",
          "question_en": "What sort of places have a lot of them?"
        },
        {
          "id": "onsen-s-03",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんに 入[はい]る とき、どんな ルールが ありますか。",
          "question_en": "What rules are there when you get in?"
        },
        {
          "id": "onsen-s-04",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんは 体[からだ]に いいと 言[い]われていますが、どうしてですか。",
          "question_en": "People say hot springs are good for you. Why is that?"
        },
        {
          "id": "onsen-d-01",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの おんせんと 日本[にほん]の おんせんは どう ちがいますか。",
          "question_en": "How are Australian hot springs different from Japanese ones?"
        },
        {
          "id": "onsen-d-02",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんに 入[はい]れない 人[ひと]も いますが、それについて どう 思[おも]いますか。",
          "question_en": "Some people are not allowed in. What do you think about that?"
        },
        {
          "id": "onsen-d-03",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんから 日本[にほん]の 社会[しゃかい]の どんな ことが わかりますか。",
          "question_en": "What do hot springs tell you about Japanese society?"
        }
      ]
    },
    {
      "id": "hanami",
      "name_ja": "花見[はなみ]",
      "name_en": "Cherry blossom viewing",
      "blurb_en": "When it happens, what people do, and why the season matters so much",
      "questions": [
        {
          "id": "hanami-o-01",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "花見[はなみ]とは 何[なん]ですか。",
          "question_en": "What is hanami?"
        },
        {
          "id": "hanami-o-02",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "hanami-o-03",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "花見[はなみ]は いつ しますか。",
          "question_en": "When do people do it?"
        },
        {
          "id": "hanami-s-01",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]で 人[ひと]は 何[なに]を しますか。",
          "question_en": "What do people do at a hanami?"
        },
        {
          "id": "hanami-s-02",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "だれと 花見[はなみ]に 行[い]きますか。",
          "question_en": "Who do people go with?"
        },
        {
          "id": "hanami-s-03",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "さくらは 日本[にほん]の 人[ひと]に とって どうして たいせつですか。",
          "question_en": "Why are cherry blossoms so important to Japanese people?"
        },
        {
          "id": "hanami-s-04",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]の もんだいは 何[なん]ですか。",
          "question_en": "What problems come with hanami?"
        },
        {
          "id": "hanami-d-01",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "「花[はな]より だんご」と いう ことばが ありますが、どういう いみですか。",
          "question_en": "There is a saying, hana yori dango. What does it mean?"
        },
        {
          "id": "hanami-d-02",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアにも 花見[はなみ]のような ぎょうじが ありますか。",
          "question_en": "Is there anything like hanami in Australia?"
        },
        {
          "id": "hanami-d-03",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]の 人[ひと]は きせつの かわりかたを 大事[だいじ]に しますか。",
          "question_en": "Why do Japanese people make so much of the change of seasons?"
        }
      ]
    },
    {
      "id": "oshogatsu",
      "name_ja": "お正月[しょうがつ]",
      "name_en": "New Year",
      "blurb_en": "Three days with family, the shrine visit, and the shops all shut",
      "questions": [
        {
          "id": "oshogatsu-o-01",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "お正月[しょうがつ]とは 何[なん]ですか。",
          "question_en": "What is oshogatsu?"
        },
        {
          "id": "oshogatsu-o-02",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "oshogatsu-o-03",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "お正月[しょうがつ]は いつですか。",
          "question_en": "When is it?"
        },
        {
          "id": "oshogatsu-s-01",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]に 家族[かぞく]と 何[なに]を しますか。",
          "question_en": "What do people do with their families at New Year?"
        },
        {
          "id": "oshogatsu-s-02",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "はつもうでとは 何[なん]ですか。",
          "question_en": "What is hatsumode?"
        },
        {
          "id": "oshogatsu-s-03",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おとしだまは どんな しゅうかんですか。",
          "question_en": "What kind of custom is otoshidama?"
        },
        {
          "id": "oshogatsu-s-04",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして お正月[しょうがつ]の 前[まえ]に、うちを きれいに しますか。",
          "question_en": "Why do people clean the house before New Year?"
        },
        {
          "id": "oshogatsu-d-01",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の お正月[しょうがつ]と オーストラリアの お正月[しょうがつ]は どう ちがいますか。",
          "question_en": "How is New Year in Japan different from New Year in Australia?"
        },
        {
          "id": "oshogatsu-d-02",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]に 店[みせ]が 休[やす]む ことについて、どう 思[おも]いますか。",
          "question_en": "What do you think about the shops closing over New Year?"
        },
        {
          "id": "oshogatsu-d-03",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]の 人[ひと]は お正月[しょうがつ]に 家族[かぞく]と すごしますか。",
          "question_en": "Why do you think Japanese people spend New Year with family?"
        }
      ]
    },
    {
      "id": "bukatsu",
      "name_ja": "ぶかつどう",
      "name_en": "School club activities",
      "blurb_en": "Who runs them, how many hours, senpai and kohai, and black clubs",
      "questions": [
        {
          "id": "bukatsu-o-01",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ぶかつどうとは 何[なん]ですか。",
          "question_en": "What are club activities?"
        },
        {
          "id": "bukatsu-o-02",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "bukatsu-o-03",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どんな ぶかつどうが ありますか。",
          "question_en": "What kinds of clubs are there?"
        },
        {
          "id": "bukatsu-s-01",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 高校生[こうこうせい]は 週[しゅう]に 何回[なんかい]ぐらい ぶかつどうを しますか。",
          "question_en": "About how many times a week do Japanese senior students do club?"
        },
        {
          "id": "bukatsu-s-02",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "せんぱいと こうはいは どんな かんけいですか。",
          "question_en": "What is the relationship between senpai and kohai?"
        },
        {
          "id": "bukatsu-s-03",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ぶかつどうの いい点[てん]は 何[なん]ですか。",
          "question_en": "What are the good points of club activities?"
        },
        {
          "id": "bukatsu-s-04",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "「ブラックぶかつ」とは 何[なん]ですか。",
          "question_en": "What is a black club?"
        },
        {
          "id": "bukatsu-d-01",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうは 勉強[べんきょう]の じゃまに なると 思[おも]いますか。",
          "question_en": "Do you think club activities get in the way of study?"
        },
        {
          "id": "bukatsu-d-02",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 学校[がっこう]の スポーツと どう ちがいますか。",
          "question_en": "How is it different from sport at an Australian school?"
        },
        {
          "id": "bukatsu-d-03",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうから 日本[にほん]の 社会[しゃかい]の 何[なに]が わかりますか。",
          "question_en": "What do club activities tell you about Japanese society?"
        }
      ]
    },
    {
      "id": "shougakkou",
      "name_ja": "小学校[しょうがっこう]の 一日[いちにち]",
      "name_en": "A day at primary school",
      "blurb_en": "Walking there in groups, school lunch, cleaning the classroom",
      "questions": [
        {
          "id": "shougakkou-o-01",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "日本[にほん]の 小学生[しょうがくせい]の 一日[いちにち]は どんな 一日[いちにち]ですか。",
          "question_en": "What is a Japanese primary school student's day like?"
        },
        {
          "id": "shougakkou-o-02",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "shougakkou-o-03",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "小学生[しょうがくせい]は 何時[なんじ]に 学校[がっこう]に 行[い]きますか。",
          "question_en": "What time do they go to school?"
        },
        {
          "id": "shougakkou-s-01",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "小学生[しょうがくせい]は どうやって 学校[がっこう]に 行[い]きますか。",
          "question_en": "How do they get to school?"
        },
        {
          "id": "shougakkou-s-02",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "きゅうしょくとは 何[なん]ですか。",
          "question_en": "What is kyushoku?"
        },
        {
          "id": "shougakkou-s-03",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして 子[こ]どもたちが 学校[がっこう]を そうじしますか。",
          "question_en": "Why do the children clean the school themselves?"
        },
        {
          "id": "shougakkou-s-04",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]では どんな かもくを 勉強[べんきょう]しますか。",
          "question_en": "What subjects do they study?"
        },
        {
          "id": "shougakkou-d-01",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]と オーストラリアの 小学校[しょうがっこう]は どう ちがいますか。",
          "question_en": "How is a Japanese primary school different from an Australian one?"
        },
        {
          "id": "shougakkou-d-02",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "子[こ]どもだけで 学校[がっこう]に 行[い]く ことについて どう 思[おも]いますか。",
          "question_en": "What do you think about children walking to school on their own?"
        },
        {
          "id": "shougakkou-d-03",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "小学校[しょうがっこう]の 生活[せいかつ]から 日本[にほん]の 社会[しゃかい]の 何[なに]が わかりますか。",
          "question_en": "What does primary school life tell you about Japanese society?"
        }
      ]
    },
    {
      "id": "shichigosan",
      "name_ja": "七五三[しちごさん]",
      "name_en": "The 7-5-3 festival",
      "blurb_en": "Why those ages, the shrine visit, the sweets, and the photo business",
      "questions": [
        {
          "id": "shichigosan-o-01",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "七五三[しちごさん]とは 何[なん]ですか。",
          "question_en": "What is shichigosan?"
        },
        {
          "id": "shichigosan-o-02",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "shichigosan-o-03",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "七五三[しちごさん]は いつ ありますか。",
          "question_en": "When does it happen?"
        },
        {
          "id": "shichigosan-s-01",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]の 日[ひ]に 家族[かぞく]は 何[なに]を しますか。",
          "question_en": "What does the family do on the day?"
        },
        {
          "id": "shichigosan-s-02",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして 七[なな]さいと 五[ご]さいと 三[さん]さいですか。",
          "question_en": "Why those three ages?"
        },
        {
          "id": "shichigosan-s-03",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ちとせあめとは 何[なん]ですか。",
          "question_en": "What is chitose-ame?"
        },
        {
          "id": "shichigosan-s-04",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]の 日[ひ]に、子[こ]どもは どんな ふくを 着[き]ますか。",
          "question_en": "What do the children wear?"
        },
        {
          "id": "shichigosan-d-01",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "今[いま]は しゃしんの ために 七五三[しちごさん]を する 家族[かぞく]も いますが、どう 思[おも]いますか。",
          "question_en": "Some families now do it for the photographs. What do you think about that?"
        },
        {
          "id": "shichigosan-d-02",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアにも 子[こ]どもの せいちょうを いわう ぎょうじが ありますか。",
          "question_en": "Is there anything in Australia that marks a child growing up?"
        },
        {
          "id": "shichigosan-d-03",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]から 日本[にほん]の 家族[かぞく]について 何[なに]が わかりますか。",
          "question_en": "What does shichigosan tell you about Japanese families?"
        }
      ]
    },
    {
      "id": "konbini",
      "name_ja": "コンビニ",
      "name_en": "Convenience stores and plastic",
      "blurb_en": "What they sell, why they are everywhere, and the packaging problem",
      "questions": [
        {
          "id": "konbini-o-01",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "コンビニとは 何[なん]ですか。",
          "question_en": "What is a convenience store?"
        },
        {
          "id": "konbini-o-02",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "konbini-o-03",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "日本[にほん]には コンビニが どのぐらい ありますか。",
          "question_en": "About how many are there in Japan?"
        },
        {
          "id": "konbini-s-01",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニでは どんな ものが 買[か]えますか。",
          "question_en": "What can you buy at one?"
        },
        {
          "id": "konbini-s-02",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "だれが コンビニを 使[つか]いますか。",
          "question_en": "Who uses them?"
        },
        {
          "id": "konbini-s-03",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして コンビニは 人気[にんき]が ありますか。",
          "question_en": "Why are they so popular?"
        },
        {
          "id": "konbini-s-04",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニの もんだいは 何[なん]ですか。",
          "question_en": "What is the problem with convenience stores?"
        },
        {
          "id": "konbini-d-01",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "プラスチックの ごみを へらす ために、何[なに]が できますか。",
          "question_en": "What can be done to cut the plastic waste?"
        },
        {
          "id": "konbini-d-02",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "コンビニの 会社[かいしゃ]は どんな ことを していますか。",
          "question_en": "What are the companies themselves doing about it?"
        },
        {
          "id": "konbini-d-03",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 店[みせ]と くらべて、コンビニは どう ちがいますか。",
          "question_en": "How are they different from Australian shops?"
        }
      ]
    },
    {
      "id": "washlet",
      "name_ja": "ウォシュレット",
      "name_en": "Japanese toilets",
      "blurb_en": "What the buttons do, where they came from, and omotenashi",
      "questions": [
        {
          "id": "washlet-o-01",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ウォシュレットとは 何[なん]ですか。",
          "question_en": "What is a washlet?"
        },
        {
          "id": "washlet-o-02",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?"
        },
        {
          "id": "washlet-o-03",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ウォシュレットには どんな きのうが ありますか。",
          "question_en": "What functions does it have?"
        },
        {
          "id": "washlet-s-01",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットは いつから 日本[にほん]に ありますか。",
          "question_en": "How long have they been in Japan?"
        },
        {
          "id": "washlet-s-02",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 家[いえ]には どのぐらい ありますか。",
          "question_en": "How many Japanese homes have one?"
        },
        {
          "id": "washlet-s-03",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "「おとひめ」とは 何[なん]ですか。",
          "question_en": "What is otohime?"
        },
        {
          "id": "washlet-s-04",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットの もんだいは 何[なん]ですか。",
          "question_en": "What are the drawbacks?"
        },
        {
          "id": "washlet-d-01",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "電気[でんき]や 水[みず]を 使[つか]いますが、かんきょうに いいと 思[おも]いますか。",
          "question_en": "They use power and water. Do you think they are good for the environment?"
        },
        {
          "id": "washlet-d-02",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の トイレと オーストラリアの トイレは どう ちがいますか。",
          "question_en": "How are Japanese and Australian toilets different?"
        },
        {
          "id": "washlet-d-03",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ウォシュレットから 日本[にほん]の 「おもてなし」の 考[かんが]えかたが わかりますか。",
          "question_en": "Can you see the idea of omotenashi in the washlet?"
        }
      ]
    }
  ]
};
