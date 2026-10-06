/* app.js — ひと. Describing people, Year 8.

   Six steps. The first five are checks: they put the words in front of the
   student in different shapes so the vocabulary gets met from more than
   one side. The sixth is the only one that cannot be bluffed, because
   nothing on that screen is in Japanese except what the student types.

   What the marker can and cannot do is the important part. It knows the
   facts about each figure, so it can tell a true sentence from a false
   one and a grammatical one from a broken one, and it says which. It
   cannot tell whether a sentence is natural, interesting or well chosen,
   so when it meets something it does not recognise it says so and sends
   it to the teacher rather than calling it wrong. */
"use strict";
(function(){
  var W = window.HITO_WORDS, P = window.HITO_PEOPLE,
      CLIPS = (window.HITO_AUDIO || {}).clips || {};
  var $ = function(id){ return document.getElementById(id); };
  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }
  function each(scope, sel, fn){
    Array.prototype.forEach.call(scope.querySelectorAll(sel), fn);
  }

  /* 漢字[かんじ] in, ruby out. plain() keeps the kanji, kana() takes the
     reading: the marker needs both, because a student may type either. */
  var RUN = /([一-鿿々]+)\[([ぁ-ゟー]+)\]/g;
  function ruby(t){
    return esc(String(t || "")).replace(RUN, function(_, k, r){
      return "<ruby>" + k + "<rt>" + r + "</rt></ruby>";
    });
  }
  function plain(t){ return String(t || "").replace(RUN, "$1"); }
  function kana(t){ return String(t || "").replace(RUN, "$2"); }

  /* ---- the voice ---- */
  var SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYA"
              + "AESsAAACABAAZGF0YQAAAAA=";
  var el0 = null, woken = false;
  function sound(){ if (!el0){ el0 = new Audio(); el0.preload = "auto"; } return el0; }
  function wake(){
    if (woken) return; woken = true;
    var a = sound();
    try {
      a.src = SILENCE; a.muted = true;
      var r = a.play();
      if (r && r.then) r.then(function(){ try { a.pause(); } catch(e){} a.muted = false; })
                        .catch(function(){ a.muted = false; });
      else { try { a.pause(); } catch(e){} a.muted = false; }
    } catch (e){ a.muted = false; }
  }
  ["pointerdown","touchstart","keydown"].forEach(function(ev){
    document.addEventListener(ev, wake, { capture:true, once:true });
  });
  function speakable(t){ return plain(t).replace(/[\s　]+/g, ""); }
  function say(text){
    var clip = CLIPS[speakable(text)];
    if (!clip) return;
    var a = sound();
    try { a.pause(); } catch (e){}
    a.src = "audio/" + clip;
    var r = a.play();
    if (r && r.catch) r.catch(function(){});
  }
  document.body.classList.toggle("hasvoice", !!Object.keys(CLIPS).length);
  function saybtn(text){
    return '<button class="say" data-say="' + esc(speakable(text))
         + '" aria-label="Listen">▶</button>';
  }

  /* ---- what the device remembers, on this device only ---- */
  var KEY = "hito-v1";
  var S = { furi:true, en:true, done:{}, wrote:{} };
  try { var raw = localStorage.getItem(KEY); if (raw){
    var o = JSON.parse(raw); for (var k in S) if (o[k] !== undefined) S[k] = o[k];
  } } catch (e){}
  var saveT = null;
  function save(){
    clearTimeout(saveT);
    saveT = setTimeout(function(){
      try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e){}
    }, 200);
  }
  function paintToggles(){
    document.body.classList.toggle("nofuri", !S.furi);
    document.body.classList.toggle("noen", !S.en);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("enBtn").classList.toggle("off", !S.en);
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; paintToggles(); save(); };
  $("enBtn").onclick = function(){ S.en = !S.en; paintToggles(); save(); };
  $("resetBtn").onclick = function(){
    S.done = {}; S.wrote = {}; save(); draw();
  };

  function shuffle(a){
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---- the figures ----
     Drawn from the facts, so the picture and the answer key cannot drift
     apart. Nothing here is a photograph of anybody. */
  function figure(p, h){
    var f = p.facts;
    var hair = f.colour === "black" ? "#2b2b2b" : "#6b4a2b";
    var tall = f.tall;
    var topY = tall ? 16 : 34;
    var headR = 26, headCX = 70, headCY = topY + headR;
    var shoulder = headCY + headR + 10;
    var footY = 196;
    var eyeR = f.eyes === "big" ? 5.2 : 2.8;
    var g = [];
    g.push('<rect x="0" y="0" width="140" height="210" fill="none"/>');
    /* body */
    g.push('<path d="M' + (headCX - 26) + ' ' + footY + ' L' + (headCX - 20) + ' '
      + shoulder + ' Q' + headCX + ' ' + (shoulder - 9) + ' ' + (headCX + 20) + ' '
      + shoulder + ' L' + (headCX + 26) + ' ' + footY + ' Z" fill="#9fb3c8"/>');
    /* long hair falls behind the shoulders */
    if (f.hair === "long")
      g.push('<path d="M' + (headCX - 30) + ' ' + headCY + ' q0 ' + (headR + 44)
        + ' 11 ' + (headR + 50) + ' l38 0 q11 -6 11 -' + (headR + 50) + ' z"'
        + ' fill="' + hair + '" opacity=".92"/>');
    g.push('<circle cx="' + headCX + '" cy="' + headCY + '" r="' + headR
      + '" fill="#f3ddc8" stroke="#d8bda4" stroke-width="1.5"/>');
    /* the fringe */
    g.push('<path d="M' + (headCX - headR) + ' ' + headCY + ' a' + headR + ' '
      + headR + ' 0 0 1 ' + (headR * 2) + ' 0 q-' + headR + ' -13 -'
      + (headR * 2) + ' 0 z" fill="' + hair + '"/>');
    g.push('<circle cx="' + (headCX - 10) + '" cy="' + (headCY + 2) + '" r="'
      + eyeR + '" fill="#23313d"/>');
    g.push('<circle cx="' + (headCX + 10) + '" cy="' + (headCY + 2) + '" r="'
      + eyeR + '" fill="#23313d"/>');
    g.push('<path d="M' + (headCX - 7) + ' ' + (headCY + 14) + ' q7 5 14 0"'
      + ' fill="none" stroke="#9c6b57" stroke-width="2" stroke-linecap="round"/>');
    if (f.glasses){
      g.push('<g fill="none" stroke="#2f3b47" stroke-width="2">'
        + '<circle cx="' + (headCX - 10) + '" cy="' + (headCY + 2) + '" r="9"/>'
        + '<circle cx="' + (headCX + 10) + '" cy="' + (headCY + 2) + '" r="9"/>'
        + '<path d="M' + (headCX - 1) + ' ' + (headCY + 2) + ' h2"/></g>');
    }
    return '<svg class="fig" viewBox="0 0 140 210" role="img" aria-label="'
      + esc(p.name) + '" style="' + (h ? "max-height:" + h + "px" : "") + '">'
      + g.join("") + '</svg>';
  }

  /* ---- the facts, and the sentences that are true of them ----
     One table. The exercises read it, and so does the marker. */
  function factsOf(p){
    var f = p.facts, out = [];
    out.push({ id:"hair",
      ja: f.hair === "long" ? "かみが 長[なが]いです。" : "かみが 短[みじか]いです。",
      re: f.hair === "long" ? /かみが(ながい|長い)です/ : /かみが(みじかい|短い)です/,
      wrong: f.hair === "long" ? /かみが(みじかい|短い)です/ : /かみが(ながい|長い)です/,
      look: "the hair" });
    out.push({ id:"colour",
      ja: f.colour === "black" ? "かみが くろいです。" : "かみが ちゃいろいです。",
      re: f.colour === "black" ? /かみがくろいです/ : /かみがちゃいろいです/,
      wrong: f.colour === "black" ? /かみがちゃいろいです/ : /かみがくろいです/,
      look: "the colour of the hair" });
    out.push({ id:"eyes",
      ja: f.eyes === "big" ? "目[め]が 大[おお]きいです。" : "目[め]が 小[ちい]さいです。",
      re: f.eyes === "big" ? /(め|目)が(おおきい|大きい)です/ : /(め|目)が(ちいさい|小さい)です/,
      wrong: f.eyes === "big" ? /(め|目)が(ちいさい|小さい)です/ : /(め|目)が(おおきい|大きい)です/,
      look: "the eyes" });
    out.push({ id:"tall",
      ja: f.tall ? "せが 高[たか]いです。" : "せが 高[たか]くないです。",
      re: f.tall ? /せが(たかい|高い)です/ : /せが(たかくない|高くない)です/,
      wrong: f.tall ? /せが(たかくない|高くない)です/ : /せが(たかい|高い)です/,
      look: "how tall they are" });
    if (f.glasses)
      out.push({ id:"glasses", ja:"めがねを かけています。",
        re:/めがねをかけています/, wrong:null, look:"the glasses" });
    p.traits.forEach(function(t){
      var tr = P.traits[t];
      out.push({ id:"t-" + t,
        ja: plain(tr.ja) + (tr.kind === "na" ? "です。" : "です。"),
        re: new RegExp("(" + kana(tr.ja) + "|" + plain(tr.ja) + ")です"),
        wrong: null, look:"what they are like" });
    });
    return out;
  }

  /* ================= the steps ================= */
  var STEPS = [
    { id:"match", ja:"ことば",     en:"Words" },
    { id:"sort",  ja:"い か な",   en:"い or な" },
    { id:"part",  ja:"〜が 〜です", en:"Part by part" },
    { id:"join",  ja:"〜くて",     en:"Joining" },
    { id:"who",   ja:"だれですか", en:"Who is it?" },
    { id:"write", ja:"かいて",     en:"Write it" }
  ];
  var at = 0, DRAW = {};

  function ruleFor(id){
    var r = null;
    P.rules.forEach(function(x){ if (x.step === id) r = x; });
    if (!r) return "";
    return '<div class="rule"><b>' + esc(r.title_en) + '</b>' + esc(r.rule)
      + r.eg.map(function(e){
          return '<div class="eg">' + ruby(e.ja) + '<em>' + esc(e.en) + '</em></div>';
        }).join("") + '</div>';
  }
  function paintSteps(){
    $("steps").innerHTML = STEPS.map(function(s, i){
      return '<button data-i="' + i + '"' + (i === at ? ' aria-current="step"' : '')
        + '><b>' + esc(s.ja) + '</b><i' + (S.done[s.id] ? ' class="done"' : '')
        + '>' + esc(s.en) + (S.done[s.id] ? " ✓" : "") + '</i></button>';
    }).join("");
    each($("steps"), "[data-i]", function(b){
      b.onclick = function(){ at = +b.dataset.i; draw(); };
    });
  }
  function done(id){ S.done[id] = 1; save(); paintSteps(); }
  function wireSay(){
    each($("main"), "[data-say]", function(b){
      b.onclick = function(ev){ ev.stopPropagation(); say(b.dataset.say); };
    });
  }
  function draw(){
    paintToggles(); paintSteps();
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
    wireSay();
  }
  $("legend").innerHTML =
    '<s class="k-i">い</s><s class="k-na">な</s><s class="k-noun">noun</s>';

  /* ---- 1. ことば ---- */
  var mRound = 0, mOrder = null;
  DRAW.match = function(){
    var per = 6, rounds = Math.ceil(W.words.length / per);
    mRound = mRound % rounds;
    /* Shuffled once per visit, so a set is a mix of nouns and both kinds
       of adjective rather than the order they happen to sit in the file. */
    if (!mOrder) mOrder = shuffle(W.words);
    var set = mOrder.slice(mRound * per, mRound * per + per);
    var left = shuffle(set), right = shuffle(set);
    var pick = null, got = 0;
    $("main").innerHTML = ruleFor("match")
      + '<div class="work"><div class="grid" style="grid-template-columns:1fr 1fr">'
      + '<div class="grid cards" id="ja"></div>'
      + '<div class="grid cards" id="en"></div></div></div>'
      + '<div class="foot"><span class="score">Set ' + (mRound + 1) + ' of '
      + rounds + '</span><span class="sp"></span>'
      + '<button class="btn ghost sm" id="next">Next six</button></div>';
    $("ja").innerHTML = left.map(function(x){
      /* A card that holds a play button cannot itself be a button: the
         parser throws the inner one straight back out of the outer one. */
      return '<div class="card" role="button" tabindex="0" data-w="'
        + esc(x.kana) + '">'
        + '<span class="ja k-' + x.kind + '">' + ruby(x.ja) + '</span>'
        + saybtn(x.ja) + '</div>';
    }).join("");
    $("en").innerHTML = right.map(function(x){
      return '<button class="card" data-m="' + esc(x.kana) + '">'
        + esc(x.en) + '</button>';
    }).join("");
    function reset(){ each($("main"), ".card.pick", function(c){ c.classList.remove("pick"); }); }
    each($("main"), "[data-w]", function(b){
      b.onclick = function(){ reset(); pick = b; b.classList.add("pick"); };
    });
    each($("main"), "[data-m]", function(b){
      b.onclick = function(){
        if (!pick) return;
        var ok = pick.dataset.w === b.dataset.m;
        if (ok){
          pick.classList.add("gone"); b.classList.add("gone");
          pick.classList.remove("pick"); pick = null; got++;
          if (got === set.length) done("match");
        } else {
          b.classList.add("no");
          setTimeout(function(){ b.classList.remove("no"); }, 600);
          reset(); pick = null;
        }
      };
    });
    $("next").onclick = function(){ mRound++; draw(); };
  };

  /* ---- 2. い か な ----
     Pick a word, then say which kind it is. The chip goes wherever it is
     sent and is then told whether that was right: a wrong answer is
     marked and handed back, never refused. */
  DRAW.sort = function(){
    var adj = shuffle(W.words.filter(function(x){ return x.kind !== "noun"; }));
    var left = adj.length, pick = null;
    $("main").innerHTML = ruleFor("sort")
      + '<div class="work">'
      + '<div class="slot" id="pool" style="margin-bottom:10px"></div>'
      + '<div class="cols" style="height:auto;min-height:150px">'
      + '<div class="col i" id="ci" role="button" tabindex="0">'
      + '<h4 class="k-i">\u3044</h4><div class="in"></div></div>'
      + '<div class="col na" id="cn" role="button" tabindex="0">'
      + '<h4 class="k-na">\u306a</h4><div class="in"></div></div></div></div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span><span>Tap a word, then tap \u3044 or \u306a.</span></div>';
    $("pool").innerHTML = adj.map(function(x, i){
      return '<button class="chip" data-i="' + i + '" data-k="' + x.kind
        + '" data-w="' + esc(x.kana) + '">' + ruby(x.ja) + '</button>';
    }).join("");
    function score(){
      $("sc").innerHTML = '<b>' + (adj.length - left) + '</b> of ' + adj.length;
    }
    score();
    each($("main"), "[data-i]", function(c){
      c.onclick = function(){
        each($("main"), ".chip.pick", function(x){ x.classList.remove("pick"); });
        pick = c; c.classList.add("pick");
      };
    });
    [["ci", "i"], ["cn", "na"]].forEach(function(pair){
      $(pair[0]).onclick = function(ev){
        if (ev.target.closest(".chip")) return;
        if (!pick) return;
        var c = pick, want = c.dataset.k, ok = want === pair[1];
        pick = null;
        c.classList.remove("pick");
        c.classList.add(ok ? "yes" : "no");
        if (ok){
          $(pair[0]).querySelector(".in").appendChild(c);
          c.classList.add("gone");
          left--; score();
          if (!left) done("sort");
        } else {
          /* Named, with the rule, not just reddened. */
          c.title = c.dataset.w + " is a " + want
            + " adjective: " + (want === "i"
              ? "it ends in \u3044 and changes its own ending."
              : "it needs \u306a before a noun.");
          setTimeout(function(){ c.classList.remove("no"); }, 1400);
        }
      };
    });
  };

  /* ---- 3. 〜が 〜です ---- */
  var pIdx = 0;
  DRAW.part = function(){
    var items = [];
    P.people.forEach(function(p){
      factsOf(p).forEach(function(f){
        if (f.id === "hair" || f.id === "eyes" || f.id === "tall")
          items.push({ p:p, f:f });
      });
    });
    pIdx = pIdx % items.length;
    var it = items[pIdx], p = it.p;
    var all = ["長[なが]い", "短[みじか]い", "大[おお]きい", "小[ちい]さい",
               "高[たか]い", "高[たか]くない"];
    var want = it.f.ja.replace(/^[^が]*が /, "").replace(/です。$/, "");
    var opts = shuffle([want].concat(shuffle(all.filter(function(a){
      return a !== want; })).slice(0, 3)));
    var head = it.f.ja.replace(/ [^ ]+です。$/, "");
    $("main").innerHTML = ruleFor("part")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(p, 230) + '<div style="text-align:center"'
      + ' class="jp">' + esc(p.name) + 'さん</div></div>'
      + '<div class="q"><p class="jp">' + esc(p.name) + 'さんは '
      + ruby(head) + ' <u>　　　</u> です。</p>'
      + '<div class="grid cards" id="opts" style="margin-top:10px"></div>'
      + '<div id="fb"></div></div></div></div>'
      + '<div class="foot"><span class="score">' + (pIdx + 1) + ' of '
      + items.length + '</span><span class="sp"></span>'
      + '<button class="btn sm" id="next">Next</button></div>';
    $("opts").innerHTML = opts.map(function(o){
      return '<button class="card" data-o="' + esc(o) + '">'
        + '<span class="ja k-i">' + ruby(o) + '</span></button>';
    }).join("");
    each($("main"), "[data-o]", function(b){
      b.onclick = function(){
        var ok = b.dataset.o === want;
        each($("main"), "[data-o]", function(x){
          x.classList.toggle("yes", x.dataset.o === want);
          if (x === b && !ok) x.classList.add("no");
        });
        $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
          + '<b>' + (ok ? "Yes" : "Not that one") + '</b>'
          + (ok ? "" : "Look at " + esc(it.f.look) + " again. ")
          + ruby(p.name + "さんは " + it.f.ja) + ' ' + saybtn(p.name + "さんは " + it.f.ja)
          + '</div>';
        wireSay();
        if (ok && pIdx >= items.length - 1) done("part");
      };
    });
    $("next").onclick = function(){ pIdx++; draw(); };
  };

  /* ---- 4. 〜くて・〜で ---- */
  var bIdx = 0;
  DRAW.join = function(){
    bIdx = bIdx % P.builder.length;
    var b = P.builder[bIdx];
    var p = null;
    P.people.forEach(function(x){ if (x.id === b.person) p = x; });
    var parts = b.ja.replace(/。$/, "").split(" ");
    var bank = shuffle(parts);
    $("main").innerHTML = ruleFor("join")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(p, 190) + '</div>'
      + '<div class="q"><p class="en">' + esc(b.en) + '</p>'
      + '<div class="slot" id="line"></div>'
      + '<div class="tiles" id="bank"></div><div id="fb"></div></div>'
      + '</div></div>'
      + '<div class="foot"><span class="score">' + (bIdx + 1) + ' of '
      + P.builder.length + '</span><span class="sp"></span>'
      + '<button class="btn ghost sm" id="clear">Clear</button>'
      + '<button class="btn sm" id="check">Check</button>'
      + '<button class="btn ghost sm" id="next">Next</button></div>';
    function paintBank(){
      $("bank").innerHTML = bank.map(function(t, i){
        return '<button class="chip" data-t="' + i + '">' + ruby(t) + '</button>';
      }).join("");
      each($("bank"), "[data-t]", function(x){
        x.onclick = function(){
          var t = bank.splice(+x.dataset.t, 1)[0];
          line.push(t); paintBank(); paintLine();
        };
      });
    }
    var line = [];
    function paintLine(){
      $("line").innerHTML = line.map(function(t, i){
        return '<button class="chip" data-l="' + i + '">' + ruby(t) + '</button>';
      }).join("");
      each($("line"), "[data-l]", function(x){
        x.onclick = function(){
          var t = line.splice(+x.dataset.l, 1)[0];
          bank.push(t); paintBank(); paintLine();
        };
      });
    }
    paintBank(); paintLine();
    $("clear").onclick = function(){ bank = shuffle(parts); line = []; paintBank(); paintLine(); };
    $("next").onclick = function(){ bIdx++; draw(); };
    $("check").onclick = function(){
      var got = line.join(" "), want = b.ja.replace(/。$/, "");
      var ok = got === want;
      var joined = /くて|で$|で /.test(got);
      $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
        + '<b>' + (ok ? "Yes" : "Not yet") + '</b>'
        + (ok ? ruby(b.ja) + " " + saybtn(b.ja)
              : (line.length < parts.length
                  ? "Every tile has to be used."
                  : (joined ? "The right pieces, the wrong order. The person comes first, then the two descriptions."
                            : "The first description has to change before it can join the second: い becomes くて, な becomes で.")))
        + '</div>';
      wireSay();
      if (ok && bIdx >= P.builder.length - 1) done("join");
    };
  };

  /* ---- 5. だれですか ---- */
  var wIdx = 0;
  DRAW.who = function(){
    var p = P.people[wIdx % P.people.length];
    var fs = factsOf(p);
    var clues = fs.slice(0, 3);
    $("main").innerHTML = ruleFor("who")
      + '<div class="work">'
      + clues.map(function(f){
          return '<p class="jp">' + ruby(f.ja) + ' ' + saybtn(f.ja) + '</p>';
        }).join("")
      + '<div class="grid cards" id="six" style="margin-top:10px"></div>'
      + '<div id="fb"></div></div>'
      + '<div class="foot"><span class="score">' + ((wIdx % P.people.length) + 1)
      + ' of ' + P.people.length + '</span><span class="sp"></span>'
      + '<button class="btn sm" id="next">Next</button></div>';
    $("six").innerHTML = P.people.map(function(x){
      return '<button class="card" data-p="' + esc(x.id) + '"'
        + ' style="text-align:center">' + figure(x, 130)
        + '<span class="ja">' + esc(x.name) + 'さん</span></button>';
    }).join("");
    each($("main"), "[data-p]", function(b){
      b.onclick = function(){
        var ok = b.dataset.p === p.id;
        b.classList.add(ok ? "yes" : "no");
        $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
          + '<b>' + (ok ? "Yes" : "Not that one") + '</b>'
          + (ok ? esc(p.name) + "さん." : "Check " + esc(clues[0].look)
                  + " and " + esc(clues[2].look) + ".") + '</div>';
        if (ok && (wIdx % P.people.length) === P.people.length - 1) done("who");
      };
    });
    $("next").onclick = function(){ wIdx++; draw(); };
  };

  /* ---- 6. かいてみよう ----
     The only screen with no Japanese on it to copy. */
  var zIdx = 0;
  DRAW.write = function(){
    var p = P.people[zIdx % P.people.length];
    var fs = factsOf(p);
    var prev = S.wrote[p.id] || "";
    $("main").innerHTML = ruleFor("write")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(p, 300)
      + '<div style="text-align:center" class="jp">' + esc(p.name) + 'さん</div></div>'
      + '<div class="q"><textarea id="ta" rows="7" spellcheck="false"'
      + ' aria-label="Write three sentences"></textarea>'
      + '<div id="fb"></div></div></div></div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span>'
      + '<button class="btn sm" id="check">Check</button>'
      + '<button class="btn ghost sm" id="next">Another person</button></div>';
    $("ta").value = prev;
    $("next").onclick = function(){ zIdx++; draw(); };
    $("ta").oninput = function(){ S.wrote[p.id] = $("ta").value; save(); };
    $("check").onclick = function(){
      var raw = $("ta").value;
      S.wrote[p.id] = raw; save();
      var lines = raw.split(/[。\n]/).map(function(x){
        return x.replace(/[\s　]+/g, "");
      }).filter(function(x){ return x.length; });
      var out = [], right = 0, joined = false;
      lines.forEach(function(ln){
        var hit = null, bad = null;
        fs.forEach(function(f){ if (!hit && f.re.test(ln)) hit = f; });
        fs.forEach(function(f){ if (!bad && f.wrong && f.wrong.test(ln)) bad = f; });
        if (/くて|で(?!す)/.test(ln)) joined = true;
        if (hit){
          right++;
          out.push('<div class="mark yes"><b>True</b>' + esc(ln) + '</div>');
        } else if (bad){
          out.push('<div class="mark no"><b>Good Japanese, not this person</b>'
            + 'Look at ' + esc(bad.look) + ' again.</div>');
        } else if (!/[぀-ヿ一-鿿]/.test(ln)){
          out.push('<div class="mark no"><b>Not Japanese</b>'
            + esc(ln) + '</div>');
        } else {
          out.push('<div class="mark hm"><b>Cannot check this one</b>'
            + esc(ln) + ' — this page only knows the hair, the eyes, the '
            + 'height, the glasses and what they are like. Whether this is '
            + 'good Japanese is a question for your teacher.</div>');
        }
      });
      if (!lines.length) out.push('<div class="mark no"><b>Nothing yet</b>'
        + 'Three sentences about the person on the left.</div>');
      if (lines.length && !joined)
        out.push('<div class="mark hm"><b>Still to do</b>Join two '
          + 'descriptions in one sentence with くて or で.</div>');
      $("fb").innerHTML = out.join("");
      $("sc").innerHTML = '<b>' + right + '</b> true of ' + esc(p.name) + 'さん';
      if (right >= 3 && joined) done("write");
    };
  };

  paintToggles();
  draw();
})();
