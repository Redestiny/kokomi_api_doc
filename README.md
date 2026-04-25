# Kokomi-api Docs

VitePress documentation site for Kokomi-api, published through GitHub Pages at `https://docs.kokomi-api.cc`.

## Local Development

```bash
npm install
npm run docs:dev
```

## Build

```bash
npm run docs:build
npm run docs:preview
```

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds `docs/.vitepress/dist` and deploys it to GitHub Pages. The custom domain is provided by `docs/public/CNAME`.
