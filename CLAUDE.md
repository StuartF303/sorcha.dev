# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official marketing website for the Sorcha project - a .NET 10 blueprint execution engine for secure data flow orchestration. The website uses a **Handlebars templating system** to generate static HTML files with integrated Google Analytics and Tag Manager support.

## Architecture

### Build System
The site uses Handlebars templates to generate static HTML:
- **Source**: `src/templates/` contains `.html.hbs` template files
- **Partials**: `src/partials/` contains reusable components (nav, footer, analytics)
- **Output**: `dist/` contains generated HTML files (not committed to git)
- **Build Script**: `build.js` compiles templates and copies static assets

### File Structure
```
src/
├── templates/          # Page templates
│   ├── index.html.hbs
│   ├── features.html.hbs
│   ├── use-cases.html.hbs
│   └── docs.html.hbs
└── partials/           # Reusable components
    ├── analytics.hbs       # Google Analytics & Tag Manager
    ├── gtm-noscript.hbs   # GTM noscript fallback
    ├── nav.hbs            # Navigation bar
    └── footer.hbs         # Footer

dist/                   # Generated HTML (git-ignored)
styles.css             # Main stylesheet
script.js              # Interactive JavaScript
build.js               # Build script
```

### Key Technical Details
- Uses Handlebars for templating with partials support
- Google Analytics (GA4) and Google Tag Manager integration via environment variables
- Security headers configured for GA/GTM domains in netlify.toml and vercel.json
- Uses Inter font from Google Fonts for typography
- Mobile-first responsive design with CSS variables
- Vanilla JavaScript for all interactivity

## Development Workflow

### Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your Google Analytics and Tag Manager IDs (optional)
```

### Building
```bash
# Build the site
npm run build

# Build and serve locally
npm run dev

# Clean build directory
npm run clean
```

### Local Development
```bash
# After building, serve the dist directory
npm run serve
```

Then visit `http://localhost:8000`

### Making Changes

**To update page content:**
1. Edit templates in `src/templates/*.html.hbs`
2. Run `npm run build`
3. Check output in `dist/`

**To update navigation or footer:**
1. Edit `src/partials/nav.hbs` or `src/partials/footer.hbs`
2. Run `npm run build` (all pages updated automatically)

**To update analytics:**
1. Edit `.env` file with new IDs
2. Run `npm run build`

### Testing
After building, test by:
1. Opening each HTML page in `dist/` in multiple browsers
2. Testing mobile menu functionality
3. Verifying smooth scroll behavior for anchor links
4. Testing copy-to-clipboard functionality on code blocks
5. Checking responsive design at various viewport sizes
6. Verifying analytics scripts are present (if configured)

## Deployment

All deployment platforms now build from source:

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: Add `GA_MEASUREMENT_ID` and `GTM_CONTAINER_ID` in Netlify dashboard

### Vercel
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: Add `GA_MEASUREMENT_ID` and `GTM_CONTAINER_ID` in Vercel dashboard

### GitHub Pages
- Can use GitHub Actions to build and deploy
- Or build locally and commit `dist/` to `gh-pages` branch

## Analytics Integration

### Environment Variables
Set in `.env` file (not committed):
```env
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GTM_CONTAINER_ID=GTM-XXXXXXX
```

### How It Works
- `build.js` reads environment variables (or uses placeholders)
- `src/partials/analytics.hbs` contains GA/GTM script templates
- Scripts only render if IDs don't match placeholder values
- All pages automatically include analytics via `{{> analytics}}` partial

### Analytics Features
The analytics partial (`src/partials/analytics.hbs`) includes:
- Google Tag Manager (head script)
- Google Analytics (GA4)
- Conditional rendering (only loads if real IDs are provided)

The GTM noscript partial (`src/partials/gtm-noscript.hbs`) provides fallback for users with JavaScript disabled.

## Content and Branding

### About Sorcha
Sorcha is positioned as an enterprise-grade data flow orchestration platform with:
- Cryptographic security (ED25519, NISTP256, RSA4096)
- Visual blueprint designer (Blazor WebAssembly)
- Fluent C# API
- Cloud-native architecture (.NET Aspire, YARP gateway)
- Schema management and validation

