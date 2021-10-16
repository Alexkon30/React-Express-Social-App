import mongoose from 'mongoose';

const Dialog = new mongoose.Schema({
  members: [{ type: String, required: true }]
}, { versionKey: false })


export default mongoose.model('Dialog', Dialog);
