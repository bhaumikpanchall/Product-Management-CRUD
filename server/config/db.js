import mongoose from 'mongoose';

const connectDB = async (uri) => {
  if (!uri) {
    throw new Error('Missing MONGO_URI. Please set it in your environment file.');
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

export default connectDB;

