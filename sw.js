const CACHE_NAME = 'eipi-erp-v1';
const assetsToCache = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', event => {
  // لا تقم أبداً باعتراض أو توجيه طلبات الـ fetch الخاصة بجوجل سكريبت عبر الـ Cache لتجنب كسر السياق
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
