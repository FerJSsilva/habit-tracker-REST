const mongoose = require("mongoose");

const HabitTranslationSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "habit",
    required: true,
  },
  language: {
    type: String,
    required: true,
    match: [/^[a-z]{2}(-[A-Z]{2})?$/, "Language must be a two-letter code optionally followed by a hyphen and two uppercase letters"]  },
  name: {
    type: String,
    required: true,
    unique: true,
    capitalize: true,
    minLength: [3, "Name cannot be less than 3 characters"],
    maxlength: [42, "Name cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: true,
    minLength: [5, "Description cannot be less than 5 characters"],
    maxlength: [255, "Description cannot be more than 255 characters"],
  },
});

const HabitTranslation = mongoose.model(
  "habit_translation",
  HabitTranslationSchema
);

module.exports = HabitTranslation;
