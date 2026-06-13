const CACHE_VERSION = '2026-06-13'
const CACHE_NAME = `frankdoka-${CACHE_VERSION}`
const OFFLINE_URL = '/'

const PRECACHE_URLS = [
  '/',
  '/about',
  '/blog',
  '/projects',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Only handle GET requests; let the browser deal with the rest.
  if (event.request.method !== 'GET') return

  if (event.request.mode !== 'navigate') {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    )
    return
  }

  // Network-first for navigations. Only cache successful (2xx) responses so a
  // transient error page (e.g. a 500 during a bad deploy) can never get stuck
  // in the cache and keep being served after the site recovers.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(OFFLINE_URL)))
  )
})
