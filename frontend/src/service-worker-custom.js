try {
  if ("function" === typeof importScripts) {
    importScripts(
      "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
    );

    // Global workbox
    if (workbox) {
      workbox.setConfig({ debug: true });
      console.log("Workbox ID: ${WORKBOX_ID}");

      //`generateSW` and `generateSWString` provide the option
      // to force update an exiting service worker.
      // Since we're using `injectManifest` to build SW,
      // manually overriding the skipWaiting();
      self.addEventListener("install", () => {
        self.skipWaiting(); // Skip to activation step - taken care in serviceWorker.ts
      });

      self.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          self.skipWaiting();
        }
      });

      workbox.core.clientsClaim();

      // Manual injection point for manifest files.
      // All assets under build/ and 5MB sizes are precached.
      try {
        workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);;
      } catch (e) {
        console.error(e);
      }

      workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
        blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
      });

      // Font caching
      /*workbox.routing.registerRoute(
        new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
        new workbox.strategies.CacheFirst({
          cacheName: "googleapis",
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 30,
            }),
          ],
        })
      );*/
    } else {
      console.error("Workbox could not be loaded. No offline support");
    }
  }
} catch (e) {
  console.error("Unable to install service worker. Possible network error.", e);
}
