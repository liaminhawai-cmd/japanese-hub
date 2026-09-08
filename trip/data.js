/* ============================================================================
   Japan Study Tour 2026 — content
   ----------------------------------------------------------------------------
   Andrew edits THIS file. Nothing here is code you have to understand: it is
   lists of things with labels on them. index.html never needs touching to add
   a sight, a spot or a phrase.

   Conventions, fixed by Andrew:
     - Instructions and body copy in English. Students are Years 8-11.
     - Headings bilingual, JAPANESE FIRST, then English.
     - Every spot ends with a "look" line: something to go and do, so the phone
       sends them back to the real thing instead of holding them.
     - AU spelling. No em dashes in anything a student reads.
     - `photo` is a filename in this folder, or null. Null renders a labelled
       placeholder, so the app works today and improves when photos land.
   ========================================================================== */

window.TRIP = {
  title: { ja: "日本研修旅行", en: "Japan Study Tour" },
  year: 2026,
  // Departure and return, used to work out "which day are we up to".
  start: "2026-09-20",
  end: "2026-10-01",

  days: [
    { n: 1,  date: "2026-09-20", ja: "しゅっぱつ",        en: "Melbourne to Singapore",  note: "18:25 depart Melbourne. Overnight on the plane." },
    { n: 2,  date: "2026-09-21", ja: "きょうと",          en: "Arrive Kansai, on to Kyoto", note: "08:50 land at Kansai. Train to Kyoto, then sightseeing." },
    { n: 3,  date: "2026-09-22", ja: "きょうと",          en: "Kyoto",                   note: "Full day in Kyoto." },
    { n: 4,  date: "2026-09-23", ja: "ひめじ・ひろしま",  en: "Kyoto, Himeji, Hiroshima", note: "Bullet train. Himeji Castle on the way. Peace Park and museum in the afternoon. Night in Hiroshima." },
    { n: 5,  date: "2026-09-24", ja: "みやじま・そうじゃ", en: "Miyajima, then Soja",     note: "Miyajima in the morning. Reach Soja late afternoon for the welcome, then home with your host family." },
    { n: 6,  date: "2026-09-25", ja: "そうじゃ",          en: "Soja: sister school",     note: "First day at the sister school. Welcome assembly, classes with your buddy, and getting dressed in yukata in the afternoon." },
    { n: 7,  date: "2026-09-26", ja: "そうじゃ",          en: "Soja",                    note: "Out around Soja with your buddies: a grape farm, lunch, and making wagashi." },
    { n: 8,  date: "2026-09-27", ja: "そうじゃ",          en: "Soja",                    note: "The whole day with your host family." },
    { n: 9,  date: "2026-09-28", ja: "そうじゃ",          en: "Soja",                    note: "Out to Soja Itsutsuboshi Gakuen for the day, and back to school mid afternoon." },
    { n: 10, date: "2026-09-29", ja: "そうじゃ",          en: "Soja: farewell party",    note: "Tea ceremony and calligraphy, the farewell assembly, then the farewell party in the evening. Your dashimono is tonight." },
    { n: 11, date: "2026-09-30", ja: "こうべ",            en: "Soja, Kobe, fly out",     note: "08:30 leave Soja. Motomachi in Kobe, then Kansai Airport." },
    { n: 12, date: "2026-10-01", ja: "メルボルン",        en: "Home",                    note: "11:00 arrive Melbourne." }
  ]
};

/* ---------------------------------------------------------------------------
   PLACES
   Each place holds sights. Each sight holds spots: the individual things a
   student can stand in front of and tap.
   ------------------------------------------------------------------------- */
