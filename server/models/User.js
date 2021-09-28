import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfRegistration: { type: String },
  birthday: { type: String, default: '' },
  name: { type: String, default: 'noName' },
  surname: { type: String, default: 'noSurname' },
  age: { type: Number },
  friends: [String],
  avatar: { type: String }
}, { versionKey: false })


export default mongoose.model('User', User);
