/* app.js — れきしの人, Year 9 Unit 12.

   Six rungs over six articles. Each rung is one of the things the paper
   test actually asks for, in the order a student can get at them: the
   words, the article, the questions, the translation, the re-read
   against their own record, and the six side by side.

   THE SCORE ONLY GOES DOWN. It starts at what a rung is worth and every
   support spends from it. Nothing is locked: a student who needs the
   meaning of every word can have it and still finish. The top score is
   only reachable unaided, which is the incentive for the ones who want
   one, and the student who needs help is never stopped.

   NOTHING IS RECORDED AND NOTHING IS SENT. The score lives in this
   browser. Save writes a line of text they can screenshot. */
(function(){
  "use strict";
  var K = window.KIJI, CLIPS = (window.KIJI_AUDIO || {}).clips || {};
  var $ = function(id){ return document.getElementById(id); };
  function esc(s){
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }
  function each(scope, sel, fn){
    Array.prototype.forEach.call((scope || document).querySelectorAll(sel), fn);
  }
  function shuffle(a){
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random()*(i+1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  var RUN = /([一-鿿々]+)\[([ぁ-ゟー]+)\]/g;
  function plain(t){ return String(t||"").replace(RUN,"$1").replace(/[《》]/g,""); }
  function kana(t){ return String(t||"").replace(RUN,"$2").replace(/[《》]/g,""); }
  function speakable(t){ return plain(t).replace(/[\s　]+/g,""); }

  /* ---- furigana the worksheets left off ----
     A worksheet rubies a kanji once and leaves it bare after that. On
     paper that is fine; on a screen, for a student who needs the ruby,
     it is the difference between reading the line and stopping at it.
     So the page remembers every reading an article gives and puts it
     back on every later occurrence, and falls back to the unit's table
     for the two the worksheets never ruby at all. */
  function rubify(text, learnt){
    var FB = K.readings || {};
    var out = "", i = 0;
    while (i < text.length){
      var m = /^([一-鿿々]+)\[([ぁ-ゟー]+)\]/.exec(text.slice(i));
      if (m){
        for (var c = 0; c < m[1].length; c++) learnt[m[1][c]] = true;
        out += "<ruby>" + esc(m[1]) + "<rt>" + esc(m[2]) + "</rt></ruby>";
        i += m[0].length; continue;
      }
      var ch = text[i];
      if (/[一-鿿々]/.test(ch)){
        /* 何ですか is なん and 何を is なに, which is a rule and not a
           lookup, so it is read off what follows. */
        var r = FB[ch];
        if (ch === "何") r = /^[でだ]/.test(text.slice(i+1)) ? "なん" : "なに";
        out += r ? "<ruby>" + esc(ch) + "<rt>" + esc(r) + "</rt></ruby>" : esc(ch);
        i++; continue;
      }
      out += esc(ch); i++;
    }
    return out;
  }
  function ruby(t){ return rubify(String(t||"").replace(/[《》]/g,""), {}); }

  /* ---- sound ---- */
  var SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYA"
    + "AESsAAACABAAZGF0YQAAAAA=";
  var el0 = null, woken = false;
  function sound(){ if (!el0){ el0 = new Audio(); el0.preload = "auto"; } return el0; }
  ["pointerdown","touchstart","keydown"].forEach(function(ev){
    document.addEventListener(ev, function(){
      if (woken) return; woken = true;
      try { var a = sound(); a.src = SILENCE; a.play().catch(function(){}); } catch(e){}
    }, { once:true, passive:true });
  });
  function say(text){
    var f = CLIPS[speakable(text)];
    if (!f) return false;
    var a = sound();
    try { a.pause(); a.currentTime = 0; } catch(e){}
    a.src = "audio/" + f;
    try { a.playbackRate = S.rate; } catch(e){}
    a.play().catch(function(){});
    return true;
  }
  function hasvoice(t){ return !!CLIPS[speakable(t)]; }
  function saybtn(t){
    if (!hasvoice(t)) return "";
    return '<button class="tool" style="min-height:30px;padding:0 8px"'
      + ' data-say="' + esc(speakable(t)) + '" aria-label="Listen">▶</button>';
  }
  document.body.classList.toggle("hasvoice", !!Object.keys(CLIPS).length);

  /* ---- what the page remembers ---- */
  var KEY = "jinbutsu-v1";
  var S = { furi:true, en:true, rate:1, pts:0, spent:0, done:{}, best:{}, wrote:{} };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch(e){}
  var saveT = null;
  function save(){
    clearTimeout(saveT);
    saveT = setTimeout(function(){
      try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){}
    }, 250);
  }
  function paintToggles(){
    document.body.classList.toggle("nofuri", !S.furi);
    document.body.classList.toggle("noen", !S.en);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("enBtn").classList.toggle("off", !S.en);
    $("rateLabel").textContent = "×" + S.rate;
    $("rateBtn").classList.toggle("off", S.rate !== 1);
    $("ptsn").textContent = S.pts;
    $("pts").title = S.spent
      ? S.pts + " points. " + S.spent + " spent on support."
      : S.pts + " points, nothing spent on support yet.";
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; save(); paintToggles(); };
  $("enBtn").onclick = function(){ S.en = !S.en; save(); paintToggles(); };
  var RATES = [0.7, 1, 1.2];
  $("rateBtn").onclick = function(){
    S.rate = RATES[(RATES.indexOf(S.rate)+1) % RATES.length] || 1;
    save(); paintToggles();
    var v = null;
    (K.vocab||[]).forEach(function(x){ if (!v && hasvoice(x.ja)) v = x; });
    if (v) say(v.ja);
  };
  $("resetBtn").onclick = function(){
    if (!confirm("Clear your score, your records and anything typed on this device?")) return;
    S = { furi:true, en:true, rate:1, pts:0, spent:0, done:{}, best:{}, wrote:{} };
    try { localStorage.removeItem(KEY); } catch(e){}
    draw();
  };
  /* Nothing is recorded anywhere, so the only way to show somebody is to
     take it with you. A line of text they can screenshot or paste. */
  $("saveBtn").onclick = function(){
    var best = Object.keys(S.best).map(function(k){
      return k + " " + (S.best[k]/1000).toFixed(1) + "s";
    }).join(", ");
    var line = "れきしの人 · " + S.pts + " points"
      + (S.spent ? " (" + S.spent + " spent on support)" : " with no support used")
      + " · " + Object.keys(S.done).length + " of " + STEPS.length * K.people.length
      + " rungs done"
      + (best ? " · best reads: " + best : "")
      + " · " + new Date().toLocaleDateString("en-AU");
    var ta = document.createElement("textarea");
    ta.value = line;
    ta.style.cssText = "position:fixed;inset:auto 10px 10px 10px;z-index:90;"
      + "height:84px;font-size:15px;padding:9px;border:2px solid #16375e;border-radius:9px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch(e){}
    alert("Copied, and shown at the bottom of the screen so you can screenshot it:\n\n"
      + line + "\n\nNothing is sent anywhere. This is the only record there is.");
    setTimeout(function(){ ta.remove(); }, 20000);
  };

  /* ---- the score ----
     spend() is the only way points leave. Every support calls it, which
     is what makes the top score mean "unaided" rather than "fast". */
  function award(n){ S.pts += n; save(); paintToggles(); }
  function spend(n, why){
    S.pts = Math.max(0, S.pts - n); S.spent += n; save(); paintToggles();
    var t = $("spenttip");
    if (t) t.textContent = "−" + n + " " + why;
  }

  /* ---- the kana chart ----
     For the students who have trained themselves to need romaji. There
     is none here. Tap a kana in the article and the grid opens with
     that kana lit in its row and column, so they have to see where it
     sits in あいうえお to find it. Being shown "ka" teaches nothing;
     finding か in the か row is the thing that transfers.

     It costs a point, like every other support. */
  var GYO = [
    ["", "あ","い","う","え","お"],
    ["か","か","き","く","け","こ"],
    ["さ","さ","し","す","せ","そ"],
    ["た","た","ち","つ","て","と"],
    ["な","な","に","ぬ","ね","の"],
    ["は","は","ひ","ふ","へ","ほ"],
    ["ま","ま","み","む","め","も"],
    ["や","や","","ゆ","","よ"],
    ["ら","ら","り","る","れ","ろ"],
    ["わ","わ","","","","を"],
    ["ん","ん","","","",""]
  ];
  var DAKU = { "が":"か","ぎ":"き","ぐ":"く","げ":"け","ご":"こ",
    "ざ":"さ","じ":"し","ず":"す","ぜ":"せ","ぞ":"そ",
    "だ":"た","ぢ":"ち","づ":"つ","で":"て","ど":"と",
    "ば":"は","び":"ひ","ぶ":"ふ","べ":"へ","ぼ":"ほ",
    "ぱ":"は","ぴ":"ひ","ぷ":"ふ","ぺ":"へ","ぽ":"ほ" };
  function toHira(ch){
    var c = ch.charCodeAt(0);
    if (c >= 0x30a1 && c <= 0x30f6) return String.fromCharCode(c - 0x60); /* katakana */
    return ch;
  }
  function kanaChart(ch, free){
    var h = toHira(ch), base = DAKU[h] || h;
    if (!free) spend(1, "kana chart");
    var box = document.createElement("div");
    box.className = "sheet";
    box.innerHTML = '<div class="card"><h3>'
      + esc(ch) + (h !== ch ? '　<span style="font-size:.8em;color:var(--muted)">'
          + esc(h) + '</span>' : '')
      + '</h3><p>Find it in the grid. Its row is the sound it starts with and '
      + 'its column is the vowel. No romaji: knowing where it sits is what '
      + 'makes it stick.</p><div class="kgrid" id="kg"></div>'
      + '<div class="row" style="margin-top:12px">'
      + '<button class="btn ghost sm" id="kclose">Close</button>'
      + (hasvoice(h) ? '<button class="btn sm" data-say="' + esc(h) + '">Hear it</button>' : '')
      + '</div></div>';
    document.body.appendChild(box);
    var cells = [];
    GYO.forEach(function(row){
      row.slice(1).forEach(function(k){
        cells.push('<button' + (k ? "" : " disabled")
          + (k && k === base ? ' class="hit"' : '') + '>' + esc(k) + '</button>');
      });
    });
    box.querySelector("#kg").innerHTML = cells.join("");
    box.querySelector("#kclose").onclick = function(){ box.remove(); };
    box.onclick = function(ev){ if (ev.target === box) box.remove(); };
    each(box, "[data-say]", function(b){ b.onclick = function(){ say(b.dataset.say); }; });
  }

  /* ---- the words of this unit, looked up from the article ---- */
  var VBY = {};
  (K.vocab || []).forEach(function(v){
    VBY[plain(v.ja).replace(/[\s　〜]/g,"")] = v;
  });
  function lookup(word){
    var w = plain(word).replace(/[\s　、。]/g,"");
    if (VBY[w]) return VBY[w];
    for (var i = w.length; i >= 2; i--){
      if (VBY[w.slice(0,i)]) return VBY[w.slice(0,i)];
    }
    return null;
  }

  /* ---- the rungs ---- */
  var STEPS = [
    { id:"kotoba", ja:"ことば",   en:"The words" },
    { id:"yomu",   ja:"よむ",     en:"Read it" },
    { id:"toi",    ja:"しつもん", en:"Questions" },
    { id:"yaku",   ja:"やくす",   en:"Translate" },
    { id:"hayaku", ja:"はやく",   en:"Read it again" },
    { id:"kuraberu", ja:"くらべる", en:"All six" }
  ];
  var at = 0, who = 0, DRAW = {};
  function P(){ return K.people[who % K.people.length]; }
  function tag(){ return STEPS[at].id + ":" + P().id; }

  function paintSteps(){
    $("steps").innerHTML = STEPS.map(function(s,i){
      var all = s.id === "kuraberu"
        ? S.done[s.id] : K.people.every(function(p){ return S.done[s.id+":"+p.id]; });
      return '<button data-i="'+i+'"'+(i===at?' aria-current="step"':'')
        + '><b>'+esc(s.ja)+'</b><i'+(all?' class="done"':'')+'>'
        + esc(s.en)+(all?" ✓":"")+'</i></button>';
    }).join("");
    each($("steps"),"[data-i]",function(b){
      b.onclick = function(){ at = +b.dataset.i; draw(); };
    });
    var hide = STEPS[at].id === "kuraberu";
    $("whobar").style.display = hide ? "none" : "";
    $("whobar").innerHTML = hide ? "" : K.people.map(function(p,i){
      return '<button data-w="'+i+'"'+(i===who?' aria-current="true"':'')+'>'
        + esc(plain(p.name_ja)) + (S.done[STEPS[at].id+":"+p.id] ? " ✓" : "") + '</button>';
    }).join("");
    each($("whobar"),"[data-w]",function(b){
      b.onclick = function(){ who = +b.dataset.w; draw(); };
    });
  }
  function done(){ S.done[tag()] = 1; save(); paintSteps(); }
  function wireSay(){
    each($("main"),"[data-say]",function(b){
      b.onclick = function(ev){ ev.stopPropagation(); say(b.dataset.say); };
    });
  }
  function foot(html){
    return '<div class="foot"><span class="score" id="spenttip"></span>'
      + '<span class="sp"></span>' + (html||"") + '</div>';
  }
  function draw(){
    paintToggles(); paintSteps();
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
    wireSay();
  }

  /* ---- 1. ことば ----
     The unit's words, as a listening task. The card plays and shows a
     number, never the word: a student has to hear it, decide, and put
     it somewhere, which is a different job from reading 生まれました and
     finding "was born" in the next column. */
  var kRound = 0, kOrder = null;
  DRAW.kotoba = function(){
    var mine = (K.vocab||[]).filter(function(v){
      return v.group !== "led" || P().id === "led";
    });
    var per = 6, rounds = Math.ceil(mine.length / per);
    kRound = kRound % rounds;
    if (!kOrder || kOrder.length !== mine.length) kOrder = shuffle(mine);
    var set = kOrder.slice(kRound*per, kRound*per+per);
    var silent = !Object.keys(CLIPS).length;
    var chips = shuffle(set), slots = shuffle(set), left = set.length, pick = null;
    $("main").innerHTML =
        '<div class="rule"><b>The words</b>Press a card to hear it, then put '
      + 'it on its meaning. The spelling appears once it lands, so listen '
      + 'first and read after.</div>'
      + '<div class="work"><div id="slots"></div></div>'
      + foot('<div id="tray" style="display:flex;gap:7px;flex-wrap:wrap"></div>'
        + '<span class="sp"></span><span class="score" id="sc"></span>'
        + '<button class="btn ghost sm" id="next">Next six</button>');
    $("slots").innerHTML = slots.map(function(x){
      return '<div class="qrow" data-m="'+esc(x.ja)+'" style="border:2px dashed '
        + 'var(--line);border-radius:9px;padding:8px 11px;cursor:pointer">'
        + '<span class="en">'+esc(x.en)+'</span><span class="got"></span></div>';
    }).join("");
    $("tray").innerHTML = chips.map(function(x,i){
      return '<button class="btn ghost sm" data-w="'+esc(x.ja)+'">'
        + (silent ? esc(plain(x.ja)) : (i+1) + ' ▶') + '</button>';
    }).join("");
    function sc(){ $("sc").innerHTML = '<b>'+(set.length-left)+'</b> of '+set.length
      + ' · set ' + (kRound+1) + ' of ' + rounds; }
    sc();
    each($("main"),"[data-w]",function(b){
      b.onclick = function(){
        say(b.dataset.w);
        each($("main"),"[data-w]",function(x){ x.classList.remove("btn"); x.className="btn ghost sm"; });
        b.className = "btn sm"; pick = b;
      };
    });
    each($("main"),"[data-m]",function(slot){
      slot.onclick = function(){
        if (!pick || slot.dataset.got) return;
        var v = (K.vocab||[]).filter(function(x){ return x.ja === pick.dataset.w; })[0];
        if (slot.dataset.m === pick.dataset.w){
          slot.dataset.got = "1";
          slot.style.borderStyle = "solid";
          slot.style.borderColor = "var(--ok)";
          slot.querySelector(".got").innerHTML =
            ' <span class="jp" style="font-family:var(--jp);font-size:18px">'
            + ruby(v.ja) + '</span> ' + saybtn(v.ja);
          pick.remove(); pick = null; left--; sc(); wireSay();
          award(1);
          if (!left) done();
        } else {
          slot.style.borderColor = "var(--accent)";
          setTimeout(function(){ slot.style.borderColor = "var(--line)"; }, 600);
        }
      };
    });
    $("next").onclick = function(){
      kRound++;
      if (kRound >= rounds){ kRound = 0; kOrder = shuffle(mine); }
      draw();
    };
  };

  /* ---- 2. よむ ----
     The article, in a narrow column, with the support one tap away and
     costing a point. Tap a word for its meaning; tap a kana for the
     chart. Nothing is hidden and nothing is free. */
  function article(p, opts){
    opts = opts || {};
    var learnt = {};
    return p.paras.map(function(para){
      var out = "", i = 0, ul = false;
      while (i < para.length){
        var ch = para[i];
        if (ch === "《"){ ul = true; out += '<span class="ul">'; i++; continue; }
        if (ch === "》"){ ul = false; out += '</span>'; i++; continue; }
        /* a run is a word-ish chunk: Andrew spaces his text at the
           phrase boundaries, which is the only record of where one word
           stops and the next starts once the kanji are bare */
        var m = /^[^\s　《》]+/.exec(para.slice(i));
        if (!m){ out += esc(ch); i++; continue; }
        var chunk = m[0];
        out += '<span class="w' + (lookup(chunk) ? ' known' : '') + '" data-word="'
             + esc(chunk) + '">' + rubify(chunk, learnt) + '</span>';
        i += chunk.length;
      }
      if (ul) out += '</span>';
      return '<p class="para">' + out + '</p>';
    }).join("");
  }
  function wireArticle(scope){
    each(scope, "[data-word]", function(sp){
      sp.onclick = function(ev){
        ev.stopPropagation();
        var word = sp.dataset.word;
        /* Tapping a single kana asks about that kana; tapping a word
           asks about the word. A student does one or the other and the
           page should not make them choose from a menu. */
        var bare = plain(word).replace(/[、。]/g,"");
        if (bare.length === 1 && /[ぁ-ヿ]/.test(bare)) return kanaChart(bare);
        var v = lookup(word);
        each(scope, ".w.lit", function(x){ x.classList.remove("lit"); });
        sp.classList.add("lit");
        var tip = $("tip");
        if (!tip) return;
        if (v){
          spend(1, "word meaning");
          tip.innerHTML = '<div class="mark yes"><b>' + esc(plain(v.ja)) + '</b>'
            + esc(v.en) + ' ' + saybtn(v.ja) + '</div>';
        } else {
          /* Not in the unit list. Say so rather than inventing a gloss:
             a wrong meaning is worse than no meaning. */
          tip.innerHTML = '<div class="mark hm"><b>Not on the word list</b>'
            + esc(plain(word)) + ' — this one is not one of the unit words. '
            + 'Tap a single kana for the chart, or ask your teacher.</div>';
        }
        wireSay();
      };
    });
  }
  DRAW.yomu = function(){
    var p = P();
    $("main").innerHTML =
        '<div class="rule"><b>Read it</b>Tap any word for its meaning. Tap a '
      + 'single kana for the chart. Both cost a point, and nothing stops you '
      + 'using them. The underlined parts are the ones the paper asks you to '
      + 'translate.</div>'
      + '<div class="work"><div class="col">'
      + '<p class="score" style="margin-bottom:8px">' + esc(p.name_en)
      + ' · <span class="en">' + esc(p.what_en) + '</span></p>'
      + article(p) + '</div></div>'
      + '<div id="tip"></div>'
      + foot('<button class="btn sm" id="read">I have read it</button>');
    wireArticle($("main"));
    $("read").onclick = function(){ award(3); done(); $("read").disabled = true; };
  };

  /* ---- 3. しつもん ----
     The paper's own questions, in the paper's own language. The marker
     looks for the content the answer turns on, never an exact string: a
     short Japanese answer has too many right forms for a match to be
     fair, and 大阪です and 大阪に住んでいます are both right.

     Where a question cannot be answered from the article at all —
     question 8 on Iwasaki asks what Mitsubishi makes today — it says so
     instead of marking a student wrong for not finding it. */
  function norm(s){
    return String(s||"").toLowerCase()
      .replace(/[\s　.,。、!?？！'"’”]/g,"");
  }
  function judge(q, got){
    var n = norm(got);
    if (!n) return null;
    if (q.note) return { kind:"hm", msg:"This one is not in the article. " + q.note };
    function hit(list){
      return (list||[]).some(function(k){ return n.indexOf(norm(k)) >= 0; });
    }
    var a = hit(q.key), b = !q.key2 || hit(q.key2);
    if (a && b) return { kind:"yes" };
    if (a || b) return { kind:"part", msg:"Half of it. The answer has two parts." };
    return { kind:"no" };
  }
  DRAW.toi = function(){
    var p = P(), qs = p.questions;
    $("main").innerHTML =
        '<div class="rule"><b>Questions</b>Answer in the language the question '
      + 'is asked in, the way the paper does. Show the article if you need '
      + 'it, and that costs a point.</div>'
      + '<div class="work"><div class="col" id="qs"></div></div>'
      + '<div id="tip"></div>'
      + foot('<span class="score" id="sc"></span>'
        + '<button class="btn ghost sm" id="peek">Show the article</button>'
        + '<button class="btn sm" id="chk">Check</button>');
    $("qs").innerHTML = qs.map(function(q,i){
      return '<div class="qrow"><div class="q'+(q.lang==="en"?" en":"")+'">'
        + (i+1) + '. ' + (q.lang==="ja" ? ruby(q.q) : esc(q.q))
        + ' ' + (q.lang==="ja" ? saybtn(q.q) : "") + '</div>'
        + '<input class="ans'+(q.lang==="en"?" en":"")+'" data-q="'+i+'"'
        + ' autocomplete="off" autocapitalize="off" spellcheck="false"'
        + (q.lang==="ja" ? ' lang="ja"' : '') + '>'
        + '<div class="fb" data-fb="'+i+'"></div></div>';
    }).join("");
    each($("main"),"[data-q]",function(inp){
      inp.value = (S.wrote[p.id+":"+inp.dataset.q] || "");
      inp.oninput = function(){ S.wrote[p.id+":"+inp.dataset.q] = inp.value; save(); };
      inp.onkeydown = function(ev){ if (ev.key === "Enter") check(); };
    });
    function check(){
      var right = 0, asked = 0;
      qs.forEach(function(q,i){
        var inp = $("main").querySelector('[data-q="'+i+'"]');
        var fb = $("main").querySelector('[data-fb="'+i+'"]');
        var v = judge(q, inp.value);
        if (!v){ fb.innerHTML = ""; return; }
        asked++;
        if (v.kind === "yes"){
          right++;
          fb.innerHTML = '<div class="mark yes"><b>Yes</b>'
            + (q.lang==="ja" ? '<span class="jp">'+ruby(q.model)+'</span> '+saybtn(q.model)
                             : esc(q.model)) + '</div>';
          if (!inp.dataset.paid){ inp.dataset.paid = "1"; award(2); }
        } else if (v.kind === "part"){
          fb.innerHTML = '<div class="mark hm"><b>Half</b>'+esc(v.msg)+'</div>';
        } else if (v.kind === "hm"){
          fb.innerHTML = '<div class="mark hm"><b>Not in the article</b>'
            + esc(v.msg) + ' ' + esc(q.model) + '</div>';
        } else {
          fb.innerHTML = '<div class="mark no"><b>Not yet</b>Look again. '
            + 'The answer is in the article.</div>';
        }
      });
      $("sc").innerHTML = '<b>'+right+'</b> of '+qs.length;
      if (right === qs.length) done();
      wireSay();
    }
    $("chk").onclick = check;
    $("peek").onclick = function(){
      spend(2, "article shown");
      $("tip").innerHTML = '<div class="work" style="max-height:34vh"><div class="col">'
        + article(p) + '</div></div>';
      wireArticle($("tip"));
      $("peek").disabled = true;
    };
    check();
  };

  /* ---- 4. やくす ----
     The underlined spans, which are the ones the paper asks for. There
     is no machine here that can mark a translation, and pretending
     otherwise would be the worst thing this app could do. So it takes
     the English, keeps it, and then shows the Japanese broken into its
     words with the unit meanings beside them, for the student to mark
     themselves against. */
  function spans(p){
    var out = [], re = /《([^》]*)》/g, m;
    p.paras.forEach(function(t){ while ((m = re.exec(t))) out.push(m[1]); });
    return out;
  }
  DRAW.yaku = function(){
    var p = P(), sp = spans(p);
    if (!sp.length){
      $("main").innerHTML = '<div class="rule"><b>Translate</b>The worksheet '
        + 'does not underline anything in this article, so there is nothing '
        + 'here to translate. The CAT asks for the Iwasaki passage.</div>'
        + '<div class="work"></div>' + foot("");
      return;
    }
    $("main").innerHTML =
        '<div class="rule"><b>Translate</b>These are the parts the paper '
      + 'underlines. Write your English, then open the words and mark it '
      + 'yourself. No machine can mark a translation honestly, so this one '
      + 'does not pretend to.</div>'
      + '<div class="work"><div class="col" id="sp"></div></div>'
      + foot('<button class="btn sm" id="dn">Done</button>');
    $("sp").innerHTML = sp.map(function(t,i){
      return '<div class="qrow"><div class="q">' + ruby(t) + ' ' + saybtn(t) + '</div>'
        + '<textarea class="ans en" rows="2" data-t="'+i+'"></textarea>'
        + '<div class="row" style="margin-top:5px">'
        + '<button class="btn ghost sm" data-open="'+i+'">Show the words</button></div>'
        + '<div data-words="'+i+'"></div></div>';
    }).join("");
    each($("main"),"[data-t]",function(ta){
      ta.value = S.wrote["t:"+p.id+":"+ta.dataset.t] || "";
      ta.oninput = function(){ S.wrote["t:"+p.id+":"+ta.dataset.t] = ta.value; save(); };
    });
    each($("main"),"[data-open]",function(b){
      b.onclick = function(){
        var i = b.dataset.open;
        spend(2, "words shown");
        var box = $("main").querySelector('[data-words="'+i+'"]');
        var seen = {}, rows = [];
        plain(sp[i]).split(/[\s　]+/).forEach(function(chunk){
          if (!chunk) return;
          var v = lookup(chunk);
          if (v && !seen[v.ja]){ seen[v.ja] = 1;
            rows.push('<tr><td class="jp">'+ruby(v.ja)+'</td><td>'+esc(v.en)+'</td></tr>'); }
        });
        box.innerHTML = rows.length
          ? '<table class="cmp" style="margin-top:6px">'+rows.join("")+'</table>'
          : '<div class="mark hm"><b>Nothing on the list</b>None of these are '
            + 'on the unit word list. Ask your teacher.</div>';
        b.disabled = true;
      };
    });
    $("dn").onclick = function(){ award(3); done(); $("dn").disabled = true; };
  };

  /* ---- 5. はやく ----
     The pacer. A line travels down the column at the speed of the
     student's own best run of this article, the way the invisible
     world-record line travels down a swimming pool.

     It only runs on the RE-READ, after the questions, and the rung says
     so. A student racing a line on a first read will skim, and a race
     you can win by not reading is a race that teaches skimming. On a
     text they have already understood, speed is fluency, which is the
     thing worth chasing.

     There is no record to beat the first time, so the first run just
     sets one. */
  DRAW.hayaku = function(){
    var p = P(), key = p.id;
    var best = S.best[key] || 0;
    var ready = !!S.done["toi:" + p.id];
    $("main").innerHTML =
        '<div class="rule"><b>Read it again</b>' + (ready
          ? 'Now you know what it says, read it again as fast as you can '
            + 'still understand it. The line is your own best run. Beat it.'
          : 'This one is for after the questions. Go and answer them first, '
            + 'then come back and race yourself.')
        + '</div>'
      + '<div class="work"><div class="col readwrap" id="rw">'
      + '<div class="pacer" id="pacer" style="display:none;top:0"></div>'
      + article(p) + '</div></div>'
      + '<div id="tip"></div>'
      + foot('<span class="score" id="sc"></span>'
        + '<button class="btn sm" id="go"' + (ready ? "" : " disabled") + '>'
        + (best ? "Race your record" : "Start") + '</button>'
        + '<button class="btn ghost sm" id="stop" disabled>Finished reading</button>');
    function show(){
      $("sc").innerHTML = best
        ? 'your record <b>' + (best/1000).toFixed(1) + 's</b>'
        : 'no record yet';
    }
    show();
    var t0 = 0, raf = 0;
    function stopRace(){
      if (raf) cancelAnimationFrame(raf);
      raf = 0; $("pacer").style.display = "none";
    }
    $("go").onclick = function(){
      t0 = performance.now();
      $("go").disabled = true; $("stop").disabled = false;
      $("tip").innerHTML = "";
      if (best){
        var wrap = $("rw"), h = wrap.scrollHeight;
        $("pacer").style.display = "";
        (function step(now){
          var k = Math.min(1, (now - t0) / best);
          $("pacer").style.top = (k * h) + "px";
          if (k < 1) raf = requestAnimationFrame(step);
          else stopRace();
        })(performance.now());
      }
    };
    $("stop").onclick = function(){
      var ms = performance.now() - t0;
      stopRace();
      $("go").disabled = false; $("stop").disabled = true;
      /* A time nobody could have read in is not a record. The floor is
         based on the length of this article, not on a guess. */
      var chars = p.paras.join("").replace(RUN,"$1").replace(/[\s　《》]/g,"").length;
      var floor = chars * 60;   /* 60ms a character is already very fast */
      if (ms < floor){
        $("tip").innerHTML = '<div class="mark hm"><b>Too fast to be reading</b>'
          + 'That is ' + (ms/1000).toFixed(1) + 's for ' + chars + ' characters. '
          + 'The record only counts if you actually read it.</div>';
        return;
      }
      var beat = best && ms < best;
      if (!best || ms < best){ S.best[key] = Math.round(ms); best = S.best[key]; save(); }
      show();
      award(beat ? 3 : 1);
      done();
      $("tip").innerHTML = '<div class="mark ' + (beat ? "yes" : "hm") + '">'
        + '<b>' + (beat ? "New record" : (best ? "Not this time" : "Record set")) + '</b>'
        + (ms/1000).toFixed(1) + 's for ' + chars + ' characters'
        + (beat ? '.' : (best ? ', against ' + (best/1000).toFixed(1) + 's.' : '.'))
        + '</div>';
    };
  };

  /* ---- 6. くらべる ----
     All six at once. This is where the English videos land: a student
     who has watched the clip on Saigō has something to put in the row
     that reading alone would not give them. It is also the only screen
     that shows the frame as a frame, one slot per column, which is the
     thing that makes the sixth article easy once the first five are
     known. */
  DRAW.kuraberu = function(){
    var rows = K.people.map(function(p){
      var whole = p.paras.join("");
      function grab(re){ var m = re.exec(whole); return m ? m[1] : "—"; }
      return '<tr><td class="jp">' + ruby(p.name_ja) + '<br>'
        + '<span class="en" style="font-size:12px;color:var(--muted)">'
        + esc(p.name_en) + '</span></td>'
        + '<td>' + (p.born || "—") + '</td>'
        + '<td class="jp">' + esc(grab(/(?:今[^。]*は|今は)[^。]*?([ぁ-ヿ一-鿿]{2,6})に　?住/) ) + '</td>'
        + '<td class="en">' + esc(p.what_en) + '</td>'
        + '<td class="jp">' + (/しょう[来らい]/.test(whole)
            ? esc((/しょう(?:来\[らい\]|らい)、?([^。]{0,24})/.exec(whole)||[,"—"])[1]
                  .replace(RUN,"$1")) : "—") + '</td></tr>';
    }).join("");
    $("main").innerHTML =
        '<div class="rule"><b>All six</b>The same frame six times over. Once '
      + 'you can see the slots, a new person is only new facts in slots you '
      + 'already know. Fill the gaps from the videos as you watch them.</div>'
      + '<div class="work"><table class="cmp"><tr>'
      + '<th>だれ</th><th>生まれた年</th><th>今どこ</th>'
      + '<th class="en">What they are</th><th>しょうらい</th></tr>'
      + rows + '</table>'
      + '<p class="hint" style="margin-top:10px">The last two columns are '
      + 'pulled out of the articles automatically, so check them against the '
      + 'text rather than trusting them.</p></div>'
      + foot('<button class="btn sm" id="dn">Done</button>');
    $("dn").onclick = function(){ S.done["kuraberu"] = 1; award(2); save();
      paintSteps(); $("dn").disabled = true; };
  };

  paintToggles();
  draw();
})();
