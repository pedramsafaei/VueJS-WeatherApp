# Contributing to Weather Pro

Thank you for your interest in contributing to Weather Pro! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/VueJS-WeatherApp.git
   cd VueJS-WeatherApp/vue-weather
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/pedramsafaei/VueJS-WeatherApp.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Before You Start

- Check existing [issues](https://github.com/pedramsafaei/VueJS-WeatherApp/issues) to see if your idea is already being discussed
- For major changes, open an issue first to discuss what you would like to change
- Ensure your development environment is set up correctly

### During Development

1. **Keep your branch up to date**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run the development server**:
   ```bash
   npm run serve
   ```

3. **Make your changes** following our coding guidelines

4. **Test your changes** thoroughly:
   ```bash
   npm run test:unit
   npm run lint
   ```

## Coding Guidelines

### JavaScript/Vue.js Style

- Follow the [Vue.js Style Guide](https://vuejs.org/style-guide/)
- Use ES6+ features (arrow functions, destructuring, etc.)
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names
- Keep functions small and focused (single responsibility)

### Vue Component Guidelines

```vue
<template>
  <!-- Use semantic HTML -->
  <!-- Add ARIA labels for accessibility -->
  <!-- Keep template logic simple -->
</template>

<script>
/**
 * Component Name
 * Brief description of the component
 */
export default {
  name: 'ComponentName',
  
  // Order: props, data, computed, watch, lifecycle, methods
  props: {
    // Always specify type and add description
  },
  
  data() {
    return {
      // Initialize all reactive properties
    };
  },
  
  computed: {
    // Use getters from Vuex when appropriate
  },
  
  methods: {
    // Add JSDoc comments for complex methods
    /**
     * Method description
     * @param {Type} paramName - Parameter description
     * @returns {Type} - Return value description
     */
    methodName(paramName) {
      // Implementation
    },
  },
};
</script>

<style scoped>
/* Use scoped styles to prevent leakage */
/* Follow BEM naming convention when appropriate */
</style>
```

### File Organization

- **Components**: One component per file, PascalCase naming
- **Services**: One service per file, camelCase naming
- **Utils**: Group related utilities, descriptive names
- **Store modules**: One module per domain concern

### Code Quality

- **ESLint**: All code must pass ESLint checks
  ```bash
  npm run lint
  ```

- **Prettier**: Format code consistently
  ```bash
  npm run format
  ```

- **No console statements**: Remove `console.log` before committing (use proper debugging tools)

### Error Handling

```javascript
// Always handle errors gracefully
try {
  const data = await apiCall();
  return data;
} catch (error) {
  // Log for debugging
  console.error('Error in functionName:', error);
  // Throw user-friendly error
  throw new Error('User-friendly error message');
}
```

### Async/Await

```javascript
// Prefer async/await over .then()
async function fetchData() {
  try {
    const response = await api.getData();
    return response;
  } catch (error) {
    handleError(error);
  }
}
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(search): add autocomplete functionality

Implement city search with autocomplete suggestions using debounce
to reduce API calls.

Closes #123
```

```
fix(weather): handle API rate limit errors

Add proper error handling for 429 rate limit responses with
user-friendly message.

Fixes #456
```

```
docs(readme): update installation instructions

Add detailed steps for obtaining OpenWeatherMap API key.
```

## Pull Request Process

### Before Submitting

1. **Update your branch** with the latest changes from main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**:
   ```bash
   npm run lint
   npm run test:unit
   npm run build
   ```

3. **Test manually** in the browser

4. **Update documentation** if needed

### Submitting the PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub

3. **Fill out the PR template** completely:
   - Clear title describing the change
   - Description of what changed and why
   - Link to related issues
   - Screenshots for UI changes
   - Checklist completion

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass
```

### Review Process

1. At least one maintainer will review your PR
2. Address feedback by pushing new commits
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release!

## Testing

### Writing Tests

- Write tests for new features
- Update tests for changed functionality
- Aim for good coverage of critical paths
- Test both success and error cases

### Test Structure

```javascript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = method(input);
      
      // Assert
      expect(result).toBe('expected');
    });
    
    it('should handle errors', () => {
      // Test error cases
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with coverage
npm run test:unit -- --coverage

# Run specific test file
npm run test:unit -- SearchBar.spec.js
```

## Documentation

### Code Documentation

- Add JSDoc comments for functions and methods
- Document component props with descriptions
- Explain complex logic with inline comments
- Keep comments up to date with code changes

### README Updates

Update README.md when adding:
- New features
- New configuration options
- New dependencies
- Breaking changes

### API Documentation

Document new APIs in the API Documentation section:
- Function signatures
- Parameters and return types
- Usage examples
- Error handling

## Questions?

- Open a [Discussion](https://github.com/pedramsafaei/VueJS-WeatherApp/discussions) for questions
- Join our community chat (if applicable)
- Email the maintainers

## Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Weather Pro! 🌤️
