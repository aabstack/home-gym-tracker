# Home Gym Tracker

An offline-first **Progressive Web App** for logging a fixed 3-day full-body hypertrophy program (A → B → C) on a Samsung Galaxy S23. No backend and no accounts: all data stays in IndexedDB on the phone.

**Live URL:** _not deployed yet._ After the first GitHub Pages deploy it will be `https://<your-github-user>.github.io/<repo-name>/`. Put the real link here.

## Features

- Today screen with the next workout in rotation, training week, deload banner, and a 40-hour rest warning
- Warm-up checklist with an optional 4-minute timer
- Set-by-set logging with large steppers (weight snaps to your dumbbells), reps, RIR and technique tags. Each set autosaves the moment you tick it
- Prefill from last session, a "Last time" line, and progression suggestions (double progression plus the program's ladder)
- Rest timer based on an end timestamp, so it survives screen-off and app restarts. Vibrates, beeps (optional) and sends a notification when the app is in the background
- Supersets (Day C) alternate A1, B1, A2, B2…; swap exercises within the same movement pattern
- Session summary with PRs and a beat / matched / fell-short comparison
- History list, calendar, and session edit; progress charts (top set, e1RM, reps, volume, bodyweight, weekly sets per muscle)
- JSON backup and restore (merge or replace), CSV export, delete all data
- Installable, works fully offline, dark theme by default with a light theme that follows the system setting

## Development

Requires Node 20.19+ (tested with Node 24).

```bash
npm install
npm run dev          # http://localhost:5173
npm run dev -- --host   # also reachable from the phone on the same Wi-Fi
npm test             # Vitest (domain logic, data layer, components)
npm run coverage     # coverage report for src/domain
npm run lint         # ESLint + tsc --noEmit
npm run build        # production build into dist/
npm run preview      # serve the build (service worker active)
npm run icons        # regenerate PWA icons from scripts/make-icons.mjs
```

In dev mode, **Settings → Developer → Generate demo data** adds 12 fake sessions for checking History and Progress. The button is not included in production builds.

The service worker is only registered in production builds (`npm run build && npm run preview`). On the phone over LAN `http://` there is no secure context, so the service worker, wake lock and notifications only work from the HTTPS GitHub Pages URL or from `localhost`.

### Project layout

```
src/
  data/        program.seed.json (verbatim from PROGRAM.md), db.ts (Dexie schema), seed.ts,
               repo.ts (queries), settings.ts, backup.ts (JSON/CSV), demo.ts (dev only)
  domain/      pure, unit-tested logic: rotation, progression, deload, stats, session, format
  features/    today/, warmup/, session/, exercise/, history/, progress/, settings/
  components/  shared UI (Button, Stepper, Sheet, Card, Segmented, Toggle, …)
  hooks/       useWakeLock, useNow, vibration/sound/notifications
  pwa/         service worker registration + update toast event
```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository with `main` as the default branch.
2. In the repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which lints, tests, builds with `BASE_PATH=/<repo>/` and publishes `dist/`.
4. When a new version is deployed, the open app shows an **Update available** toast. Tap **Reload** to switch to it.

## Installing on the Samsung S23

1. Open the deployed URL in **Chrome** (or Samsung Internet).
2. Chrome: tap ⋮ → **Add to Home screen** → **Install**.
   Samsung Internet: tap ☰ → **Add page to** → **Home screen**.
3. Launch it from the home screen icon. It opens full-screen and works offline, including in airplane mode.
4. On your first workout, allow notifications so the rest timer can alert you while the screen is off.
5. Back up regularly from **Settings → Export backup**, because your data lives only on the phone.

## Notes

- The seed contains **19** exercises (6 + 6 + 7). TASKS.md said 18; the canonical JSON in PROGRAM.md wins.
- Lighthouse 12+ no longer has a PWA category. Installability is shown in Chrome DevTools → Application → Manifest. The last local Lighthouse run (mobile, throttled) scored Performance 99, Accessibility 100 and Best Practices 100.
