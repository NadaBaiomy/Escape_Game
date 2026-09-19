var C='escape-game-v1';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
 if(e.request.method!=='GET')return;
 e.respondWith(caches.open(C).then(function(cache){
  return cache.match(e.request).then(function(cached){
   var fresh=fetch(e.request).then(function(res){
    if(res&&res.status===200)cache.put(e.request,res.clone());
    return res;
   }).catch(function(){return cached});
   return cached||fresh;
  });
 }));
});
