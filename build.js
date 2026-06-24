const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Configuration
const TEMPLATES_DIR = path.join(__dirname, 'src', 'templates');
const PARTIALS_DIR = path.join(__dirname, 'src', 'partials');
const DIST_DIR = path.join(__dirname, 'dist');
const STATIC_ASSETS = ['styles.css', 'script.js', 'CNAME', 'vercel.json', 'netlify.toml', 'favicon.svg', 'site.webmanifest', '.well-known/apple-app-site-association'];

// Register Handlebars helpers
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

// Register all partials
function registerPartials() {
  const partialsFiles = fs.readdirSync(PARTIALS_DIR);

  partialsFiles.forEach(file => {
    if (file.endsWith('.hbs')) {
      const partialName = path.basename(file, '.hbs');
      const partialContent = fs.readFileSync(path.join(PARTIALS_DIR, file), 'utf-8');
      Handlebars.registerPartial(partialName, partialContent);
      console.log(`✓ Registered partial: ${partialName}`);
    }
  });
}

// Build a single template
function buildTemplate(templateFile, context) {
  const templatePath = path.join(TEMPLATES_DIR, templateFile);
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateContent);
  const html = template(context);

  const outputFile = path.basename(templateFile, '.hbs');
  const outputPath = path.join(DIST_DIR, outputFile);

  fs.writeFileSync(outputPath, html, 'utf-8');
  console.log(`✓ Built: ${outputFile}`);
}

// Copy static assets
function copyStaticAssets() {
  STATIC_ASSETS.forEach(asset => {
    const sourcePath = path.join(__dirname, asset);
    const destPath = path.join(DIST_DIR, asset);

    if (fs.existsSync(sourcePath)) {
      // Support nested assets (e.g. .well-known/apple-app-site-association) by
      // ensuring the destination subdirectory exists before copying.
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✓ Copied: ${asset}`);
    }
  });
}

// Main build function
function build() {
  console.log('🚀 Starting build process...\n');

  // Create dist directory if it doesn't exist
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Load configuration
  const config = {
    googleAnalyticsId: process.env.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    googleTagManagerId: process.env.GTM_CONTAINER_ID || 'GTM-XXXXXXX',
    year: new Date().getFullYear()
  };

  console.log('📦 Configuration:');
  console.log(`   GA ID: ${config.googleAnalyticsId}`);
  console.log(`   GTM ID: ${config.googleTagManagerId}\n`);

  // Register partials
  console.log('📝 Registering partials...');
  registerPartials();
  console.log('');

  // Build templates
  console.log('🔨 Building templates...');
  const templateFiles = fs.readdirSync(TEMPLATES_DIR);

  templateFiles.forEach(file => {
    if (file.endsWith('.hbs')) {
      // Determine context based on which page
      const pageName = path.basename(file, '.hbs').replace('.html', '');
      const context = {
        ...config,
        page: pageName,
        isActive: {
          home: pageName === 'index',
          features: pageName === 'features',
          useCases: pageName === 'use-cases',
          docs: pageName === 'docs'
        }
      };

      buildTemplate(file, context);
    }
  });
  console.log('');

  // Copy static assets
  console.log('📋 Copying static assets...');
  copyStaticAssets();
  console.log('');

  console.log('✅ Build complete!\n');
  console.log(`📁 Output directory: ${DIST_DIR}`);
  console.log('💡 Run "npm run serve" to preview the site\n');
}

// Run build
try {
  build();
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
