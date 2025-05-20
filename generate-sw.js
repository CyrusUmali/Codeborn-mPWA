const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const WWW_FOLDER = '.'; // root folder of your web files
const SW_OUTPUT = './sw.js';

// Generate a unique cache name for cache busting
const CACHE_NAME = 'rmmv-pwa-cache-' + crypto.randomBytes(4).toString('hex');

const EXCLUDE_PATTERNS = [
  /\.map$/,
  /\.DS_Store/,
  /Thumbs\.db/,
  /\.gitkeep/,
  /\/test\//i,
  /\/demo\//i,
  /\/\.git\//  // <-- Add this line to exclude .git folder
];

// Recursively read all files in a directory
function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(getFiles(fullPath));
    } else {
      // Normalize to forward slashes and ensure path starts with slash
      let normalized = fullPath.replace(/\\/g, '/');
      if (!normalized.startsWith('/')) normalized = '/' + normalized;
      files.push(normalized);
    }
  }

  return files;
}

// Filter and format files for caching
function prepareFiles() {
  const allFiles = getFiles(WWW_FOLDER);

  return allFiles
    .filter(file => !EXCLUDE_PATTERNS.some(pattern => pattern.test(file)))
    .sort();
}

// Generate the service worker string content
function generateServiceWorker(files) {
  // Separate app shell (core files) and game assets (rest)
  // You can define APP_SHELL manually or extract some known files from files array
  const appShellFiles = [
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

  // Ensure APP_SHELL files exist in files list (optional)

  // Remove APP_SHELL files from GAME_ASSETS to avoid duplication
  const gameAssets = files.filter(f => !appShellFiles.includes(f));

  return `// Auto-generated Service Worker for RPG Maker MV
const CACHE_NAME = '${CACHE_NAME}';
const APP_SHELL = [
${appShellFiles.map(f => `  '${f}'`).join(',\n')}
];

const GAME_ASSETS = [
${gameAssets.map(f => `  '${f}'`).join(',\n')}
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL.concat(GAME_ASSETS)))
      .then(() => self.skipWaiting())
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
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === location.origin;
  const isGameAsset = GAME_ASSETS.some(asset => requestUrl.pathname === asset);

  if (isSameOrigin && (APP_SHELL.includes(requestUrl.pathname) || isGameAsset)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) return response;

          return fetch(event.request).then(networkResponse => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            if (event.request.url.match(/\.(png|jpe?g|gif|webp)$/i)) {
              return caches.match('/img/system/Empty.png');
            }
            if (event.request.url.match(/\.(ogg|m4a|mp3|wav)$/i)) {
              return new Response('', { status: 200 });
            }
            return new Response('Offline', { status: 503 });
          });
        });
      })
    );
    return;
  }

  // For other requests (CDN, external)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok && isSameOrigin) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'UPDATE_CACHE') {
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(GAME_ASSETS.filter(url => !url.includes('data/')));
    });
  }
});
`;
}

// Run everything
const files = prepareFiles();
const swContent = generateServiceWorker(files);
fs.writeFileSync(SW_OUTPUT, swContent);

console.log(`Service worker generated with ${files.length} assets`);
console.log(`Output: ${SW_OUTPUT}`);
