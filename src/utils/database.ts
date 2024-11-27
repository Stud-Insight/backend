import mongoose from 'mongoose';

const DATABASE_PREFIX = '[Database] ';

export const connectDatabase = async (uri: string) => {
    console.info(DATABASE_PREFIX + 'Connecting to MongoDB...');
    try {
        await mongoose.connect(uri);
        console.info(DATABASE_PREFIX + 'MongoDB connected successfully.');
    } catch (error) {
        console.error(
            DATABASE_PREFIX +
                'An error occurred when connecting to MongoDB. Check if the database is running or if the URI is correct.'
        );
        console.error(error);
    }
};