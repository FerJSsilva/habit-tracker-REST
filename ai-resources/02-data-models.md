# Data Models and Schema Definitions

## Core Models

### Habit
```javascript
{
  categoryId: ObjectId,  // Required, references Category
  identifier: String     // Required, unique, uppercase, max 20 chars, no spaces
}
```

### HabitTranslation
```javascript
{
  habitId: ObjectId,     // References Habit
  language: String,      // e.g., "pt-br"
  name: String,         
  description: String
}
```

### User
```javascript
{
  username: String       // Required, unique, trimmed
}
```

### Category
- Base model for habit categorization

### CategoryTranslation
- Stores translations for categories
- Similar structure to HabitTranslation

### UserHabit
- Links users to their habits
- Tracks habit progress

## Model Relationships
1. Category -> Habit (one-to-many)
2. Habit -> HabitTranslation (one-to-many)
3. Category -> CategoryTranslation (one-to-many)
4. User -> UserHabit -> Habit (many-to-many)

## Data Validation
- Built-in Mongoose schema validation
- Custom validation for identifiers
- Required field enforcement
- Unique constraint checks