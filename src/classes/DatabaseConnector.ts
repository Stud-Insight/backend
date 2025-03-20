import mongoose from "mongoose";

enum DatabaseConnectorErrors {
    CONNECTION_WITH_DATABASE_FAILED = "CONNECTION_WITH_DATABASE_FAILED"
}

const DATABASE_PREFIX = '[🌐] ';

class DatabaseConnector {
    /* ========== */
    private readonly dbConnection: mongoose.mongo.Db;
    public static readonly errors: typeof DatabaseConnectorErrors;

    /* ========== */
    private constructor(dbConnection: mongoose.mongo.Db) {
        this.dbConnection = dbConnection;
    }

    public static async initiate(uri: string) {
        llog.info(DATABASE_PREFIX + 'Connecting to MongoDB...');
        try {
            await mongoose.connect(uri);
            llog.ok(DATABASE_PREFIX + 'MongoDB connected successfully.');
        } catch (error) {
            llog.error(
                DATABASE_PREFIX +
                    'An error occurred when connecting to MongoDB. Check if the database is running or if the URI is correct.'
            );
            llog.error(error);
        }
        return new DatabaseConnector(mongoose.connection.db as mongoose.mongo.Db);
    }

    public getConnection() {
        return this.dbConnection;
    }

}

export default DatabaseConnector;