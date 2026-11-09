# Acropolis Park website

Angular site for https://acropolispark.com. Pages are prerendered to static HTML at build time and hosted on Netlify.

## Requirements

- Node 22 (see `.nvmrc`; Angular 22 needs 22.22.3 or newer). With nvm: `nvm install && nvm use`
- pnpm 10 (`corepack enable` picks the version from `package.json`)

## Everyday commands

| Command | What it does |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm start` | Dev server at http://localhost:4200 |
| `pnpm run test:ci` | Unit tests, headless Chrome (what CI runs) |
| `pnpm run audit:ci` | Security audit of production dependencies |
| `pnpm run build:ci` | Production build plus prerendering into `dist/daily-quest/browser` |
| `pnpm run prod` | `build:ci` plus gzip; this is what Netlify runs |

## How a change reaches the live site

1. Create a branch and open a pull request into `main`.
2. **GitHub Actions** (`.github/workflows/ci.yml`) runs the audit, the tests and the production build. The pull request must be green.
3. **Netlify** builds a preview URL for the pull request, so you can look at the change before merging.
4. Merge into `main`. **Netlify** builds and publishes it to acropolispark.com automatically.

There is nothing to deploy by hand. Netlify settings (build command, Node version, redirects and security headers) live in `netlify.toml`.

## Where things are configured

- Hosting, headers, redirects: `netlify.toml`
- Checks before merge: `.github/workflows/ci.yml`
- Prerendered routes: `angular.json` (`prerender` target)
- SEO: `src/sitemap.xml`, `src/robots.txt`, per-route titles in `src/app/pages/acropolis-routing.module.ts`
