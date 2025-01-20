import { Argv } from 'yargs'
import { logger } from '../logger'
import { green, red } from 'picocolors'
import * as path from 'path'
import * as fs from 'fs-extra'
import { readProjectConfig } from '../internals/readProjectConfig'
import { parseRoutes } from '../utilities/utilities'

interface GenerateAPIArgv {}

export const command = 'generate-api'
export const describe = 'Generate a new API project.'
export const aliases = ['ga']

export function builder(yargs: Argv<GenerateAPIArgv>): Argv {
  return yargs
}

export async function handler() {
  logger.info('Generating a new API project...')

  // Ask user if they are ready to generate the API
  const ready = await logger.prompt(green('Are you ready to generate a new API project?'), { type: 'confirm' })

  if (!ready) {
    logger.info('Exiting...')
    process.exit(0)
  }

  try {
    // Read the project configuration
    const projectConfig = await readProjectConfig()

    // Ask for the API name
    const apiName = await logger.prompt(green('What is the API Name?'), { type: 'text' })

    logger.info(`Generating API for ${apiName} in project ${projectConfig.projectDirectory}...`)

    // Check the architecture type and generate code accordingly
    if (projectConfig.architecture === 'clean') {
      generateApiForTodosCleanArchitecture(apiName, projectConfig)
    } else {
      generateApiForTodosNormalArchitecture(apiName, projectConfig)
    }
  } catch (e) {
    logger.error(red((e as Error).message))
  }
}

// Function to generate API for "Clean Architecture"
export function generateApiForTodosCleanArchitecture(apiName: string, config: { projectDirectory: string }) {
  logger.info(`Generating API for ${apiName} in Clean Architecture...`)

  const srcPath = path.resolve(process.cwd(), config.projectDirectory)

  logger.info(`Generating API for ${apiName} in Clean Architecture...`)

  // Ensure routes and controllers directory exist for clean architecture
  const routesPath = path.resolve(srcPath, 'src', 'routes')
  fs.ensureDirSync(routesPath)
  const controllersPath = path.resolve(srcPath, 'src', 'controllers')
  fs.ensureDirSync(controllersPath)

  const routeFilePath = routesPath + '/routes.ts'
  const controllerFilePath = path.resolve(controllersPath, `${apiName}Controller.ts`)

  // Generate and write the API routes and controller code
  const routeContent = generateApiRoutes(apiName)
  const controllerContent = generateApiController(apiName)

  fs.appendFileSync(routeFilePath, routeContent)
  fs.writeFileSync(controllerFilePath, controllerContent)

  logger.success(`API routes and controller for ${apiName} generated successfully!`)
}

// Function to generate API for "Normal Architecture"
export async function generateApiForTodosNormalArchitecture(apiName: string, config: { projectDirectory: string }) {
  logger.info(`Generating API for ${apiName} in Normal Architecture...`)

  const srcPath = path.resolve(process.cwd(), config.projectDirectory)

  // Ensure routes and controllers directory exist for normal architecture
  const routesPath = path.resolve(srcPath, 'src', 'routes')
  fs.ensureDirSync(routesPath)

  const controllersPath = path.resolve(srcPath, 'src', 'controllers')
  fs.ensureDirSync(controllersPath)

  const routeFilePath = routesPath + '/routes.ts'
  const controllerFilePath = path.resolve(controllersPath, `${apiName}Controller.ts`)

  // Generate and write the API routes and controller code
  const routeContent = generateApiRoutes(apiName)
  const controllerContent = generateApiController(apiName)

  await parseRoutes(routeFilePath, AddImportToRouteFile(apiName), routeContent)
  fs.writeFileSync(controllerFilePath, controllerContent)

  logger.success(`API routes and controller for ${apiName} generated successfully!`)
  logger.info(`Don't forget to add the routes to the main routes file.`)
}

// Add import statements to the top of the routes file
function AddImportToRouteFile(apiName: string) {
  return `import { get${apiName}, create${apiName}, update${apiName}, delete${apiName} } from '../controllers/${apiName}Controller';`
}

// Generate API routes content
function generateApiRoutes(apiName: string) {
  const apiNameLower = apiName.toLowerCase()
  return `
   

    // Get all ${apiNameLower}s
    router.get('/${apiNameLower}/', get${apiName});

    // Create a new ${apiNameLower}
    router.post('/${apiNameLower}/', create${apiName});

    // Update an existing ${apiName.toLowerCase()}
    router.put('/${apiNameLower}/:id', update${apiName});

    // Patch an existing ${apiName.toLowerCase()}
    router.patch('/${apiNameLower}/:id', update${apiName});

    // Delete a ${apiName.toLowerCase()}
    router.delete('/${apiNameLower}/:id', delete${apiName});

  `.trim()
}

// Generate API controller content
function generateApiController(apiName: string) {
  return `
    import { Request, Response } from 'express';

    // Get all ${apiName.toLowerCase()}
    export const get${apiName} = (req: Request, res: Response) => {
      const ${apiName.toLowerCase()} = [{ id: 1, title: 'Sample ${apiName}' }];
      res.json(${apiName.toLowerCase()});
    };

    // Create a new ${apiName.toLowerCase()}
    export const create${apiName} = (req: Request, res: Response) => {
      const { title } = req.body;
      const new${apiName} = { id: Date.now(), title };
      res.status(201).json(new${apiName});
    };

    // Update an existing ${apiName.toLowerCase()}
    export const update${apiName} = (req: Request, res: Response) => {
      const { id } = req.params;
      const { title } = req.body;
      const updated${apiName} = { id, title };
      res.json(updated${apiName});
    };

    // Delete a ${apiName.toLowerCase()}
    export const delete${apiName} = (req: Request, res: Response) => {
      const { id } = req.params;
      res.status(204).send();
    };
  `.trim()
}
