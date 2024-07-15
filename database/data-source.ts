import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config(); // Load environment variables from .env file

// Configure DataSourceOptions for TypeORM
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'ecommerce',
  entities: ['dist/**/*.entity{.ts,.js}'], // Adjust this path according to your entity location after compilation
  migrations: ['dist/database/migrations/*{.ts,.js}'], // Adjust this path for migrations
  synchronize: false // Set to true in development, but false in production
};

// Create DataSource instance and initialize it
const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;
