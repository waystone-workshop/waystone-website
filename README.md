# Waystone website

The standalone landing page for Waystone. This repository needs only Node 24+;
it does not require Phoenix, a database, Electron, or a running app backend.
Registration is an informational placeholder and collects no personal data.

```sh
npm ci
npm start
```

Open http://localhost:4173. `npm run build` produces `dist/`, deployable on any
static web server (including nginx on Mars). `npm test` checks the build contract.

Set `WINDOWS_DOWNLOAD_URL` to the HTTPS installer URL before building to enable
the download button. Without it, the page honestly displays "coming soon". The
GitHub Releases link always goes to the app repository. Publish the installer and
its update metadata there, not in this website repository.

Design assets come from the pinned `@waystone-workshop/design-system` dependency.
Its tokens, controls, icon sprite and mark are bundled into `dist/design-system`.
To update the look, upgrade that dependency's version and commit the lockfile.
Product-specific composition stays in `src/style.css`.

## Mars

Copy `dist/` to the directory served by your web server. Serve it with Tailscale
HTTPS for private access. The app/API stays a separate service on port 4000;
friends enter its separate HTTPS address in the desktop client. The static site
must not contain invitation codes, user tokens, or service secrets.

CI builds and uploads the static output; it does not publish or change Mars.
