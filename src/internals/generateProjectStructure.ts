import * as fs from 'fs-extra'
import * as path from 'path'

import { logger } from '../logger'
import { ArchitectureType, ORMType, ProjectConfig } from '../types/types'
import { tsConfig } from '../templates/config/tsconfig'
import { env, gitignoreContent, dbConfigContent } from '../templates/config/env'
import { indexContent } from '../templates/basefiles'
import { errorHandlerContent } from '../templates/basefiles/error'
import { generateORMProjectStructurePrisma } from '../templates/orms/prisma'
import { generateTypeORMProjectStructurePrisma } from '../templates/orms/typeorm'
import { generateSequeliseProjectStructurePrisma } from '../templates/orms/sequelise'
import { generateDefaultResources } from './generateReources'

export function generateProjectStructure(projectPath: string, config: ProjectConfig) {
  logger.info(`Generating project structure for ${config.projectName}`)

  // Create base directories
  const srcPath = path.resolve(projectPath, 'src')
  fs.ensureDirSync(srcPath)

  // Create basic folder structure
  const baseDirectories = ['config', 'middleware', 'utils', 'routes', 'tests', 'logs']

  // Add architecture-specific directories
  const architectureDirectories =
    config.architecture === ArchitectureType.CLEAN
      ? ['entities', 'useCases', 'repositories', 'interfaces', 'presenters']
      : ['models', 'controllers', 'services']

  // Create all directories
  ;[...baseDirectories, ...architectureDirectories].forEach((dir) => {
    fs.ensureDirSync(path.resolve(srcPath, dir))
  })

  // Generate configuration files
  generateConfigFiles(projectPath, config)

  // Generate base files
  generateBaseFiles(srcPath, config)

  // Generate ORM specific files
  generateORMFiles(srcPath, config)

  // Generate architecture specific files
  generateArchitectureFiles(srcPath, config)

  // generateRoutes(srcPath)

  // Generate default resources
  generateDefaultResources(srcPath, config)

  // create quickstack config file to store project configuration
  fs.writeFileSync(path.resolve(projectPath, 'quickrstack.json'), JSON.stringify(config, null, 2))

  logger.info('Project structure generated successfully')
}

function generateConfigFiles(projectPath: string, config: ProjectConfig) {
  // Generate tsconfig.json

  fs.writeFileSync(path.resolve(projectPath, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2))

  // Generate .env

  fs.writeFileSync(path.resolve(projectPath, '.env'), env(config))

  // Generate .gitignore

  fs.writeFileSync(path.resolve(projectPath, '.gitignore'), gitignoreContent)

  // create config file in config folder with reading all env variables

  fs.writeFileSync(path.resolve(projectPath, 'src', 'config', 'config.ts'), dbConfigContent)
}

function generateBaseFiles(srcPath: string, config: ProjectConfig) {
  if (config) {
    logger.info(`Generating base files for ${config.projectName}`)
  }
  // Generate index.ts
  fs.writeFileSync(path.resolve(srcPath, 'index.ts'), indexContent)

  // Generate base middleware
  fs.writeFileSync(path.resolve(srcPath, 'middleware', 'error-handler.ts'), errorHandlerContent)
}

function generateORMFiles(srcPath: string, config: ProjectConfig) {
  const ormConfigPath = path.resolve(srcPath, 'config', 'database.ts')

  let ormConfig = ''
  switch (config.orm) {
    case ORMType.PRISMA:
      logger.info(`Generating Prisma files for ${config.projectName}`)
      generateORMProjectStructurePrisma(config, srcPath)
      break

    case ORMType.TYPEORM:
      logger.info(`Generating TypeORM files for ${config.projectName}`)
      ormConfig = generateTypeORMProjectStructurePrisma(config)
      break

    case ORMType.SEQUELIZE:
      logger.info(`Generating Sequelize files for ${config.projectName}`)
      ormConfig = generateSequeliseProjectStructurePrisma(config)
      break
  }

  if (ormConfig) {
    fs.writeFileSync(ormConfigPath, ormConfig)
  }
}

function generateArchitectureFiles(srcPath: string, config: ProjectConfig) {
  if (config.architecture === ArchitectureType.CLEAN) {
    // Generate clean architecture base files
    const baseUseCasePath = path.resolve(srcPath, 'useCases', 'base.useCase.ts')
    const baseRepositoryPath = path.resolve(srcPath, 'repositories', 'base.repository.ts')

    fs.writeFileSync(
      baseUseCasePath,
      `
export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}
    `.trim(),
    )

    fs.writeFileSync(
      baseRepositoryPath,
      `
export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(page: number, limit: number): Promise<{ data: T[]; total: number }>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
    `.trim(),
    )
  }
}

// function generateDefaultResources(srcPath: string, config: ProjectConfig) {
//   // Generate User and Auth resources based on architecture
//   const resourcesPath =
//     config.architecture === ArchitectureType.CLEAN
//       ? {
//           entities: path.resolve(srcPath, 'entities'),
//           useCases: path.resolve(srcPath, 'useCases'),
//           repositories: path.resolve(srcPath, 'repositories'),
//         }
//       : {
//           models: path.resolve(srcPath, 'models'),
//           controllers: path.resolve(srcPath, 'controllers'),
//           services: path.resolve(srcPath, 'services'),
//         }

//   // Copy template files based on architecture and ORM
//   Object.entries(resourcesPath).forEach(([type, path]) => {
//     const templatePath = `templates/${config.architecture}/${config.orm}/${type}`
//     if (fs.existsSync(templatePath)) {
//       fs.copySync(templatePath, path)
//     }
//   })

//   // Generate routes
//   const routesIndexPath = path.resolve(srcPath, 'routes', 'index.ts')
//   const routesContent = `
// import { Router } from 'express';
// import userRoutes from './user.routes';
// import authRoutes from './auth.routes';

// const router = Router();

// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

// export default router;
//   `.trim()

//   fs.writeFileSync(routesIndexPath, routesContent)
// }
