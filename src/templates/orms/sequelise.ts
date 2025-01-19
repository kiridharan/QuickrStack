import { ProjectConfig } from 'src/types/types'

export function generateSequeliseProjectStructurePrisma(config: ProjectConfig) {
  return `
 import { Sequelize } from 'sequelize-typescript';
 import { config } from './config';
 
 export const sequelize = new Sequelize({
   dialect: '${config.database}',
   host: config.database.host,
   port: config.database.port,
   username: config.database.username,
   password: config.database.password,
   database: config.database.name,
   models: [__dirname + '/../models'],
   logging: process.env.NODE_ENV === 'development',
 });
       `.trim()
}
