module.exports = {
  // server config
  port: 3000,
  name: 'alpha',
  env: process.env.NODE_ENV,
  base_uri: process.env.BASE_URI,
  host: process.env.HOST,

  // mongodb config
  isMongoUri: false,
  mongo_host: process.env.MONGO_HOST,
  mongo_port: process.env.MONGO_PORT,
  mongo_dbname: process.env.MONGO_DBNAME,
  mongo_uri: process.env.MONGO_URI,

  // aws-sdk config
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_region: process.env.AWS_REGION,
};
