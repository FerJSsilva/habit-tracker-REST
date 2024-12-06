# Usage Examples and Common Patterns

## Creating a New Habit with Translation
```javascript
// 1. First, create the habit
POST /api/habits
{
    "categoryId": "6678b09bc4b03dfda03fa6a3",
    "identifier": "DAILY_EXERCISE"
}

// 2. Add translations
POST /api/habit-translations
{
    "habitId": "[habit-id]",
    "language": "en",
    "name": "Daily Exercise",
    "description": "Exercise for at least 30 minutes every day"
}

POST /api/habit-translations
{
    "habitId": "[habit-id]",
    "language": "pt-br",
    "name": "Exercício Diário",
    "description": "Exercitar-se por pelo menos 30 minutos todos os dias"
}
```

## Working with Categories
```javascript
// 1. Create category
POST /api/categories
{
    "identifier": "HEALTH"
}

// 2. Add category translation
POST /api/category-translations
{
    "categoryId": "[category-id]",
    "language": "en",
    "name": "Health",
    "description": "Health and wellness related habits"
}
```

## User Habit Association
```javascript
// Associate user with habit
POST /api/user-habits
{
    "userId": "[user-id]",
    "habitId": "[habit-id]"
}
```

## Common Query Patterns
```javascript
// Get all habits in a category
GET /api/habits?categoryId=[category-id]

// Get translations for a specific language
GET /api/habit-translations?language=pt-br

// Get user's habits
GET /api/user-habits?userId=[user-id]
```

## Error Handling Examples
```javascript
// Handling duplicate identifiers
POST /api/habits
{
    "categoryId": "6678b09bc4b03dfda03fa6a3",
    "identifier": "EXISTING_IDENTIFIER"
}
// Response: 400 Bad Request
{
    "error": "Duplicate key error",
    "field": "identifier"
}

// Handling invalid references
POST /api/habit-translations
{
    "habitId": "invalid-id",
    "language": "en",
    "name": "Some Habit"
}
// Response: 400 Bad Request
{
    "error": "Invalid reference",
    "field": "habitId"
}
```