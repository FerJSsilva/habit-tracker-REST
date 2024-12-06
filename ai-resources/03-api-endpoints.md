# API Endpoints and Usage Guide

## Base URL
All endpoints are prefixed with `/api/`

## Categories
```http
GET /api/categories
# Lists all categories
```

## Category Translations
```http
GET /api/category-translations
# Lists all category translations
```

## Habits
```http
GET /api/habits
# Lists all habits

POST /api/habits
Content-Type: application/json
{
    "categoryId": "6678b09bc4b03dfda03fa6a3",
    "identifier": "WRITE_JOURNAL"
}
```

## Habit Translations
```http
GET /api/habit-translations
# Lists all habit translations

POST /api/habit-translations
Content-Type: application/json
{
    "habitId": "668b5559464e18ff44ecc92f",
    "language": "pt-br",
    "name": "Escrever um diário",
    "description": "Escrever reflexões diárias para melhorar a escrita e a autoanálise."
}

PUT /api/habit-translations/:id
# Updates existing translation
```

## Request/Response Format
- All requests and responses use JSON
- Date fields use ISO 8601 format
- IDs are MongoDB ObjectIds
- Errors return appropriate HTTP status codes with error messages

## Testing
- All endpoints documented in requests.http
- Can be tested directly via VS Code REST Client
- Examples include all required fields and proper formatting