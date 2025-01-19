import fs from 'fs'
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export async function parseRoutes(routesPath: string, newImport: string, newRoute: string) {
  const fileContent = await fs.promises.readFile(routesPath, 'utf-8')

  const importSection = fileContent.match(/^(import.*\n)+/)
  const updatedImports = importSection
    ? fileContent.replace(importSection[0], importSection[0] + newImport)
    : newImport + `\n` + fileContent

  // Append the routes before export or end of file
  const updatedContent = updatedImports.replace(
    `export const router = Router()`,
    `export const router = Router()\n${newRoute}`,
  )

  // W
  // rite the updated content back to the file
  await fs.promises.writeFile(routesPath, updatedContent, 'utf-8')
}
