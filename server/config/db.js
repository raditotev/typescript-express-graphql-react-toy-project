import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log('Connected to MongoDB'.cyan.bold);
};

export { connectDB };
