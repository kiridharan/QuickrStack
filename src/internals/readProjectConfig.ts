import * as path from 'path'
import * as fs from 'fs-extra'
import { logger } from '../logger'
import { green } from 'picocolors'

export async function readProjectConfig() {
  let currentDirectory = process.cwd()

  while (true) {
    logger.info(`Checking for quickrstack.json file in: ${currentDirectory}`)

    const configPath = path.resolve(currentDirectory, 'quickrstack.json')

    if (fs.existsSync(configPath)) {
      logger.info(green('quickrstack.json file found!'))
      const projectConfig = fs.readJsonSync(configPath)
      return projectConfig
    } else {
      logger.info('quickrstack.json file not found in the current directory.')

      // Prompt user to type a command
      const userCommand: string = await logger.prompt(
        green(`Type "cd <directory>" to navigate to a different directory or "exit" to quit.`),
        {
          type: 'text',
        },
      )

      if (userCommand.toLowerCase() === 'exit') {
        logger.info('Exiting as per user request.')
        process.exit(1)
      }

      // Parse the `cd` command
      if (userCommand.startsWith('cd ')) {
        const targetDir = userCommand.slice(3).trim()

        const newPath = path.resolve(currentDirectory, targetDir)

        if (fs.existsSync(newPath) && fs.statSync(newPath).isDirectory()) {
          currentDirectory = newPath
        } else {
          logger.warn(`Directory "${targetDir}" does not exist. Please try again.`)
        }
      } else {
        logger.warn('Invalid command. Please use "cd <directory>" to navigate or "exit" to quit.')
      }
    }
  }
}
