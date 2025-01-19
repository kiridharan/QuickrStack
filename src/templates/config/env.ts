import { ProjectConfig } from '../../types/types'

export function env(config: ProjectConfig) {
  const envContent = `
NODE_ENV=development
PORT=3000
${getDatabaseEnvVars(config)}
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1d
  `.trim()

  return envContent
}

function getDatabaseEnvVars(config: ProjectConfig): string {
  switch (config.database) {
    case 'postgres':
      return `
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/${config.projectName}
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_NAME=${config.projectName}
        `.trim()
    case 'mysql':
      return `
  DATABASE_URL=mysql://root:root@localhost:3306/${config.projectName}
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=root
  DB_NAME=${config.projectName}
        `.trim()
    default:
      return `DATABASE_URL=file:./dev.db`
  }
}

export const dbConfigContent = `
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
    `.trim()

export const gitignoreContent = `
node_modules
dist
.env
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
  `.trim()
