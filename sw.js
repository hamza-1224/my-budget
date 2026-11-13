// My Budget offline support.
// Pages and settings: network first so updates arrive, but after 4 seconds on a weak
// connection (or if the network returns an error) the saved copy is used instead.
// The database library and icons never change between releases, so they load from the phone.
const CACHE = "my-budget-1.0.12";
const SHELL = ["./", "index.html", "config.js", "vendor/supabase.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const STATIC = /\/(vendor\/supabase\.js|icon-192\.png|icon-512\.png|apple-touch-icon\.png)$/;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("my-budget-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function fromNetwork(req) {
  return fetch(req).then((res) => {
    if (res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
    }
    return res;
  });
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || url.pathname.endsWith("version.json")) return;
  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached && STATIC.test(url.pathname)) return cached;
    const net = fromNetwork(req);
    try {
      const res = await (cached ? Promise.race([net, new Promise((_, no) => setTimeout(() => no(new Error("slow")), 4000))]) : net);
      if (res.ok || !cached) return res;
      return cached;
    } catch (err) {
      if (cached) return cached;
      if (req.mode === "navigate") {
        const page = await caches.match("index.html");
        if (page) return page;
      }
      throw err;
    }
  })());
});
