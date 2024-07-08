import mongoose from 'mongoose';

const CategoryTranslationSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  language: {
    type: String,
    required: true,
    match: [/^[a-z]{2}(-[a-zA-Z]{2})?$/, "Language must be a two-letter code optionally followed by a hyphen and two letters"]
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

 /* --------------------------- Disable POST Method -------------------------- */
 CategoryTranslationSchema.statics.apiPost = async function (body) {
  throw new Error('POST is disabled');
}

/* -------------------------- Disable UPDATE method ------------------------- */
CategoryTranslationSchema.methods.apiPut = async function (body) {
  throw new Error('UPDATE is disabled');
}

/* -------------------------- Disable DELETE method ------------------------- */
CategoryTranslationSchema.methods.apiDelete = async function () {
  throw new Error('DELETE is disabled');
}

const CategoryTranslation = mongoose.model(
  "category-translation",
  CategoryTranslationSchema
);

export default CategoryTranslation;