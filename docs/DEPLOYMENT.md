# Deployment Guide

This guide covers various deployment options for Weather Pro.

## Prerequisites

Before deploying, ensure you have:
- ✅ OpenWeatherMap API key
- ✅ Application built successfully (`npm run build`)
- ✅ All tests passing (`npm run test:unit`)
- ✅ No linting errors (`npm run lint`)

## Quick Deployment Options

### 1. Netlify (Recommended for Quick Deploy)

**One-Click Deploy:**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Manual Deploy via CLI:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the app
cd vue-weather
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Configure Environment Variables:**
1. Go to Site Settings → Build & Deploy → Environment
2. Add `VUE_APP_WEATHER_API_KEY` with your API key
3. Trigger a new deploy

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  command = "cd vue-weather && npm run build"
  publish = "vue-weather/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### 2. Vercel

**Deploy via CLI:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd vue-weather
vercel --prod
```

**Configure:**
1. Link your GitHub repository
2. Set environment variables in project settings
3. Vercel will auto-deploy on push

**Vercel Configuration (`vercel.json`):**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VUE_APP_WEATHER_API_KEY": "@weather_api_key"
  }
}
```

---

### 3. GitHub Pages

**Using gh-pages package:**

```bash
# Install gh-pages
npm install -g gh-pages

# Build and deploy
cd vue-weather
npm run build
gh-pages -d dist
```

**Add deploy script to `package.json`:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

**Configure Vue for GitHub Pages:**

Update `vue.config.js`:
```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/VueJS-WeatherApp/'
    : '/'
}
```

---

### 4. Docker Deployment

**Build and Run:**

```bash
cd vue-weather

# Build Docker image
docker build -t weather-pro:latest .

# Run container
docker run -d -p 8080:80 --name weather-pro weather-pro:latest

# Access at http://localhost:8080
```

**Using Docker Compose:**

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Environment Variables in Docker:**

Create `.env` file:
```env
VUE_APP_WEATHER_API_KEY=your_api_key_here
```

Update `docker-compose.yml`:
```yaml
services:
  weather-app:
    build: .
    env_file:
      - .env
```

---

### 5. AWS S3 + CloudFront

**Deploy to S3:**

```bash
# Install AWS CLI
# Configure: aws configure

# Build app
cd vue-weather
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**S3 Bucket Configuration:**
1. Enable static website hosting
2. Set index.html as index document
3. Set public read permissions
4. Configure CORS if needed

**CloudFront Distribution:**
1. Create distribution pointing to S3
2. Configure custom domain (optional)
3. Add SSL certificate
4. Set cache behaviors

---

### 6. Heroku

**Deploy via Git:**

```bash
# Install Heroku CLI
# Login: heroku login

# Create Heroku app
heroku create weather-pro-app

# Set environment variable
heroku config:set VUE_APP_WEATHER_API_KEY=your_api_key

