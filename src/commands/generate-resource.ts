import inquirer from 'inquirer'

export async function generateResource(resourceName: string) {
  // Logic to generate specific resources like models, controllers, services
  console.log(`Generating resource: ${resourceName}`)

  // Potential resource types: model, controller, service, repository, dto
  const supportedTypes = ['model', 'controller', 'service', 'repository', 'dto']

  // Interactive prompt for resource type if not specified

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Choose resource type:',
      choices: supportedTypes,
    },
  ])

    // Generate template files based on selected type and architecture
    
  // Copy template files to project directory
  // Log success message
  // Error handling for unsupported resource types
  if (!supportedTypes.includes(answers.type)) {
    throw new Error(`Unsupported resource type: ${answers.type}`)
  }
}
