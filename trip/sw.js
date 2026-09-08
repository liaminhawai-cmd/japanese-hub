/* ============================================================================
   Service worker for the Japan Study Tour app.
   ----------------------------------------------------------------------------
   The whole point of this file: a student at Himeji with no data still gets
   the app. Nothing here needs a build step or a package. It is plain script.

   Two layers:
     1. INSTALL precaches the shell (page, content, icons) the moment the app
        is first opened, so the app itself always survives losing signal.
     2. FETCH is cache-first. Anything fetched while online is added to the
        cache, so photos warm up as they are viewed. The "save for offline"
        button on the Today screen walks every photo deliberately, which is
        what students are told to press on hotel wifi.

   Bump CACHE when the app changes, or phones will keep serving the old copy.
   ========================================================================== */

var CACHE = "japan-trip-v11";

var SHELL = [
  "./",
  "./index.html",
  "./data.js",
  "./map.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function (e) {
  // addAll fails the whole install if any one file 404s, so add them
  // individually and let a missing optional file pass.
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () { /* optional file, keep going */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  // Only ever serve our own files. Nothing else is fetched anyway.
  if (new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        // Offline and not cached. For a page request, hand back the app
        // rather than the browser's dinosaur.
        if (req.mode === "navigate") return caches.match("./index.html");
        return new Response("", { status: 504, statusText: "offline" });
      });
    })
  );
});
