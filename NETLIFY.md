# Deploy to Netlify

The portfolio builds to static files. It needs no API keys or server functions.

## Deploy the prepared build

The prepared `marella-netlify.zip` contains the latest page changes, videos, images, fonts, and `_redirects`, with `index.html` at the root. Extract it into a folder before deploying.

Use Git deployment or the Netlify CLI for this portfolio. The original videos total about 107 MB, with one clip around 21 MB. Netlify recommends the CLI for large uploads because Drop works best below 50 MB and individual files over 10 MB may stall. See the official [upload guidance](https://docs.netlify.com/manage/projects/add-new-project/#faq-for-using-the-drag-and-drop-publisher).

From the extracted build folder:

```sh
npx netlify-cli login
npx netlify-cli deploy --dir=. --prod --no-build
```

Follow the CLI prompts to select or create your Netlify project. These commands upload the already-built files.

For future changes, run these commands from `creator-atelier`:

```sh
npm ci
npm run build
npx netlify-cli deploy --dir=dist --prod --no-build
```

Use `npm.cmd` and `npx.cmd` in PowerShell if script execution is restricted. Upload `dist`, which contains the finished website.

## Deploy from Git

Import a repository containing this project into Netlify. Select the directory containing `package.json` and `netlify.toml` as the base directory. If the repository root contains several projects, the base directory is `creator-atelier`.

The committed `netlify.toml` supplies these settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node.js | `24` |

The committed lockfile pins dependencies. `public/_redirects` is copied into `dist` during the build and provides the single-page fallback; existing image, font, and video files are served directly.

The prepared ZIP is a snapshot of the current build. Rebuild after editing the source. A successful local production build is verified; creating a Netlify site or uploading the files remains a separate deployment step.

Setup follows the official [Vite guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/) and [manual-deployment guide](https://docs.netlify.com/manage/projects/add-new-project/).
