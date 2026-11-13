# My Budget

A private budgeting app for iPhone and Mac: accounts, budgets, plans and splits.
It's a web app hosted on GitHub Pages, and your data syncs through your own Supabase database.

- `index.html`: the app
- `config.js`: your Supabase URL and publishable key
- `schema.sql`: the database setup, run once in Supabase
- `sw.js`, `manifest.webmanifest`, icons: make it installable and work offline
- `version.json`: bump this when the app changes, so open copies show "Update ready"

Your data is not stored in this repository.
