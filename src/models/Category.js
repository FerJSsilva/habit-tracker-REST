import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  id: Number,
  name: String,
  description: String,
});

mongoose.model('Category', categorySchema);