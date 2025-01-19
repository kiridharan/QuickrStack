import { ArgumentsCamelCase, Argv } from 'yargs'
import { logger } from '../logger'
import * as process from 'node:process'
import { blue, bold, gray, green, red, yellow } from 'picocolors'

interface InfoArgv {
  full?: boolean
}

export const command = 'info'
export const describe = 'Basic command to display information about the CLI application.'
export const aliases = ['i']

export function builder(yargs: Argv): Argv<InfoArgv> {
  return yargs.option('full', {
    type: 'boolean',
    alias: 'f',
    default: true,
  })
}

export async function handler(argv: ArgumentsCamelCase<InfoArgv>) {
  logger.info(bold(red('Basic command to display information about the CLI application.')))
  logger.info(green('Node:'), bold(process.version))
  logger.info(yellow('Processor architecture:'), process.arch)
  logger.info(blue('Current dir:'), process.cwd())

  var memoryUsage: any = process.memoryUsage()
  //formatting memory usage
  for (var key in memoryUsage) {
    memoryUsage[key] = (memoryUsage[key] / 1024 / 1024).toFixed(2) + ' MB'
  }

  // show in table format
  // create table with headers logger don;t have tble
  for (var key in memoryUsage) {
    logger.info(key, memoryUsage[key])
  }

  // logger.info(gray('Argv:'), argv)
  if (argv.full) {
    logger.box(gray(bold('Process config:')), process.config)
  }
}
