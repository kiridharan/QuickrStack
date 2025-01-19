// check-updates.ts
import { execSync } from 'child_process'
import * as fs from 'fs'
import { dependencies } from './dependecy'

// Function to check the latest version of a package
const checkLatestVersion = (pkgName: string): string => {
  try {
    const latestVersion = execSync(`npm show ${pkgName} version`).toString().trim()
    return latestVersion
  } catch (error) {
    console.error(`Error fetching version for ${pkgName}: ${error}`)
    return 'Error'
  }
}

// Compare versions
const compareVersions = (current: string, latest: string) => {
  return current === latest ? 'Up-to-date' : 'Outdated'
}

const checkDependencies = () => {
  const result: Record<string, any> = {}

  Object.entries(dependencies).forEach(([category, deps]) => {
    result[category] = {}

    Object.entries(deps).forEach(([pkgName, currentVersion]) => {
      const latestVersion = checkLatestVersion(pkgName)
      const status = latestVersion === 'Error' ? 'Error' : compareVersions(currentVersion, `^${latestVersion}`)
      result[category][pkgName] = { currentVersion, latestVersion, status }
    })
  })

  return result
}

// Run and save the result
const result = checkDependencies()
fs.writeFileSync('dependency-check-result.json', JSON.stringify(result, null, 2))

console.log('Dependency check completed. See "dependency-check-result.json" for details.')
