# My Budget: notes for future changes

- Static web app served by GitHub Pages from `main` at https://hamza-1224.github.io/my-budget/
- All app code is in `index.html` (styles + one script). `vendor/supabase.js` is supabase-js 2.118.0 (UMD).
- Data lives in Supabase (project `itgujuuslkymplwfxmft`), table `public.docs` (user_id, coll, id, data jsonb), with row-level security per user. Collections: `config/main`, `txns/*`, `goals/*`. See `schema.sql`.
- The sync layer (`makeStore`) mimics a small document-store API: `collection(c).onSnapshot`, `doc(path).set/update/delete`. Writes are optimistic with an offline outbox in localStorage.
- Releasing a change: bump the version in **three places together**: `version.json`, `APP_VERSION` in `index.html`, and the `CACHE` name in `sw.js`. Open copies of the app then show "Update ready · tap to reload".
- Never commit personal data or backups. Only the publishable key belongs in `config.js`.
- No AI calls in the app, by the owner's choice.
- Exchange rates: European Central Bank daily reference rates from https://api.frankfurter.dev (free, no key), checked at most every 3 hours when the app opens. The owner can type their own rate, which turns daily updates off (`fxAuto:false` in config).
- iPhone app: `native/` is a Capacitor 8 shell (see native/README.md). It bundles `index.html` as `app.html` behind `loader.html`, and downloads newer versions of `index.html` from the website at runtime, so web releases reach it without a new .ipa. GitHub Actions (`.github/workflows/iphone-app.yml`) builds an unsigned `My-Budget.ipa` into the `iphone-app` release when `native/` changes; the owner installs it with AltStore.
- Mac app: `desktop/` is a Tauri 2 shell using the same assemble script and loader (see desktop/README.md). `.github/workflows/mac-app.yml` builds a universal `My-Budget.dmg` into the `mac-app` release. Inside either shell the app detects `capacitor:`/`tauri:` and fetches updates from the website.
