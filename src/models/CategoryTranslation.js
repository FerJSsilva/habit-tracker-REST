const mongoose = require("mongoose");

const CategoryTranslationSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  language: {
    type: String,
    required: true,
    match: [/^[a-z]{2}(-[A-Z]{2})?$/, "Language must be a two-letter code optionally followed by a hyphen and two uppercase letters"]
  },
  name: {
    type: String,
    required: true,
    unique: true,
    capitalize: true,
    minLength: [3, "Name cannot be less than 3 characters"],
    maxlength: [42, "Name cannot be more than 42 characters"],
  },
  description: {
    type: String,
    required: true,
    minLength: [5, "Description cannot be less than 5 characters"],
    maxlength: [255, "Description cannot be more than 255 characters"],
  },
});

const CategoryTranslation = mongoose.model(
  "category_translation",
  CategoryTranslationSchema
);

module.exports = CategoryTranslation;