import { ProjectConfig } from 'src/types/types'

export function generateTypeORMProjectStructurePrisma(config: ProjectConfig) {
  return `
    import { DataSource } from 'typeorm';
    import { config } from './config';
    
    export const AppDataSource = new DataSource({
      type: '${config.database}',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.name,
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      entities: ['src/entities/**/*.ts'],
      migrations: ['src/migrations/**/*.ts'],
      subscribers: ['src/subscribers/**/*.ts'],
    });
          `.trim()
}
