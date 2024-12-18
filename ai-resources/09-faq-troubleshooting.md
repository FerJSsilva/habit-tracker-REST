# FAQ and Troubleshooting Guide

## Frequently Asked Questions

### General
Q: Why can't I update or delete habits?
A: Habits are designed to be immutable to maintain data integrity and tracking history.

Q: Why use separate translation models?
A: This allows for flexible content management and easy addition of new languages without modifying base models.

Q: How do I handle user progress tracking?
A: Use the UserHabit model to associate users with habits and track their progress.

### Development
Q: How do I add a new model?
A: Create a new file in the models directory following existing patterns and register it in index.js.

Q: How do I customize API endpoints?
A: The API is auto-generated by fastify-mongoose-api. You can customize behavior through model methods.

Q: How do I add custom validation?
A: Use Mongoose schema validation or add custom methods to the model schema.

## Common Issues and Solutions

### Database Connection
```plaintext
Problem: MongoDB connection fails
Solution: 
1. Check MongoDB URL in .env
2. Verify MongoDB service is running
3. Check network connectivity
```

### API Errors
```plaintext
Problem: "UPDATE is disabled" error
Solution: This is by design for certain models. Use alternative approaches like creating new records.

Problem: Validation errors
Solution: Check the error response for specific field issues and ensure data meets schema requirements.

Problem: Reference errors
Solution: Ensure referenced IDs exist and are valid ObjectIds.
```

### Development Setup
```plaintext
Problem: Hot reload not working
Solution: 
1. Check nodemon is installed
2. Verify nodemon.json configuration
3. Restart development server
```

## Debugging Tips

### Model Issues
1. Check schema definition
2. Verify all required fields
3. Test with minimal valid data
4. Check for proper references

### API Issues
1. Verify endpoint URL
2. Check request method
3. Validate request payload
4. Review error responses

### Translation Issues
1. Verify language code format
2. Check all required fields
3. Ensure proper references
4. Validate content format

## Performance Optimization
1. Use proper indexes
2. Minimize nested queries
3. Optimize bulk operations
4. Use appropriate projection