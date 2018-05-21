const version = 'v1';

self.addEventListener('install', function(event) {
  console.log('[serviceWorker] v1 installed');
  event.waitUntil(
    caches.open(version).then(function(cache){
      return cache.addAll(['/offline/index.html','/offline/style.css','/stylesheets/bootstrap.css','/javascripts/bootstrap.js','/javascripts/jquery-3.2.1.js']);
    }));
})

self.addEventListener('activate', function(event) {
  console.log('[serviceWorker] activated');
})

self.addEventListener('fetch', function(event) {
  if (!navigator.onLine) {
    event.respondWith(caches.match(new Request('/offline/index.html')));
  } else {
    console.log('[serviceWorker] fetching', event.request.url);
    event.respondWith(fetch(event.request));
  }
})
