const CACHE = "distribuye-distrileco-v2";
const ARCHIVOS = ["./","index.html","manifest.json","img/logo-distrileco.png","img/icon-192.png","img/icon-512.png","img/poster-portada.jpg",
  "img/poster-proleche-largo.jpg","img/poster-proleche-corto.jpg","img/poster-parmalat.jpg",
  "img/proleche-bolsa.jpg","img/proleche-mascota.jpg","img/proleche-campo.jpg","img/proleche-familia.jpg",
  "img/parmalat-crema.jpg","img/parmalat-chef.jpg","img/parmalat-vaca.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  if(e.request.url.includes("/video/"))return; // los videos van directo, sin caché
  e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.status===200){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)));
});