### Target Industries
- Financial Services (secure payment processing)
- Healthcare (HIPAA-compliant data flows)
- Supply Chain (cryptographic provenance tracking)
- Research (secure collaboration with data protection)

### Main Project Repository
The actual Sorcha project is at: https://github.com/StuartF303/Sorcha

## JavaScript Features

The script.js file provides:
- Mobile menu toggle with click-outside-to-close behavior
- Smooth scrolling for anchor links with navbar offset calculation
- Intersection Observer for scroll-based navigation highlighting (docs pages)
- Fade-in animations for feature cards and use case cards
- Copy-to-clipboard functionality for code blocks with visual feedback
- Stats counter animation (animates numbers on hero section)
- Navbar hide-on-scroll-down/show-on-scroll-up behavior
- Keyboard accessibility (Escape key closes mobile menu)

## Security Headers

Both netlify.toml and vercel.json configure:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy - allows Google Analytics, Google Tag Manager, Google Fonts
- Permissions-Policy (Netlify only) - disables camera, microphone, geolocation

### CSP Domains Allowed
- `https://www.googletagmanager.com` (GTM scripts)
- `https://www.google-analytics.com` (GA scripts and tracking)
- `https://analytics.google.com` (GA connections)
- `https://fonts.googleapis.com` (Google Fonts CSS)
- `https://fonts.gstatic.com` (Google Fonts files)

CSS and JS files are cached for 1 year (immutable).

## Design System

Uses CSS variables (styles.css:6-45) for:
- Colors (primary: #6366f1, secondary: #14b8a6, accent: #f59e0b)
- Typography (Inter font family, monospace for code)
- Spacing scale (xs through 2xl)
- Shadows (sm through xl)
- Transitions (fast: 150ms, normal: 250ms, slow: 350ms)

The design follows modern web practices with gradients, glassmorphism effects, and smooth animations.

## Redirects

- `/github` → https://github.com/StuartF303/Sorcha (301 permanent redirect)

## Handlebars Template Syntax

### Variables
```handlebars
{{year}}                    <!-- Current year -->
{{googleAnalyticsId}}       <!-- GA measurement ID -->
{{googleTagManagerId}}      <!-- GTM container ID -->
{{page}}                    <!-- Current page name -->
```

### Partials
```handlebars
{{> nav}}                   <!-- Include navigation -->
{{> footer}}                <!-- Include footer -->
{{> analytics}}             <!-- Include analytics scripts -->
{{> gtm-noscript}}         <!-- Include GTM noscript -->
```

### Conditionals
```handlebars
{{#if isActive.home}}       <!-- If home page is active -->
{{/if}}
```

### Helpers
- `eq` - Equality check: `{{#unless (eq value 'placeholder')}}...{{/unless}}`

## Important Notes

- **Always edit templates in `src/templates/`** - Never edit files in `dist/` (they're regenerated)
- **Run `npm run build` after changes** - Changes to templates don't affect the site until built
- **Partials are shared** - Editing a partial affects all pages that use it
- Keep all styles in the single styles.css file for maintainability
- All interactive features use vanilla JavaScript (no frameworks)
- Maintain consistent branding with the main Sorcha project repository
- Content should reflect the technical capabilities described in the main Sorcha project
- The old HTML files in the root directory are deprecated (templates in src/ are now the source of truth)

## Common Tasks

### Add a new page
1. Create `src/templates/newpage.html.hbs`
2. Use existing templates as reference
3. Include partials: `{{> nav}}`, `{{> footer}}`, `{{> analytics}}`
4. Update `build.js` if special context is needed
5. Run `npm run build`

### Update analytics configuration
1. Edit `.env` file
2. Run `npm run build`
3. Verify scripts in generated HTML

### Change navigation links
1. Edit `src/partials/nav.hbs`
2. Run `npm run build`
3. All pages will have updated navigation

### Add a new analytics event
1. Edit script.js to add tracking calls
2. Run `npm run build` to copy to dist
3. Use standard GA4/GTM event tracking

## Troubleshooting

**Build fails**: Run `npm install` to ensure dependencies are installed

**Analytics not working**: Check `.env` file has correct IDs and they don't match placeholder values

**Changes not visible**: Ensure you're editing `src/templates/` not `dist/`, and run `npm run build`

**CSP errors in browser**: Check that domains are allowed in netlify.toml and vercel.json CSP headers
