# My Budget for Mac

A Tauri 2 window around the same app as the website, with the app built in so it opens
offline. It downloads newer versions from the website by itself (same loader as the iPhone
app: `../native/loader.html`) and syncs through the same Supabase account.

Download: https://github.com/hamza-1224/my-budget/releases/tag/mac-app → My-Budget.dmg
(built by `.github/workflows/mac-app.yml`; universal: Apple Silicon and Intel).

Install: open the .dmg, drag My Budget into Applications, open it. The first time macOS says it
can't check the app: open System Settings → Privacy & Security → "Open Anyway". After that it
opens normally and never expires.

Develop: `npm install && npm run assemble && npx tauri dev` on a Mac with Rust installed.
