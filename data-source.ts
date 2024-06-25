import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const TypeOrmDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  port: Number(process.env.DATABASE_PORT),
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
});
