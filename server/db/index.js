import 'dotenv/config';
import { Client } from 'pg';
import { consoleColor } from '../../utils';

const isProd = process.env.NODE_ENV === 'production';

const connection = new Client({
  host: isProd ? process.env.PROD_DATABASE_HOST : process.env.DEV_DATABASE_HOST,
  database: isProd ? process.env.PROD_DATABASE : process.env.DEV_DATABASE,
  user: isProd ? process.env.PROD_DATABASE_USER : process.env.DEV_DATABASE_USER,
  password: isProd ? process.env.PROD_DATABASE_PASSWORD : process.env.DEV_DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

connection.connect(err => {
  if (err) {
    console.error(consoleColor, `Connection Error: ${err.stack}`);
  } else {
    console.log(
      consoleColor,
      `Connected to PostgreSQL on port ${process.env.DATABASE_PORT}`,
    );
  }
});

export { connection };
