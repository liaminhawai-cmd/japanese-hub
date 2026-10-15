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
  /* ---- は as わ, へ as え ----
     The topic particle は is said わ, and the recorded voice does not always
     work that out: in the oral exam app 高校生は came back with a HA in the
     middle of it. Which は is the particle is not guessed. Andrew spaces his
     Japanese at the phrase boundaries, so a は that ENDS one of those phrases
     is the particle, and ではなく is the one shape where it sits inside a
     phrase instead. That is the whole rule, and it matters that it is this
     narrow: はこ and はしります begin with a は that has to stay one.

     Only the sound changes. は is still は everywhere on the screen. */
  var CHUNKS = /[^\s\u3000、。！？!?「」『』《》]+/g;
  function particles(t){
    return String(t).replace(CHUNKS, function(c){
      c = c.replace(/では(?=[なあ])/g, "でわ");
      if (/は$/.test(c)) return c.slice(0, -1) + "わ";
      if (/へ$/.test(c)) return c.slice(0, -1) + "え";
      return c;
    });
  }
  function speakable(t){ return particles(plain(t)).replace(/[\s　]+/g,""); }

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
  var S = { furi:true, en:true, rate:1, sfx:true,
            pts:0, spent:0, done:{}, best:{}, wrote:{} };
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
    $("sfxBtn").classList.toggle("off", !S.sfx);
    $("rateBtn").classList.toggle("off", S.rate !== 1);
    $("ptsn").textContent = S.pts;
    $("pts").title = S.spent
      ? S.pts + " points. " + S.spent + " spent on support."
      : S.pts + " points, nothing spent on support yet.";
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; save(); paintToggles(); };
  $("enBtn").onclick = function(){ S.en = !S.en; save(); paintToggles(); };
  $("sfxBtn").onclick = function(){
    S.sfx = !S.sfx; save(); paintToggles();
    if (S.sfx) ninja($("sfxBtn"));      /* so you can see what you turned on */
  };
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
    S = { furi:true, en:true, rate:1, sfx:true,
          pts:0, spent:0, done:{}, best:{}, wrote:{} };
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

  /* ---- the ninja and the かさおばけ ----
     Andrew asked for these in the brief for this unit: "yokai and ninjas
     popping up". A right answer sends a ninja across the screen; a wrong
     one floats a かさおばけ up past it.

     They are drawn here rather than fetched, like everything else in this
     suite: two more files to download for two bits of fun is not a trade
     worth making on a school connection. Both are off in one press, and
     neither carries any information the marking has not already given,
     so a student who turns them off loses nothing but the joke.

     A device asking for less movement gets them faded in place rather
     than crossing the screen. It used to get nothing at all, which is
     how a feature Andrew asked for three times stayed invisible on the
     machine he was asking from. */
  var sfxLast = 0;
  function creature(kind, near, build){
    /* No reduced-motion check here any more: it returned before either
       creature was drawn, so a device with that setting on got the sound
       and nothing else. The stylesheet answers the setting instead, by
       fading them in place rather than flying them past. */
    var now = Date.now();
    if (now - sfxLast < 420) return;      /* no pile-ups on a fast run */
    sfxLast = now;
    var box = document.createElement("div");
    box.className = kind;
    box.setAttribute("aria-hidden", "true");
    var r = near && near.getBoundingClientRect ? near.getBoundingClientRect() : null;
    box.style.left = (r ? r.left + r.width / 2 : innerWidth / 2) + "px";
    box.style.top  = (r ? r.top + r.height / 2 - 26 : innerHeight * 0.5) + "px";
    box.innerHTML = build();
    document.body.appendChild(box);
    box.addEventListener("animationend", function(){ box.remove(); });
    setTimeout(function(){ if (box.parentNode) box.remove(); }, 1800);
  }
  function ninja(near){
    if (!S.sfx) return;
    SFX.whoosh();
    creature("ninj", near, function(){
      return '<svg viewBox="0 0 64 52" width="64" height="52">'
        /* the scarf, trailing behind the direction of travel */
        + '<path d="M30 16 q-12 -4 -24 2 q10 1 14 4 q-9 1 -13 5 q12 -1 21 -3 z"'
        + ' fill="#a83232" opacity=".92"/>'
        + '<path d="M28 18 q12 -3 19 6 q4 7 -3 11 q-9 5 -17 -1 q-6 -5 1 -16 z"'
        + ' fill="#16375e"/>'
        + '<path d="M34 34 q-6 7 -14 8 q6 -8 8 -12 z" fill="#16375e"/>'
        + '<path d="M44 22 q9 -2 14 3" stroke="#16375e" stroke-width="5"'
        + ' stroke-linecap="round" fill="none"/>'
        + '<circle cx="44" cy="17" r="10" fill="#1b2b40"/>'
        + '<path d="M38 15 h13 v4 h-13 z" fill="#f4efe6"/>'
        + '<circle cx="42" cy="17" r="1.7" fill="#16375e"/>'
        + '<circle cx="48" cy="17" r="1.7" fill="#16375e"/>'
        + '<path d="M2 24 h14 M6 31 h10" stroke="#16375e" stroke-width="2"'
        + ' stroke-linecap="round" opacity=".5"/>'
        + '</svg>';
    });
  }
  function yokai(near){
    if (!S.sfx) return;
    SFX.warble();
    creature("yoka", near, function(){
      /* かさおばけ: a paper umbrella with one eye, one tongue and one
         wooden leg. Drawn friendly rather than frightening, because a
         student who has just got something wrong does not need a fright
         as well. */
      return '<svg viewBox="0 0 56 72" width="56" height="72">'
        /* the canopy */
        + '<path d="M6 30 q22 -28 44 0 z" fill="#a83232"/>'
        + '<path d="M6 30 q22 -28 44 0" fill="none" stroke="#7a2525"'
        + ' stroke-width="1.5"/>'
        + '<path d="M28 4 v26 M14 20 v10 M42 20 v10" stroke="#f4efe6"'
        + ' stroke-width="1.6" opacity=".8"/>'
        /* the body of the umbrella, folded */
        + '<path d="M18 30 h20 l-3 16 h-14 z" fill="#c9a227"/>'
        /* one eye, which is the whole character of the thing */
        + '<circle cx="28" cy="37" r="6.5" fill="#f4efe6"/>'
        + '<circle cx="28" cy="37.5" r="3.2" fill="#15191f"/>'
        + '<circle cx="29.4" cy="36.2" r="1.1" fill="#fff"/>'
        /* the tongue, out and to one side, where the leg cannot hide it */
        + '<path d="M23 44 q5 11 10 1 q-5 4 -10 -1 z" fill="#d4647a"/>'
        /* one leg, one geta */
        + '<path d="M28 50 v10" stroke="#8a6d1f" stroke-width="4"'
        + ' stroke-linecap="round"/>'
        + '<rect x="18" y="60" width="20" height="5" rx="1.5" fill="#6b5417"/>'
        + '<rect x="21" y="65" width="3.5" height="5" fill="#6b5417"/>'
        + '<rect x="32" y="65" width="3.5" height="5" fill="#6b5417"/>'
        + '</svg>';
    });
  }
  /* Two sounds, synthesised for the same reason the drawings are drawn.
     The whoosh is noise through a band-pass that sweeps up and falls
     away, which is what a thing passing your ear does to the spectrum.
     The warble is the yokai: two detuned triangles sliding down with a
     wobble on top, which is a cartoon ghost and not a horror film. */
  var SFX = (function(){
    var ctx = null, noise = null, hiss = null;
    function build(){
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      var n = Math.floor(ctx.sampleRate * 0.4);
      noise = ctx.createBuffer(1, n, ctx.sampleRate);
      var d = noise.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      /* The clack's buffer has a fade baked in so it can be a strike.
         The whoosh needs the opposite: flat noise it can shape itself. */
      var hn = Math.floor(ctx.sampleRate * 0.5);
      hiss = ctx.createBuffer(1, hn, ctx.sampleRate);
      var hd = hiss.getChannelData(0);
      for (var j = 0; j < hn; j++) hd[j] = Math.random() * 2 - 1;
      return ctx;
    }
    /* ---- the clack ----
       One notch going past a pawl. It was a single band of noise at
       1750Hz, which is a hiss, not a click, and every one of them was
       identical, which is a machine and not a wheel.

       A real one is two things at once: the strike, which is a very short
       burst of noise with the low end taken off, and the body, which is
       the rim ringing for a few hundredths of a second after it. Both are
       needed. The strike alone is a tick on a watch; the body alone is a
       marimba.

       Every click is a little different. The pitch moves by up to a tone
       either way and the level by a fifth, because thirty identical clicks
       in a row stop sounding like wood and start sounding like a buzzer. */
    function clack(at, loud){
      var c = ctx; if (!c) return;
      /* Andrew could not hear these twice over. The first cause was the
         rate, and this is the other half: a 16ms click at 2600Hz through
         a laptop speaker at a third of full scale is not much. Half of
         full scale, and a clack decays long before the next one is due,
         so nothing stacks. */
      var vol = Math.max(0.08, Math.min(0.5, loud));
      var jit = 0.88 + Math.random() * 0.26;

      var src = c.createBufferSource(); src.buffer = noise;
      var hp = c.createBiquadFilter();
      hp.type = "bandpass"; hp.frequency.value = 2600 * jit; hp.Q.value = 2.2;
      var g1 = c.createGain();
      g1.gain.setValueAtTime(0.0001, at);
      g1.gain.exponentialRampToValueAtTime(vol, at + 0.001);
      g1.gain.exponentialRampToValueAtTime(0.0001, at + 0.016);
      src.connect(hp); hp.connect(g1); g1.connect(c.destination);
      src.start(at); src.stop(at + 0.02);

      var o = c.createOscillator();
      o.type = "triangle";
      o.frequency.setValueAtTime(1150 * jit, at);
      o.frequency.exponentialRampToValueAtTime(820 * jit, at + 0.03);
      var g2 = c.createGain();
      g2.gain.setValueAtTime(0.0001, at);
      g2.gain.exponentialRampToValueAtTime(vol * 0.7, at + 0.002);
      g2.gain.exponentialRampToValueAtTime(0.0001, at + 0.034);
      o.connect(g2); g2.connect(c.destination);
      o.start(at); o.stop(at + 0.04);
    }
    /* ---- the ratchet ----
       The first attempt counted the notches a frame had crossed and
       booked that many clicks, each batch starting at "now" on the audio
       clock. Every frame therefore started a new batch on top of the one
       still playing, and at speed the batches overlapped into a mush that
       did not change as the drum slowed. Which is the whole point of the
       sound: you should hear it slowing before you see it.

       So there is one cursor on the audio clock and the clicks go on it
       in order, never on top of each other. The spacing is the time it
       actually takes a notch to pass the window, H over the speed, which
       is why the rate falls away exactly as the drum does: at 6000 a
       second that is a click every eleven milliseconds, at 600 a second
       one every hundred, and at walking pace they come one at a time.

       The floor is there because a notch every five milliseconds is a
       buzz rather than a ratchet, and the ceiling because a drum that
       has all but stopped should fall silent rather than tick once more
       a second later. */
    /* ---- how fast the clicks come ----
       It used to be one click per notch, floored at 62 a second. Two
       things were wrong with that. 62 a second is above the rate at which
       an ear stops hearing separate clicks and starts hearing a pitch, so
       the top of every spin was a buzz. And because the floor was a hard
       maximum, the rate sat ON it for the first two thirds of the spin and
       only began to change near the end: the drum visibly slowed for
       seconds while the sound did not move.

       So the floor is added rather than imposed. The gap is always the
       time a notch takes to cross the window PLUS a fixed minimum, which
       means the rate changes the whole way down and never passes about 20
       a second. From a middling throw it now runs 18, 16, 14, 12, 10, 8,
       6, 3 clicks a second: you hear it slowing from the first half
       second, which is the part Andrew asked for and the part that was
       missing. */
    var FLOOR = 0.03, CEIL = 0.55, NOTCH = 128, cursor = 0;
    function ratchet(speed, notch){
      if (!S.sfx || !(speed > 0)) return;
      var gap = FLOOR + (notch || NOTCH) / speed;
      if (gap > CEIL) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime;
        if (cursor < t) cursor = t + 0.004;
        /* quieter when it is flying, fuller as it comes to rest: a wheel
           is loudest at the end, which is where the ear is anyway */
        var loud = 0.5 - Math.min(0.22, (speed || 0) / 34000);
        /* only ever a frame or two ahead, so a drum that stops does not
           leave a queue of clicks still to play */
        for (var guard = 0; cursor < t + 0.05 && guard < 6; guard++){
          clack(cursor, loud);
          cursor += gap;
        }
      } catch (e){}
    }
    /* the one at the end, when it drops into the slot */
    function clunk(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = Math.max(c.currentTime + 0.004, cursor);
        clack(t, 0.4);
        cursor = t + 0.02;
      } catch (e){}
    }
    /* Built inside the press that starts the spin, not inside the frame
       loop that follows it: a browser is readier to start an audio engine
       during a gesture than a tenth of a second afterwards. */
    function wakeAudio(){
      try { var c = build(); if (c && c.state === "suspended") c.resume(); }
      catch (e){}
    }
    /* ---- the whoosh and the warble ----
       Both synthesised rather than fetched: the page has to work on a
       tram, and two more files to download for two sound effects is not
       a trade worth making.

       The whoosh is noise through a bandpass whose centre frequency
       sweeps up and then falls away, which is what a thing moving past
       your ear actually does to the spectrum. Short, 220ms, because a
       ninja that takes a second is not a ninja.

       The warble is the かさおばけ, and it is below. */
    /* ---- the whoosh ----
       Third go, and this time it was measured rather than described.
       Rendered offline and compared with the drum's own click: the
       whoosh peaked at an RMS of 0.037 and was audible for a tenth of a
       second, against 0.067 for a single click. It was HALF the loudness
       of a click and barely longer than one, so through a laptop speaker
       it arrived as a soft tick, which is exactly what Andrew kept
       calling it. Nothing was wrong with the code; the sound was simply
       too small to be the thing it was named after.

       So: 550ms instead of 300, a wider sweep that starts lower and
       carries some low-mid rather than sitting up in the tick register,
       an attack over 90ms, and a quiet triangle gliding down underneath
       for the body that noise alone does not have. Measured again: RMS
       0.139, loudest sample 0.41, well short of clipping, audible for
       180ms with a tail past 400. Four times the old one and twice a
       click, which is the proportion a whoosh needs against a tick. */
    function whoosh(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime, D = 0.55;
        var src = c.createBufferSource(); src.buffer = hiss; src.loop = false;
        var hp = c.createBiquadFilter();
        hp.type = "highpass"; hp.frequency.value = 180;
        var bp = c.createBiquadFilter();
        bp.type = "bandpass"; bp.Q.value = 0.6;
        bp.frequency.setValueAtTime(300, t);
        bp.frequency.exponentialRampToValueAtTime(2400, t + 0.20);
        bp.frequency.exponentialRampToValueAtTime(420, t + D);
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.95, t + 0.09);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        src.connect(hp); hp.connect(bp); bp.connect(g); g.connect(c.destination);
        src.start(t); src.stop(t + D + 0.02);
        /* the body. Noise on its own is air; a thing going past has a
           pitch to it, and that is what makes this read as a movement
           rather than as static. */
        var o = c.createOscillator();
        o.type = "triangle";
        o.frequency.setValueAtTime(880, t);
        o.frequency.exponentialRampToValueAtTime(210, t + D * 0.9);
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 2000;
        var g2 = c.createGain();
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.11, t + 0.10);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + D);
        o.connect(lp); lp.connect(g2); g2.connect(c.destination);
        o.start(t); o.stop(t + D + 0.02);
      } catch (e){}
    }
    function warble(){
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime, D = 0.7;
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.17, t + 0.07);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 1400;
        var lfo = c.createOscillator(), lg = c.createGain();
        lfo.frequency.value = 6.5; lg.gain.value = 14;
        lfo.connect(lg);
        [0, 4].forEach(function(detune, i){
          var o = c.createOscillator();
          o.type = "triangle";
          o.detune.value = detune * 5;
          o.frequency.setValueAtTime(430 - i * 6, t);
          o.frequency.exponentialRampToValueAtTime(230 - i * 6, t + D);
          lg.connect(o.frequency);
          o.connect(lp);
          o.start(t); o.stop(t + D + 0.05);
        });
        lp.connect(g); g.connect(c.destination);
        lfo.start(t); lfo.stop(t + D + 0.05);
      } catch (e){}
    }
    return { whoosh: whoosh, warble: warble,
             ratchet: ratchet, clunk: clunk, wake: wakeAudio };
  })();

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
  /* Two groups, and the bar shows the join. The first five are about
     whichever person is chosen and change when the chips below change;
     the last three are about the unit and stand on their own. Grammar
     sat second, in the middle of the person's own sequence, which read
     as though it belonged to that person. It does not. */
  var REEL = (function(){
    var H = 64, raf = 0;
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

      /* How long the drum runs is this pair of numbers and nothing else.
         It used to lose speed at 2.4 a second with 90 of friction on top,
         which brought even the hardest flick to rest in about 1.3 seconds:
         a flick, not a spin. At 0.8 and 45 the same throw runs for three
         to four seconds, which is what a wheel does. */
      /* ---- how it winds down ----
         0.8 and 45 threw away 56% of the speed in the first second and
         crawled through the rest, which is an air brake and not a wheel.
         A heavy thing that is spinning loses speed at close to a steady
         rate, so most of the friction here is the constant and only a
         quarter of it rises with the speed. From a middling throw the
         drum now reads 6000, 4050, 3243, 2532, 1904, 1350, 862, 431 at
         each half second: an even wind-down you can watch, instead of a
         lurch and a long crawl. */
      var SLOW = 0.25, DRAG = 700, CATCH = 300, K = 150, C = 16;
      var pos = 0, v = 0, target = null, last = 0;
      var spinning = false;

      function wrap(x){ return ((x % SPAN) + SPAN) % SPAN; }
      function paint(){
        strip.style.transform =
          "translate3d(0," + (H - SPAN - wrap(pos)).toFixed(2) + "px,0)";
      }
      function at(){ return Math.round(wrap(pos) / H) % L; }
      /* The sound is the speed. The drum hands over the speed and how far
         apart the notches are, and CLICK works out the rest: one click per
         two items, because a notch per item at six turns a second is 230
         clicks a second and the ear hears a tone, not a wheel. */
      function ticks(speed){
        if (!(speed > 1)) return;
        SFX.ratchet(speed, 2 * H);
      }
      function done(){
        SFX.clunk();
        spinning = false;
        box.classList.remove("spinning");
        if (onLand) onLand(items[at()], at());
      }
      /* ---- a fixed step ----
         The physics used to advance by however long the last frame took,
         which is the ordinary way to animate and the wrong way to do this.
         The speed that lands on a given slot is worked out by running the
         same sums forward at a sixtieth of a second a step; if the drum
         itself then advances in steps of whatever the browser gave it,
         1/60 here and 1/120 on a tablet and 1/40 under load, it travels a
         slightly different distance and stops a slot or two from where it
         was sent. Nothing looked wrong, which is the worst kind of wrong:
         the drum simply landed on a different topic from the one the deck
         had dealt, and the deck then dealt that topic again.

         So time is accumulated and spent in whole steps of a sixtieth,
         and what is left over waits for the next frame. The drum now lands
         exactly where it was thrown, on any screen, under any load. The
         guard stops a tab that has been asleep for a minute from
         fast-forwarding through a thousand steps when it wakes. */
      var STEP = 1 / 60, acc = 0;
      function step(dt){
        if (target === null){
          var sgn = v < 0 ? -1 : 1;
          v -= (SLOW * v + DRAG * sgn) * dt;
          if (v * sgn < 0) v = 0;
          pos += v * dt;
          if (Math.abs(v) < CATCH) target = Math.round(pos / H) * H;
        } else {
          v += (-K * (pos - target) - C * v) * dt;
          pos += v * dt;
        }
      }
      function frame(now){
        acc += last ? Math.min(0.25, (now - last) / 1000) : STEP;
        last = now;
        for (var guard = 0; acc >= STEP && guard < 30; guard++){
          step(STEP); acc -= STEP;
          if (target !== null && Math.abs(pos - target) < 0.4 && Math.abs(v) < 8){
            pos = target; v = 0; acc = 0;
            paint(); done(); return;
          }
        }
        paint(); ticks(Math.abs(v));
        raf = requestAnimationFrame(frame);
      }
      function launch(v0){
        cancel();
        target = null; v = v0; last = 0; acc = 0;
        spinning = true;
        box.classList.add("spinning");
        /* ---- the drum spins for everybody ----
           This used to hand a device with reduced motion a three slot
           glide lasting under half a second. That one branch was why
           Andrew could not see a spin or hear the clicks however many
           times the physics and the sound were fixed: the branch never
           ran either of them. On a school laptop with the setting on
           system wide, the whole class gets the same dead control.

           Reduced motion is about movement a person did not ask for and
           cannot predict. A drum is a control whose entire function is
           to spin, and it moves because the student pressed it. So the
           spin stays, for everybody, with its clicks. The decoration
           that setting is actually for — the ninja and the かさおばけ
           crossing the screen — is where this app answers it, by fading
           them in place rather than flying them past. */
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
        paint(); ticks(Math.abs(grab.v));
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

      /* ---- which word it stops on ----
         The button used to throw a random amount of energy from wherever
         the drum happened to be sitting, which is not the same thing as
         picking a word. The distance a throw covers barely varied, so one
         spin landed a fairly predictable way along from the last, a word
         could come up twice running, and a word could sit there all lesson
         and never come up at all.

         Two things fix that. The order of the drum is rebuilt at the start
         of every button spin, while it is already moving and nobody can
         read it. And the caller names the word it wants, which it takes
         from a deck, so every word comes up before any comes up twice.

         The throw is then solved rather than guessed: run the same physics
         forward for a few hundred candidate speeds, keep the ones that stop
         on the wanted word after three to four and a half seconds, and pick
         one of those at random. The drum is not steered or stopped early;
         it is thrown at exactly the speed that lands it there, the way a
         croupier learns to. */
      function reorder(){
        shuffle(items);
        var three = "";
        for (var c = 0; c < 3; c++){
          three += items.map(function(it){
            return '<div class="ritem"><b>' + it.html + '</b>'
                 + (it.sub ? '<i>' + it.sub + '</i>' : '') + '</div>';
          }).join("");
        }
        strip.innerHTML = three;
        paint();
      }
      /* the same integration as frame(), run forward with no drawing */
      function dryRun(v0){
        var p = 0, u = v0, t = 0, dt = 1 / 60;
        while (u > CATCH && t < 12){
          u -= (SLOW * u + DRAG) * dt;
          if (u < 0) u = 0;
          p += u * dt;
          t += dt;
        }
        return { slot: Math.round(p / H), secs: t + 0.3 };   /* 0.3 to settle */
      }
      /* The window the throw has to land in. Wide, because the speeds that
         stop on a given word come in clusters, one per extra turn of the
         drum: a narrow window leaves two or three of them and every spin
         takes the same time as the last. */
      var MINS = 2.8, MAXS = 5.0;
      function throwTo(slot){
        var from = Math.round(pos / H), want = ((slot % L) + L) % L, hits = [];
        /* Gentler friction means a four second spin starts slower, so the
           search starts lower, and in finer steps, because the speeds that
           stop on one word are rarer when fewer of them are in range. */
        for (var v0 = 1800; v0 <= 15000; v0 += 10){
          var r = dryRun(v0);
          if (r.secs < MINS || r.secs > MAXS) continue;
          if ((((from + r.slot) % L) + L) % L === want) hits.push(v0);
        }
        if (!hits.length) return launch(3400 + Math.random() * 3000);
        launch(hits[Math.floor(Math.random() * hits.length)]);
      }

      paint();
      return {
        /* A free spin, for when nothing has asked for a particular word. */
        spin: function(){ reorder(); launch(3200 + Math.random() * 3600); },
        /* Spin and land on this one. */
        spinTo: function(id){
          reorder();
          var i = 0;
          items.forEach(function(it, n){ if (it.id === id) i = n; });
          throwTo(i);
        },
        at: at,
        spinning: function(){ return spinning; }
      };
    }
    return { mount: mount, cancel: cancel };
  })();

  var STEPS = [
    { id:"kotoba", ja:"ことば",   en:"The words" },
    { id:"yomu",   ja:"よむ",     en:"Read it" },
    { id:"toi",    ja:"しつもん", en:"Questions" },
    { id:"yaku",   ja:"やくす",   en:"Translate" },
    { id:"hayaku", ja:"はやく",   en:"Read it again" },
    { id:"bunpou", ja:"ぶんぽう", en:"Grammar", whole:true },
    { id:"roulette", ja:"ルーレット", en:"Spin a pattern", whole:true },
    { id:"jibun",  ja:"じぶんで", en:"Write your own", whole:true },
    { id:"kuraberu", ja:"くらべる", en:"All six", whole:true }
  ];
  var at = 0, who = 0, DRAW = {};
  function P(){ return K.people[who % K.people.length]; }
  function tag(){ return STEPS[at].id + ":" + P().id; }

  function paintSteps(){
    var lastWhole = false;
    $("steps").innerHTML = STEPS.map(function(s,i){
      var all = s.whole
        ? S.done[s.id] : K.people.every(function(p){ return S.done[s.id+":"+p.id]; });
      var head = "";
      if (!i) head = '<span class="grp">この人<em>this person</em></span>';
      else if (s.whole && !lastWhole)
        head = '<span class="grp">ユニット<em>the whole unit</em></span>';
      lastWhole = !!s.whole;
      return head + '<button data-i="'+i+'"'+(i===at?' aria-current="step"':'')
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
        ninja($("kin"));
        $("kfb").innerHTML = '<div class="mark yes"><b>Yes</b><span class="jp">'
          + ruby(v.ja) + '</span> ' + saybtn(v.ja) + '</div>';
        wireSay();
        setTimeout(function(){ kAt++; draw(); }, 900);
      } else {
        kbump(v, -1);
        yokai($("kin"));
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
  /* ---- practised, not finished ----
     This records that a gap has been answered right once, which is what
     the tick in the index and the count in the footer are for. It is NOT
     a reason to stop offering the exercise. The screen used to read this
     and hand the answer straight back: three patterns in, every gap a
     student returned to was already filled in and its tiles were gone,
     so the rung could be done once and never again. A pattern a student
     wants a second go at is the whole point of a grammar drill. */
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

    /* Every gap starts empty and every tray starts full, whether or not
       this one has been answered before. A tick in the index says which
       patterns have been done; the exercise itself is always offered. */
    $("gits").innerHTML = (g.items || []).map(function(it, i){
      var parts = String(it.ja).split(/＿+/);
      return '<div class="qrow" data-it="' + i + '">'
        + '<div class="q">' + ruby(parts[0] || "")
        + '<span class="gap" data-gap="' + i + '">　</span>'
        + ruby(parts.slice(1).join("")) + '</div>'
        + '<div class="row" style="flex-wrap:wrap;margin-top:6px" data-tray="' + i
        + '">' + shuffle((it.options || []).slice()).map(function(o){
            return '<button class="tile" data-tile="' + esc(plain(o)) + '" data-for="'
              + i + '">' + ruby(o) + '</button>';
          }).join("") + '</div>'
        + '<div data-gfb="' + i + '"></div></div>';
    }).join("");

    dragdrop($("gits"), function(tile, gap){
      var i = +gap.dataset.gap, it = g.items[i];
      if (String(tile.dataset.for) !== String(i)) return;   /* another item's tile */
      if (gap.classList.contains("ok")) return;             /* already answered here */
      var fb = $("gits").querySelector('[data-gfb="' + i + '"]');
      if (tile.dataset.tile === plain(it.answer)){
        /* The points are for getting it right the first time. A second go
           at a pattern is welcome and free; it is not worth two more
           points, or the score becomes a measure of patience. */
        var first = !S.wrote[gkey(g, i)];
        S.wrote[gkey(g, i)] = 1; save();
        if (first) award(2);
        gap.innerHTML = ruby(it.answer);
        gap.classList.remove("bad"); gap.classList.add("ok");
        ninja(gap);
        each($("gits"), '[data-tray="' + i + '"] .tile', function(x){ x.remove(); });
        fb.innerHTML = '<div class="mark yes"><b>Yes</b><span class="jp">'
          + ruby(String(it.ja).replace(/＿+/, plain(it.answer))) + '</span></div>';
        wireSay();
        /* The tick and the count move without redrawing. A redraw here
           used to wipe the gaps the student had just filled, which on the
           last item of a pattern looked like the screen giving up. */
        if (gdone(g)){
          var tick = $("gidx").querySelector('[data-g="' + gAt + '"]');
          if (tick && !tick.classList.contains("done")){
            tick.classList.add("done");
            tick.innerHTML = ruby(g.pat) + " \u2714";
          }
          var sc = $("main").querySelector(".score b");
          if (sc) sc.textContent = G.filter(gdone).length;
          if (G.every(gdone) && !S.done["bunpou"]){
            S.done["bunpou"] = 1; save(); paintSteps();
          }
        }
      } else {
        gap.classList.add("bad");
        yokai(gap);
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
  /* ---- the portrait ----
     Andrew's idea, and a good one: six names on a page are six names,
     and a face makes them six people. The files live in art/ and each
     card in kiji.js names its own, so the page works with none of them,
     some of them, or all six. A file that is not there hides its own
     frame rather than leaving a broken-image icon on a classroom
     screen, which is the one way a missing picture could make the page
     look broken rather than plain.

     Not on だれですか, deliberately. That rung asks a student to tell six
     people apart by reading Japanese, and a portrait beside the clues
     turns a reading task into a picture-matching one. */
  function portrait(p, cls){
    var a = p.art;
    /* ready is false until the file is actually in art/. Naming a file
       that is not there would have every student's browser ask for six
       pictures that do not exist, on every page view, and answer itself
       with six 404s. The slot stays empty and silent until the picture
       exists. */
    if (!a || !a.file || !a.ready) return "";
    return '<figure class="art ' + (cls || "") + '">'
      + '<img src="art/' + esc(a.file) + '" alt="' + esc(a.alt || "") + '"'
      + ' loading="lazy" decoding="async" data-art="' + esc(p.id) + '">'
      + '</figure>';
  }
  /* A file that is not there takes its own frame with it. */
  document.addEventListener("error", function(ev){
    var t = ev.target;
    if (t && t.tagName === "IMG" && t.hasAttribute("data-art")){
      var f = t.closest("figure");
      if (f) f.remove();
    }
  }, true);

  DRAW.yomu = function(){
    var p = P();
    $("main").innerHTML =
        '<div class="rule"><b>Read it</b>Tap any word for its meaning. Tap a '
      + 'single kana for the chart. Both cost a point, and nothing stops you '
      + 'using them. The underlined parts are the ones the paper asks you to '
      + 'translate.</div>'
      + '<div class="work"><div class="col">'
      + portrait(p, "wide")
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
    /* ---- what counts as finished ----
       A question carrying `note` is one the article does not answer, and
       judge() always returns "not in the article" for it, on purpose. It
       therefore can never be right, and counting it towards the total
       made いわさき's set impossible to finish: seven of eight for ever,
       no tick, and はやく locked behind it saying go and answer the
       questions you have already answered. A question the page will not
       mark is not a question the student has to get right. */
    var markable = qs.filter(function(q){ return !q.note; }).length;
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
      $("sc").innerHTML = '<b>'+right+'</b> of '+markable
        + (markable < qs.length ? ' <span class="hint">(one of them is not in '
           + 'the article, so it is not counted)</span>' : '');
      /* The whole page is marked in one press, so one creature for the
         lot rather than eight at once: the ninja when every question is
         right, the yokai when a student has answered and none of them
         is. Nothing in between, because a creature every time somebody
         checks their working halfway is a nag. */
      if (markable && right === markable){ ninja($("sc")); done(); }
      else if (asked && !right) yokai($("sc"));
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
  /* ---- ルーレット ----
     Andrew asked for a wheel here, and the thing this page is missing is
     not more vocabulary practice: ことば already spins words in its かく
     mode. What ぶんぽう cannot do is ask a student to PRODUCE a pattern.
     Choosing the right tile out of three is recognition, and a student
     can clear every pattern in the unit without once writing one.

     So the drum carries the thirteen patterns and the page names a
     person, and the student writes one sentence about that person using
     that pattern. Two things come off decks rather than at random: the
     pattern, so all thirteen come up before any comes up twice, and the
     person, so nobody writes six sentences about さかもと.

     What the marker checks is the SHAPE AND NOTHING ELSE, the same rule
     じぶんで runs on, and it says so every time. It can see whether a
     sentence has に and 生まれました in it. It cannot see whether the year
     is the right year, and no checker could, so it does not pretend to. */
  function gmiss(g, got){
    var missing = fmiss(g, got);
    if (missing === null || missing.length) return missing;
    /* A couple of the patterns are about a shape rather than a word:
       〜たり〜たり needs two of them, and しかし needs a sentence in front
       of it. Those carry a regular expression as well as a word list. */
    if (g.re && !new RegExp(g.re).test(plain(got))) return [g.pat];
    return [];
  }
  /* ---- a deck, so nothing comes up in the order it is written down ----
     Lifted from ひと. The wheel deals the pattern it is about to be
     thrown at, and a second deck deals the person, so all thirteen
     patterns and all six people come up before any of them comes up
     twice. */
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

  var spinR = null, spunG = null;
  DRAW.roulette = function(){
    var G = K.grammar || [];
    /* Five of the six articles are first-person じこしょうかい; the LED one
       is third-person and about an invention. "Write about the inventors
       of the blue LED using 〜に生まれました" is not a sentence anybody can
       write, so the wheel's people are the five who introduce themselves. */
    var PEOPLE = (K.people || []).filter(function(x){ return x.first_person; });
    if (!G.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    var done13 = G.filter(function(g){ return S.done["rl:" + g.id]; }).length;
    $("main").innerHTML =
        '<div class="rule"><b>Spin a pattern</b>The wheel gives you one of '
      + 'the thirteen patterns and one of the six people. Write one sentence '
      + 'about that person using that pattern. The page checks the pattern '
      + 'and nothing else: whether what you wrote is TRUE of them is for you '
      + 'and your teacher.</div>'
      + '<div class="work fit"><div class="col">'
      + '<div class="reel" id="reel">'
      + '<div class="rwin"><div class="rstrip"></div><div class="rmark"></div></div>'
      + '<button class="rspin" id="rgo" aria-label="Spin the wheel">'
      + '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
      + ' stroke="currentColor" stroke-width="2" stroke-linecap="round">'
      + '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 3v4h-4"/>'
      + '</svg></button></div>'
      + '<div id="ask"></div></div></div>'
      + '<div id="rfb" class="fbslot"></div>'
      + foot('<span class="score"><b>' + done13 + '</b> of ' + G.length
          + ' written</span>'
        + '<span id="rtip" class="hint">Flick the drum, or press the button.</span>');

    spinR = REEL.mount($("reel"), G.map(function(g){
      return { id: g.id, html: ruby(g.pat), sub: esc(g.title_en) };
    }), function(it){ landed(it.id); });

    function clearAsk(){
      $("rfb").innerHTML = ""; $("ask").innerHTML = "";
      $("rtip").textContent = "Spinning…";
    }
    $("rgo").onclick = function(){
      SFX.wake();                       /* the engine starts inside the press */
      clearAsk();
      spinR.spinTo(G[dealt("rl", G.length)].id);
    };
    $("reel").querySelector(".rwin").addEventListener("pointerdown", clearAsk);

    function landed(id){
      var g = null;
      G.forEach(function(x){ if (x.id === id) g = x; });
      if (!g) return;
      spunG = g;
      /* The deck moves on only when the drum stopped where it was sent: a
         student who throws it by hand lands where the physics put them. */
      if (G[dealt("rl", G.length)] === g) advance("rl", G.length);
      var who2 = PEOPLE[dealt("rlp", PEOPLE.length)];
      advance("rlp", PEOPLE.length);
      $("rtip").textContent = "Write one sentence.";
      $("ask").setAttribute("data-pat", g.id);
      $("ask").setAttribute("data-who", who2.id);
      $("ask").innerHTML =
          '<div class="mark yes"><b>the shape</b><span class="jp">'
        + ruby(g.form) + '</span></div>'
        + '<p class="ask-en">Write about <b>' + esc(plain(who2.name_ja))
        + '</b> using <span class="jp">' + ruby(g.pat) + '</span></p>'
        + '<div class="row"><input id="rin" type="text" autocomplete="off"'
        + ' autocapitalize="off" spellcheck="false" lang="ja" class="ans"'
        + ' aria-label="Your sentence"></div>'
        + '<div class="row" style="margin-top:7px">'
        + '<button class="btn sm" id="rchk">Check</button>'
        + '<button class="btn ghost sm" id="reg">Show an example</button></div>';
      $("rin").focus();
      $("rin").onkeydown = function(ev){ if (ev.key === "Enter") check(); };
      $("rchk").onclick = check;
      $("reg").onclick = function(){
        spend(1, "example shown");
        var e = (g.egs || [])[0] || { ja:"", en:"" };
        $("rfb").innerHTML = '<div class="mark hm"><b>one from the articles</b>'
          + '<span class="jp">' + ruby(e.ja) + '</span> ' + saybtn(e.ja)
          + '<p>' + esc(e.en) + '</p></div>';
        $("reg").disabled = true;
        wireSay();
      };

      function check(){
        var got = ($("rin").value || "");
        var missing = gmiss(g, got);
        if (missing === null){
          $("rfb").innerHTML = '<div class="mark hm"><b>Nothing there yet</b>'
            + 'Write the sentence first.</div>';
          return;
        }
        if (!missing.length){
          if (!S.done["rl:" + g.id]){ S.done["rl:" + g.id] = 1; award(3); save(); }
          ninja($("rfb"));
          $("rfb").innerHTML = '<div class="mark yes"><b>The pattern is there</b>'
            + '<span class="jp">' + esc(got) + '</span>'
            + '<p>That is the grammar the wheel asked for. Whether it is true '
            + 'of ' + esc(plain(who2.name_ja)) + ', and whether the words are '
            + 'the right words, this page cannot tell you.</p></div>';
          var n = G.filter(function(x){ return S.done["rl:" + x.id]; }).length;
          var sc = $("main").querySelector(".score b");
          if (sc) sc.textContent = n;
          if (n === G.length && !S.done["roulette"]){
            S.done["roulette"] = 1; award(4); save(); paintSteps();
          }
        } else {
          yokai($("rfb"));
          $("rfb").innerHTML = '<div class="mark no"><b>Not yet</b>'
            + 'There is no <span class="jp">' + esc(plain(missing[0]))
            + '</span> in your sentence'
            + (missing.length > 1 ? ', and ' + (missing.length - 1) + ' other part'
                + (missing.length > 2 ? 's are' : ' is') + ' missing too' : '')
            + '. The shape is <span class="jp">' + esc(plain(g.form))
            + '</span>.</div>';
        }
      }
    }
  };

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
        ninja(fb);
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
        yokai(fb);
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
      return '<tr><td class="jp">' + portrait(p, "thumb") + ruby(p.name_ja) + '<br>'
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
