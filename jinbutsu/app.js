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
    var rungs = 0, total = 0;
    STEPS.forEach(function(st){
      if (st.whole){ total++; if (S.done[st.id]) rungs++; }
      else K.people.forEach(function(p){
        total++; if (S.done[st.id + ":" + p.id]) rungs++;
      });
    });
    var line = "れきしの人 · " + S.pts + " points"
      + (S.spent ? " (" + S.spent + " spent on support)" : " with no support used")
      + " · " + rungs + " of " + total + " rungs done"
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
    { id:"bunpou", ja:"ぶんぽう", en:"Grammar", whole:true },
    { id:"yomu",   ja:"よむ",     en:"Read it" },
    { id:"toi",    ja:"しつもん", en:"Questions" },
    { id:"yaku",   ja:"やくす",   en:"Translate" },
    { id:"hayaku", ja:"はやく",   en:"Read it again" },
    { id:"jibun",  ja:"じぶんで", en:"Write your own", whole:true },
    { id:"kuraberu", ja:"くらべる", en:"All six", whole:true }
  ];
  var at = 0, who = 0, DRAW = {};
  function P(){ return K.people[who % K.people.length]; }
  function tag(){ return STEPS[at].id + ":" + P().id; }

  function paintSteps(){
    $("steps").innerHTML = STEPS.map(function(s,i){
      var all = s.whole
        ? S.done[s.id] : K.people.every(function(p){ return S.done[s.id+":"+p.id]; });
      return '<button data-i="'+i+'"'+(i===at?' aria-current="step"':'')
        + '><b>'+esc(s.ja)+'</b><i'+(all?' class="done"':'')+'>'
        + esc(s.en)+(all?" ✓":"")+'</i></button>';
    }).join("");
    each($("steps"),"[data-i]",function(b){
      b.onclick = function(){ at = +b.dataset.i; draw(); };
    });
    var hide = !!STEPS[at].whole;
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

  /* ---- 1. ことば, in three passes ----
     Andrew: "if the words are new to a student, how are they supposed
     to learn them? Do they just guess until they get them right?" They
     did. A six-item match is self-solving — get three and the rest fall
     out by elimination — and matching only ever tests. A student
     meeting 生まれました for the first time had nowhere to learn it.

     So the rung has a meet before the test and a produce after it.

       みる    the word, its meaning, its sound, and the sentence from
               the article where it actually turns up. Nothing to get
               wrong. You press through.
       えらぶ  the match, but only over words already met, and the
               distractors come from the same group so "it must be the
               last one" stops working.
       かく    English on screen, type the Japanese. Nothing to eliminate.

     A word you get wrong comes back. A word you get right twice drops
     out. That is the whole of the spacing and it is enough at this
     scale. */
  var kPhase = "miru", kAt = 0, kPool = null;
  function wordsFor(p){
    return (K.vocab || []).filter(function(v){
      return v.group !== "led" || p.id === "led";
    });
  }
  /* where this word turns up in this person's article, so it is met in
     a sentence rather than on a flashcard */
  function inContext(p, v){
    var needle = plain(v.ja).replace(/[\s\u3000〜]/g, "");
    var best = null;
    p.paras.forEach(function(para){
      plain(para).split(/(?<=。)/).forEach(function(sv){
        if (!best && needle && sv.replace(/[\s\u3000]/g,"").indexOf(needle) >= 0) best = sv.trim();
      });
    });
    return best;
  }
  function kstate(v){
    return (S.wrote["k:" + v.ja] | 0);   /* 0 unseen, 1 met, 2+ right */
  }
  function kbump(v, n){
    S.wrote["k:" + v.ja] = Math.max(0, kstate(v) + n); save();
  }
  DRAW.kotoba = function(){
    var p = P(), all = wordsFor(p);
    var unmet = all.filter(function(v){ return kstate(v) < 1; });
    var met   = all.filter(function(v){ return kstate(v) >= 1 && kstate(v) < 3; });
    var known = all.filter(function(v){ return kstate(v) >= 3; });
    var tabs = [["miru","みる","Meet them", unmet.length],
                ["erabu","えらぶ","Match them", met.length],
                ["kaku","かく","Write them", met.length]];
    if (kPhase === "miru" && !unmet.length) kPhase = "erabu";
    $("main").innerHTML =
        '<div class="rule"><b>The words</b>Meet a word before you are asked '
      + 'to match it, and write it after. Guessing your way through a '
      + 'matching task is not learning a word.</div>'
      + '<div class="row" style="margin-bottom:9px" id="ph">'
      + tabs.map(function(t){
          return '<button class="btn ' + (kPhase === t[0] ? "sm" : "ghost sm")
            + '" data-p="' + t[0] + '"><span style="font-family:var(--jp)">'
            + esc(t[1]) + '</span> <span class="en">' + esc(t[2]) + '</span>'
            + ' · ' + t[3] + '</button>';
        }).join("")
      + '</div><div class="work" id="kw"></div>'
      + foot('<span class="score">' + known.length + ' of ' + all.length
        + ' known</span>');
    each($("main"),"[data-p]",function(b){
      b.onclick = function(){ kPhase = b.dataset.p; kAt = 0; kPool = null; draw(); };
    });
    if (kPhase === "miru") return miru(p, unmet.length ? unmet : all);
    if (kPhase === "kaku") return kaku(p, met.length ? met : all);
    return erabu(p, met.length >= 4 ? met : all);
  };
  function miru(p, pool){
    kAt = kAt % pool.length;
    var v = pool[kAt], ctx = inContext(p, v);
    $("kw").innerHTML = '<div class="col" style="text-align:center">'
      + '<p class="para" style="font-size:30px;margin-bottom:4px">' + ruby(v.ja) + '</p>'
      + '<p style="font-size:19px;margin-bottom:10px">' + esc(v.en) + '</p>'
      + '<p>' + saybtn(v.ja) + '</p>'
      + (ctx ? '<div class="mark yes" style="text-align:left;margin-top:14px">'
          + '<b>in the article</b><span class="jp">' + ruby(ctx) + '</span> '
          + saybtn(ctx) + '</div>'
        : '<p class="hint" style="margin-top:14px">This one is on the unit '
          + 'list but does not appear in this article.</p>')
      + '<div class="row" style="justify-content:center;margin-top:16px">'
      + '<button class="btn" id="got">I have met it</button></div>'
      + '<p class="hint" style="margin-top:8px">' + (kAt+1) + ' of ' + pool.length
      + '</p></div>';
    wireSay();
    say(v.ja);
    $("got").onclick = function(){
      if (kstate(v) < 1) kbump(v, 1);
      kAt++;
      if (kAt >= pool.length){ kPhase = "erabu"; kAt = 0; }
      draw();
    };
  }
  function erabu(p, pool){
    /* six from one group where there are six, so elimination is not a
       strategy: all the distractors are the same kind of word */
    if (!kPool || !kPool.length){
      var byg = {};
      pool.forEach(function(v){ (byg[v.group] = byg[v.group] || []).push(v); });
      var big = Object.keys(byg).filter(function(g){ return byg[g].length >= 4; });
      kPool = big.length ? shuffle(byg[big[Math.floor(Math.random()*big.length)]]).slice(0,6)
                         : shuffle(pool).slice(0,6);
    }
    var set = kPool, chips = shuffle(set), slots = shuffle(set), left = set.length;
    var pick = null;
    $("kw").innerHTML = '<div class="col"><div id="slots"></div></div>';
    $("slots").innerHTML = slots.map(function(x){
      return '<div class="qrow" data-m="'+esc(x.ja)+'" style="border:2px dashed '
        + 'var(--line);border-radius:9px;padding:8px 11px;cursor:pointer">'
        + '<span class="en">'+esc(x.en)+'</span><span class="got"></span></div>';
    }).join("");
    var tray = document.createElement("div");
    tray.className = "row";
    tray.style.cssText = "flex-wrap:wrap;margin-top:10px";
    tray.innerHTML = chips.map(function(x,i){
      return '<button class="btn ghost sm" data-w="'+esc(x.ja)+'">'
        + (hasvoice(x.ja) ? (i+1) + ' ▶' : esc(plain(x.ja))) + '</button>';
    }).join("");
    $("kw").querySelector(".col").appendChild(tray);
    each($("kw"),"[data-w]",function(b){
      b.onclick = function(){
        say(b.dataset.w);
        each($("kw"),"[data-w]",function(x){ x.className = "btn ghost sm"; });
        b.className = "btn sm"; pick = b;
      };
    });
    each($("kw"),"[data-m]",function(slot){
      slot.onclick = function(){
        if (!pick || slot.dataset.got) return;
        var v = set.filter(function(x){ return x.ja === pick.dataset.w; })[0];
        if (slot.dataset.m === pick.dataset.w){
          slot.dataset.got = "1";
          slot.style.borderStyle = "solid"; slot.style.borderColor = "var(--ok)";
          slot.querySelector(".got").innerHTML = ' <span style="font-family:var(--jp);'
            + 'font-size:18px">' + ruby(v.ja) + '</span> ' + saybtn(v.ja);
          pick.remove(); pick = null; left--; award(1); kbump(v, 1); wireSay();
          if (!left){ kPool = null; done(); draw(); }
        } else {
          /* wrong: the word goes back to unmet, because a word you
             cannot pick is a word you have not met */
          kbump(v, -1);
          slot.style.borderColor = "var(--accent)";
          setTimeout(function(){ slot.style.borderColor = "var(--line)"; }, 600);
        }
      };
    });
  }
  function kaku(p, pool){
    kAt = kAt % pool.length;
    var v = pool[kAt];
    $("kw").innerHTML = '<div class="col" style="text-align:center">'
      + '<p style="font-size:22px;margin:18px 0 12px">' + esc(v.en) + '</p>'
      + '<div class="row"><input class="ans" id="kin" lang="ja" autocomplete="off"'
      + ' autocapitalize="off" spellcheck="false">'
      + '<button class="btn sm" id="kgo">Check</button></div>'
      + '<div id="kfb"></div>'
      + '<div class="row" style="justify-content:center;margin-top:12px">'
      + '<button class="btn ghost sm" id="khint">Show the first letter</button>'
      + '<button class="btn ghost sm" id="knext">Skip</button></div></div>';
    $("kin").focus();
    function check(){
      var got = ($("kin").value||"").replace(/[\s\u3000]/g,"");
      if (!got) return;
      var want = [plain(v.ja), kana(v.ja)].map(function(x){
        return x.replace(/[\s\u3000〜]/g,""); });
      if (want.indexOf(got) >= 0){
        award(2); kbump(v, 1);
        $("kfb").innerHTML = '<div class="mark yes"><b>Yes</b><span class="jp">'
          + ruby(v.ja) + '</span> ' + saybtn(v.ja) + '</div>';
        wireSay();
        setTimeout(function(){ kAt++; draw(); }, 900);
      } else {
        kbump(v, -1);
        $("kfb").innerHTML = '<div class="mark no"><b>Not yet</b>'
          + '<span class="jp">' + esc(got) + '</span> is not it. '
          + 'Go back to みる and meet it again.</div>';
      }
    }
    $("kgo").onclick = check;
    $("kin").onkeydown = function(ev){ if (ev.key === "Enter") check(); };
    $("khint").onclick = function(){
      spend(1, "first letter");
      $("kin").value = kana(v.ja).replace(/[\s\u3000〜]/g,"").slice(0,1);
      $("kin").focus();
      $("khint").disabled = true;
    };
    $("knext").onclick = function(){ kAt++; draw(); };
  }

  /* ---- 2. ぶんぽう ----
     Andrew's own list of the patterns this unit turns on, plus
     住んでいます, which is in all six articles and belongs with them.

     A pattern is explained once, shown in sentences taken out of the
     articles the student is about to read, and then practised. The
     practice is a gapfill, and the tile goes into the gap by drag or by
     two taps: a school iPad does not do HTML5 drag-and-drop at all and a
     mouse is clumsy at tapping twice, so both gestures run the same
     handler.

     The distractors are the forms the answer is confusable with: です
     against でした, に against で. A student who guesses is choosing
     between two tenses, not between a verb and a particle, so guessing
     gets them a coin toss and not a pass. */
  var gAt = 0;
  function gkey(g, i){ return "g:" + g.id + ":" + i; }
  function gdone(g){
    return (g.items || []).length > 0
      && (g.items || []).every(function(_, i){ return S.wrote[gkey(g, i)]; });
  }
  /* Drag with a pointer, or tap and tap. One handler for both: if the
     pointer never travelled, it was a tap. */
  function dragdrop(scope, onDrop){
    var ghost = null;
    function clearOver(){
      each(scope, "[data-gap]", function(g){ g.classList.remove("over"); });
    }
    each(scope, "[data-tile]", function(t){
      var held = false, x0 = 0, y0 = 0, moved = false;
      t.onpointerdown = function(ev){
        if (t.classList.contains("spent")) return;
        held = true; moved = false; x0 = ev.clientX; y0 = ev.clientY;
        try { t.setPointerCapture(ev.pointerId); } catch(e){}
      };
      t.onpointermove = function(ev){
        if (!held) return;
        if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 8) return;
        if (!moved){
          moved = true;
          ghost = t.cloneNode(true);
          ghost.style.cssText += ";position:fixed;z-index:80;pointer-events:none;"
            + "margin:0;opacity:.92;box-shadow:0 5px 16px rgba(0,0,0,.28)";
          document.body.appendChild(ghost);
          t.style.opacity = ".35";
        }
        ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + "px";
        ghost.style.top  = (ev.clientY - ghost.offsetHeight / 2) + "px";
        var over = document.elementFromPoint(ev.clientX, ev.clientY);
        var gap = over && over.closest && over.closest("[data-gap]");
        clearOver();
        if (gap) gap.classList.add("over");
      };
      t.onpointerup = function(ev){
        if (!held) return;
        held = false;
        if (ghost){ ghost.remove(); ghost = null; }
        t.style.opacity = "";
        clearOver();
        if (moved){
          /* A near miss still counts. On a 320px screen the gap and its
             tiles only just fit together, and a drag let go beside the
             gap rather than on it is the commonest thing a finger does.
             Dropping anywhere in the item takes it to that item's gap,
             and a drop that lands nowhere leaves the tile armed so the
             gesture is not simply lost. */
          var over = document.elementFromPoint(ev.clientX, ev.clientY);
          var gap = over && over.closest && (over.closest("[data-gap]")
            || (over.closest("[data-it]")
                && over.closest("[data-it]").querySelector("[data-gap]")));
          if (gap) onDrop(t, gap);
          else t.classList.add("armed");
          return;
        }
        /* a tap arms the tile; the next tap on a gap drops it there */
        var was = t.classList.contains("armed");
        each(scope, "[data-tile]", function(x){ x.classList.remove("armed"); });
        if (!was) t.classList.add("armed");
      };
      t.onpointercancel = t.onpointerup;
    });
    each(scope, "[data-gap]", function(gap){
      gap.onclick = function(){
        var armed = scope.querySelector("[data-tile].armed");
        if (armed) onDrop(armed, gap);
      };
    });
  }
  DRAW.bunpou = function(){
    var G = K.grammar || [];
    if (!G.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    gAt = ((gAt % G.length) + G.length) % G.length;
    var g = G[gAt], finished = G.filter(gdone).length;
    $("main").innerHTML =
        '<div class="rule"><b>Grammar</b>' + G.length + ' patterns, and between '
      + 'them they build every sentence in this unit. The examples are the '
      + 'articles&rsquo; own sentences, so you will meet them again on the page. '
      + 'Drag a tile into the gap, or tap the tile and then the gap.</div>'
      + '<div class="row gidx" id="gidx">'
      + G.map(function(x, i){
          return '<button data-g="' + i + '"' + (i === gAt ? ' aria-current="true"' : '')
            + (gdone(x) ? ' class="done"' : '') + '>' + ruby(x.pat)
            + (gdone(x) ? " ✓" : "") + '</button>';
        }).join("")
      + '</div>'
      + '<div class="work"><div class="col" id="gw"></div></div>'
      + foot('<span class="score"><b>' + finished + '</b> of ' + G.length
          + ' practised</span>'
        + '<button class="btn ghost sm" id="gprev">Back</button>'
        + '<button class="btn sm" id="gnext">Next pattern</button>');
    each($("gidx"), "[data-g]", function(b){
      b.onclick = function(){ gAt = +b.dataset.g; draw(); };
    });
    $("gprev").onclick = function(){ gAt--; draw(); };
    $("gnext").onclick = function(){ gAt++; draw(); };

    $("gw").innerHTML =
        '<p class="para" style="margin-bottom:2px">' + ruby(g.pat) + '</p>'
      + '<p style="font-size:17px;font-weight:700;margin-bottom:6px" class="en">'
      + esc(g.title_en) + '</p>'
      + '<div class="mark yes"><b>how it works</b>' + esc(g.rule) + '</div>'
      + '<div class="mark"><b>the shape</b><span class="jp">' + ruby(g.form)
      + '</span></div>'
      + '<h3 class="sub">In the articles</h3>'
      + (g.egs || []).map(function(e){
          return '<div class="qrow" style="margin-bottom:7px">'
            + '<div class="q">' + ruby(e.ja) + ' ' + saybtn(e.ja) + '</div>'
            + '<div class="en" style="font-size:14px;color:var(--muted)">'
            + esc(e.en) + (e.mine ? ' <i>(not from the articles: this one is '
              + 'here to show the contrast)</i>' : '') + '</div></div>';
        }).join("")
      + '<h3 class="sub">Now you</h3>'
      + '<div id="gits"></div>';

    $("gits").innerHTML = (g.items || []).map(function(it, i){
      var parts = String(it.ja).split(/＿+/);
      var got = S.wrote[gkey(g, i)];
      return '<div class="qrow" data-it="' + i + '">'
        + '<div class="q">' + ruby(parts[0] || "")
        + '<span class="gap' + (got ? ' ok' : '') + '" data-gap="' + i + '">'
        + (got ? ruby(it.answer) : '　') + '</span>'
        + ruby(parts.slice(1).join("")) + '</div>'
        + '<div class="row" style="flex-wrap:wrap;margin-top:6px" data-tray="' + i
        + '">' + (got ? "" : shuffle((it.options || []).slice()).map(function(o){
            return '<button class="tile" data-tile="' + esc(plain(o)) + '" data-for="'
              + i + '">' + ruby(o) + '</button>';
          }).join("")) + '</div>'
        + '<div data-gfb="' + i + '"></div></div>';
    }).join("");

    dragdrop($("gits"), function(tile, gap){
      var i = +gap.dataset.gap, it = g.items[i];
      if (String(tile.dataset.for) !== String(i)) return;   /* another item's tile */
      if (S.wrote[gkey(g, i)]) return;
      var fb = $("gits").querySelector('[data-gfb="' + i + '"]');
      if (tile.dataset.tile === plain(it.answer)){
        S.wrote[gkey(g, i)] = 1; save();
        award(2);
        gap.innerHTML = ruby(it.answer);
        gap.classList.remove("bad"); gap.classList.add("ok");
        each($("gits"), '[data-tray="' + i + '"] .tile', function(x){ x.remove(); });
        fb.innerHTML = '<div class="mark yes"><b>Yes</b><span class="jp">'
          + ruby(String(it.ja).replace(/＿+/, plain(it.answer))) + '</span></div>';
        wireSay();
        if (gdone(g)) draw();
      } else {
        gap.classList.add("bad");
        tile.classList.remove("armed");
        setTimeout(function(){ gap.classList.remove("bad"); }, 700);
        fb.innerHTML = '<div class="mark no"><b>Not that one</b>'
          + 'Read the shape again: <span class="jp">' + ruby(g.form)
          + '</span></div>';
      }
    });
    wireSay();
    if (G.every(gdone) && !S.done["bunpou"]){
      S.done["bunpou"] = 1; save(); paintSteps();
    }
  };

  /* ---- 3. よむ ----
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

  /* ---- 4. しつもん ----
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

  /* ---- 5. やくす ----
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

  /* ---- 6. はやく ----
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

  /* ---- 7. じぶんで ----
     The same frame, twelve slots, about themselves. This is the paper
     task: the CAT asks for a self-introduction built on the articles,
     and a student who can fill these twelve lines has written it.

     What the page checks is the GRAMMAR AND NOTHING ELSE. It can see
     whether a sentence has に and 生まれました in it. It cannot see
     whether the year is the right year, and no checker could, so it says
     so on every tick rather than letting a student think the machine has
     marked their Japanese. The model sentence is one of Andrew's own, out
     of the article named beside it, and showing it costs a point like
     every other support.

     At the end it puts the twelve lines together as one paragraph,
     because twelve ticked boxes do not look like a piece of writing and
     the paragraph does. */
  function fslot(i){ return (K.frame || [])[i]; }
  /* the slot credits a person, and an id is not a name */
  function whoName(id){
    var p = (K.people || []).filter(function(x){ return x.id === id; })[0];
    return p ? p.name_en.split(" ")[0] : id;
  }
  function fkey(i){ return "f:" + (fslot(i) || {}).id; }
  /* a need group is satisfied by any one of its spellings: 好きです and
     すきです are the same answer and both are on the worksheet */
  function fmiss(f, got){
    var n = String(got || "").replace(/[\s　]/g, "");
    if (!n) return null;
    var missing = [];
    (f.need || []).forEach(function(grp){
      var ok = grp.some(function(k){
        return n.indexOf(plain(k).replace(/[\s　]/g, "")) >= 0;
      });
      if (!ok) missing.push(grp[0]);
    });
    return missing;
  }
  DRAW.jibun = function(){
    var F = K.frame || [];
    var okCount = F.filter(function(_, i){ return S.done["jb:" + i]; }).length;
    $("main").innerHTML =
        '<div class="rule"><b>Write your own</b>Twelve sentences, the same '
      + 'frame the six articles use, about you. The page checks the pattern '
      + 'only: it can see whether your sentence has the right grammar in it, '
      + 'and it cannot see whether what you wrote is true or whether the words '
      + 'are the right words. That part is yours and your teacher&rsquo;s.</div>'
      + '<div class="work"><div class="col" id="fw"></div></div>'
      + '<div id="tip"></div>'
      + foot('<span class="score" id="fsc"><b>' + okCount + '</b> of ' + F.length
          + '</span>'
        + '<button class="btn sm" id="fshow">Show my paragraph</button>');
    $("fw").innerHTML = F.map(function(f, i){
      return '<div class="qrow" data-f="' + i + '">'
        + '<div class="q en"><b>' + (i + 1) + '.</b> ' + esc(f.en) + '</div>'
        + '<p class="hint" style="margin-bottom:5px">' + esc(f.note) + '</p>'
        + '<input class="ans" lang="ja" data-fi="' + i + '" autocomplete="off"'
        + ' autocapitalize="off" spellcheck="false">'
        + '<div class="row" style="margin-top:5px;flex-wrap:wrap">'
        + '<button class="btn ghost sm" data-model="' + i + '">Show how '
        + esc(whoName(f.from)) + ' says it</button>'
        + '<button class="btn sm" data-check="' + i + '">Check the pattern</button>'
        + '</div><div data-ffb="' + i + '"></div></div>';
    }).join("");
    each($("fw"), "[data-fi]", function(inp){
      var i = +inp.dataset.fi;
      inp.value = S.wrote[fkey(i)] || "";
      inp.oninput = function(){ S.wrote[fkey(i)] = inp.value; save(); };
      inp.onkeydown = function(ev){ if (ev.key === "Enter") check(i); };
    });
    each($("fw"), "[data-model]", function(b){
      b.onclick = function(){
        var i = +b.dataset.model, f = F[i];
        spend(1, "model sentence");
        $("fw").querySelector('[data-ffb="' + i + '"]').innerHTML =
            '<div class="mark"><b>' + esc(whoName(f.from)) + '&rsquo;s own sentence</b>'
          + '<span class="jp">' + ruby(f.model) + '</span> ' + saybtn(f.model)
          + '</div>';
        b.disabled = true;
        wireSay();
      };
    });
    each($("fw"), "[data-check]", function(b){
      b.onclick = function(){ check(+b.dataset.check); };
    });
    function check(i){
      var f = F[i], fb = $("fw").querySelector('[data-ffb="' + i + '"]');
      var got = ($("fw").querySelector('[data-fi="' + i + '"]').value || "");
      var missing = fmiss(f, got);
      if (missing === null){
        fb.innerHTML = '<div class="mark hm"><b>Nothing there yet</b>Write the '
          + 'sentence first.</div>';
        return;
      }
      if (!missing.length){
        if (!S.done["jb:" + i]){ S.done["jb:" + i] = 1; award(3); save(); }
        fb.innerHTML = '<div class="mark yes"><b>The pattern is there</b>'
          + '<span class="jp">' + esc(got) + '</span><br>'
          + 'That is the grammar this slot wanted. Whether it is true, and '
          + 'whether the words are the right words, this page cannot tell '
          + 'you.</div>';
        var okNow = F.filter(function(_, j){ return S.done["jb:" + j]; }).length;
        $("fsc").innerHTML = '<b>' + okNow + '</b> of ' + F.length;
        if (okNow === F.length && !S.done["jibun"]){
          S.done["jibun"] = 1; award(4); save(); paintSteps();
        }
      } else {
        fb.innerHTML = '<div class="mark no"><b>Not yet</b>'
          + 'There is no <span class="jp">' + esc(plain(missing[0])) + '</span> '
          + 'in your sentence' + (missing.length > 1 ? ', and ' + (missing.length - 1)
              + ' other part' + (missing.length > 2 ? 's are' : ' is') + ' missing too'
            : '') + '. ' + esc(f.note) + '</div>';
      }
    }
    $("fshow").onclick = function(){
      var lines = F.map(function(f, i){ return (S.wrote[fkey(i)] || "").trim(); })
                   .filter(Boolean);
      if (!lines.length){
        $("tip").innerHTML = '<div class="mark hm"><b>Nothing to show</b>Write a '
          + 'sentence or two first.</div>';
        return;
      }
      var para = lines.join("");
      $("tip").innerHTML = '<div class="work fit" style="max-height:38vh">'
        + '<div class="col"><p class="para">' + esc(para) + '</p>'
        + '<p class="hint">' + lines.length + ' of ' + F.length
        + ' sentences. This is your own writing, exactly as you typed it, with '
        + 'nothing corrected. Nothing is saved anywhere but this device, so '
        + 'copy it or take a photograph if you want to keep it.</p>'
        + '<div class="row"><button class="btn ghost sm" id="fcopy">Copy it</button>'
        + '</div></div></div>';
      $("fcopy").onclick = function(){
        var ta = document.createElement("textarea");
        ta.value = para;
        ta.style.cssText = "position:fixed;left:-9999px";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch(e){}
        ta.remove();
        $("fcopy").textContent = "Copied";
      };
    };
  };

  /* ---- 8. くらべる ----
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
      + 'text rather than trusting them.</p>'
      + '<h3 class="sub">The videos</h3>'
      + '<p class="hint">English clips, one a person. They open on YouTube in '
      + 'a new tab: nothing is embedded in this page, so the page itself stays '
      + 'fast and makes no requests of its own. Watch one, then come back and '
      + 'fill its row above.</p>'
      + '<div id="vids"></div>'
      + '</div>'
      + foot('<button class="btn sm" id="dn">Done</button>');
    /* The videos are links, never embeds, and the clip with questions
       against it gets them as a written task: they are the ones the
       class works through on paper, so the answers stay on the device
       and go nowhere. */
    var byp = {};
    K.people.forEach(function(p){ byp[p.id] = p; });
    $("vids").innerHTML = (K.videos || []).map(function(v, i){
      var p = byp[v.person] || {};
      return '<div class="qrow" style="margin-bottom:9px">'
        + '<a class="vid" href="' + esc(v.url) + '" target="_blank" rel="noopener">'
        + '<span class="jp" style="font-family:var(--jp)">'
        + esc(plain(p.name_ja || v.person)) + '</span> &middot; ' + esc(v.title)
        + ' &nearr;</a>'
        + ((v.questions || []).length
            ? '<button class="btn ghost sm" data-vq="' + i + '">'
              + (v.questions.length) + ' questions on this one</button>'
              + '<div data-vqb="' + i + '"></div>'
            : '<span class="hint">No question sheet for this one yet.</span>')
        + '</div>';
    }).join("");
    each($("vids"), "[data-vq]", function(b){
      b.onclick = function(){
        var i = +b.dataset.vq, v = K.videos[i];
        var box = $("vids").querySelector('[data-vqb="' + i + '"]');
        if (box.innerHTML){ box.innerHTML = ""; return; }
        box.innerHTML = '<ol style="margin:7px 0 0 20px">'
          + v.questions.map(function(q, j){
              return '<li style="margin-bottom:8px"><div class="en" '
                + 'style="font-size:14.5px">' + esc(q) + '</div>'
                + '<textarea class="ans en" rows="2" data-vqa="' + i + ':' + j
                + '"></textarea></li>';
            }).join("")
          + '</ol><p class="hint">The timestamps say where in the clip to '
          + 'listen. Your answers stay on this device and are sent nowhere.</p>';
        each(box, "[data-vqa]", function(ta){
          var key = "v:" + ta.dataset.vqa;
          ta.value = S.wrote[key] || "";
          ta.oninput = function(){ S.wrote[key] = ta.value; save(); };
        });
      };
    });
    $("dn").onclick = function(){ S.done["kuraberu"] = 1; award(2); save();
      paintSteps(); $("dn").disabled = true; };
  };

  paintToggles();
  draw();
})();
