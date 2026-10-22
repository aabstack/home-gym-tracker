import { registerSW } from 'virtual:pwa-register';

export const UPDATE_EVENT = 'gym:update-ready';

/**
 * Registers the service worker. With registerType 'autoUpdate' a new version installs and
 * activates by itself; instead of force-reloading (which could interrupt a set), we raise an
 * event so the UI can show an "Update available" toast.
 */
export function registerPwa() {
  if (import.meta.env.DEV) return;
  registerSW({
    immediate: true,
    onNeedReload() {
      window.dispatchEvent(new Event(UPDATE_EVENT));
    },
  });
}
