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
  var S = { furi:true, en:true, sfx:true, done:{}, wrote:{} };
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
    /* Twenty-five devices groaning at once is a classroom problem, so
       the noise has a switch. It governs the drum tick as well. */
    $("sfxBtn").classList.toggle("off", !S.sfx);
    $("sfxBtn").setAttribute("aria-pressed", S.sfx ? "true" : "false");
    document.body.classList.toggle("nofuri", !S.furi);
    document.body.classList.toggle("noen", !S.en);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("enBtn").classList.toggle("off", !S.en);
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; paintToggles(); save(); };
  $("enBtn").onclick = function(){ S.en = !S.en; paintToggles(); save(); };
  $("sfxBtn").onclick = function(){
    S.sfx = !S.sfx; save(); paintToggles();
    if (S.sfx) CLICK.whoosh();          /* so you can hear what you turned on */
  };
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
    var HEX = W.colour_hex || {};
    var c = f.clothes || {};
    function col(slot, fallback){
      return (c[slot] && HEX[c[slot][1]]) || fallback;
    }
    var top = col("top", "#9aa9b8"), legs = col("bottom", "#55606e"),
        shoe = col("shoes", "#363d47");
    /* Every garment is outlined. Without it しろい disappears into the
       card and a white shirt cannot be described, let alone marked. */
    var E = ' stroke="rgba(20,25,32,.3)" stroke-width="1.2"';
    var skirt = c.bottom && /スカート/.test(c.bottom[0]);
    var cx = 60, foot = 232, g = [];

    /* behind everything: long hair down past the shoulders */
    if (f.hair === "long"){
      g.push('<path d="M36 44 q-9 60 -4 104 q14 7 18 -2 q-7 -48 -2 -98 z"'
        + ' fill="' + hair + '"/>');
      g.push('<path d="M84 44 q9 60 4 104 q-14 7 -18 -2 q7 -48 2 -98 z"'
        + ' fill="' + hair + '"/>');
    }
    /* legs, then shoes */
    if (skirt){
      g.push('<path d="M44 138 h32 l10 38 h-52 z" fill="' + legs + '"' + E + '/>');
      g.push('<rect x="48" y="174" width="9" height="50" rx="4.5" fill="'
        + SKIN + '"/>');
      g.push('<rect x="63" y="174" width="9" height="50" rx="4.5" fill="'
        + SKIN + '"/>');
    } else {
      g.push('<rect x="45" y="138" width="12" height="86" rx="6" fill="' + legs + '"' + E + '/>');
      g.push('<rect x="63" y="138" width="12" height="86" rx="6" fill="' + legs + '"' + E + '/>');
    }
    g.push('<ellipse cx="49" cy="' + foot + '" rx="11" ry="6" fill="' + shoe + '"' + E + '/>');
    g.push('<ellipse cx="71" cy="' + foot + '" rx="11" ry="6" fill="' + shoe + '"' + E + '/>');
    /* arms outside the body, not behind it, or all you see is hands */
    g.push('<rect x="24" y="84" width="11" height="60" rx="5.5" fill="' + top + '"' + E + '/>');
    g.push('<rect x="85" y="84" width="11" height="60" rx="5.5" fill="' + top + '"' + E + '/>');
    g.push('<circle cx="29.5" cy="148" r="6" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    g.push('<circle cx="90.5" cy="148" r="6" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    /* neck and body */
    g.push('<rect x="54" y="63" width="12" height="20" fill="' + SKIN
      + '" stroke="' + SKINL + '" stroke-width="1"/>');
    g.push('<path d="M37 142 q-1 -48 5 -55 q9 -5 18 -5 q9 0 18 5 q6 7 5 55 z"'
      + ' fill="' + top + '"' + E + '/>');
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
    if (c.hat){
      var hc = col("hat", "#8a5a2b");
      g.push('<path d="M36 30 a24 24 0 0 1 48 0 z" fill="' + hc + '"' + E + '/>'
        + '<rect x="29" y="28" width="62" height="5" rx="2.5" fill="' + hc + '"'
        + E + '/>');
    }
    /* a watch sits on the wrist, so it has somewhere to be seen */
    if (c.extra && /とけい/.test(c.extra[0]))
      g.push('<rect x="84" y="138" width="13" height="7" rx="2" fill="#2f3b47"/>'
        + '<circle cx="90.5" cy="141.5" r="3.4" fill="#d9dee4" stroke="#2f3b47"'
        + ' stroke-width="1"/>');

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
     One table. The exercises read it, and so does the marker.

     Each fact says whether the drawing shows it. Hair, eyes, height,
     glasses and every garment are drawn; what someone is like is not,
     and no drawing of a face can say 親切 or まじめ. A step that asks a
     student to pick a person out of six from a personality is asking
     them to read character off a face, which is worse than merely
     unanswerable, so だれですか takes its clues from the seen facts only. */
  function factsOf(p){
    var f = p.facts, out = [];
    out.push({ id:"hair",
      ja: f.hair === "long" ? "かみが 長[なが]いです。" : "かみが 短[みじか]いです。",
      re: f.hair === "long" ? /かみが(ながい|長い)です/ : /かみが(みじかい|短い)です/,
      wrong: f.hair === "long" ? /かみが(みじかい|短い)です/ : /かみが(ながい|長い)です/,
      look: "the hair", seen: true });
    out.push({ id:"colour",
      ja: f.colour === "black" ? "かみが くろいです。" : "かみが ちゃいろいです。",
      re: f.colour === "black" ? /かみがくろいです/ : /かみがちゃいろいです/,
      wrong: f.colour === "black" ? /かみがちゃいろいです/ : /かみがくろいです/,
      look: "the colour of the hair", seen: true });
    out.push({ id:"eyes",
      ja: f.eyes === "big" ? "目[め]が 大[おお]きいです。" : "目[め]が 小[ちい]さいです。",
      re: f.eyes === "big" ? /(め|目)が(おおきい|大きい)です/ : /(め|目)が(ちいさい|小さい)です/,
      wrong: f.eyes === "big" ? /(め|目)が(ちいさい|小さい)です/ : /(め|目)が(おおきい|大きい)です/,
      look: "the eyes", seen: true });
    out.push({ id:"tall",
      ja: f.tall ? "せが 高[たか]いです。" : "せが 高[たか]くないです。",
      re: f.tall ? /せが(たかい|高い)です/ : /せが(たかくない|高くない)です/,
      wrong: f.tall ? /せが(たかくない|高くない)です/ : /せが(たかい|高い)です/,
      look: "how tall they are", seen: true });
    if (f.glasses)
      out.push({ id:"glasses", ja:"めがねを かけています。",
        re:/めがねをかけています/, wrong:null, look:"the glasses",
        seen: true });
    /* clothing. The phrase in front of the garment is the point: an
       い colour goes straight on, a noun colour needs の. Both spellings
       are accepted because the colour words are kana either way. */
    var cl = f.clothes || {};
    function colourKind(name){
      var found = null;
      W.words.forEach(function(x){ if (x.kana === name) found = x; });
      return found && found.kind === "i" ? "i" : "no";
    }
    function phrase(colour, item){
      return colour + (colourKind(colour) === "i" ? " " : "\u306e ") + item;
    }
    /* A clothing sentence cannot be matched with a pattern that makes the
       colour optional: that waves through both a stray の and the wrong
       colour, which is the one thing this step exists to catch. So read
       what sits immediately before the garment, and judge that. */
    var ALLCOL = W.words.filter(function(x){ return x.group === "colour"; })
                        .map(function(x){ return x.kana; })
                        .sort(function(a, b){ return b.length - a.length; });
    [["top", "kiru"], ["bottom", "haku"], ["shoes", "haku"],
     ["hat", "kaburu"], ["extra", "suru"]].forEach(function(pair){
      var slot = cl[pair[0]];
      if (!slot) return;
      var item = slot[0], colour = slot[1];
      var verb = (W.verbs[pair[1]] || {}).ja;
      var ja = (colour ? phrase(colour, item) : item) + "\u3092 " + verb + "\u3002";
      var tail = item + "\u3092" + verb;
      out.push({ id:"c-" + pair[0], ja: ja, look:"what they are wearing",
        seen: true,
        judge: function(ln){
          var i = ln.indexOf(tail);
          if (i < 0) return null;
          var before = ln.slice(0, i).replace(/^.*?\u306f/, "");
          if (!before || !colour) return true;
          for (var n = 0; n < ALLCOL.length; n++){
            var c = ALLCOL[n], isI = colourKind(c) === "i";
            if (before === c + "\u306e")
              return isI
                ? { msg: c + " is an \u3044 colour, so it goes straight in front "
                    + "of " + item + " with no \u306e." }
                : (c === colour ? true
                   : { msg: "Good Japanese, but look again: that " + item
                       + " is " + colour + ", not " + c + "." });
            if (before === c)
              return !isI
                ? { msg: c + " is a noun, so it needs \u306e before " + item + "." }
                : (c === colour ? true
                   : { msg: "Good Japanese, but look again: that " + item
                       + " is " + colour + ", not " + c + "." });
          }
          return { msg: "Something is in front of " + item
            + " that is not one of the colour words." };
        } });
    });
    p.traits.forEach(function(t){
      var tr = P.traits[t];
      out.push({ id:"t-" + t,
        ja: plain(tr.ja) + "です。",
        re: new RegExp("(" + kana(tr.ja) + "|" + plain(tr.ja) + ")です"),
        wrong: null, look:"what they are like", seen: false, en: tr.en });
    });
    return out;
  }

  /* ================= the steps ================= */
  /* だれですか opens, because the problem should arrive before the method:
     a student meets the six and tries to tell them apart before anybody
     has taught them a word. The writing step stays last. */
  /* ================= the drum, and the zombie =================
     Both lifted from the oral examination app, which is where the drum
     was written and tuned. Nothing here is a second implementation: the
     physics, the tick and the reduced-motion path are the same code, so
     a fix in one is a fix the other should get too.

     Why a drum and not a Wheel of Fortune: on a wheel the labels sit at
     every angle and shrink to fit a wedge, which is the wrong thing to
     do to words a student is still learning to read. On a drum they
     stay horizontal and full size. */
  var REEL = (function(){
    var H = 64, raf = 0;
    function reduced(){
      try { return matchMedia("(prefers-reduced-motion: reduce)").matches; }
      catch (e){ return false; }
    }
    function cancel(){ if (raf) cancelAnimationFrame(raf); raf = 0; }

    function mount(box, items, onLand){
      var L = items.length, SPAN = L * H;
      var win = box.querySelector(".rwin"), strip = box.querySelector(".rstrip");
      var three = "";
      for (var c = 0; c < 3; c++){
        three += items.map(function(it){
          return '<div class="ritem"><b>' + it.html + '</b>'
               + (it.sub ? '<i>' + it.sub + '</i>' : '') + '</div>';
        }).join("");
      }
      strip.innerHTML = three;

      var SLOW = 2.4, DRAG = 90, CATCH = 300, K = 150, C = 16;
      var pos = 0, v = 0, target = null, last = 0, lastTick = 0, lastDetent = 0;
      var spinning = false;

      function wrap(x){ return ((x % SPAN) + SPAN) % SPAN; }
      function paint(){
        strip.style.transform =
          "translate3d(0," + (H - SPAN - wrap(pos)).toFixed(2) + "px,0)";
      }
      function at(){ return Math.round(wrap(pos) / H) % L; }
      function ticks(now){
        var d = Math.floor(wrap(pos) / H);
        if (d !== lastDetent){
          lastDetent = d;
          if (now - lastTick > 26){ lastTick = now; CLICK.play(); }
        }
      }
      function done(){
        spinning = false;
        box.classList.remove("spinning");
        if (onLand) onLand(items[at()], at());
      }
      function frame(now){
        var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
        last = now;
        if (target === null){
          var sgn = v < 0 ? -1 : 1;
          v -= (SLOW * v + DRAG * sgn) * dt;
          if (v * sgn < 0) v = 0;
          pos += v * dt;
          if (Math.abs(v) < CATCH) target = Math.round(pos / H) * H;
        } else {
          v += (-K * (pos - target) - C * v) * dt;
          pos += v * dt;
          if (Math.abs(pos - target) < 0.4 && Math.abs(v) < 8){
            pos = target; v = 0;
            paint(); done(); return;
          }
        }
        paint(); ticks(now);
        raf = requestAnimationFrame(frame);
      }
      function launch(v0){
        cancel();
        target = null; v = v0; last = 0;
        spinning = true;
        box.classList.add("spinning");
        /* A device asking for reduced motion gets a short plain glide
           rather than a jump: landing with no movement at all reads as
           broken, and three slots of travel is not what that setting is
           protecting anybody from. */
        if (reduced()){
          var from = pos, to = Math.round((pos + 3 * H) / H) * H, t0 = 0;
          (function ease(now){
            if (!t0) t0 = now;
            var k = Math.min(1, (now - t0) / 480);
            pos = from + (to - from) * (1 - Math.pow(1 - k, 3));
            paint();
            if (k < 1) raf = requestAnimationFrame(ease);
            else { pos = to; paint(); done(); }
          })(performance.now());
          return;
        }
        raf = requestAnimationFrame(frame);
      }

      /* A flick, for a finger. The velocity is taken from the last few
         milliseconds rather than the whole gesture, so a slow drag that
         ends in a snap throws the drum and a slow drag that ends still
         does not. */
      var grab = null;
      win.addEventListener("pointerdown", function(ev){
        cancel(); spinning = false; box.classList.remove("spinning");
        v = 0; target = null;
        grab = { y:ev.clientY, pos:pos, t:performance.now(),
                 ly:ev.clientY, lt:performance.now(), v:0, moved:0 };
        try { win.setPointerCapture(ev.pointerId); } catch (e){}
      });
      win.addEventListener("pointermove", function(ev){
        if (!grab) return;
        ev.preventDefault();
        pos = grab.pos - (ev.clientY - grab.y);
        grab.moved += Math.abs(ev.clientY - grab.ly);
        var now = performance.now(), dt = now - grab.lt;
        if (dt > 4){
          grab.v = -(ev.clientY - grab.ly) / dt * 1000;
          grab.ly = ev.clientY; grab.lt = now;
          grab.mouse = ev.pointerType === "mouse";
        }
        paint(); ticks(now);
      });
      function release(){
        if (!grab) return;
        /* A hand can flick; a mouse cannot. The same gesture drags a
           cursor at perhaps a third the speed of a thumb, so a mouse
           throw is scaled up to land in the same range. The button on the
           rim is there because even scaled, dragging a mouse is a poor way
           to throw anything. */
        var fling = grab.v * (grab.mouse ? 2.2 : 1);
        var stale = performance.now() - grab.lt > 130;
        grab = null;
        if (stale || Math.abs(fling) < 130){ launch(0); return; }
        launch(Math.max(-7000, Math.min(7000, fling)));
      }
      win.addEventListener("pointerup", release);
      win.addEventListener("pointercancel", release);

      paint();
      return {
        /* The button spin. A random amount of energy, so it is not the same
           throw every time, and always downward so the list reads the way
           it would if you had flicked it up yourself. */
        spin: function(){ launch(2400 + Math.random() * 1300); },
        at: at,
        spinning: function(){ return spinning; }
      };
    }
    return { mount: mount, cancel: cancel };
  })();

  var CLICK = (function(){
    var ctx = null, noise = null;
    function build(){
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      var n = Math.floor(ctx.sampleRate * 0.06);
      noise = ctx.createBuffer(1, n, ctx.sampleRate);
      var d = noise.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      return ctx;
    }
    function play(){
      if (!S.sfx) return;
      try {
        var c = build();
        if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime;
        var src = c.createBufferSource(); src.buffer = noise;
        var bp = c.createBiquadFilter();
        bp.type = "bandpass"; bp.frequency.value = 1750; bp.Q.value = 7;
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.26, t + 0.003);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);
        src.connect(bp); bp.connect(g); g.connect(c.destination);
        src.start(t); src.stop(t + 0.07);
      } catch (e){}
    }
    /* ---- the whoosh and the groan ----
       Both synthesised rather than fetched: the page has to work on a
       tram, and two more files to download for two sound effects is not
       a trade worth making.

       The whoosh is noise through a bandpass whose centre frequency
       sweeps up and then falls away, which is what a thing moving past
       your ear actually does to the spectrum. Short, 220ms, because a
       ninja that takes a second is not a ninja.

       The groan is a triangle sagging from 150Hz to 65 with a slow
       wobble on top and everything above 600Hz taken off. Triangle
       rather than sawtooth: a saw at that pitch is a horror film and
       this is a Year 8 classroom. */
    function whoosh(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime;
        var src = c.createBufferSource();
        /* a longer piece of noise than the tick needs, looped */
        src.buffer = noise; src.loop = true;
        var bp = c.createBiquadFilter();
        bp.type = "bandpass"; bp.Q.value = 1.4;
        bp.frequency.setValueAtTime(700, t);
        bp.frequency.exponentialRampToValueAtTime(4200, t + 0.085);
        bp.frequency.exponentialRampToValueAtTime(600, t + 0.22);
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.2, t + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        src.connect(bp); bp.connect(g); g.connect(c.destination);
        src.start(t); src.stop(t + 0.24);
      } catch (e){}
    }
    function groan(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime, D = 0.75;
        var o1 = c.createOscillator();
        o1.type = "triangle";
        o1.frequency.setValueAtTime(150, t);
        o1.frequency.exponentialRampToValueAtTime(65, t + D);
        /* the wobble, or it is a foghorn rather than a groan */
        var lfo = c.createOscillator(), lg = c.createGain();
        lfo.frequency.value = 5.5; lg.gain.value = 7;
        lfo.connect(lg); lg.connect(o1.frequency);
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 600;
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.17, t + 0.12);
        g.gain.setValueAtTime(0.17, t + 0.34);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        o1.connect(lp); lp.connect(g); g.connect(c.destination);
        o1.start(t); lfo.start(t);
        o1.stop(t + D + 0.02); lfo.stop(t + D + 0.02);
      } catch (e){}
    }
    return { play: play, whoosh: whoosh, groan: groan };
  })();
  /* The things that look pressable: the home panes, the tab row, and the
     tiles and move buttons inside a section. Not every button in the app:
     a clack on Next twenty times in a drill is a different thing. */

  /* ---- the ninja ----
     The zombie needed an opposite. A ninja crosses rather than rises,
     and is gone in half the time the zombie takes: right is
     acknowledged and then got out of the way of, which is the right
     proportion when being right is the thing you want to be unremarkable
     and repeatable.

     Same guards as the zombie. It cannot be tapped, it never covers the
     feedback, and reduced motion gets the sound without the dash. */
  var nLast = 0;
  function ninja(near){
    CLICK.whoosh();
    try {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    } catch (e){}
    var now = Date.now();
    if (now - nLast < 420) return;
    nLast = now;
    var box = document.createElement("div");
    box.className = "ninj";
    box.setAttribute("aria-hidden", "true");
    var r = near && near.getBoundingClientRect ? near.getBoundingClientRect() : null;
    box.style.left = (r ? r.left + r.width / 2 : innerWidth / 2) + "px";
    box.style.top  = (r ? r.top + r.height / 2 - 26 : innerHeight * 0.5) + "px";
    box.innerHTML =
        '<svg viewBox="0 0 64 52" width="64" height="52">'
      /* the scarf, trailing behind the direction of travel */
      + '<path d="M30 16 q-12 -4 -24 2 q10 1 14 4 q-9 1 -13 5 q12 -1 21 -3 z"'
      + ' fill="#b23a3a" opacity=".92"/>'
      /* a body folded forward, mid-dash */
      + '<path d="M28 18 q12 -3 19 6 q4 7 -3 11 q-9 5 -17 -1 q-6 -5 1 -16 z"'
      + ' fill="#20262f"/>'
      /* back leg kicked out */
      + '<path d="M34 34 q-6 7 -14 8 q6 -8 8 -12 z" fill="#20262f"/>'
      /* arm thrown forward */
      + '<path d="M44 22 q9 -2 14 3" stroke="#20262f" stroke-width="5"'
      + ' stroke-linecap="round" fill="none"/>'
      /* the head, and the eye slit that makes it a ninja */
      + '<circle cx="44" cy="17" r="10" fill="#262d37"/>'
      + '<path d="M38 15 h13 v4 h-13 z" fill="#f2e9d8"/>'
      + '<circle cx="42" cy="17" r="1.7" fill="#20262f"/>'
      + '<circle cx="48" cy="17" r="1.7" fill="#20262f"/>'
      /* two speed lines, which is the whole of the whoosh made visible */
      + '<path d="M2 24 h14 M6 31 h10" stroke="#20262f" stroke-width="2"'
      + ' stroke-linecap="round" opacity=".5"/>'
      + '</svg>';
    document.body.appendChild(box);
    box.addEventListener("animationend", function(){ box.remove(); });
    setTimeout(function(){ if (box.parentNode) box.remove(); }, 1400);
  }

  /* ---- the zombie ----
     Andrew asked for this twice. I argued once that a celebration or a
     creature on a wrong answer makes being wrong the most interesting
     thing on the screen and that a Year 8 will farm it; he has heard
     that and decided, and it is his room.

     So it is built to be hard to farm. It rises once, takes a second
     and a half, never blocks the feedback that names the rule, and does
     not fire twice for the same mistake in quick succession. A device
     asking for reduced motion gets nothing at all. */
  var zLast = 0;
  function zombie(near){
    CLICK.groan();
    try {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    } catch (e){}
    var now = Date.now();
    if (now - zLast < 900) return;
    zLast = now;
    var box = document.createElement("div");
    box.className = "zomb";
    box.setAttribute("aria-hidden", "true");
    var r = near && near.getBoundingClientRect ? near.getBoundingClientRect() : null;
    box.style.left = (r ? r.left + r.width / 2 : innerWidth / 2) + "px";
    box.style.top  = (r ? r.top : innerHeight * 0.6) + "px";
    box.innerHTML =
      '<svg viewBox="0 0 48 64" width="48" height="64">'
      /* one arm out in front, the other trailing */
      + '<path d="M10 30 q-7 2 -8 10" stroke="#6f9a4e" stroke-width="5"'
      + ' stroke-linecap="round" fill="none"/>'
      + '<path d="M38 30 q8 -1 10 4" stroke="#6f9a4e" stroke-width="5"'
      + ' stroke-linecap="round" fill="none"/>'
      /* a tattered sheet of a body, so it reads as floating */
      + '<path d="M13 26 h22 v24 l-4 -4 l-4 5 l-4 -5 l-4 5 l-4 -5 l-2 3 z"'
      + ' fill="#7fae59"/>'
      + '<circle cx="24" cy="18" r="12" fill="#8fbf66"/>'
      /* stitches, which is what makes it a zombie and not a frog */
      + '<path d="M15 10 l4 4 M17 8 l-1 3 M21 11 l-1 3" stroke="#5d8440"'
      + ' stroke-width="1.4" stroke-linecap="round" fill="none"/>'
      + '<circle cx="19" cy="17" r="2.6" fill="#1f2a18"/>'
      + '<circle cx="29" cy="17" r="2.6" fill="#1f2a18"/>'
      + '<path d="M19 24 q5 3 10 0" stroke="#1f2a18" stroke-width="1.6"'
      + ' stroke-linecap="round" fill="none"/>'
      + '<path d="M21 24 v3 M26 24 v3" stroke="#1f2a18" stroke-width="1.2"/>'
      + '</svg>';
    document.body.appendChild(box);
    box.addEventListener("animationend", function(){ box.remove(); });
    setTimeout(function(){ if (box.parentNode) box.remove(); }, 2600);
  }

  /* ---- a deck, so nothing comes up in the order it is written down ----
     Every stepped exercise used to walk its list with a counter: the six
     people in だれですか came up in file order, so the answer to round one
     was the first card, round two the second, and a student who noticed
     that never had to read the Japanese again. The same counter ran the
     part-by-part step and the wearing step, where it made the body part
     and the garment slot cycle in a fixed order too.

     A deck shuffles the whole list, deals it out, and reshuffles when it
     is spent, never repeating across the seam. It also counts which items
     have actually been answered correctly, because "you have seen the
     last one" stops meaning "you have seen them all" the moment the order
     is random. */
  var DECKS = {};
  function deck(key, n){
    var d = DECKS[key];
    if (!d || d.n !== n){
      var order = [];
      for (var i = 0; i < n; i++) order.push(i);
      d = DECKS[key] = { n:n, order:shuffle(order), at:0, right:{} };
    }
    return d;
  }
  function dealt(key, n){ return deck(key, n).order[deck(key, n).at]; }
  function advance(key, n){
    var d = deck(key, n);
    d.at++;
    if (d.at >= d.n){
      var last = d.order[d.n - 1], tries = 0;
      do { d.order = shuffle(d.order); tries++; }
      while (d.n > 1 && d.order[0] === last && tries < 20);
      d.at = 0;
    }
  }
  /* Correct once is enough to count: a student who gets all six right has
     met all six, in whatever order the deck handed them over. */
  var TALLY = {};
  function tallyOf(key){ return TALLY[key] || (TALLY[key] = { right:0 }); }
  function gotRight(key, n, i, id){
    var d = deck(key, n);
    d.right[i] = 1;
    if (Object.keys(d.right).length >= n) done(id);
  }

  var STEPS = [
    { id:"who",   ja:"だれですか", en:"Who is it?" },
    { id:"match", ja:"ことば",     en:"Words" },
    { id:"sort",  ja:"い か な",   en:"い or な" },
    { id:"part",  ja:"〜が 〜です", en:"Part by part" },
    { id:"join",  ja:"〜くて",     en:"Joining" },
    { id:"colour",ja:"いろ",       en:"Colours" },
    { id:"wear",  ja:"きています", en:"Wearing" },
    { id:"spin",  ja:"ルーレット", en:"Spin a word" },
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

  /* ---- ことば ----
     The chip does not say what it is. It plays. A student has to listen,
     decide, and put it somewhere, which is a different job from reading
     あかい and finding "red" in the next column: that one can be finished
     by elimination without knowing a word.

     Drag it, or tap the chip and then tap a meaning. Both work, because a
     trackpad and a thumb are not the same thing and neither is an excuse.

     The spelling is withheld until the chip lands, then shown: the written
     form is the reward for getting it right, not the clue. If the device
     has no recordings at all the chip shows the word instead, because a
     silent chip is not a question. */
  var mRound = 0, mOrder = null;
  var SPK = '<svg viewBox="0 0 24 24" aria-hidden="true">'
    + '<path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z"/>'
    + '<path fill="none" stroke="currentColor" stroke-width="2"'
    + ' stroke-linecap="round" d="M16.5 8.8a4.5 4.5 0 0 1 0 6.4"/></svg>';
  DRAW.match = function(){
    var per = 6, rounds = Math.ceil(W.words.length / per);
    mRound = mRound % rounds;
    if (!mOrder) mOrder = shuffle(W.words);
    var set = mOrder.slice(mRound * per, mRound * per + per);
    var silent = !Object.keys(CLIPS).length;
    var chips = shuffle(set), slots = shuffle(set);
    var left = set.length, miss = {}, pick = null;

    $("main").innerHTML = ruleFor("match")
      + '<div class="work"><div class="wslots" id="slots"></div></div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<div class="wtray" id="tray"></div><span class="sp"></span>'
      + '<span class="hint">' + (silent
          ? 'Drag a word onto its meaning.'
          : 'Listen, then drag it onto its meaning.') + '</span>'
      + '<button class="btn ghost sm" id="next">Next six</button></div>';
    $("slots").innerHTML = slots.map(function(x){
      return '<div class="wslot" data-m="' + esc(x.kana) + '">'
        + '<span class="mean">' + esc(x.en) + '</span>'
        + '<span class="got"></span></div>';
    }).join("");
    $("tray").innerHTML = chips.map(function(x, i){
      return '<div class="wchip" data-w="' + esc(x.kana) + '" tabindex="0"'
        + ' role="button" aria-label="Word ' + (i + 1) + ', listen">'
        + '<span class="num">' + (i + 1) + '</span>'
        + (silent ? '<span class="jp" style="font-size:17px">' + ruby(x.ja)
                    + '</span>' : SPK) + '</div>';
    }).join("");
    function score(){
      $("sc").innerHTML = '<b>' + (set.length - left) + '</b> of ' + set.length
        + ' · set ' + (mRound + 1) + ' of ' + rounds;
    }
    score();
    function wordOf(kana){
      var f = null;
      set.forEach(function(x){ if (x.kana === kana) f = x; });
      return f;
    }
    function land(chip, slot){
      var kana = chip.dataset.w, ok = slot.dataset.m === kana, x = wordOf(kana);
      if (ok){
        slot.classList.add("yes");
        ninja(slot);
        slot.querySelector(".got").innerHTML = ruby(x.ja) + ' '
          + saybtn(x.ja);
        chip.remove();
        left--; score();
        wireSay();
        if (!left) done("match");
      } else {
        slot.classList.add("no");
        zombie(slot);
        setTimeout(function(){ slot.classList.remove("no"); }, 700);
        miss[kana] = (miss[kana] || 0) + 1;
        /* Stuck twice on the same word: show the spelling. The rung is
           generous early and it comes off as soon as it is not needed. */
        if (miss[kana] >= 2 && !silent && !chip.dataset.shown){
          chip.dataset.shown = "1";
          chip.innerHTML = '<span class="num">' + chip.querySelector(".num").textContent
            + '</span><span class="jp" style="font-size:16px">' + ruby(x.ja)
            + '</span>';
        }
      }
    }
    function clearPick(){
      each($("main"), ".wchip.pick", function(c){ c.classList.remove("pick"); });
      pick = null;
    }
    each($("main"), ".wchip", function(chip){
      var drag = null;
      chip.addEventListener("pointerdown", function(ev){
        say(wordOf(chip.dataset.w).ja);
        var r = chip.getBoundingClientRect();
        drag = { x:ev.clientX, y:ev.clientY, dx:ev.clientX - r.left,
                 dy:ev.clientY - r.top, w:r.width, h:r.height, moved:0 };
        try { chip.setPointerCapture(ev.pointerId); } catch (e){}
      });
      chip.addEventListener("pointermove", function(ev){
        if (!drag) return;
        drag.moved = Math.max(drag.moved,
          Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y));
        if (drag.moved < 7) return;
        ev.preventDefault();
        chip.classList.add("dragging");
        chip.style.width = drag.w + "px";
        chip.style.height = drag.h + "px";
        chip.style.left = (ev.clientX - drag.dx) + "px";
        chip.style.top = (ev.clientY - drag.dy) + "px";
        var over = document.elementFromPoint(ev.clientX, ev.clientY);
        over = over && over.closest ? over.closest(".wslot") : null;
        each($("main"), ".wslot.over", function(sx){ sx.classList.remove("over"); });
        if (over) over.classList.add("over");
      });
      function drop(ev){
        if (!drag) return;
        var moved = drag.moved;
        drag = null;
        each($("main"), ".wslot.over", function(sx){ sx.classList.remove("over"); });
        if (moved < 7){
          /* a tap: choose this chip, then tap a meaning */
          var was = chip.classList.contains("pick");
          clearPick();
          if (!was){ chip.classList.add("pick"); pick = chip; }
          return;
        }
        chip.classList.remove("dragging");
        chip.style.cssText = "";
        var el = document.elementFromPoint(ev.clientX, ev.clientY);
        var slot = el && el.closest ? el.closest(".wslot") : null;
        if (slot && !slot.classList.contains("yes")) land(chip, slot);
      }
      chip.addEventListener("pointerup", drop);
      chip.addEventListener("pointercancel", drop);
    });
    each($("main"), ".wslot", function(slot){
      slot.onclick = function(){
        if (!pick || slot.classList.contains("yes")) return;
        var c = pick; clearPick(); land(c, slot);
      };
    });
    /* Reshuffle when the cycle is spent, so a second pass through the
       words is six different sets rather than the same seven again. */
    $("next").onclick = function(){
      mRound++;
      if (mRound >= rounds){ mRound = 0; mOrder = shuffle(W.words); }
      draw();
    };
  };

  /* ---- sorting, used by step 3 and step 6 ----
     Two columns, a pool of chips, and a rule that decides which side a
     word belongs on. What the first version did not do: it said nothing
     visible when the answer was wrong (it set a title attribute, which no
     thumb will ever hover over), and it stopped dead when the last chip
     landed, with no way on and nothing further to do.

     Both are fixed here. A right answer builds the phrase the word is
     actually for, so the payoff is the grammar and not a tick. A wrong one
     puts the phrase the student just asked for beside the one they meant,
     and hands the chip back. The end of a round names the words that
     needed a second go, and offers another round or the next step. */
  /* A round with only one kind in it is not a sort, so the deal takes as
     near to half of each as the lists allow instead of trusting a shuffle. */
  function deal(list, n, kindOf){
    var by = {}, keys = [];
    list.forEach(function(w){
      var k = kindOf(w);
      if (!by[k]){ by[k] = []; keys.push(k); }
      by[k].push(w);
    });
    keys.forEach(function(k){ by[k] = shuffle(by[k]); });
    var out = [], i = 0;
    while (out.length < n){
      var moved = false;
      for (var j = 0; j < keys.length; j++){
        var pool = by[keys[j]];
        if (i < pool.length && out.length < n){ out.push(pool[i]); moved = true; }
      }
      if (!moved) break;
      i++;
    }
    return shuffle(out);
  }

  function sortGame(cfg){
    var items = cfg.items, left = items.length, pick = null, again = {};
    var nxt = STEPS[at + 1];
    $("main").innerHTML = ruleFor(cfg.id)
      /* fit, not fill: on a laptop the columns sit under the pool and the
         feedback sits under them, instead of the two being driven to
         opposite ends of a half-empty screen. */
      + '<div class="work fit">'
      + '<div class="slot" id="pool" style="margin-bottom:10px"></div>'
      + '<div class="cols" style="height:auto;min-height:76px">'
      + cfg.cols.map(function(c){
          return '<div class="col ' + c.cls + '" data-c="' + c.key + '"'
            + ' role="button" tabindex="0"><h4>' + c.head + '</h4>'
            + '<div class="in"></div></div>';
        }).join("")
      + '</div></div>'
      /* The feedback sits outside the scrolling area, under it. Put
         it above the columns and every answer pushes the columns off
         the bottom of a phone, so the student has to go looking for
         the thing they were just tapping. */
      + '<div id="fb" class="fbslot"></div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span><span id="tip"></span></div>';
    $("pool").innerHTML = items.map(function(w, i){
      return '<button class="chip" data-i="' + i + '">'
        + (cfg.chip ? cfg.chip(w) : ruby(w.ja)) + '</button>';
    }).join("");
    function score(){
      $("sc").innerHTML = '<b>' + (items.length - left) + '</b> of ' + items.length;
    }
    function tip(t){ $("tip").textContent = t; }
    score(); tip(cfg.hint);

    each($("main"), ".chip[data-i]", function(c){
      c.onclick = function(){
        each($("main"), ".chip.pick", function(x){ x.classList.remove("pick"); });
        pick = c; c.classList.add("pick"); tip(cfg.then);
      };
    });

    function finish(){
      done(cfg.id);
      var list = Object.keys(again);
      $("fb").innerHTML = '<div class="mark yes"><b>Round finished</b>'
        + 'All ' + items.length + ' sorted.'
        + (list.length ? ' Worth another look: <span class="jp-in">'
            + list.map(esc).join("\u3001") + '</span>.' : "")
        + '<p>' + esc(cfg.closing) + '</p>'
        + '<div class="btns">'
        + '<button class="btn sm ghost" id="again">Another round</button>'
        + (nxt ? '<button class="btn sm" id="onwards">Next: ' + esc(nxt.en)
                 + ' \u2192</button>' : "")
        + '</div></div>';
      tip("");
      $("again").onclick = function(){ if (cfg.next) cfg.next(); draw(); };
      if ($("onwards")) $("onwards").onclick = function(){ at++; draw(); };
    }

    function land(key, col){
      if (!pick) return;
      var c = pick, w = items[+c.dataset.i], ok = cfg.kindOf(w) === key;
      pick = null; c.classList.remove("pick");
      if (ok){
        c.classList.add("yes", "gone");
        ninja(c);
        col.querySelector(".in").appendChild(c);
        left--; score();
        $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
          + '<div class="ph">' + cfg.right(w) + '</div></div>';
        /* an empty dashed box is not worth the room it takes */
        if (!left){ $("pool").style.display = "none"; return finish(); }
        tip(cfg.hint);
      } else {
        c.classList.add("no");
        zombie(c);
        again[w.kana] = 1;
        var asked = cfg.wrong(w, key);
        /* No heading line: the red edge and the two labels already say it,
           and on a 320px phone every line costs a column header. */
        $("fb").innerHTML = '<div class="mark no">'
          + (asked ? '<div class="ph bad"><i>not</i>' + asked + '</div>' : "")
          + '<div class="ph"><i>yes</i>' + cfg.right(w) + '</div>'
          + '<p>' + esc(cfg.why(w)) + '</p></div>';
        setTimeout(function(){ c.classList.remove("no"); }, 1400);
        tip(cfg.hint);
      }
    }

    each($("main"), "[data-c]", function(col){
      function go(ev){
        if (ev && ev.target.closest(".chip")) return;
        land(col.dataset.c, col);
      }
      col.onclick = go;
      col.onkeydown = function(ev){
        if (ev.key === "Enter" || ev.key === " "){ ev.preventDefault(); go(null); }
      };
    });
  }

  /* ---- 2. い か な ----
     Six at a time, drawn fresh each round, so "another round" is another
     exercise and not the same twelve reshuffled. Each adjective carries
     the noun it belongs in front of, because 長い goes with かみ and not with
     人, and a step that built 長い 人 would be teaching the wrong thing. */
  DRAW.sort = function(){
    var all = W.words.filter(function(x){
      return (x.kind === "i" || x.kind === "na") && x.group !== "colour";
    });
    sortGame({
      id: "sort",
      items: deal(all, 6, function(w){ return w.kind; }),
      hint: "Tap a word, then tap \u3044 or \u306a.",
      then: "Now tap \u3044 or \u306a.",
      closing: "An \u3044 adjective goes straight in front of the noun. A \u306a "
        + "adjective needs \u306a first.",
      cols: [{ key:"i",  cls:"i",  head:"\u3044" },
             { key:"na", cls:"na", head:"\u306a" }],
      kindOf: function(w){ return w.kind; },
      right: function(w){
        if (w.frame) return ruby(w.frame);
        return ruby(w.ja) + (w.kind === "na" ? '<b class="add">\u306a</b>' : "")
          + " " + ruby(w["with"]);
      },
      wrong: function(w){
        if (w.frame) return "";
        return w.kind === "na"
          ? ruby(w.ja) + " " + ruby(w["with"])
          : ruby(w.ja) + '<b class="add">\u306a</b> ' + ruby(w["with"]);
      },
      why: function(w){
        if (w.frame)
          return w.kana + " is an \u3044 adjective, but for a person it goes "
            + "with \u305b\u304c, not in front of a noun.";
        return w.kind === "na"
          ? w.kana + " is a \u306a adjective: it needs \u306a before a noun."
          : w.kana + " ends in \u3044 and goes straight in front of a noun, "
            + "with nothing added.";
      }
    });
  };

  /* ---- 3. 〜が 〜です ---- */
  DRAW.part = function(){
    var items = [];
    P.people.forEach(function(p){
      factsOf(p).forEach(function(f){
        if (f.id === "hair" || f.id === "eyes" || f.id === "tall")
          items.push({ p:p, f:f });
      });
    });
    var i = dealt("part", items.length);
    var it = items[i], p = it.p;
    /* Three pairs, each adjective next to the one it is really being
       told apart from. */
    var PAIRS = [["長[なが]い", "短[みじか]い"],
                 ["大[おお]きい", "小[ちい]さい"],
                 ["高[たか]い", "高[たか]くない"]];
    var all = [];
    PAIRS.forEach(function(pr){ all = all.concat(pr); });
    var want = it.f.ja.replace(/^[^が]*が /, "").replace(/です。$/, "");
    /* The opposite was drawn at random with everything else, so three
       times in five the one adjective the question is actually about was
       not among the four offered and the answer could be had without
       reading anything. It is always offered now. */
    var opp = null;
    PAIRS.forEach(function(pr){
      if (pr[0] === want) opp = pr[1];
      if (pr[1] === want) opp = pr[0];
    });
    var rest = shuffle(all.filter(function(a){
      return a !== want && a !== opp; })).slice(0, 2);
    var opts = shuffle([want].concat(opp ? [opp] : []).concat(rest));
    var head = it.f.ja.replace(/ [^ ]+です。$/, "");
    $("main").innerHTML = ruleFor("part")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(p, 230) + '<div style="text-align:center"'
      + ' class="jp">' + esc(p.name) + 'さん</div></div>'
      + '<div class="q"><p class="jp">' + esc(p.name) + 'さんは '
      + ruby(head) + ' <u>　　　</u> です。</p>'
      + '<div class="grid cards" id="opts" style="margin-top:10px"></div>'
      + '<div id="fb"></div></div></div></div>'
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(deck("part", items.length).right).length + '</b> of '
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
        if (ok) ninja(b); else zombie(b);
        $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
          + '<b>' + (ok ? "Yes" : "Not that one") + '</b>'
          + (ok ? "" : "Look at " + esc(it.f.look) + " again. ")
          + ruby(p.name + "さんは " + it.f.ja) + ' ' + saybtn(p.name + "さんは " + it.f.ja)
          + '</div>';
        wireSay();
        if (ok) gotRight("part", items.length, i, "part");
      };
    });
    $("next").onclick = function(){ advance("part", items.length); draw(); };
  };

  /* ---- 4. 〜くて・〜で ---- */
  DRAW.join = function(){
    var nb = P.builder.length, i = dealt("join", nb);
    var b = P.builder[i];
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
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(deck("join", nb).right).length + '</b> of '
      + nb + '</span><span class="sp"></span>'
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
    $("next").onclick = function(){ advance("join", nb); draw(); };
    $("check").onclick = function(){
      var got = line.join(" "), want = b.ja.replace(/。$/, "");
      var ok = got === want;
      var joined = /くて|で$|で /.test(got);
      if (ok) ninja($("fb"));
      else if (line.length === parts.length) zombie($("fb"));
      $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
        + '<b>' + (ok ? "Yes" : "Not yet") + '</b>'
        + (ok ? ruby(b.ja) + " " + saybtn(b.ja)
              : (line.length < parts.length
                  ? "Every tile has to be used."
                  : (joined ? "The right pieces, the wrong order. The person comes first, then the two descriptions."
                            : "The first description has to change before it can join the second: い becomes くて, な becomes で.")))
        + '</div>';
      wireSay();
      if (ok) gotRight("join", nb, i, "join");
    };
  };

  /* ---- 5. だれですか ----
     Two things gave this away. The six cards were laid out in the order
     the people are written down and the answer walked through them one
     per round, so round three was the third card. And the clues were
     always the same three facts, so a student only ever read the hair
     and the eyes.

     Now the person comes off a shuffled deck, the cards are laid out in
     a fresh order each round, and the clues are picked at random and
     grown one at a time until they fit exactly one of the six.
     Sometimes that is the hair and the eyes, sometimes what they are
     wearing. */
  function cluesFor(p, all){
    var mine = factsOf(p).filter(function(f){ return f.seen; });
    var pool = shuffle(mine.slice()), picked = [];
    function fits(){
      return all.filter(function(q){
        if (q.id === p.id) return true;
        var theirs = factsOf(q).filter(function(f){ return f.seen; });
        return picked.every(function(f){
          return theirs.some(function(g){ return g.id === f.id && g.ja === f.ja; });
        });
      }).length;
    }
    for (var i = 0; i < pool.length; i++){
      picked.push(pool[i]);
      if (picked.length >= 2 && fits() === 1) break;
      if (picked.length >= 4) break;
    }
    /* A set that still fits two people is not a question. Fall back to
       the three the sanity check guarantees tell all six apart. */
    if (fits() !== 1) picked = [mine[0], mine[1], mine[2]];
    return picked;
  }
  DRAW.who = function(){
    var n = P.people.length, i = dealt("who", n), p = P.people[i];
    var clues = cluesFor(p, P.people), cards = shuffle(P.people.slice());
    var d = deck("who", n);
    $("main").innerHTML = ruleFor("who")
      + '<div class="work">'
      + clues.map(function(f){
          return '<p class="jp">' + ruby(f.ja) + ' ' + saybtn(f.ja) + '</p>';
        }).join("")
      + '<div class="grid cards" id="six" style="margin-top:10px"></div>'
      + '<div id="fb"></div></div>'
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(d.right).length + '</b> of ' + n + ' found'
      + '</span><span class="sp"></span>'
      + '<button class="btn sm" id="next">Next</button></div>';
    $("six").innerHTML = cards.map(function(x){
      return '<button class="card" data-p="' + esc(x.id) + '"'
        + ' style="text-align:center">' + figure(x, 130)
        + '<span class="ja">' + esc(x.name) + 'さん</span></button>';
    }).join("");
    each($("main"), "[data-p]", function(b){
      b.onclick = function(){
        var ok = b.dataset.p === p.id;
        b.classList.add(ok ? "yes" : "no");
        if (ok) ninja(b); else zombie(b);
        $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
          + '<b>' + (ok ? "Yes" : "Not that one") + '</b>'
          + (ok ? esc(p.name) + "さん." : "Check " + esc(clues[0].look)
                  + " and " + esc(clues[1].look) + ".") + '</div>';
        if (ok) gotRight("who", n, i, "who");
      };
    });
    $("next").onclick = function(){ advance("who", n); draw(); };
  };

  /* ---- 7. いろ ----
     い colour or の colour, on a garment that changes every round, so
     the phrase built is a different phrase each time. The chip carries
     the colour as a swatch: that tells a student which colour it is
     without telling them which kind it is, which is the only thing the
     step is asking. */
  function swatch(k){
    var hex = (W.colour_hex || {})[k];
    return hex ? '<span class="sw" style="background:' + esc(hex) + '"></span>' : "";
  }
  DRAW.colour = function(){
    /* めがね sits first in the word list and is the one garment a
       colour reads oddly on, so it goes last rather than opening the step. */
    var all = W.words.filter(function(x){ return x.kind === "garment"; });
    var wear = all.filter(function(x){ return x.kana !== "めがね"; })
      .concat(all.filter(function(x){ return x.kana === "めがね"; }));
    var g = wear[dealt("colour", wear.length)];
    sortGame({
      id: "colour",
      items: deal(W.words.filter(function(x){ return x.group === "colour"; }),
                  9, function(w){ return w.kind === "i" ? "i" : "na"; }),
      hint: "Tap a colour, then tap the side it belongs on.",
      then: "Now tap a side.",
      closing: "There is no rule for telling which colour is which kind. It "
        + "comes with the word, the same way \u3044 and \u306a do.",
      cols: [{ key:"i",  cls:"i",
               head:'\u3042\u304b\u3044 ' + ruby(g.ja) },
             { key:"na", cls:"na",
               head:'\u307f\u3069\u308a<b>\u306e</b> ' + ruby(g.ja) }],
      kindOf: function(w){ return w.kind === "i" ? "i" : "na"; },
      next: function(){ advance("colour", wear.length); },
      chip: function(w){ return swatch(w.kana) + ruby(w.ja); },
      right: function(w){
        return swatch(w.kana) + ruby(w.ja)
          + (w.kind === "i" ? "" : '<b class="add">\u306e</b>')
          + " " + ruby(g.ja);
      },
      wrong: function(w){
        return ruby(w.ja) + (w.kind === "i" ? '<b class="add">\u306e</b>' : "")
          + " " + ruby(g.ja);
      },
      why: function(w){
        return w.kind === "i"
          ? w.kana + " is an \u3044 adjective: nothing goes between it and "
            + kana(g.ja) + "."
          : w.kana + " is a noun: it needs \u306e before " + kana(g.ja) + ".";
      }
    });
  };

  /* ---- 8. きています ----
     The verb is chosen by where on the body the thing goes. The figure is
     on screen because the garment has to be found on it first. */
  DRAW.wear = function(){
    var items = [];
    P.people.forEach(function(p){
      var cl = p.facts.clothes || {};
      [["top","kiru"],["bottom","haku"],["shoes","haku"],
       ["hat","kaburu"],["extra","suru"]].forEach(function(pair){
        if (cl[pair[0]]) items.push({ p:p, item:cl[pair[0]][0], v:pair[1] });
      });
      if (p.facts.glasses) items.push({ p:p, item:"めがね", v:"kakeru" });
    });
    var i = dealt("wear", items.length);
    var it = items[i], V = W.verbs;
    var keys = Object.keys(V);
    $("main").innerHTML = ruleFor("wear")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(it.p, 220) + '</div>'
      + '<div class="q"><p class="jp">' + esc(it.p.name) + 'さんは '
      + ruby(it.item) + 'を <u>\u3000\u3000\u3000\u3000</u></p>'
      + '<div class="grid cards" id="opts" style="margin-top:10px"></div>'
      + '<div id="fb"></div></div></div></div>'
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(deck("wear", items.length).right).length + '</b> of '
      + items.length + '</span><span class="sp"></span>'
      + '<button class="btn sm" id="next">Next</button></div>';
    $("opts").innerHTML = shuffle(keys).map(function(k){
      return '<button class="card" data-v="' + k + '">'
        + '<span class="ja">' + ruby(V[k].ja) + '</span></button>';
    }).join("");
    each($("main"), "[data-v]", function(b){
      b.onclick = function(){
        var ok = b.dataset.v === it.v;
        each($("main"), "[data-v]", function(x){
          x.classList.toggle("yes", x.dataset.v === it.v);
          if (x === b && !ok) x.classList.add("no");
        });
        if (ok) ninja(b); else zombie(b);
        var line = it.p.name + "さんは " + it.item + "を " + V[it.v].ja + "。";
        $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
          + '<b>' + (ok ? "Yes" : "Not that one") + '</b>'
          + esc(it.item) + " goes on " + esc(V[it.v].zone_en) + ", and that is "
          + esc(V[it.v].ja) + ". "
          + (ok ? "" : "You chose " + esc(V[b.dataset.v].ja) + ", which is for "
                  + esc(V[b.dataset.v].zone_en) + ".")
          + '<div class="jp" style="margin-top:4px">' + ruby(line) + ' '
          + saybtn(line) + '</div></div>';
        wireSay();
        if (ok) gotRight("wear", items.length, i, "wear");
      };
    });
    $("next").onclick = function(){ advance("wear", items.length); draw(); };
  };

  /* ---- 9. ルーレット ----
     Andrew asked for a spinning wheel for random word practice. A wheel
     on its own is a picker, not a task, so the drum carries the English
     and the student types the Japanese. That way the thing it chooses is
     a question rather than an answer, and what they produce is checkable
     rather than self-marked.

     Kana or kanji both pass: the kanji are a draft set and a student who
     writes かみ for hair has not got it wrong. */
  var spinR = null, spinWord = null;
  DRAW.spin = function(){
    var pool = W.words.filter(function(w){ return w.kind !== "verb"; });
    var items = shuffle(pool);
    var t = tallyOf("spin");
    $("main").innerHTML = ruleFor("spin")
      + '<div class="work fit">'
      + '<div class="reel" id="reel">'
      + '<div class="rwin"><div class="rstrip"></div><div class="rmark"></div></div>'
      + '<button class="rspin" id="rgo" aria-label="Spin">'
      + '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
      + ' stroke="currentColor" stroke-width="2" stroke-linecap="round">'
      + '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 3v4h-4"/>'
      + '</svg></button></div>'
      + '<div id="ask"></div></div>'
      + '<div id="fb" class="fbslot"></div>'
      + '<div class="foot"><span class="score"><b>' + t.right
      + '</b> right</span><span class="sp"></span>'
      + '<span id="tip">Flick the drum, or press the button.</span></div>';
    spinR = REEL.mount($("reel"), items.map(function(w){
      return { html: esc(w.en), sub: "" };
    }), function(it, i){ landed(items[i]); });
    $("rgo").onclick = function(){ $("fb").innerHTML = ""; spinR.spin(); };

    function landed(w){
      spinWord = w;
      $("tip").textContent = "Write it in Japanese.";
      $("ask").innerHTML =
          '<p class="ask-en">Say and write: <b>' + esc(w.en) + '</b></p>'
        + '<div class="row"><input id="sin" type="text" autocomplete="off"'
        + ' autocapitalize="off" spellcheck="false" lang="ja"'
        + ' aria-label="Write it in Japanese">'
        + '<button class="btn sm" id="sgo">Check</button></div>';
      $("sin").focus();
      $("sin").onkeydown = function(ev){ if (ev.key === "Enter") check(); };
      $("sgo").onclick = check;
    }
    function check(){
      var w = spinWord, got = ($("sin").value || "").replace(/[\s\u3000]+/g, "");
      if (!got) return;
      var ok = got === w.kana || got === plain(w.ja);
      if (ok){
        t.right++;
        if (t.right >= 8) done("spin");
        ninja($("sin"));
        $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
          + '<div class="ph">' + ruby(w.ja) + ' ' + saybtn(w.ja)
          + '</div></div>';
        $("ask").innerHTML = "";
        $("tip").textContent = "Spin again.";
        wireSay();
        draw9();
      } else {
        zombie($("sin"));
        $("fb").innerHTML = '<div class="mark no">'
          + '<div class="ph bad"><i>not</i>' + esc(got) + '</div>'
          + '<div class="ph"><i>yes</i>' + ruby(w.ja) + ' ' + saybtn(w.ja)
          + '</div><p>' + esc(w.en) + ' is ' + esc(w.kana)
          + (plain(w.ja) !== w.kana ? ', written ' + esc(plain(w.ja)) : '')
          + '.</p></div>';
        $("sin").select();
        wireSay();
      }
    }
    function draw9(){
      $("main").querySelector(".score").innerHTML =
        '<b>' + t.right + '</b> right';
    }
  };

  /* ---- 9. かいてみよう ----
     The only screen with no Japanese on it to copy. */
  DRAW.write = function(){
    var np = P.people.length, p = P.people[dealt("write", np)];
    var fs = factsOf(p);
    var prev = S.wrote[p.id] || "";
    $("main").innerHTML = ruleFor("write")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(p, 300)
      + '<div style="text-align:center" class="jp">' + esc(p.name) + 'さん</div>'
      /* The drawing shows the hair, the eyes, the height and the clothes.
         It cannot show 親切, so the two personality words are handed over
         in English: the student still has to produce the Japanese, which
         is the whole job of this step, and nothing Japanese is on screen
         to copy. Without this the marker was calling a guess true. */
      + '<div class="brief">What they are like: <b>'
      + fs.filter(function(f){ return !f.seen; })
          .map(function(f){ return esc(f.en); }).join('</b>, <b>')
      + '</b></div></div>'
      + '<div class="q"><textarea id="ta" rows="7" spellcheck="false"'
      + ' aria-label="Write three sentences"></textarea>'
      + '<div id="fb"></div></div></div></div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span>'
      + '<button class="btn sm" id="check">Check</button>'
      + '<button class="btn ghost sm" id="next">Another person</button></div>';
    $("ta").value = prev;
    $("next").onclick = function(){ advance("write", np); draw(); };
    $("ta").oninput = function(){ S.wrote[p.id] = $("ta").value; save(); };
    $("check").onclick = function(){
      var raw = $("ta").value;
      S.wrote[p.id] = raw; save();
      var lines = raw.split(/[。\n]/).map(function(x){
        return x.replace(/[\s　]+/g, "");
      }).filter(function(x){ return x.length; });
      var out = [], right = 0, joined = false;
      lines.forEach(function(ln){
        var hit = null, bad = null, note = null;
        fs.forEach(function(f){
          if (hit) return;
          if (f.judge){
            var v = f.judge(ln);
            if (v === true) hit = f;
            else if (v && v.msg && !note) note = v.msg;
          } else if (f.re && f.re.test(ln)) hit = f;
        });
        fs.forEach(function(f){ if (!bad && f.wrong && f.wrong.test(ln)) bad = f; });
        if (/くて|で(?!す)/.test(ln)) joined = true;
        if (hit){
          right++;
          out.push('<div class="mark yes"><b>True</b>' + esc(ln) + '</div>');
        } else if (note){
          out.push('<div class="mark no"><b>Nearly</b>' + esc(note) + '</div>');
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
