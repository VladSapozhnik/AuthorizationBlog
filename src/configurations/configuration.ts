import * as process from 'node:process';

export default () => ({
  port: process.env.PORT,
  db_port: +process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  jwt_secret: process.env.JWT_SECRET,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  cookie_domain: process.env.COOKIE_DOMAIN,
  node_env: process.env.NODE_ENV,
});
