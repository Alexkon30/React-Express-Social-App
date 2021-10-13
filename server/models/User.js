import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfRegistration: { type: String },
  birthday: { type: String, default: '' },
  name: { type: String, default: 'noName' },
  surname: { type: String, default: 'noSurname' },
  age: { type: Number },
  friends: [String],
  dialogues: [String],
  avatar: { type: String },
  biography: { type: String, default: 'biography text' }
}, { versionKey: false })


export default mongoose.model('User', User);
