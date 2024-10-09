import dotenv from 'dotenv';
import { cleanEnv, str, num } from 'envalid';

const envFileName = `.env.${process.env.NODE_ENV}`;

dotenv.config({ path: envFileName });

export const env = cleanEnv(process.env, {
  PORT: num(),
  NODE_ENV: str({ choices: ['development', 'production'] }),
  DB_HOST: str(),
  DB_PORT: num(),
  DB_USER_NAME: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
  CLIENT_ORIGIN: str(),
});
