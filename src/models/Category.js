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

 /* --------------------------- Disable POST Method -------------------------- */
categorySchema.statics.apiPost = async function (body) {
  throw new Error('POST is disabled');
}

/* -------------------------- Disable UPDATE method ------------------------- */
categorySchema.methods.apiPut = async function (body) {
  throw new Error('UPDATE is disabled');
}

/* -------------------------- Disable DELETE method ------------------------- */
categorySchema.methods.apiDelete = async function () {
  throw new Error('DELETE is disabled');
}

export default mongoose.model('category', categorySchema);