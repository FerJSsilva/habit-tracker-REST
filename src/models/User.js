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

UserSchema.methods.apiValues = async function (request) {
  if (request?.body?.username) {
    return {
      username: request.body.username
    };
  } else {
    throw new Error('GET is disabled');
  }
};

// UserSchema.statics.apiPost = async function (body) {
//   throw new Error('POST is disabled');
// }
UserSchema.methods.apiPut = async function (body) {
  throw new Error('UPDATE is disabled');
}

UserSchema.methods.apiDelete = async function () {
  throw new Error('DELETE is disabled');
}


const User = mongoose.model('user', UserSchema);

module.exports = User;