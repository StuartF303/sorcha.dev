# sorcha.dev

Official website for the Sorcha project - A modern .NET 10 blueprint execution engine for secure data flow orchestration.

## 🚀 About Sorcha

Sorcha is a powerful data flow orchestration platform that combines:

- **Cryptographic Security**: Built-in support for ED25519, NISTP256, and RSA4096 algorithms
- **Visual Blueprint Designer**: Intuitive Blazor WebAssembly interface for workflow design
- **Fluent API**: Type-safe C# API for programmatic blueprint creation
- **Cloud-Native Architecture**: Built on .NET Aspire with microservices patterns
- **Enterprise-Grade**: Production-ready with comprehensive security features

## 🌐 Website

Visit [https://sorcha.dev](https://sorcha.dev) to learn more.

## 📁 Project Structure

```
sorcha.dev/
├── index.html          # Homepage
├── features.html       # Features page
├── use-cases.html      # Use cases and blueprint examples
├── docs.html           # Documentation and getting started
├── styles.css          # Main stylesheet
├── script.js           # Interactive JavaScript
├── netlify.toml        # Netlify configuration
├── vercel.json         # Vercel configuration
└── CNAME               # Custom domain configuration
```

## 🛠️ Development

This is a static website built with vanilla HTML, CSS, and JavaScript. No build process required.

### Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🚢 Deployment

### Netlify

1. Connect your repository to Netlify
2. Configure custom domain: sorcha.dev
3. Deploy automatically on push to main branch

### Vercel

1. Connect your repository to Vercel
2. Configure custom domain: sorcha.dev
3. Deploy automatically on push to main branch

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set custom domain to sorcha.dev
3. Configure DNS CNAME record

## 🔐 Security

The website includes security headers configured in `netlify.toml` and `vercel.json`:

- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy

## 📝 Content

All content is based on the [Sorcha project](https://github.com/StuartF303/Sorcha) including:

- Data protection methods and cryptographic capabilities
- Blueprint scenarios and examples
- Architecture and technical documentation
- Use cases across industries (Financial, Healthcare, Supply Chain, Research)

## 🤝 Contributing

To contribute to the website:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For the main Sorcha project, visit [StuartF303/Sorcha](https://github.com/StuartF303/Sorcha)

## 📄 License

This website is part of the Sorcha project. See the main project repository for license information.

## 🔗 Links

- **Main Project**: [github.com/StuartF303/Sorcha](https://github.com/StuartF303/Sorcha)
- **Website**: [sorcha.dev](https://sorcha.dev)
- **Issues**: [github.com/StuartF303/Sorcha/issues](https://github.com/StuartF303/Sorcha/issues)
- **Contributing**: [github.com/StuartF303/Sorcha/blob/main/CONTRIBUTING.md](https://github.com/StuartF303/Sorcha/blob/main/CONTRIBUTING.md)

---

Built with ❤️ for the Sorcha community