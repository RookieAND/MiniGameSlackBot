import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const CURRENT_MONGO_URI = process.env.MONGO_URI || '';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(CURRENT_MONGO_URI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
};
