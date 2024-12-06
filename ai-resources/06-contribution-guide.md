# Development and Contribution Guidelines

## Code Style and Standards
- ES Modules (import/export)
- Async/await for asynchronous operations
- Model-first development approach
- Fastify plugin architecture

## Project Setup
```bash
# Clone repository
git clone [repo-url]

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env

# Start development server
yarn dev
```

## Development Workflow
1. Create feature branch from main
2. Implement changes following project patterns
3. Test using requests.http
4. Update documentation if needed
5. Submit pull request

## Common Development Tasks
- Adding new model: Create schema in models/
- Adding custom endpoint: Use Fastify plugin system
- Adding validation: Use Mongoose schema validation
- Adding new translation: Follow i18n workflow

## Best Practices
- Keep models immutable when specified
- Follow i18n patterns for all content
- Use MongoDB references for relationships
- Handle errors consistently
- Document API changes in requests.http