# Weather Pro - Vue Application

This directory contains the main Vue.js application for Weather Pro.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build

# Run tests
npm run test:unit

# Lint and fix files
npm run lint:fix
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Add your OpenWeatherMap API key
3. Configure other settings as needed

## Available Scripts

- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run lint:fix` - Lint and fix code
- `npm run format` - Format code with Prettier
- `npm run test:unit` - Run unit tests
- `npm run test:unit -- --watch` - Run tests in watch mode
- `npm run test:unit -- --coverage` - Run tests with coverage

## Project Structure

See the main [README.md](../README.md) for detailed project structure documentation.

## Development

### Adding a New Component

1. Create component file in `src/components/`
2. Import and register in parent component
3. Add tests in `tests/unit/`
4. Update documentation

### Adding a New Feature

1. Create feature branch
2. Implement feature following coding guidelines
3. Add tests
4. Update documentation
5. Submit pull request

### Adding a New Vuex Module

1. Create module file in `src/store/modules/`
2. Import and register in `src/store/index.js`
3. Add tests
4. Document in README

## Testing

We use Jest and Vue Test Utils for testing. See [CONTRIBUTING.md](../CONTRIBUTING.md) for testing guidelines.

## Building

The build process creates optimized production files in `dist/`:

```bash
npm run build
```

Build features:
- Minification and optimization
- Code splitting
- CSS extraction
- PWA service worker generation
- Asset optimization

## Deployment

See the main [README.md](../README.md#deployment) for deployment instructions.

## Support

For issues and questions:
- Check existing [GitHub Issues](https://github.com/pedramsafaei/VueJS-WeatherApp/issues)
- Read the main [README.md](../README.md)
- Review [CONTRIBUTING.md](../CONTRIBUTING.md)

## License

MIT License - see LICENSE file for details.

