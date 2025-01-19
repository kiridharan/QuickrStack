export enum PackageManager {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm',
}

export enum DatabaseType {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  SQLITE = 'sqlite',
}

export enum ORMType {
  PRISMA = 'prisma',
  TYPEORM = 'typeorm',
  SEQUELIZE = 'sequelize',
}

export enum ArchitectureType {
  CLEAN = 'clean',
  NORMAL = 'normal',
}

export interface ProjectConfig {
  projectName: string
  packageManager: PackageManager
  database: DatabaseType
  orm: ORMType
  architecture: ArchitectureType
  features: string[]
}
