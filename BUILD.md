# Build System Setup

## Overview

The sorcha.dev website now uses a templating system with Handlebars to generate static HTML files. This allows for:
- Centralized Google Analytics and Tag Manager integration
- Reusable navigation and footer components
- Dynamic content (like copyright year)
- Easier maintenance and updates

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Analytics (Optional)

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Google Analytics and Tag Manager IDs:

```env
GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
GTM_CONTAINER_ID=GTM-YOUR-ACTUAL-ID
```

If you don't provide these IDs, the build will use placeholder values and analytics won't be active.

### 3. Build the Site

```bash
npm run build
```

This generates the production-ready HTML files in the `dist/` directory.

### 4. Preview Locally

```bash
npm run serve
```

This will start a local server at http://localhost:8000

## Project Structure

```
sorcha.dev/
├── src/
│   ├── templates/           # Handlebars templates (.html.hbs)
│   │   ├── index.html.hbs
│   │   ├── features.html.hbs
│   │   ├── use-cases.html.hbs
│   │   └── docs.html.hbs
│   └── partials/            # Reusable components
│       ├── analytics.hbs    # GA/GTM scripts
│       ├── gtm-noscript.hbs # GTM noscript fallback
│       ├── nav.hbs          # Navigation bar
│       ├── footer.hbs       # Footer
│       └── favicon.hbs      # Favicon links
├── dist/                    # Generated HTML files (git-ignored)
├── styles.css               # Stylesheet (copied to dist)
├── script.js                # JavaScript (copied to dist)
├── favicon.svg              # Site favicon (copied to dist)
├── site.webmanifest         # PWA manifest (copied to dist)
├── build.js                 # Build script
└── package.json             # Dependencies and scripts

```

## Available Scripts

- `npm run build` - Build the site to `dist/`
- `npm run dev` - Build and serve locally
- `npm run serve` - Start local server (dist must exist)
- `npm run clean` - Remove the dist directory

## How It Works

1. **Templates**: HTML files in `src/templates/` use Handlebars syntax (`.hbs`)
2. **Partials**: Common components in `src/partials/` are included using `{{> partialName}}`
3. **Variables**: Dynamic content like `{{year}}` or `{{googleAnalyticsId}}` is replaced during build
4. **Build Process**: `build.js` compiles templates with partials and copies static assets to `dist/`

## Editing Content

### Update a Page

1. Edit the template in `src/templates/`
2. Run `npm run build`
3. Check the output in `dist/`

### Update Navigation or Footer

1. Edit `src/partials/nav.hbs` or `src/partials/footer.hbs`
2. Run `npm run build`
3. All pages will automatically use the updated component

### Update Analytics Configuration

1. Edit your `.env` file with new IDs
2. Run `npm run build`
3. All pages will include the updated analytics code

## Deployment

### GitHub Pages

Committed code should now build from the `dist/` directory. Update your GitHub Pages settings to build from the `main` branch and the `dist/` folder (or commit dist to a `gh-pages` branch).

### Netlify

The `netlify.toml` is already configured:
- Build command: `npm run build`
- Publish directory: `dist`

Just connect your repository and Netlify will automatically build on each push.

### Vercel

The `vercel.json` is already configured:
- Build command: `npm run build`
- Output directory: `dist`

Connect your repository to Vercel for automatic deployments.

## Security Headers

Both `netlify.toml` and `vercel.json` have been updated with:
- Content Security Policy allowing Google Analytics and Tag Manager domains
- X-Frame-Options, X-Content-Type-Options, and other security headers
- Long-term caching for CSS/JS files

## Troubleshooting

### Build fails with "Cannot find module 'handlebars'"

Run `npm install` to install dependencies.

### Analytics not showing up

1. Check that your `.env` file has the correct IDs
2. Verify the build output in `dist/` includes the analytics scripts
3. Check browser console for CSP or network errors

### Changes not reflecting

1. Make sure you're editing files in `src/templates/` or `src/partials/`, not the old HTML files in root
2. Run `npm run build` after making changes
3. Clear your browser cache or use hard refresh (Ctrl+F5)

## Favicon

The site includes a custom favicon based on the Sorcha lightning bolt logo:

- **favicon.svg** - Modern SVG favicon with the brand colors (supports all modern browsers)
- **site.webmanifest** - PWA manifest for progressive web app support
- **Theme color** - Set to `#6366f1` (primary brand color)

The favicon is automatically included in all pages via the `{{> favicon}}` partial in templates.

### Generating Additional Formats

If you need legacy .ico format or PNG variants for older browsers:

1. Use an online converter like [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload the `favicon.svg` file
3. Download the generated files
4. Add the files to the root directory
5. Update `src/partials/favicon.hbs` with additional link tags
6. Add the new files to `STATIC_ASSETS` in `build.js`

## Migration Notes

The original HTML files (index.html, features.html, etc.) in the root directory are now deprecated. All updates should be made to the template files in `src/templates/`. The build process generates the final HTML files in `dist/`.

Consider keeping the original files temporarily for reference, but they are no longer used in production.
