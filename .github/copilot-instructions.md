# GitHub Copilot Instructions for Habit Tracker REST API

## Project Overview
This is a **Fastify** application serving a REST API backed by **MongoDB** (Mongoose). It uses a specialized library `@ferjssilva/fast-crud-api` to automatically generate CRUD endpoints from Mongoose models.

## Core Architecture
- **Runtime**: Node.js (ES Modules).
- **Framework**: Fastify v5.
- **Database**: MongoDB with Mongoose v8.
- **API Generation**: `@ferjssilva/fast-crud-api` generates routes (`/api/<resource>`) based on models.
- **Authentication**: `fastify-jwt-jwks` (Auth0).

## Critical Workflows
- **Package Manager**: **ALWAYS** use `pnpm`.
  - Install: `pnpm install`
  - Dev Server: `pnpm dev` (uses `nodemon`)
  - Production: `pnpm start`
- **Documentation**: API endpoints are documented in `requests.http`.

## Project-Specific Patterns

### 1. API Route Generation
Routes are registered in `src/index.js` using `createRoutes`.
- **Configuration**: You must explicitly list models and allowed methods in the `createRoutes` registration.
- **Example**:
  ```javascript
  server.register(createRoutes, {
    models: [Habits, Users],
    prefix: '/api',
    methods: {
      "habits": ['GET', 'POST'], // Only enable specific methods
      "users": ['GET']
    }
  });
  ```

### 2. Data Modeling & Translations
- **Identifiers**: Use `identifier` fields that are uppercase, unique, and have no spaces (use underscores).
- **Translations**: Do not store translations in the main entity. Use separate translation models (e.g., `HabitTranslation`) linked by the parent ID.

### 3. Authentication
- Global authentication hooks are available but currently commented out in `src/index.js`.
- Use `preValidation: server.authenticate` for protected routes.

## Directory Structure
- `src/models/`: Mongoose schemas. **Source of Truth** for API capabilities.
- `src/config/`: Database and server configuration.
- `src/hooks/`: Fastify hooks (e.g., serialization).
- `ai-resources/`: Detailed documentation on stack, models, and endpoints.

## Common Tasks
- **Adding a new resource**:
  1. Create Mongoose model in `src/models/`.
  2. Import and add to `models` array in `src/index.js`.
  3. Define allowed methods in `src/index.js`.
