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
     apart. Nothing here is a photograph of anybody.

     A whole person: head, arms, hands, legs, shoes. The hair is a cap that
     sits on top of the skull and stops above the eyes, with long hair
     falling behind the shoulders in two masses drawn before the head so
     they pass behind it. Hair that wraps under the chin reads as a beard,
     which is how the first attempt went wrong.

     One drawing, scaled about the feet, so "tall" and "not tall" are the
     same person at two sizes rather than two different builds. The clothing
     slots take a colour each and default to plain grey. */
  var SKIN = "#f2d9c0", SKINL = "#d9b89a";
  function figure(p, h){
    var f = p.facts;
    var hair = f.colour === "black" ? "#2d2a28" : "#7a5230";
    var c = f.clothes || {};
    var top = c.top || "#9aa9b8", legs = c.bottom || "#55606e",
        shoe = c.shoes || "#363d47";
    var cx = 60, foot = 232, g = [];

    /* behind everything: long hair down past the shoulders */
    if (f.hair === "long"){
      g.push('<path d="M36 44 q-9 60 -4 104 q14 7 18 -2 q-7 -48 -2 -98 z"'
        + ' fill="' + hair + '"/>');
      g.push('<path d="M84 44 q9 60 4 104 q-14 7 -18 -2 q7 -48 2 -98 z"'
        + ' fill="' + hair + '"/>');
    }
    /* legs, then shoes */
    g.push('<rect x="45" y="138" width="12" height="86" rx="6" fill="' + legs + '"/>');
    g.push('<rect x="63" y="138" width="12" height="86" rx="6" fill="' + legs + '"/>');
    g.push('<ellipse cx="49" cy="' + foot + '" rx="11" ry="6" fill="' + shoe + '"/>');
    g.push('<ellipse cx="71" cy="' + foot + '" rx="11" ry="6" fill="' + shoe + '"/>');
    /* arms outside the body, not behind it, or all you see is hands */
    g.push('<rect x="24" y="84" width="11" height="60" rx="5.5" fill="' + top + '"/>');
    g.push('<rect x="85" y="84" width="11" height="60" rx="5.5" fill="' + top + '"/>');
    g.push('<circle cx="29.5" cy="148" r="6" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    g.push('<circle cx="90.5" cy="148" r="6" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    /* neck and body */
    g.push('<rect x="54" y="63" width="12" height="20" fill="' + SKIN
      + '" stroke="' + SKINL + '" stroke-width="1"/>');
    g.push('<path d="M37 142 q-1 -48 5 -55 q9 -5 18 -5 q9 0 18 5 q6 7 5 55 z"'
      + ' fill="' + top + '"/>');
    /* head */
    g.push('<circle cx="' + cx + '" cy="44" r="25" fill="' + SKIN
      + '" stroke="' + SKINL + '" stroke-width="1.5"/>');
    /* ears */
    g.push('<circle cx="35.5" cy="46" r="5" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    g.push('<circle cx="84.5" cy="46" r="5" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    /* the hair cap: over the skull, stopping above the eyes */
    g.push('<path d="M35 44 a25 25 0 0 1 50 0 q-4 -6 -11 -7 q-14 5 -28 2'
      + ' q-7 1 -11 5 z" fill="' + hair + '"/>');
    if (f.hair === "short")
      g.push('<path d="M35 44 q0 8 2 12 q-5 -9 -2 -16 z M85 44 q0 8 -2 12'
        + ' q5 -9 2 -16 z" fill="' + hair + '"/>');
    /* face */
    var er = f.eyes === "big" ? 5 : 2.6;
    g.push('<circle cx="51" cy="47" r="' + er + '" fill="#242f3a"/>');
    g.push('<circle cx="69" cy="47" r="' + er + '" fill="#242f3a"/>');
    if (f.eyes === "big"){
      g.push('<circle cx="52.4" cy="45.4" r="1.6" fill="#fff"/>');
      g.push('<circle cx="70.4" cy="45.4" r="1.6" fill="#fff"/>');
    }
    g.push('<path d="M58 52 q2 3 4 0" fill="none" stroke="' + SKINL
      + '" stroke-width="1.6" stroke-linecap="round"/>');
    g.push('<path d="M53 58 q7 5 14 0" fill="none" stroke="#a9705c"'
      + ' stroke-width="2" stroke-linecap="round"/>');
    if (f.glasses){
      g.push('<g fill="none" stroke="#2f3b47" stroke-width="2">'
        + '<circle cx="51" cy="47" r="9"/><circle cx="69" cy="47" r="9"/>'
        + '<path d="M60 47h0.5"/><path d="M42 45 l-6 -2"/>'
        + '<path d="M78 45 l6 -2"/></g>');
    }
    if (c.hat)
      g.push('<path d="M34 30 a26 26 0 0 1 52 0 z" fill="' + c.hat + '"/>'
        + '<rect x="28" y="28" width="64" height="5" rx="2.5" fill="'
        + c.hat + '"/>');

    /* tall and not tall are the same figure at two sizes, pinned at the
       feet so both stand on the same ground */
    var k = f.tall ? 1 : 0.84;
    return '<svg class="fig" viewBox="0 0 120 240" role="img" aria-label="'
      + esc(p.name) + '"' + (h ? ' style="max-height:' + h + 'px"' : '') + '>'
      + '<g transform="translate(' + cx + ' ' + foot + ') scale(' + k
      + ') translate(' + (-cx) + ' ' + (-foot) + ')">' + g.join("") + '</g>'
      + '</svg>';
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