# Deploy
git push heroku main
```

**Add `static.json` for serving:**
```json
{
  "root": "dist",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

**Add Node.js buildpack:**
```bash
heroku buildpacks:set heroku/nodejs
```

---

### 7. DigitalOcean App Platform

**Deploy via GitHub:**

1. Connect GitHub repository
2. Select branch (main)
3. Configure build command: `cd vue-weather && npm run build`
4. Set output directory: `vue-weather/dist`
5. Add environment variable
6. Deploy

**App Spec (`app.yaml`):**
```yaml
name: weather-pro
static_sites:
  - name: web
    git:
      repo_clone_url: https://github.com/pedramsafaei/VueJS-WeatherApp
      branch: main
    build_command: cd vue-weather && npm run build
    output_dir: vue-weather/dist
    routes:
      - path: /
    envs:
      - key: VUE_APP_WEATHER_API_KEY
        value: ${VUE_APP_WEATHER_API_KEY}
```

---

### 8. Firebase Hosting

**Deploy:**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Configure:
# - Public directory: vue-weather/dist
# - Single-page app: yes
# - GitHub auto-deploy: optional

# Build and deploy
cd vue-weather
npm run build
firebase deploy
```

**Firebase Configuration (`firebase.json`):**
```json
{
  "hosting": {
    "public": "vue-weather/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## CI/CD Automation

### GitHub Actions (Included)

The project includes a CI/CD workflow at `.github/workflows/ci.yml`.

**Required Secrets:**
- `VUE_APP_WEATHER_API_KEY` - Your API key
- `DOCKER_USERNAME` - Docker Hub username (if using Docker)
- `DOCKER_PASSWORD` - Docker Hub password (if using Docker)

**Add secrets:**
1. Go to repository Settings → Secrets
2. Add each secret
3. Workflow will run automatically on push

---

## Custom Server Deployment

### Nginx

**Build app:**
```bash
cd vue-weather
npm run build
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/weather-pro/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
}
```

**Deploy:**
```bash
# Copy files to server
scp -r dist/* user@server:/var/www/weather-pro/dist/

# Restart Nginx
ssh user@server 'sudo systemctl restart nginx'
```

---

### Apache

**Build app:**
```bash
cd vue-weather
npm run build
```

**Apache configuration (`.htaccess`):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

---

## Environment-Specific Configurations

### Development
```env
NODE_ENV=development
VUE_APP_WEATHER_API_KEY=your_dev_key
VUE_APP_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

### Staging
```env
NODE_ENV=production
VUE_APP_WEATHER_API_KEY=your_staging_key
VUE_APP_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

### Production
```env
NODE_ENV=production
VUE_APP_WEATHER_API_KEY=your_production_key
VUE_APP_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

---

## SSL/HTTPS Setup

### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal is configured automatically
```

### CloudFlare (Free SSL + CDN)

1. Add site to CloudFlare
2. Update nameservers
3. Enable SSL (Full or Flexible)
4. Configure caching rules
5. Enable minification

---

## Performance Optimization

### CDN Configuration

**CloudFlare:**
- Auto-minify HTML, CSS, JS
- Enable Brotli compression
- Configure cache TTL
- Enable HTTP/2

**AWS CloudFront:**
- Create distribution
- Configure cache behaviors
- Enable Gzip/Brotli
- Set up custom domain

### Caching Headers

Ensure proper caching in production:
- Static assets: 1 year
- HTML files: No cache
- API responses: 5 minutes

---

## Monitoring Setup

### Application Monitoring

**Sentry (Error Tracking):**

```bash
npm install @sentry/vue
```

```javascript
// main.js
import * as Sentry from '@sentry/vue';

Sentry.init({
  Vue,
  dsn: 'your_sentry_dsn',
  environment: process.env.NODE_ENV,
});
```

**Google Analytics:**

```javascript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## Rollback Procedures

### Docker
```bash
# List images
docker images

# Rollback to previous version
docker run -d -p 8080:80 weather-pro:previous-tag
```

### Git-based deployments
```bash
# Revert to previous commit
git revert HEAD
git push origin main
# CI/CD will auto-deploy
```

### Manual rollback
```bash
# Keep previous build
mv dist dist-new
mv dist-backup dist
# Restart server
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `VUE_APP_`
- Rebuild after changing .env
- Check deployment platform env vars
- Restart dev server

### 404 Errors on Refresh

- Configure server for SPA routing
- Add rewrite rules (see above)
- Check publicPath in vue.config.js

### Docker Issues

```bash
# Check logs
docker logs weather-pro

# Rebuild without cache
docker build --no-cache -t weather-pro .

# Check container
docker exec -it weather-pro sh
```

---

## Security Checklist

- [ ] API key in environment variables
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] No sensitive data in client code
- [ ] Dependencies up to date
- [ ] Rate limiting implemented (if using backend)
- [ ] Input validation in place

---

## Post-Deployment

### Verification
1. Test all features
2. Check responsive design
3. Test on multiple browsers
4. Verify API calls working
5. Check error handling
6. Test PWA installation
7. Run Lighthouse audit

### Monitoring
1. Set up uptime monitoring
2. Configure error tracking
3. Enable analytics
4. Monitor API usage
5. Track performance metrics

---

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/pedramsafaei/VueJS-WeatherApp/issues)
- Review documentation
- Contact platform support
- Open a discussion

---

## Additional Resources

- [Vue.js Deployment Guide](https://cli.vuejs.org/guide/deployment.html)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

**Deployment Status: ✅ Ready for Production**
