if (process.env.NODE_ENV == 'production') {
  console.log('PROD', process.env.NODE_ENV);
  module.exports = { mongoURI: 'mongodb://swat1508:sinha1508@ds129045.mlab.com:29045/eunoia-howathon' };
} else {
  console.log('NON_PROD', process.env.NODE_ENV);
  module.exports = { mongoURI: 'mongodb://localhost/eunoia-howathon' };
}