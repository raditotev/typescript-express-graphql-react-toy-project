import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = () => {
  mongoose.connect(process.env.MONGO_DB_URI as string);
  mongoose.connection.on('connected', () => {
    console.log(`${colors.cyan.bold('MongoDB Connected')}`);
  });
};

export { connectDB };
