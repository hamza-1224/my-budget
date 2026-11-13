# My Budget for iPhone (native app)

A thin native shell (Capacitor 8) around the same app as the website. A full copy of the
app is built in, so it opens instantly and works with no internet. When you're online it
downloads newer versions from the website by itself and shows "Update ready · tap to reload".
Data syncs through the same Supabase database as the website and the Mac.

## Get the app file

GitHub builds it on a Mac for you: **Releases → "My Budget for iPhone" → My-Budget.ipa**
(https://github.com/hamza-1224/my-budget/releases/tag/iphone-app).
To rebuild by hand: Actions → "Build iPhone app" → Run workflow.

## Install with AltStore (free Apple ID, one-time setup)

On the Mac:
1. Download AltServer for macOS from https://altstore.io, move it to Applications and open it
   (it lives in the menu bar).
2. Connect the iPhone with a cable, unlock it and tap Trust.
3. In Finder, select the iPhone and tick "Show this iPhone when on Wi-Fi".
4. AltServer menu → Install AltStore → your iPhone. Sign in with your Apple ID when asked
   (it's sent only to Apple). If it asks for the Mail plug-in, follow its prompt.

On the iPhone:
5. Settings → General → VPN & Device Management → your Apple ID → Trust.
6. Settings → Privacy & Security → Developer Mode → On (the phone restarts).
7. Open the My-Budget.ipa release link in Safari and download the file.
8. Open AltStore → My Apps → + → pick My-Budget.ipa from Downloads.
9. Open My Budget and sign in once.

## Keeping it running

Free Apple ID signatures last 7 days. AltStore renews them in the background whenever the
iPhone and Mac are on the same Wi-Fi with AltServer running (or open AltStore → My Apps →
Refresh All). Nothing is reinstalled and no data is touched. If it lapses, the app just won't
open until the next refresh.

## How updates work

- `www/index.html` (from `loader.html`) opens the newest copy on the phone: the built-in one,
  or a newer one the app downloaded from the website (`mb.native.app` in localStorage).
- If a downloaded copy fails to start within 4 seconds, the loader drops it and falls back to
  the built-in copy.
- Only changes to the native shell itself (this folder) need a new .ipa.

## Developing

    cd native && npm install && npm run sync   # bundles ../index.html into the iOS project
    npx cap open ios                           # on a Mac with Xcode
