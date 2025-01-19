import * as fs from 'fs-extra'
import * as path from 'path'
import { ProjectConfig, ArchitectureType } from '../types/types'
import { logger } from '../logger'

export function generateDefaultResources(srcPath: string, config: ProjectConfig) {
  //   logger.info('Generating default resources...')

  //   const resourcesPath =
  //     config.architecture === ArchitectureType.CLEAN
  //       ? generateCleanArchitectureResources(srcPath, config)
  //       : generateNormalArchitectureResources(srcPath, config)

  if (config.architecture === ArchitectureType.CLEAN) {
  } else {
  }

  //   // Generate routes
  //   // resourcesPath
  logger.info('Generating routes...')
  generateRoutes(srcPath)

  logger.success('Default resources generated successfully!')
}

// function generateCleanArchitectureResources(srcPath: string, config: ProjectConfig) {
//   const paths = {
//     entities: path.resolve(srcPath, 'entities'),
//     useCases: path.resolve(srcPath, 'useCases'),
//     repositories: path.resolve(srcPath, 'repositories'),
//     interfaces: path.resolve(srcPath, 'interfaces'),
//     presenters: path.resolve(srcPath, 'presenters'),
//   }

//   // Ensure directories exist
//   Object.values(paths).forEach((dir) => fs.ensureDirSync(dir))

//   // Generate files for each directory
//   //   generateUserEntity(paths.entities, config)
//   //   generateUserUseCases(paths.useCases)
//   //   generateUserRepository(paths.repositories, config)
//   //   generateUserInterfaces(paths.interfaces)
//   //   generateUserPresenters(paths.presenters)

//   return paths
// }

// function generateNormalArchitectureResources(srcPath: string, config: ProjectConfig) {
//   const paths = {
//     models: path.resolve(srcPath, 'models'),
//     controllers: path.resolve(srcPath, 'controllers'),
//     services: path.resolve(srcPath, 'services'),
//     middlewares: path.resolve(srcPath, 'middlewares'),
//   }

//   // Ensure directories exist
//   Object.values(paths).forEach((dir) => fs.ensureDirSync(dir))

//   // Generate files for each directory
//   //   generateUserModel(paths.models, config)
//   //   generateUserController(paths.controllers)
//   //   generateUserService(paths.services)
//   //   generateAuthMiddleware(paths.middlewares)

//   return paths
// }

export function generateRoutes(srcPath: string) {
  const routesDir = path.resolve(srcPath, 'routes')
  fs.ensureDirSync(routesDir)

  // Generate index.ts
  const indexRoutePath = path.resolve(routesDir, 'routes.ts')
  const indexRouteContent = `
        import { Router } from 'express'

        export const router = Router()

        router.get('/', (req, res) => {
        res.send("What's up doc ?!")
        })
  `.trim()

  fs.writeFileSync(indexRoutePath, indexRouteContent)

  logger.success('Routes generated successfully!')
}
