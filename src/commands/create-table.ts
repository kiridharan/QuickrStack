import * as fs from 'fs-extra'
import * as path from 'path'
import { Argv } from 'yargs'
// import inquirer from 'inquirer'
import { ProjectConfig } from '../types/types'
import { logger } from '../logger'
import { green, red } from 'picocolors'
import { readProjectConfig } from '../internals/readProjectConfig'
import { capitalize } from '../utilities/utilities'
import { generateApiForTodosCleanArchitecture, generateApiForTodosNormalArchitecture } from './generate-api'

// This is the type of the arguments that the command will receive
interface CreateTableArgv {}

export const command = 'create-table'
export const describe = 'Create a new Table with the specified configuration.'
export const aliases = ['ct']

export function builder(yargs: Argv<CreateTableArgv>): Argv {
  return yargs
}

export async function handler() {
  logger.info('Generating a new Table project...')

  // Confirm user readiness
  const ready = await logger.prompt(green('Are you ready to generate a new Table project?'), { type: 'confirm' })
  if (!ready) {
    logger.info('Exiting...')
    process.exit(0)
  }

  try {
    // Read the project configuration
    const projectConfig = await readProjectConfig()

    // Get the table name
    const tableName = await logger.prompt(green('What is the Table Name?'), { type: 'text' })

    const isAPIsRequired = await logger.prompt(green('Want to create GET, POST , PUT , DELETE Api for this Table'), {
      type: 'confirm',
    })
      

    logger.info(`Generating Table schema for ${tableName} in project ${projectConfig.projectName}...`)

    // Determine ORM and generate schema
    switch (projectConfig.orm) {
      case 'prisma':
        generatePrismaSchema(tableName, projectConfig)
        break
      case 'typeorm':
        generateTypeormSchema(tableName)
        break
      case 'sequelize':
        generateSequelizeSchema(tableName)
        break
      default:
        logger.error(red('Unsupported ORM type in project configuration.'))
        break
    }

    if (isAPIsRequired) {
      // Generate APIs
      logger.info(`Generating APIs for ${tableName} in project ${projectConfig.projectName}...`)
      if (projectConfig.architecture === 'clean') {
        generateApiForTodosCleanArchitecture(tableName, projectConfig)
      } else {
        generateApiForTodosNormalArchitecture(tableName, projectConfig)
      }
    }
  } catch (e) {
    logger.error(red((e as Error).message))
  }
}

function generatePrismaSchema(tableName: string, projectConfig: ProjectConfig) {
  const srcPath = path.resolve(process.cwd(), projectConfig.projectName)
  const schema = `
  model ${tableName} {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    // Add your fields here
  }
  `
  // check for prisma schema file
  const schemaPath = path.join(srcPath + '/src', 'prisma', 'schema.prisma')

  // add schema to prisma schema file
  fs.appendFileSync(schemaPath, schema)

  logger.info(`Schema added to ${schemaPath}`)

  //   writeToFile('prisma', tableName, schema, projectConfig)
}

function generateTypeormSchema(tableName: string) {
  const schema = `
  import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
  
  @Entity('${tableName}')
  export class ${capitalize(tableName)} {
    @PrimaryGeneratedColumn()
    id: number
  
    @CreateDateColumn()
    createdAt: Date
  
    @UpdateDateColumn()
    updatedAt: Date
  
    // Add your columns here
  }
  `
  return schema
  //   writeToFile('typeorm', tableName, schema, projectConfig)
}

function generateSequelizeSchema(tableName: string) {
  const schema = `
  const { DataTypes } = require('sequelize')
  
  module.exports = (sequelize) => {
    const ${capitalize(tableName)} = sequelize.define('${tableName}', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // Add your fields here
    })
    return ${capitalize(tableName)}
  }
  `

  return schema
  //   writeToFisle('sequelize', tableName, schema, projectConfig)
}

//