window.PLACES = [

  /* ==================== KYOTO ==================== */
  {
    id: "kyoto",
    ja: "京都",
    en: "Kyoto",
    days: "Days 2 and 3",
    intro:
      "Japan's capital for over a thousand years, and the city that got left off " +
      "the bombing list in 1945, which is why so much of it is still standing. " +
      "Our two days here are not locked in, so some of this depends on what the " +
      "group picks.",
    sights: [
      {
        id: "kiyomizu",
        ja: "清水寺",
        en: "Kiyomizu-dera",
        photo: null,
        intro:
          "A temple hanging off the side of a hill on a platform of wooden pillars. " +
          "It has been rebuilt many times. The current main hall dates from 1633.",
        spots: [
          {
            id: "butai",
            ja: "舞台",
            en: "The stage",
            photo: null,
            hook:
              "You are standing on a wooden platform about 13 metres above the " +
              "hillside, held up by 168 pillars, and there is not a single nail " +
              "in the frame holding it together. It is all joinery, cut so the " +
              "timbers lock into each other. In the Edo period there was a " +
              "superstition that if you jumped off and survived, your wish would " +
              "be granted. Records say 234 people tried it. Most of them lived, " +
              "because of the trees below. It is banned now.",
            look:
              "Look over the rail and find where the pillars meet. See if you can " +
              "spot a single bolt or bracket."
          },
          {
            id: "otowa",
            ja: "音羽の滝",
            en: "The Otowa waterfall",
            photo: null,
            hook:
              "Three streams of water fall into a pool, and you drink from one " +
              "with a cup on a long pole. Each stream is supposed to give you a " +
              "different thing: long life, success at school, or luck in love. " +
              "The catch is that drinking from all three is considered greedy, " +
              "and picking two is pushing it. The temple has been running on this " +
              "spring since the year 778, which is what the whole place was built " +
              "around in the first place.",
            look:
              "Watch which stream the queue goes for. Then decide which one you " +
              "would actually pick, and why."
          },
          {
            id: "jishu",
            ja: "地主神社",
            en: "Jishu Shrine",
            photo: null,
            hook:
              "A small shrine behind the main hall with two stones set about 18 " +
              "metres apart. The idea is that you walk from one to the other with " +
              "your eyes shut. Make it, and love goes well for you. If a friend " +
              "has to steer you, you will need a go-between in real life too. It " +
              "has been closed for restoration in recent years, so it may or may " +
              "not be open when we come through.",
            look:
              "Pace out 18 metres somewhere flat and try it with your eyes shut. " +
              "It is further than it sounds."
          },
          {
            id: "sannenzaka",
            ja: "三年坂",
            en: "The approach streets",
            photo: null,
            hook:
              "The stone lanes below the temple are called Sannenzaka and " +
              "Ninenzaka, and the buildings along them are protected, which is " +
              "why there are no tall signs and the vending machines are painted " +
              "brown. There is an old joke that if you trip on Sannenzaka you " +
              "have three years bad luck. Mostly it is a warning to watch the " +
              "steps, because they are worn smooth and people walk them looking " +
              "at their phones.",
            look:
              "Find a vending machine or a convenience store sign and notice what " +
              "colour it is here compared with everywhere else in Japan."
          }
        ]
      },
      {
        id: "kinkakuji",
        ja: "金閣寺",
        en: "Kinkaku-ji, the Golden Pavilion",
        photo: "photos/kyoto-kinkakuji.webp",
        intro:
          "A three-storey pavilion covered in gold leaf, sitting on the edge of a " +
          "pond that reflects it.",
        spots: [
          {
            id: "gold",
            ja: "金箔",
            en: "The gold",
            photo: "photos/kyoto-kinkakuji.webp",
            hook:
              "The top two floors are wrapped in gold leaf, and the leaf used in " +
              "the 1987 restoration was five times thicker than the original. The " +
              "three floors are deliberately in three different architectural " +
              "styles stacked on top of each other: an aristocrat's palace at the " +
              "bottom, a samurai house in the middle, a Chinese Zen hall on top. " +
              "It is one building showing off three different kinds of power at " +
              "once.",
            look:
              "Look at the three storeys separately. The windows change on every " +
              "level. See if you can spot where one style stops and the next starts."
          },
          {
            id: "fire",
            ja: "放火事件",
            en: "It burned down in 1950",
            photo: null,
            hook:
              "What you are looking at is not old. In 1950 a young monk who lived " +
              "at the temple burned it to the ground on purpose, and then tried to " +
              "take his own life on the hill behind. The building went up in about " +
              "an hour. It was rebuilt in 1955 from drawings and photographs. The " +
              "story became one of the most famous novels in Japan.",
            look:
              "Everyone photographs the front from the pond. Turn around and look " +
              "at the hill behind instead."
          }
        ]
      },
      {
        id: "nijo",
        ja: "二条城",
        en: "Nijo Castle",
        photo: null,
        intro:
          "The shogun's residence in Kyoto, built in 1603. This is where the last " +
          "shogun handed power back to the Emperor in 1867.",
        spots: [
          {
            id: "uguisu",
            ja: "うぐいす張り",
            en: "The nightingale floors",
            photo: null,
            hook:
              "The corridor floors chirp when you walk on them. Nails under the " +
              "boards rub against a clamp and squeak, and the sound is close " +
              "enough to a bird that it is called uguisubari, nightingale floor. " +
              "The usual story is that it was an alarm system against assassins. " +
              "Historians argue about whether it was designed that way or just " +
              "what happens when floorboards age. Either way, you cannot cross it " +
              "quietly, and people have tried.",
            look:
              "Try to walk five steps without making a sound. Then watch someone " +
              "else attempt it."
          }
        ]
      }
    ]
  },

  /* ==================== HIMEJI ==================== */
  {
    id: "himeji",
    ja: "姫路",
    en: "Himeji",
    days: "Day 4, on the way to Hiroshima",
    intro:
      "We stop here between Kyoto and Hiroshima to see the best surviving castle " +
      "in Japan. Most Japanese castles you see are concrete rebuilds. This one is " +
      "not.",
    sights: [
      {
        id: "himejijo",
        ja: "姫路城",
        en: "Himeji Castle",
        photo: null,
        intro:
          "Built in its current form in 1609. It is a World Heritage site and a " +
          "National Treasure.",
        spots: [
          {
            id: "shirasagi",
            ja: "白鷺城",
            en: "Why it is white",
            photo: null,
            hook:
              "Its nickname is Shirasagi-jo, the white heron castle, because of " +
              "the colour and the way the roofs spread like wings. The white is " +
              "plaster, and it is not decoration: it is fireproofing, spread over " +
              "the timber and even over the roof tile joints. After the 2009 to " +
              "2015 restoration it came back so bright that people complained it " +
              "looked fake. It has since weathered down.",
            look:
              "Get far enough back to see the whole thing at once, then find the " +
              "line of the roofs. That is where the heron comes from."
          },
          {
            id: "maze",
            ja: "迷路",
            en: "The path is a trap",
            photo: null,
            hook:
              "Walking up to the keep feels like the path is wandering. It is. " +
              "The approach spirals, doubles back and squeezes through narrow " +
              "gates, all designed so an attacking army gets strung out, confused " +
              "and stuck under fire from above. It works so well that visitors " +
              "still get turned around. Nobody ever took this castle. It was never " +
              "successfully attacked.",
            look:
              "As you climb, notice how many times you change direction. Count the " +
              "gates you pass through."
          },
          {
            id: "survived",
            ja: "戦火と地震",
            en: "It should not still be here",
            photo: null,
            hook:
              "Himeji was firebombed in 1945 and the city around the castle was " +
              "flattened. A bomb landed on the keep and did not go off. In 1995 " +
              "the Kobe earthquake hit hard enough to destroy motorways nearby, " +
              "and the castle stood. Local people say a bottle of sake left on an " +
              "altar in the keep did not even fall over.",
            look:
              "Look out from the top over the city. Almost everything you can see " +
              "is newer than the building you are standing in."
          },
          {
            id: "ishiotoshi",
            ja: "石落とし",
            en: "The stone drops",
            photo: null,
            hook:
              "Low down on the walls there are hatches that open straight " +
              "downwards, called ishi-otoshi, stone drops. Defenders opened them " +
              "and dropped rocks, or worse, on anyone at the base of the wall. " +
              "There are also small square, triangular and circular holes all over " +
              "the walls. Those are sama, firing ports. The shape tells you whether " +
              "the person behind it had a gun or a bow.",
            look:
              "Find a triangle hole and a square hole. Work out which one is for an " +
              "archer and which is for a matchlock."
          }
        ]
      }
    ]
  },

  /* ==================== HIROSHIMA ====================
     tone:"quiet" changes the whole skin and swaps the go-and-do prompt. This
     is the one place on the tour that is a memorial rather than a sight, and
     the app has to say so before a student reads a word. */
  {
    id: "hiroshima",
    ja: "広島",
    en: "Hiroshima",
    days: "Day 4, Wednesday afternoon",
    tone: "quiet",
    intro:
      "On the morning of 6 August 1945 an atomic bomb was dropped on this city. " +
      "It detonated about 600 metres above the ground at 8:15. Tens of " +
      "thousands of people were killed immediately, and tens of thousands more " +
      "died afterwards. The Peace Memorial Park is built on the ground where it " +
      "happened.",
    note:
      "This is not a sightseeing stop and the app is deliberately different " +
      "here. Some of what is in the museum is very hard to look at, and there " +
      "is no shame at all in stepping outside for a while. Tell a teacher if " +
      "you need to. People whose families died here still visit, so keep your " +
      "voice down and think about whether a photo is the right thing before " +
      "you take it.",
    sights: [
      {
        id: "peace-park",
        ja: "平和記念公園",
        en: "Peace Memorial Park",
        photo: "photos/hiroshima-dome.webp",
        intro:
          "An open park in the middle of a busy modern city. Before 1945 this " +
          "was the commercial heart of Hiroshima, full of shops and houses.",
        spots: [
          {
            id: "dome",
            ja: "原爆ドーム",
            en: "The A-Bomb Dome",
            photo: "photos/hiroshima-dome.webp",
            hook:
              "It was the Hiroshima Prefectural Industrial Promotion Hall, " +
              "finished in 1915 and designed by a Czech architect, Jan Letzel. " +
              "The bomb went off almost directly above it, 600 metres up and " +
              "about 160 metres to the south east. Everyone inside was killed " +
              "instantly. The reason " +
              "any of it is still standing is that the blast came almost " +
              "straight down rather than sideways, so the walls were pushed " +
              "down into their own foundations instead of being knocked over. " +
              "Hiroshima argued for years about whether to pull it down. It was " +
              "kept, and made a World Heritage site in 1996.",
            look:
              "Look at the buildings behind it. Everything you can see was built " +
              "after 1945. This is the only thing left standing from the city " +
              "that was here before."
          },
          {
            id: "cenotaph",
            ja: "慰霊碑",
            en: "The Cenotaph",
            photo: "photos/hiroshima-cenotaph.webp",
            hook:
              "The stone arch holds a register of the names of everyone known " +
              "to have died because of the bomb, and names are still being " +
              "added as people die of illnesses caused by it. The inscription " +
              "reads 安らかに眠って下さい 過ちは繰返しませぬから. It is usually " +
              "translated as: rest in peace, for the error shall not be " +
              "repeated. Notice that it does not say who made the error. That " +
              "was deliberate, and people have argued about it ever since.",
            look:
              "Stand square in front of the arch and look through it. The flame " +
              "and the Dome line up in the opening. The park was laid out that " +
              "way on purpose."
          },
          {
            id: "children",
            ja: "原爆の子の像",
            en: "The Children's Peace Monument",
            photo: null,
            hook:
              "Sadako Sasaki was two when the bomb fell and seemed unhurt. Ten " +
              "years later she developed leukaemia. She folded paper cranes in " +
              "hospital, because of a belief that a thousand cranes earns you a " +
              "wish, and she died in 1955 aged twelve. Her classmates campaigned " +
              "for a monument to all the children who died. Schools around the " +
              "world still send folded cranes here, and the glass cases beside " +
              "the statue hold them.",
            look:
              "Look at the cases and find the cranes that came from somewhere " +
              "you recognise. Then work out how old Sadako was compared with you."
          },
          {
            id: "flame",
            ja: "平和の灯",
            en: "The Flame of Peace",
            photo: null,
            hook:
              "It has been alight since 1964 and it is meant to keep burning " +
              "until every nuclear weapon on earth is gone. That has not " +
              "happened, so it is still lit. It is not a decoration. It is a " +
              "condition that has not been met.",
            look:
              "It is a promise nobody has been able to keep yet. Decide what you " +
              "think about that while you are standing in front of it."
          },
          {
            id: "museum",
            ja: "平和記念資料館",
            en: "The museum",
            photo: null,
            hook:
              "The museum is mostly ordinary objects that belonged to ordinary " +
              "people: a child's tricycle, a burnt school lunchbox, a watch " +
              "stopped at 8:15, clothing, drawings made by survivors from " +
              "memory. It does not use many statistics. It makes its case by " +
              "showing you one person at a time, which is why it affects people " +
              "so strongly. Take your time and read the small labels.",
            look:
              "If it gets to be too much, step outside and sit down. It is normal " +
              "to feel this way. If you need support, please speak with one of " +
              "your teachers."
          },
          {
            id: "after",
            ja: "そのあとの広島",
            en: "The city that came back",
            photo: null,
            hook:
              "It was said at the time that nothing would grow here for seventy " +
              "years. Trees inside the blast zone budded again the next spring, " +
              "and some of them are still alive and marked around the city. " +
              "Hiroshima today is an ordinary, busy, well-liked city of over a " +
              "million people, famous for its own style of okonomiyaki and for a " +
              "baseball team people are very serious about. That is part of what " +
              "the park is saying too.",
            look:
              "When you leave the park, look at the ordinary city going on around " +
              "it. That contrast is not an accident, it is the point."
          }
        ]
      }
    ]
  },

  /* ==================== MIYAJIMA ==================== */
  {
    id: "miyajima",
    ja: "宮島",
    en: "Miyajima",
    days: "Day 5, morning",
    intro:
      "An island in the Inland Sea with a shrine built out over the water. We get " +
      "here by ferry, then head to Soja in the afternoon.",
    sights: [
      {
        id: "itsukushima",
        ja: "厳島神社",
        en: "Itsukushima Shrine",
        photo: "photos/miyajima-torii.webp",
        intro:
          "A shrine on stilts over the sea, with a gate standing in the water in " +
          "front of it. World Heritage listed.",
        spots: [
          {
            id: "torii",
            ja: "大鳥居",
            en: "The floating gate",
            photo: "photos/miyajima-torii.webp",
            hook:
              "The great gate is about 16 metres tall and it is not bolted or " +
              "sunk into the seabed. It stands there under its own weight. The " +
              "main pillars are single camphor trunks, and the top box is packed " +
              "with stones to hold it down. Finding trees big enough is the reason " +
              "it takes years to replace. The current one went up in 1875.",
            look:
              "Check whether the tide is in or out. At low tide you can walk out " +
              "and stand under it, which is a completely different experience."
          },
          {
            id: "why-water",
            ja: "なぜ海の上",
            en: "Why it is built over water",
            photo: null,
            hook:
              "The whole island was treated as a god, not just a place where a god " +
              "lived. That meant ordinary people were not supposed to set foot on " +
              "it. Building the shrine out over the water was the way around it: " +
              "worshippers arrived by boat and never touched the sacred ground. " +
              "For centuries there were no births and no deaths permitted on the " +
              "island, and people who were dying or about to give birth were taken " +
              "back to the mainland.",
            look:
              "Look at where the buildings meet the water and picture arriving by " +
              "boat, through the gate, instead of walking in."
          },
          {
            id: "deer",
            ja: "しか",
            en: "The deer",
            photo: null,
            hook:
              "The deer wander freely and are treated as messengers of the gods, " +
              "so nobody moves them on. They are also completely shameless. They " +
              "will take a map out of your hand, eat a ticket, or go through an " +
              "open bag. Feeding them is not allowed, partly because paper and " +
              "plastic make them sick.",
            look:
              "Keep your ferry ticket and your snacks zipped away. Then watch how " +
              "many tourists have not worked this out yet."
          }
        ]
      }
    ]
  },

  /* ==================== SOJA ==================== */
  {
    id: "soja",
    ja: "総社",
    en: "Soja",
    days: "Days 5 to 11, the homestay week",
    intro:
      "This is the part of the trip nobody else gets. Soja Nishi Junior High " +
      "School is our sister school, and the whole week runs through an exchange " +
      "program that Soja City itself operates. Soja Nishi is not the only school " +
      "in it: other junior high schools around the city send their students to " +
      "Kew through the same program. Soja is in Okayama Prefecture, on the " +
      "Kibiji, an old road through rice country. Two things here are genuinely " +
      "significant, and if nobody tells you, you will walk past both of them.",
    sights: [
      {
        id: "hofukuji",
        ja: "宝福寺",
        en: "Hofukuji Temple",
        photo: "photos/soja-hofukuji-gate.webp",
        intro:
          "A Zen temple just outside town. Japan's greatest ink painter grew up " +
          "here, and he was a local boy.",
        spots: [
          {
            id: "sesshu",
            ja: "雪舟",
            en: "The boy who drew with his tears",
            photo: "photos/soja-sesshu-landscape.webp",
            fit: "contain",
            credit: "Ink landscape by Sesshu Toyo, 1420 to 1506. Public domain, via Wikimedia Commons.",
            hook:
              "Sesshu was born in 1420 in Akahama, which is now part of Soja, and " +
              "he was sent to this temple as a small boy. The story is that he kept " +
              "painting instead of doing his Zen study, so a priest tied him to a " +
              "pillar as punishment. He cried, and used his toes to draw a mouse " +
              "on the floor with his own tears. The priest came back, saw the " +
              "mouse, thought it was real, and let him go. He grew up to be the " +
              "most famous painter in Japanese history. The picture here is one " +
              "of his, painted as a grown man in ink and nothing else.",
            look:
              "Find the statue of the boy and the mouse. Then think about the fact " +
              "that he came from the same town as your host family."
          },
          {
            id: "hofukuji-pagoda",
            ja: "三重塔",
            en: "The three-storey pagoda",
            photo: "photos/soja-hofukuji-pagoda.webp",
            hook:
              "This pagoda went up in 1376 and is about 18 metres tall. It is the " +
              "second oldest pagoda in the whole prefecture, it is painted " +
              "vermilion, and the roofs are laid with heavy formal tiles. Here is " +
              "the part worth standing still for: in 1575 the temple was caught in " +
              "the wars and burned. Every other building on this site was " +
              "destroyed. This one was not. Everything else you can see around it " +
              "was built afterwards.",
            look:
              "Stand at the base and look up. Then look at the buildings around it " +
              "and remember they are the replacements. This is the survivor."
          },
          {
            id: "zazen",
            ja: "ざぜん",
            en: "Zazen",
            photo: "photos/soja-zazen.webp",
            credit: "Zazen at the Centre Europeen du Zen Rinzai. Via Wikimedia Commons.",
            hook:
              "This is a Rinzai Zen temple, and Zen study here means sitting still " +
              "and doing nothing, on purpose, for a long time. Sitting meditation " +
              "is called zazen. It sounds easy until you try it. If a monk walks " +
              "past with a flat wooden stick, that is a kyosaku, and being tapped " +
              "with it is not a punishment. You ask for it, to help you refocus.",
            look:
              "Try sitting completely still for two minutes without touching your " +
              "phone. Notice how long two minutes is."
          }
        ]
      },
      {
        id: "kokubunji",
        ja: "備中国分寺",
        en: "Bitchu Kokubunji",
        photo: "photos/soja-kokubunji-pagoda.webp",
        intro:
          "The five-storey pagoda standing in the rice fields. It is the symbol of " +
          "this whole area, and it is on an emperor's orders from over 1200 years " +
          "ago.",
        spots: [
          {
            id: "shomu",
            ja: "聖武天皇",
            en: "An emperor ordered this",
            photo: "photos/soja-emperor-shomu.webp",
            fit: "contain",
            credit: "Portrait of Emperor Shomu, 701 to 756. Public domain, via Wikimedia Commons.",
            hook:
              "In 741 the Emperor Shomu ordered a temple built in every single " +
              "province in Japan. Not a few. Every one. The country had been " +
              "through disease, famine and revolt, and the plan was to protect the " +
              "whole nation through Buddhism, province by province. These were " +
              "called kokubunji, provincial temples. This is the one for Bitchu " +
              "Province. So this field you are standing in was part of a " +
              "nationwide project ordered from the capital, and the reason it is " +
              "here at all is a decision made in the year 741.",
            look:
              "Look around at how much farmland there is. Then think about what it " +
              "took to build something this size out here, that long ago."
          },
          {
            id: "kokubunji-pagoda",
            ja: "五重塔",
            en: "The five-storey pagoda",
            photo: "photos/soja-kokubunji-pagoda.webp",
            hook:
              "It is about 34 metres tall and you can see it from a long way off " +
              "across the fields. Be careful with the dates though: the Nara period " +
              "original burned down, and what is standing now was rebuilt in 1843 " +
              "to 1844. That still means it has stood through roughly 180 years of " +
              "typhoons and earthquakes in a country that gets plenty of both. " +
              "Japanese pagodas are famously hard to knock down. The central pillar " +
              "and the loosely stacked storeys let the whole thing sway instead of " +
              "snapping.",
            look:
              "Walk around it and watch how it changes against the sky. This is the " +
              "view on half the postcards in Okayama."
          },
          {
            id: "akagome",
            ja: "赤米",
            en: "The red rice, and your timing is good",
            photo: "photos/soja-red-rice.webp",
            hook:
              "The rice planted in front of the temple is akagome, red rice. It is " +
              "an ancient variety, closer to the wild rice Japan started with than " +
              "the white rice everyone eats now, and it was once offered to the " +
              "gods. It is rare. Here is the good bit: it turns red as it ripens " +
              "for about two weeks in the middle of September, and there is a " +
              "festival for it. We are here from the 24th of September. There is a " +
              "real chance you will see the field in colour, and most visitors to " +
              "Japan never do.",
            look:
              "Look at the colour of the field in front of the temple, then " +
              "photograph the pagoda with the red rice in the foreground. That " +
              "shot only exists for a couple of weeks a year."
          }
        ]
      },
      {
        id: "around-soja",
        ja: "そうじゃのまわり",
        en: "Around Soja",
        photo: "photos/soja-muscat-grapes.webp",
        intro:
          "Things that turn up during the homestay week. Okayama grows fruit " +
          "the rest of Japan treats as a luxury.",
        spots: [
          {
            id: "muscat",
            ja: "マスカット",
            en: "Muscat grapes",
            photo: "photos/soja-muscat-grapes.webp",
            hook:
              "Okayama is the muscat capital of Japan, and the green ones you " +
              "will be handed are Muscat of Alexandria. Almost all of Japan's " +
              "crop comes from this prefecture. They are treated as a gift item " +
              "rather than everyday fruit, and a good bunch in a department " +
              "store can cost more than a nice dinner. The reason they grow here " +
              "is the weather: Okayama calls itself Hare no Kuni, the land of " +
              "sunshine, because it gets so little rain. At the farm you pick " +
              "one bunch. Only one, and that is not stinginess: these are top " +
              "grade grapes and a single good bunch is genuinely expensive.",
            look:
              "Take your time choosing your one bunch, then say oishii desu to " +
              "whoever hands it to you. Notice how carefully the fruit is " +
              "presented, because presentation is half of it here."
          }
        ]
      },
      {
        id: "school",
        ja: "総社西中学校",
        en: "Soja Nishi Junior High School",
        photo: null,
        intro:
          "Our sister school. You will be here across several days, in uniform, " +
          "with a buddy. This is not a tour stop. It is a school day.",
        spots: [
          {
            id: "souji",
            ja: "そうじ",
            en: "The students clean the school",
            photo: null,
            hook:
              "There are no cleaners. At the end of the day everyone stops and " +
              "cleans the school: classrooms, corridors, toilets, the lot. It is " +
              "called souji and it is a normal part of the timetable, not a " +
              "punishment. The thinking is that if you have to clean it, you think " +
              "harder about messing it up. You will be doing it too.",
            look:
              "Watch what your buddy picks up without being told. Then do that."
          },
          {
            id: "indoor-shoes",
            ja: "うわばき",
            en: "Shoes off at the door",
            photo: null,
            hook:
              "You swap into indoor shoes at the entrance, and the shoe lockers " +
              "near the door are called getabako. It is not just schools. It is " +
              "houses, some restaurants, and temple buildings. The line between " +
              "outside and inside is taken seriously, and walking in with outdoor " +
              "shoes reads roughly the way walking on someone's bed would at home.",
            look:
              "Check your socks before you leave the house each morning. Holes get " +
              "noticed here."
          },
          {
            id: "bukatsu",
            ja: "部活動",
            en: "Club is not optional-ish",
            photo: null,
            hook:
              "After school almost everyone does bukatsu, a club, and they do it " +
              "seriously: most days, plus weekends, all year. A Japanese student's " +
              "club is closer to a full sporting commitment than a lunchtime " +
              "activity. You are joining two club sessions. You are not expected " +
              "to be good. You are expected to have a go and to bow at the start " +
              "and the end.",
            look:
              "Ask your buddy which club they are in and how many days a week they " +
              "train. Watch their face when you tell them what we do at Kew."
          }
        ]
      },
      {
        id: "homestay",
        ja: "ホームステイ",
        en: "Living with your host family",
        photo: null,
        intro:
          "The best week of the trip, and the part nobody else gets. You live in " +
          "a Japanese house with people who chose to have you there.",
        spots: [
          {
            id: "chance",
            ja: "チャンス",
            en: "Say yes to things",
            photo: null,
            hook:
              "Your host family is paid to host you and they will do their best " +
              "to look after you, so relax: you are not a burden and you do not " +
              "have to earn your place. What you should do is say yes. Try the " +
              "food, even the bit you cannot identify. Go where they take you on " +
              "the weekend. Join in at the club. A week of that will teach you " +
              "more Japanese than a term of lessons, and the families who enjoy " +
              "hosting most are the ones whose student joined in.",
            look:
              "Say yes to one thing this week you would normally say no to. " +
              "Somebody will offer you something odd to eat. Start there."
          },
          {
            id: "guest",
            ja: "いいゲスト",
            en: "Being a good guest",
            photo: null,
            hook:
              "Offer to help. Clear the table, do some washing up, tidy your own " +
              "things away. Offer to wash your own clothes, and do not be " +
              "surprised if they say no, because one load for the whole house is " +
              "easier than a special one for you. Offering is the part that " +
              "counts. Talk to them whenever you can: show photos of home, your " +
              "pets, the beach, your family, and ask about theirs. If the house " +
              "is lovely, say so. If dinner is good, say so. Polite, respectful, " +
              "grateful. That is the whole job, and it is not a hard one.",
            look:
              "Tonight, offer to help with one thing after dinner. Tetsudaimashou " +
              "ka. Even if they wave you away, ask."
          },
          {
            id: "australians",
            ja: "オーストラリア人",
            en: "You are the Australians",
            photo: null,
            hook:
              "One small thing worth keeping in the back of your mind. Kew is the " +
              "only Australian school in this program, so to a lot of people in " +
              "Soja you are simply the Australians, and this group is the one " +
              "they will remember. That is not a weight to carry around. It just " +
              "means friendliness goes further here than it does at home, and " +
              "people will be pleased with you for very little.",
            look:
              "Greet people you pass at school, even the ones you do not know. " +
              "Ohayou gozaimasu costs nothing and it is remembered."
          }
        ]
      },
      {
        id: "culture",
        ja: "文化体験",
        en: "Cultural activities at the school",
        photo: null,
        intro:
          "The sister school and the city put on a run of hands-on sessions: " +
          "school lunch, a day at another school, tea ceremony, character " +
          "practice, making Japanese sweets, and getting dressed in a yukata. " +
          "Specialist teachers come in for several of them, so it is worth " +
          "knowing what you are walking into.",
        spots: [
          {
            id: "kyushoku",
            ja: "給食",
            en: "School lunch",
            photo: null,
            hook:
              "There is no canteen and no choice. Everyone in the class eats the " +
              "same meal, in the classroom, at the same time. It is brought up " +
              "from the kitchen and served by students on the duty roster, in " +
              "white coats and caps, and the turn comes around to everybody. " +
              "Nobody starts until the whole room has said itadakimasu. The menu " +
              "is planned by a nutritionist, there is milk every day, and in " +
              "Okayama a fair bit of it will have been grown nearby.",
            look:
              "Find out whose turn it is to serve today, and ask your buddy how " +
              "often their turn comes around. Then eat what you are given, " +
              "including the bit you are unsure about."
          },
          {
            id: "itsutsuboshi",
            ja: "五つ星学園",
            en: "A day at Itsutsuboshi Gakuen",
            photo: null,
            hook:
              "A whole day out at another school in Soja, across two campuses, " +
              "with their lunch in the middle. The word for what happens there " +
              "is koryu, which means exchange, and it is the one activity on " +
              "this trip with no script. Expect activities together and " +
              "probably games that need you to move and communicate at the same " +
              "time. Nobody will hand you a list of phrases beforehand, which is " +
              "exactly why it works: you will find out how much you can actually " +
              "do with what you know.",
            look:
              "Learn one question you can ask anybody today and use it on at " +
              "least three different people. Nanika supootsu o shimasu ka, do " +
              "you play any sport, will get you a long way."
          },
          {
            id: "sado",
            ja: "茶道",
            en: "Tea ceremony",
            photo: null,
            hook:
              "Sado is not really about drinking tea. It is about somebody making " +
              "it for you with their whole attention, and you receiving it the " +
              "same way. The tea is matcha: powdered green tea whisked with a " +
              "bamboo whisk until it froths, and it is properly bitter. That is " +
              "why the sweet comes first. Eat it, then drink. The bowl has a " +
              "front, the best looking face, and you are not supposed to drink " +
              "from it, so you turn the bowl a couple of times before you sip and " +
              "turn it back before you hand it over. Finish with a slurp. It " +
              "sounds rude and it is the opposite: it tells your host you are done " +
              "and it was good.",
            look:
              "The phrase behind the whole thing is ichigo ichie, one time, one " +
              "meeting. This exact group of people will never be in this room " +
              "together again. See if you can hold that thought for the length of " +
              "one bowl of tea."
          },
          {
            id: "shodo",
            ja: "習字",
            en: "Character practice",
            photo: null,
            hook:
              "Hold the brush upright, not slanted like a pen, and move from your " +
              "elbow and shoulder rather than your fingers. Press down and the " +
              "line goes thick, lift and it goes thin, so the brush is doing two " +
              "jobs at once. The part that catches everyone out is that a brush " +
              "makes stroke order visible. On a keyboard nobody can tell what " +
              "order you built a character in. With ink on paper it shows, and " +
              "your teacher will spot it instantly. There is also no rubbing out. " +
              "You commit to the stroke and live with it.",
            look:
              "You will practise, then write one good copy at the end, and you " +
              "may get to put your character onto something to bring home. Put " +
              "your good copy beside the model and find the single stroke that " +
              "differs most. That one stroke is the lesson."
          },
          {
            id: "wagashi",
            ja: "和菓子",
            en: "Making wagashi",
            photo: null,
            hook:
              "Wagashi are the sweets that go with tea, and they are built to be " +
              "looked at before they are eaten. The ones you shape by hand are " +
              "usually nerikiri: sweet white bean paste, coloured and worked with " +
              "a bamboo tool and the palm of your hand. The shape tells you the " +
              "season, so in late September expect autumn, which means " +
              "chrysanthemums, maple leaves, persimmons and chestnuts. They taste " +
              "far less sweet than an Australian sweet, on purpose, because they " +
              "are made to sit against bitter matcha rather than compete with it. " +
              "Each design has its own name, often a poetic one.",
            look:
              "Before you eat yours, work out what it is supposed to be and which " +
              "season it belongs to. Then ask what its name is."
          }
,
          {
            id: "yukata-what",
            ja: "浴衣",
            en: "What a yukata is",
            photo: "photos/soja-yukata-group.webp",
            hook:
              "A yukata is a kimono. Kimono just means a thing you wear, so it " +
              "covers the whole family of them, and the yukata is the light " +
              "cotton one for summer with no lining. Its name is literally bath " +
              "clothing: 浴 is bath and 衣 is clothing, because it began as what " +
              "you put on after bathing, and it is still what hangs in your room " +
              "at a hot spring inn. Now it is mostly summer festival wear, for " +
              "fireworks and Bon dancing. What people usually picture when they " +
              "say kimono is the formal end of the family: silk, lined, worn " +
              "over an under-robe, needing someone else to put it on you and " +
              "costing more than a car. Yours is the easy end.",
            look:
              "Feel the fabric. Plain cotton, and that is the point: this is " +
              "clothing for a hot night, not a costume."
          },
          {
            id: "yukata-left",
            ja: "左が上",
            en: "Left over right, always",
            photo: "photos/soja-yukata-collar.webp",
            hook:
              "There is one rule that really matters and this is it. Wrap the " +
              "right side against your body first, then bring the left side " +
              "across on top. Left over right. People are strict about it " +
              "because the other way round, right over left, is how a body is " +
              "dressed for a funeral. Getting it backwards is not exactly rude, " +
              "but everyone in the room will notice straight away, the way you " +
              "would notice a jumper on inside out.",
            look:
              "Check yourself before anyone else does. Looking down at your own " +
              "chest, the left panel should be on top and the opening should " +
              "point to your right."
          },
          {
            id: "yukata-wear",
            ja: "着かた",
            en: "The obi, and how to move in it",
            photo: "photos/soja-yukata-obi.webp",
            hook:
              "The belt is an obi. Women wear a wide one tied at the back, often " +
              "in a bow. Men wear a narrow one tied low on the hips, below the " +
              "stomach rather than at the waist. Pull the collar so it sits " +
              "neatly at the throat, and if the whole thing starts riding up, " +
              "adjust it from the back rather than pulling the front open. " +
              "Traditionally you wear geta, wooden sandals, with bare feet. A " +
              "yukata is cut narrow at the bottom, so you cannot take a normal " +
              "Australian stride in one.",
            look:
              "Once you are in it, walk the length of the room and work out how " +
              "short your steps have to be. Then try sitting down neatly. That " +
              "is the actual skill."
          }
        ]
      }
    ]
  },

  /* ==================== KOBE ==================== */
  {
    id: "kobe",
    ja: "神戸",
    en: "Kobe, Motomachi",
    days: "Day 11, about 85 minutes",
    intro:
      "The last stop before the airport, and it is short. Roughly 11:05 to 12:30 " +
      "in Motomachi, then the coach leaves. Know what you want before you arrive.",
    sights: [
      {
        id: "motomachi",
        ja: "元町",
        en: "Motomachi",
        photo: null,
        intro:
          "A port district with a long shopping arcade and Japan's best known " +
          "Chinatown next to it.",
        spots: [
          {
            id: "nankinmachi",
            ja: "南京町",
            en: "Nankinmachi, the Chinatown",
            photo: null,
            hook:
              "Kobe was one of the first ports Japan opened to foreign ships in " +
              "1868 after more than two centuries of near-total isolation. Chinese " +
              "merchants settled here, and Nankinmachi grew out of that. It is a " +
              "few packed streets of street food, and the standard move is to buy " +
              "small things from several stalls rather than sit down anywhere.",
            look:
              "You have well under two hours in total. Decide before you get off " +
              "the coach whether this stop is food or souvenirs, because it is not " +
              "going to be both."
          },
          {
            id: "quake",
            ja: "阪神・淡路大震災",
            en: "1995",
            photo: null,
            hook:
              "In January 1995 an earthquake hit this city before dawn. More than " +
              "6,400 people died, mostly here. Elevated motorways fell on their " +
              "sides and whole blocks burned. Almost everything you are walking " +
              "past was rebuilt after it. Down at the waterfront a section of the " +
              "old quay has been deliberately left broken and tilted, exactly as " +
              "the quake left it, as a memorial.",
            look:
              "Look at the buildings around you and notice how new most of them " +
              "are. That is not a coincidence."
          }
        ]
      }
    ]
  }
];

