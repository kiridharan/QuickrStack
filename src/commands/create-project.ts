import * as fs from 'fs-extra'
import * as path from 'path'
import { ArgumentsCamelCase, Argv } from 'yargs'
import inquirer from 'inquirer'
import { ArchitectureType, DatabaseType, ORMType, PackageManager, ProjectConfig } from '../types/types'
import { logger } from '../logger'
import { green, red } from 'picocolors'
// import { generateResource } from './generate-resource'
import { generateProjectStructure } from '../internals/generateProjectStructure'
import { installDependencies } from '../internals/installDepency'

// This is the type of the arguments that the command will receive
interface CreateProjectArgv {
  projectName: string
}

export const command = 'create-project'
export const describe = 'Create a new project with the specified configuration.'
export const aliases = ['cp']

export function builder(yargs: Argv<CreateProjectArgv>): Argv {
  return yargs
    .positional('projectName', {
      type: 'string',
      description: 'path to working directory',
      default: 'my-project',
    })
    .coerce('projectName', (value: string) => {
      if (path.isAbsolute(value)) {
        return value
      }
      return path.join(process.cwd(), value)
    })
}

export async function handler(argv: ArgumentsCamelCase<CreateProjectArgv>) {
  const ready = await logger.prompt(green(`Are you ready to create new project at ${argv.projectName} folder?`), {
    type: 'text',
  })

  argv.projectName = ready ?? argv.projectName
  try {
    createProject(argv.projectName, {})
  } catch (e) {
    logger.error(red((e as Error).message))
  }
}

export async function createProject(projectName: string, options: any) {
  // Interactive prompts if options are not fully specified
  const projectConfig = await promptMissingConfig(projectName, options)

  // Create project directory
  logger.info(`Creating project ${projectName}...`)

  const projectPath = path.resolve(process.cwd(), projectName)

  fs.ensureDirSync(projectPath)

  // Install dependencies
  await installDependencies(projectPath, projectConfig)

  // Generate project structure
  await generateProjectStructure(projectPath, projectConfig)

  // Install dependencies based on package manager
  // execSync(`cd ${projectName} && ${projectConfig.packageManager} install`)

  logger.info(`Project ${projectName} created successfully!`)
  logger.info(`You can start the project by running the following commands:`)
  logger.info(`cd ${projectName}`)
  logger.info(`${projectConfig.packageManager} run dev`)
}

async function promptMissingConfig(projectName: string, options: any): Promise<ProjectConfig> {
  const questions = [
    {
      type: 'list',
      name: 'packageManager',
      message: 'Choose package manager:',
      choices: Object.values(PackageManager),
      default: options.packageManager || PackageManager.NPM,
    },
    {
      type: 'list',
      name: 'database',
      message: 'Choose database:',
      choices: Object.values(DatabaseType),
      default: options.database || DatabaseType.POSTGRES,
    },
    {
      type: 'list',
      name: 'orm',
      message: 'Choose ORM:',
      choices: Object.values(ORMType),
      default: options.orm || ORMType.PRISMA,
    },
    {
      type: 'list',
      name: 'architecture',
      message: 'Choose architecture:',
      choices: Object.values(ArchitectureType),
      default: options.architecture || ArchitectureType.CLEAN,
    },
  ]

  const answers = await inquirer.prompt(questions as any)

  return {
    projectName,
    packageManager: answers.packageManager,
    database: answers.database,
    orm: answers.orm,
    architecture: answers.architecture,
    features: ['user-auth', 'base-crud'],
  }
}
