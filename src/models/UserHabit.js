import mongoose from 'mongoose';
import isISO8601 from '../utils/isISO8601.js';
const { Schema } = mongoose;

const UserHabitSchema = new Schema({
  habitId: {
    type: Schema.Types.ObjectId,
    ref: 'habit',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  selectedDays: {
    type: String,
    required: true
  },
  anytime: {
    type: Number,
    required: true
  },
  morning: {
    type: Number,
    required: true
  },
  afternoon: {
    type: Number,
    required: true
  },
  evening: {
    type: Number,
    required: true
  },
  startDate: {
    type: String,
    required: true,
    validate: {
      validator: isISO8601,
      message: props => `${props.value} is not a valid ISO 8601 date format`
    }
  },
  endDate: {
    type: String,
    required: true,
    validate: {
      validator: isISO8601,
      message: props => `${props.value} is not a valid ISO 8601 date format`
    }
  },
  streak: {
    type: Number,
    required: true
  }
});

const UserHabit = mongoose.model('user_habit', UserHabitSchema);

export default UserHabit;