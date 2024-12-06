# Configuration and Environment Setup

## Environment Variables

### Required Variables
```plaintext
PORT=4000                    # API server port
MONGODB_URI=                 # MongoDB connection string
NODE_ENV=development        # Environment (development/production)
```

### Optional Variables
```plaintext
LOG_LEVEL=info              # Logging level
CORS_ORIGIN=*              # CORS configuration
REQUEST_TIMEOUT=30000      # Request timeout in ms
```

## Configuration Files

### Database Configuration
Located in `src/config/database.js`
- Connection settings
- Mongoose options
- Error handling

### Server Configuration
Located in `src/index.js`
- Fastify settings
- Plugin registration
- Error handlers
- Global hooks

## Development Setup

### Local Development
1. Copy .env.example to .env
2. Install dependencies
3. Start MongoDB
4. Run development server

### Production Setup
1. Set production environment variables
2. Install production dependencies
3. Configure proper MongoDB URI
4. Set appropriate security headers

## Logging Configuration
- Uses Fastify built-in logger
- Configurable log levels
- Request/response logging
- Error logging

## Security Configuration
- CORS settings
- Request size limits
- Method restrictions
- Input validation

## Performance Settings
- MongoDB connection pool
- Request timeouts
- Response caching
- Query limits