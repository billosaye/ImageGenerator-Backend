import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;
