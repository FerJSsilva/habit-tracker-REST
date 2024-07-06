import mongoose from 'mongoose';
const { Schema } = mongoose;

const habitSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
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

habitSchema.methods.apiDelete = async function () {
  throw new Error('DELETE is disabled');
};

mongoose.model('habit', habitSchema);