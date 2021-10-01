import mongoose from 'mongoose';

const Message = new mongoose.Schema({
  dialogId: { type: String, required: true },
  content: { type: String, default: '' },
  date: { type: String, required: true },
  author: { type: String, required: true }
}, { versionKey: false })


export default mongoose.model('Message', Message);
