/*********************************************************
 * 
 * Service Worker
 * 
 *********************************************************/

const CACHE_NAME = 'Cache-v001';
const CACHE_RESOURCES = [
    '/',
    '/index.html', '/style.css',
    '/main.js', '/rain.js',
    '/icon/plain.svg', '/icon/maskable.svg',
    '/favicon.ico', '/favicon.svg', "/apple-icon.png",
    '/manifest.json'
];

/*
 * Event:install
 * 　Service Workerの初回登録時に呼ばれる
 */

// Prefetch
// 　リソースを事前にキャッシュへ保存
const addResourcesToCache = async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CACHE_RESOURCES);
};

self.addEventListener('install', (event) => {
    console.log('Service Worker event(install) !');
    event.waitUntil(addResourcesToCache());
});

/*
 * Event:activate
 * 　Service Workerの有効化後に呼ばれる
 * 
 * 　有効化とは
 * 　　旧Service Workerのリクエスト処理が終わり、
 * 　　新Service Workerへ切り替わること
 */

// Delete old cache
// 　古いキャッシュの削除を行う
const deleteCache = async (key) => {
    console.log('Delete cache. Name:', key)
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const keyList = await caches.keys();
    const oldCache = keyList.filter((key) => (key != CACHE_NAME));
    await Promise.all(oldCache.map(deleteCache));
};

self.addEventListener("activate", (event) => {
    console.log('Service Worker event(activate) !');
    event.waitUntil(deleteOldCaches());
});

/*
 * Event:fetch
 * 　サーバーへリソースが要求された場合に呼ばれる
 */

// Cache first
// 　リクエストされたリソースをキャッシュから探す、
// 　キャッシュに存在しない場合はサーバーへ要求
const cacheFirst = async (request) => {
    const response = await caches.match(request);
    if (response) {
      console.log('Cache hit. URL:', request.url);
      return response;
    }
    console.log('Request to server. URL:', request.url);
    return fetch(request);
};

self.addEventListener('fetch', (event) => {
    console.log('Service Worker event(fetch) !', event.request.url);
    event.respondWith(cacheFirst(event.request));
});
