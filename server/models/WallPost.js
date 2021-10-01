import mongoose from 'mongoose';

const WallPost = new mongoose.Schema({
  wallOwnerId: { type: String, required: true },
  authorId: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true, default: '' }
}, { versionKey: false })


export default mongoose.model('WallPost', WallPost);
