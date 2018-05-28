if (navigator.serviceWorker.controller) {
  console.log('[serviceWorker] active service worker found, no need to register')
} else {
  navigator.serviceWorker.register('./sw.js')
    .then(function(reg) {
      console.log('Service worker has been registered for scope:' + reg.scope);
    });
}
