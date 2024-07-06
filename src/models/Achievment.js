import mongoose from 'mongoose';
import isISO8601 from '../utils/isISO8601.js';

const { Schema } = mongoose;

const AchievmentSchema = new Schema({
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
    date: {
      type: String,
      required: true,
      validate: {
        validator: isISO8601,
        message: props => `${props.value} is not a valid ISO 8601 date format`
      }
    },
    status: {
      type: Boolean,
      required: true
    },
  });

mongoose.model('achievment', AchievmentSchema);
