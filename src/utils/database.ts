import User from '@/models/User';
import mongoose from 'mongoose';

const DATABASE_PREFIX = '[🌐] ';

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

export const cleanExpiredTokens = async () => {
    const now = new Date();
    try {
        const result = await User.updateMany(
            {},
            { $pull: { refreshTokens: { exp: { $lt: now } } } }
        );
        console.log(`${result.modifiedCount} utilisateur(s) nettoyé(s).`);
    } catch (error) {
        console.error('Erreur lors du nettoyage des tokens expirés :', error);
    }
}