if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const { error } = dotenv.config();

    if (error) {
        throw error;
    }
}

module.exports = {
    serverPort: process.env.SERVER_PORT,
    databasePort: process.env.DATABASE_PORT,
    remoteDbUri: process.env.REMOTE_DB_URI,
    mongoDbUri: process.env.MONGO_DB_URI,
    localhostDbUri: process.env.LOCALHOST_DB_URI
};