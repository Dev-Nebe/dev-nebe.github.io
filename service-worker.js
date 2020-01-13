const cacheName = 'cache-v1';

let precacheResources = [
  '/',
  '/index.html',
  '/asets/css/main.css',
  '/js/main.js'
];

self.addEventListener('install', (event) => {
  console.log('Service worker is being installed');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(precacheResources))
    .catch(err => console.log(err));
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker is being activated');
});

self.addEventListener('fetch', (event)=> {
  console.log(`Fetch request has been intercepted for ${event.request.url}`);
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        } else {
          return fetch(event.request);
        }
    })
      .catch(err => console.log(err));
  );
});
