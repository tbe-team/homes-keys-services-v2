import { IEnv } from '@/interfaces';

export const envConfiguration = (): IEnv => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  version: process.env.APP_VERSION,
  tbeBaseUrl: process.env.TBE_BASE_URL,
  tbeAccessToken: process.env.TBE_ACCESS_TOKEN,
  env: process.env.ENV || 'development',
  database: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number.parseInt(process.env.MYSQL_PORT) || 3306,
    databaseName: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
  },
});
