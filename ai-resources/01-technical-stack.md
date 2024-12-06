# Technical Stack and Architecture Overview

## Core Technologies
- Runtime: Node.js
- Web Framework: Fastify
- Database: MongoDB
- ORM: Mongoose
- API Generation: fastify-mongoose-api
- Environment Management: dotenv
- Development: nodemon

## Architecture Pattern
- RESTful API
- MVC without View layer
- Auto-generated CRUD endpoints
- Model-driven development
- Internationalization (i18n) support

## Project Structure
```
src/
├── config/       # Database and app configurations
├── hooks/        # Fastify hooks
├── models/       # MongoDB/Mongoose models
├── utils/        # Utility functions
└── index.js      # Application entry point
```

## Development Environment
- Default Port: 4000 (configurable via PORT env var)
- Development Mode: `yarn dev` (with hot-reload)
- Production Mode: `yarn start`
- Documentation: Built-in via requests.http file