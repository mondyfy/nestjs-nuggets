import 'dotenv/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: String(process.env.DATABASE_HOST),
  port: Number(process.env.DATABASE_PORT),
  username: String(process.env.DATABASE_USERNAME),
  password: String(process.env.DATABASE_PASSWORD),
  database: String(process.env.DATABASE_NAME),
  entities: [join(__dirname, '../src/**/entities/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations', '*.{ts,js}')],
  migrationsTableName: 'typeorm_migrations',
};

export default new DataSource(dataSourceOptions);
