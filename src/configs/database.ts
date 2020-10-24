import { ConnectionOptions } from 'typeorm';


const { NODE_ENV, POSTGRES_URL } = process.env;

const testing: ConnectionOptions = {
  type: 'sqlite',
  database: '.temp/database.sql',
};

const development: ConnectionOptions = {
  type: 'postgres',
  url: POSTGRES_URL,
  synchronize: true,
};

const production: ConnectionOptions = {
  type: 'postgres',
  url: POSTGRES_URL,
};

const configs = { production, development, testing };


export default configs[NODE_ENV];
