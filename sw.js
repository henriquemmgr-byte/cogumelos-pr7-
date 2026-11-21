const V="pr7-v4",IMG="pr7-img",CORE=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==IMG).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.hostname.endsWith("api.inaturalist.org"))return;
 if(u.origin!==location.origin){e.respondWith(caches.open(IMG).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{c.put(r,n.clone());return n}))));return}
 if(r.mode==="navigate"||u.pathname.endsWith(".html")||u.pathname.endsWith("/")){
  e.respondWith(fetch(new Request(r.url,{cache:"no-store"})).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put("index.html",c));return n}).catch(()=>caches.match("index.html")));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r)))});