# Application Workflows and Processes

## Habit Creation Flow
1. Create Category (if not exists)
2. Add Category Translation
3. Create Habit with category reference
4. Add Habit Translation
5. Associate with User via UserHabit

## Data Management Rules
- Habits cannot be updated or deleted (immutable)
- Users cannot be updated or deleted
- Translations can be updated
- Categories are prerequisite for habits
- All content must have translations

## Internationalization (i18n) Process
1. Create base content (Habit or Category)
2. Add translations for each supported language
3. Always use language codes (e.g., "pt-br")
4. Translations can be updated independently

## Data Validation Workflow
1. Schema-level validation via Mongoose
2. Custom validation for identifiers
3. Relationship integrity checks
4. Unique constraint enforcement

## Error Handling
- MongoDB connection errors
- Validation errors
- Not found errors
- Method restriction errors
- Duplicate key errors