/* ---------------------------------------------------------------------------
   PHRASES
   Ordered by when a student actually needs them, not by grammar.
   `show` marks the ones worth holding up to a Japanese person to read.
   ------------------------------------------------------------------------- */
window.PHRASES = [
  {
    id: "first",
    ja: "はじめまして",
    en: "The first five minutes",
    note: "Meeting your host family. Learn these properly before you land.",
    items: [
      { ja: "はじめまして。", ro: "Hajimemashite.", en: "Nice to meet you." },
      { ja: "＿＿＿です。どうぞよろしくおねがいします。", ro: "___ desu. Douzo yoroshiku onegai shimasu.", en: "I'm ___. Please be good to me.", tip: "Say your first name. This is the single most useful sentence you own." },
      { ja: "おせわになります。", ro: "Osewa ni narimasu.", en: "Thank you for having me.", tip: "Say this when you first arrive at the house. It means you know they are going to look after you." },
      { ja: "これ、おみやげです。どうぞ。", ro: "Kore, omiyage desu. Douzo.", en: "This is a gift for you. Please take it.", tip: "Hand it over with both hands." }
    ]
  },
  {
    id: "table",
    ja: "しょくじ",
    en: "At the table",
    note: "You will use these every single day.",
    items: [
      { ja: "いただきます。", ro: "Itadakimasu.", en: "Before eating.", tip: "Everyone says it. Do not start before it." },
      { ja: "ごちそうさまでした。", ro: "Gochisousama deshita.", en: "After eating.", tip: "Say it to whoever cooked." },
      { ja: "おいしいです！", ro: "Oishii desu!", en: "This is delicious!", tip: "Use it more than you think you need to." },
      { ja: "おかわりをおねがいします。", ro: "Okawari o onegai shimasu.", en: "Seconds please." },
      { ja: "おなかがいっぱいです。", ro: "Onaka ga ippai desu.", en: "I'm full.", tip: "Kinder than leaving food. Finishing what you take is the polite move." },
      { ja: "すみません、それはたべられません。", ro: "Sumimasen, sore wa taberaremasen.", en: "Sorry, I can't eat that.", show: true, tip: "For an allergy, show the card, do not rely on your accent." }
    ]
  },
  {
    id: "house",
    ja: "いえで",
    en: "Around the house",
    note: "Homestay basics. Ask rather than assume.",
    items: [
      { ja: "ただいま。", ro: "Tadaima.", en: "I'm home.", tip: "Say it every time you walk in." },
      { ja: "いってきます。", ro: "Ittekimasu.", en: "I'm off.", tip: "Say it every time you go out." },
      { ja: "おやすみなさい。", ro: "Oyasuminasai.", en: "Good night." },
      { ja: "おふろにはいってもいいですか。", ro: "Ofuro ni haitte mo ii desu ka.", en: "May I have a bath?", tip: "Wash yourself outside the bath first. The water in it is shared and stays clean for the next person." },
      { ja: "せんたくをしてもいいですか。", ro: "Sentaku o shite mo ii desu ka.", en: "May I do some washing?" },
      { ja: "Wi-Fiをつかってもいいですか。", ro: "Wi-Fi o tsukatte mo ii desu ka.", en: "May I use the wifi?", tip: "Ask once. If the answer is not an easy yes, leave it." },
      { ja: "てつだいましょうか。", ro: "Tetsudaimashou ka.", en: "Shall I help?", tip: "Offer this at least once a day. It lands better than almost anything else you can say." }
    ]
  },
  {
    id: "school",
    ja: "がっこう",
    en: "At school",
    note: "Soja Nishi Junior High School.",
    items: [
      { ja: "おはようございます。", ro: "Ohayou gozaimasu.", en: "Good morning." },
      { ja: "よろしくおねがいします。", ro: "Yoroshiku onegai shimasu.", en: "Please be good to me.", tip: "Say it to a new class, a new buddy, a club, a teacher. It works everywhere." },
      { ja: "ありがとうございました。", ro: "Arigatou gozaimashita.", en: "Thank you (for what you just did).", tip: "Past tense. Use it at the end of a lesson or a club session." },
      { ja: "もういちど、おねがいします。", ro: "Mou ichido, onegai shimasu.", en: "One more time, please." },
      { ja: "ゆっくりおねがいします。", ro: "Yukkuri onegai shimasu.", en: "Slowly, please.", tip: "Better than pretending you understood." },
      { ja: "これはなんですか。", ro: "Kore wa nan desu ka.", en: "What is this?" }
    ]
  },
  {
    id: "out",
    ja: "そとで",
    en: "Out and about",
    note: "Shops, stations, temples.",
    items: [
      { ja: "すみません。", ro: "Sumimasen.", en: "Excuse me / sorry.", tip: "The most useful word in Japan. Opens almost every interaction." },
      { ja: "これをください。", ro: "Kore o kudasai.", en: "This one please.", tip: "Point. It is completely acceptable." },
      { ja: "いくらですか。", ro: "Ikura desu ka.", en: "How much is it?" },
      { ja: "トイレはどこですか。", ro: "Toire wa doko desu ka.", en: "Where is the toilet?", show: true },
      { ja: "しゃしんをとってもいいですか。", ro: "Shashin o totte mo ii desu ka.", en: "May I take a photo?", tip: "Ask before photographing people, and check for no-photo signs inside temple halls." },
      { ja: "だいじょうぶです。", ro: "Daijoubu desu.", en: "I'm fine / it's fine.", tip: "Also how you politely decline a plastic bag." }
    ]
  },
  {
    id: "help",
    ja: "こまったとき",
    en: "If something goes wrong",
    note: "Hold the phone up and let someone read the Japanese. That is what these are for.",
    items: [
      { ja: "たすけてください。", ro: "Tasukete kudasai.", en: "Please help me.", show: true },
      { ja: "みちにまよいました。", ro: "Michi ni mayoimashita.", en: "I am lost.", show: true },
      { ja: "にほんごがすこししかわかりません。えいごをはなせるひとはいますか。", ro: "Nihongo ga sukoshi shika wakarimasen. Eigo o hanaseru hito wa imasu ka.", en: "I only speak a little Japanese. Is there someone who speaks English?", show: true },
      { ja: "びょうきです。びょういんにいきたいです。", ro: "Byouki desu. Byouin ni ikitai desu.", en: "I am unwell. I would like to go to a hospital.", show: true },
      { ja: "せんせいにでんわしてください。", ro: "Sensei ni denwa shite kudasai.", en: "Please call my teacher.", show: true, tip: "Your teachers' numbers are on your lanyard, not in this app. Show the lanyard." }
    ]
  },
  {
    id: "thanks",
    ja: "おわかれ",
    en: "Saying goodbye",
    note: "The last morning. Worth rehearsing so you can get through it.",
    items: [
      { ja: "ほんとうにおせわになりました。", ro: "Hontou ni osewa ni narimashita.", en: "Thank you sincerely for everything.", tip: "This is the one. It carries real weight in Japanese." },
      { ja: "たのしかったです。", ro: "Tanoshikatta desu.", en: "I had a great time." },
      { ja: "また、あいましょう。", ro: "Mata, aimashou.", en: "Let's meet again." },
      { ja: "オーストラリアにきてください。", ro: "Oosutoraria ni kite kudasai.", en: "Please come to Australia." }
    ]
  }
];

