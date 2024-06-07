import mongoose from 'mongoose';
const { Schema } = mongoose;

const habitSchema = new Schema({
  category: Number,
  name: String,
  description: String,
});

// Desabilitar o método DELETE
habitSchema.methods.apiDelete = async function () {
  throw new Error('DELETE is disabled');
};

mongoose.model('Habit', habitSchema);