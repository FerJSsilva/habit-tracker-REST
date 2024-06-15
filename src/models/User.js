const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  }
});

UserSchema.methods.apiValues = async function () {
  throw new Error('GET is disabled for this route');
};

// schema.statics.apiPost DESABILITA POST
// schema.methods.apiValues DESABILITA GET
// schema.methods.apiPut DESABILITA PUT
// schema.methods.apiDelete DESABILITA DELETE

const User = mongoose.model('User', UserSchema);

module.exports = User;