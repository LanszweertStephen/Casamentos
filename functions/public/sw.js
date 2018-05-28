const version = 'v1';

self.addEventListener('install', function(event) {
  console.log('[serviceWorker] v1 installed');
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll(['/offline/index.html', '/offline/style.css']);
    }));
})

self.addEventListener('activate', function(event) {
  console.log('[serviceWorker] activated');
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(res){
      if(res) return res;
      if(!navigator.onLine) return caches.match(new Request('/offline/index.html'));
      return fetch(event.request);
    })
  )
})
