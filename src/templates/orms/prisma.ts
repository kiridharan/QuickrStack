// Generate prisma schema
import * as path from 'path'
import * as fs from 'fs-extra'
import { ProjectConfig } from '../../types/types'

export function generateORMProjectStructurePrisma(config: ProjectConfig, srcPath: string) {
  // Generate prisma schema

  const prismaSchema = `
datasource db {
  provider = "${config.database}"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
      `.trim()
  const prismaDir = path.resolve(srcPath, 'prisma')
  fs.ensureDirSync(prismaDir)
  fs.writeFileSync(path.resolve(prismaDir, 'schema.prisma'), prismaSchema)
}
