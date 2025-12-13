# 🚀 Quick Start Guide

## Welcome to Weather Pro!

Your weather app has been transformed into a professional, production-ready application. Here's how to get started.

## Prerequisites

Make sure you have installed:
- **Node.js** (version 16 or higher)
- **npm** (version 7 or higher)
- **Git**

Check versions:
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v7 or higher
```

## Step 1: Get an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

**Note**: Free tier includes 1,000 API calls per day, which is plenty for development and small-scale production use.

## Step 2: Set Up the Environment

```bash
# Navigate to the vue-weather directory
cd vue-weather

# Copy the environment template
cp .env.example .env

# Edit the .env file and add your API key
# Use your favorite editor (nano, vim, vscode, etc.)
nano .env
```

In the `.env` file, replace `your_api_key_here` with your actual API key:
```env
VUE_APP_WEATHER_API_KEY=your_actual_api_key_here
```

## Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages. It may take a few minutes.

## Step 4: Start Development Server

```bash
npm run serve
```

The application will be available at: **http://localhost:8080**

Your browser should open automatically. If not, manually open the URL.

## Step 5: Start Using the App!

### Search for Weather
1. Type a city name in the search bar
2. Press Enter
3. View current weather and 5-day forecast

### Use Your Location
1. Click the location button (📍) in the search bar
2. Allow location permissions when prompted
3. Weather for your location will load automatically

### Add Favorites
1. Search for a city
2. Click "Add to Favorites"
3. Access favorites quickly from the favorites bar

### Customize Settings
1. Click the settings button (⚙️) in the top right
2. Change temperature units (Celsius/Fahrenheit/Kelvin)
3. Toggle dark mode
4. Enable/disable features

## Common Development Commands

```bash
# Start development server
npm run serve

# Build for production
npm run build

# Run tests
npm run test:unit

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Using Docker (Optional)

If you have Docker installed:

```bash
# Start with docker-compose
docker-compose up -d

# Access at http://localhost:8080

# Stop containers
docker-compose down
```

## Next Steps

### For Development
1. **Read the documentation**:
   - [README.md](README.md) - Complete guide
   - [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System design
   - [API.md](docs/API.md) - API reference

2. **Explore the codebase**:
   - Start with `src/App.vue`
   - Check out components in `src/components/`
   - Review services in `src/services/`

3. **Make changes**:
   - Create a new branch: `git checkout -b feature/your-feature`
   - Make your changes
   - Test thoroughly
   - Commit with good messages

### For Production Deployment
1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Choose deployment platform**:
   - [Netlify](docs/DEPLOYMENT.md#1-netlify) (Easiest)
   - [Vercel](docs/DEPLOYMENT.md#2-vercel) (Fast)
   - [Docker](docs/DEPLOYMENT.md#4-docker-deployment) (Flexible)
   - [See all options](docs/DEPLOYMENT.md)

3. **Set environment variables** on your hosting platform

4. **Deploy!**

## Troubleshooting

### "Command not found: npm"
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation

### "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Network error" when searching
- Check your API key is correct in `.env`
- Verify you have internet connection
- Check API key has been activated (can take a few minutes after creation)

### Build fails
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules dist
npm install
npm run build
```

### Port 8080 already in use
```bash
# Use a different port
npm run serve -- --port 8081
```

## Getting Help

- **Documentation**: Read [README.md](README.md) and [docs/](docs/)
- **Issues**: Check [GitHub Issues](https://github.com/pedramsafaei/VueJS-WeatherApp/issues)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## Features Overview

✅ **Current Weather**: Real-time weather with detailed metrics  
✅ **5-Day Forecast**: Extended weather predictions  
✅ **Geolocation**: Auto-detect your location  
✅ **Favorites**: Save multiple cities  
✅ **Unit Conversion**: Celsius, Fahrenheit, Kelvin  
✅ **Dark Mode**: Easy on the eyes  
✅ **Responsive**: Works on mobile, tablet, desktop  
✅ **PWA**: Install as an app  
✅ **Offline Support**: Works without internet (cached data)

## Project Structure

```
vue-weather/
├── src/
│   ├── components/      # Vue components
│   ├── services/        # API services
│   ├── store/          # Vuex state management
│   ├── utils/          # Helper functions
│   └── App.vue         # Main app component
├── tests/              # Unit tests
├── public/             # Static assets
└── package.json        # Dependencies
```

## Useful Links

- 📖 [Main Documentation](README.md)
- 🏗️ [Architecture Guide](docs/ARCHITECTURE.md)
- 📚 [API Reference](docs/API.md)
- 🚀 [Deployment Guide](docs/DEPLOYMENT.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)
- ✅ [Verification Report](PROJECT_VERIFICATION.md)

## License

MIT License - See LICENSE file for details

---

**Happy Coding! 🌤️**

**Weather Pro - Your Professional Weather Application**

For questions or issues, please open a GitHub issue or discussion.
