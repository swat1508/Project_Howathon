if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const { error } = dotenv.config();

    if (error) {
        throw error;
    }
}

module.exports = {
    serverPort: '4001',
    databasePort: '27017',
    remoteDbUri: 'mongodb://swat1508:sinha1508@ds129045.mlab.com:29045/eunoia-howathon',
    mongoDbUriDocker: 'mongodb://mongo:27017/eunoia-howathon',
    // mongoDbUriDocker: 'mongodb://localhost:27017/eunoia-howathon',
    localhostDbUri: 'mongodb://localhost/eunoia-howathon',
    frontendHost: 'http://localhost:3000'
};