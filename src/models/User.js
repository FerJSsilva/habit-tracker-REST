const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
});

UserSchema.methods.apiValues = async function () {
  throw new Error('GET is disabled for this route');
};



const User = mongoose.model('User', UserSchema);

module.exports = User;