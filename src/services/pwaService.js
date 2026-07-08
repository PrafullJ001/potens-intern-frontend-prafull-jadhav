export function registerServiceWorker() {
  // Only register the service worker in production.
  // Registering it in dev causes stale cached responses to be served
  // instead of your live code changes from the Vite dev server.
  if (!import.meta.env.PROD) {
    return;
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.warn("SW registration failed:", err));
    });
  }
}