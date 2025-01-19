import { execSync } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import { ProjectConfig, PackageManager } from '../types/types'
import { logger } from '../logger'
import { dependencies } from '../templates/dependencies/dependecy'

interface PackageJson {
  name: string
  version: string
  description: string
  main: string
  scripts: Record<string, string>
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export function installDependencies(projectPath: string, config: ProjectConfig) {
  logger.info('Starting dependency installation...')
  process.chdir(projectPath)

  // Get all required dependencies
  const { packageJson, depsToInstall, devDepsToInstall } = generateDependencyLists(config)

  // Write package.json
  writePackageJson(projectPath, packageJson)

  // Install dependencies based on package manager
  const installCommands = getInstallCommands(config.packageManager, depsToInstall, devDepsToInstall)

  try {
    // Initialize project based on package manager
    // execSync(installCommands.init, { stdio: 'inherit' })

    // Install production dependencies
    logger.info('Installing production dependencies...')
    execSync(installCommands.dependencies, { stdio: 'inherit' })

    // Install development dependencies
    logger.info('Installing development dependencies...')
    execSync(installCommands.devDependencies, { stdio: 'inherit' })

    logger.success('Dependencies installed successfully!')
  } catch (error) {
    logger.error('Failed to install dependencies:', error)
    throw error
  }
}

function generateDependencyLists(config: ProjectConfig) {
  // Start with base dependencies
  const depsToInstall = { ...dependencies.base }
  const devDepsToInstall = { ...dependencies.dev }

  // Add ORM-specific dependencies
  const ormDeps = dependencies.orms[config.orm.toLowerCase() as keyof typeof dependencies.orms]
  Object.assign(depsToInstall, ormDeps.dependencies)
  Object.assign(devDepsToInstall, ormDeps.devDependencies)

  // Add database-specific dependencies
  const dbDeps = dependencies.databases[config.database.toLowerCase() as keyof typeof dependencies.databases]
  Object.assign(depsToInstall, dbDeps.dependencies)
  Object.assign(devDepsToInstall, dbDeps.devDependencies)

  // Generate package.json content
  const packageJson: PackageJson = {
    name: config.projectName,
    version: '1.0.0',
    description: `Backend application generated with Backend Generator CLI using ${config.architecture} architecture`,
    main: 'dist/index.js',
    scripts: {
      start: 'node dist/index.js',
      dev: 'ts-node-dev --respawn --transpile-only src/index.ts',
      build: 'tsc',
      test: 'jest',
      //   'test:watch': 'jest --watch',
      //   'test:coverage': 'jest --coverage',
      //   lint: 'eslint . --ext .ts',
      //   'lint:fix': 'eslint . --ext .ts --fix',
      //   format: 'prettier --write "src/**/*.ts"',
      //   prepare: 'husky install',
    },
    dependencies: depsToInstall,
    devDependencies: devDepsToInstall,
  }

  return {
    packageJson,
    depsToInstall: Object.entries(depsToInstall).map(([name, version]) => `${name}@${version}`),
    devDepsToInstall: Object.entries(devDepsToInstall).map(([name, version]) => `${name}@${version}`),
  }
}

function getInstallCommands(packageManager: PackageManager, deps: string[], devDeps: string[]) {
  switch (packageManager) {
    case PackageManager.NPM:
      return {
        // init: 'npm init -y',
        dependencies: `npm install ${deps.join(' ')}`,
        devDependencies: `npm install -D ${devDeps.join(' ')}`,
      }
    case PackageManager.YARN:
      return {
        // init: 'yarn init -y',
        dependencies: `yarn add ${deps.join(' ')}`,
        devDependencies: `yarn add -D ${devDeps.join(' ')}`,
      }
    case PackageManager.PNPM:
      return {
        // init: 'pnpm init',
        dependencies: `pnpm install ${deps.join(' ')}`,
        devDependencies: `pnpm install -D ${devDeps.join(' ')}`,
      }
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`)
  }
}

function writePackageJson(projectPath: string, packageJson: PackageJson) {
  const packageJsonPath = path.join(projectPath, 'package.json')
  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    logger.info('package.json created successfully')
  } catch (error) {
    logger.error('Failed to write package.json:', error)
    throw error
  }
}
