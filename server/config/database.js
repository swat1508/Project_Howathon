const {
  remoteDbUri,
  mongoDbUri,
  localhostDbUri
} = require('./config');

if (process.env.NODE_ENV == 'production') {
  console.log('PROD', process.env.NODE_ENV);
  module.exports = { mongoURI: remoteDbUri };
  // For docker
  // module.exports = {mongoURI: mongoDbUri};
} else {
  console.log('NON_PROD', process.env.NODE_ENV);
  module.exports = { mongoURI: localhostDbUri };
  // For docker
  // module.exports = {mongoURI: mongoDbUri};
}