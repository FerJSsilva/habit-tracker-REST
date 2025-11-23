import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    maxLength: 20,
    trim: true,
    match: [/^[^\s]*$/, 'Identifier must not contain spaces, use underscores instead'],
  },
});

export default mongoose.model('category', categorySchema);