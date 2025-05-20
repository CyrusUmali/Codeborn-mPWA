const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
// Configuration
const WWW_FOLDER = '.'; // Use current directory
const SW_OUTPUT = './sw.js'; // Output sw.js in current dir

const CACHE_NAME = 'rmmv-pwa-cache-' + crypto.randomBytes(4).toString('hex');
const EXCLUDE_PATTERNS = [
  /\.map$/,
  /\.DS_Store/,
  /Thumbs\.db/,
  /\.gitkeep/,
  /\/test\//i,
  /\/demo\//i
];

// Get all files recursively
function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries
    .filter(entry => !entry.isDirectory())
    .map(entry => path.join(dir, entry.name).replace(/\\/g, '/'));

  const folders = entries.filter(entry => entry.isDirectory());
  folders.forEach(folder => {
    files.push(...getFiles(path.join(dir, folder.name)));
  });

  return files;
}

// Filter and format files
function prepareFiles() {
  const allFiles = getFiles(WWW_FOLDER);
  return allFiles
    .map(file => file.replace(WWW_FOLDER, ''))
    .filter(file => !EXCLUDE_PATTERNS.some(pattern => pattern.test(file)))
    .sort();
}

// Generate the service worker content
function generateServiceWorker(files) {
  return `// Auto-generated Service Worker for RPG Maker MV
const CACHE_NAME = '${CACHE_NAME}';
const APP_SHELL = [
  '/',
  '/index.html',
  '/js/main.js',
  '/js/plugins.js',
  '/js/rpg_core.js',
  '/js/rpg_managers.js',
  '/js/rpg_objects.js',
  '/js/rpg_scenes.js',
  '/js/rpg_sprites.js',
  '/js/rpg_windows.js',
  '/css/style.css'
];

const GAME_ASSETS = [
${files.map(file => `  '${file}'`).join(',\n')}
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()))
  );
});

self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === location.origin;
  const isGameAsset = GAME_ASSETS.some(asset => requestUrl.pathname.endsWith(asset));

  // Handle game assets
  if (isSameOrigin && isGameAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          // Return cached if found
          if (response) return response;
          
          // Otherwise fetch, cache, and return
          return fetch(event.request).then(networkResponse => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return fallbacks for specific file types
            if (event.request.url.match(/\\.(png|jpe?g|gif|webp)$/i)) {
              return caches.match('/img/system/Empty.png');
            }
            if (event.request.url.match(/\\.(ogg|m4a|mp3|wav)$/i)) {
              return new Response('', { status: 200 }); // Silent audio
            }
            return new Response('Offline', { status: 503 });
          });
        });
      })
    );
    return;
  }

  // For all other requests (including CDN assets)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful same-origin responses
        if (response.ok && isSameOrigin) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Message handling for cache updates
self.addEventListener('message', event => {
  if (event.data.action === 'UPDATE_CACHE') {
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(GAME_ASSETS.filter(url => 
        !url.includes('data/') // Skip volatile data files
      ));
    });
  }
});
`;
}

// Run the generation
const files = prepareFiles();
const swContent = generateServiceWorker(files);
fs.writeFileSync(SW_OUTPUT, swContent);

console.log(`Service worker generated with ${files.length} assets`);
console.log(`Output: ${SW_OUTPUT}`);