/* ---------------------------------------------------------------------------
   MANNERS
   Short, blunt, and only things that actually come up on this trip.
   ------------------------------------------------------------------------- */
window.MANNERS = [
  { ja: "くつ", en: "Shoes", body: "Off at the door, every time, at home and at school and in temple buildings. Point them back towards the door once they are off. Keep your socks in good condition." },
  { ja: "はし", en: "Chopsticks", body: "Never stand them upright in rice and never pass food chopstick to chopstick. Both are done at funerals, so at a dinner table they land badly. Rest them on the holder when you are not eating." },
  { ja: "おふろ", en: "The bath", body: "Wash and rinse completely outside the bath, then get in to soak. The water is not drained between people. Do not put soap in it and do not pull the plug." },
  { ja: "ゴミ", en: "Rubbish", body: "There are almost no public bins. You carry your rubbish until you get home or back to the hotel. Eating while walking is generally not done." },
  { ja: "こえ", en: "Volume", body: "Trains and buses are quiet. No speakerphone, no music out loud, no shouting down the carriage. A group of Australians is louder than it thinks it is." },
  { ja: "おじぎ", en: "Bowing", body: "A small bow from the waist covers hello, thank you and sorry. You do not need to get it perfect. Doing it at all is the point." },
  { ja: "チップ", en: "Tipping", body: "Do not. There is no tipping in Japan and it causes confusion rather than pleasure. Good service is standard, not something you pay extra for." },
  { ja: "けいたい", en: "Phones", body: "The sister school has a zero tolerance phone policy and it applies to us during school hours. At the homestay, less phone means more trip." }
];
