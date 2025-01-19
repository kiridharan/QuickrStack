# QuickrStack

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)  
[![Open Issues](https://img.shields.io/github/issues/yourusername/backend-builder.svg)](https://github.com/yourusername/backend-builder/issues)

> QuickrStack is an open-source tool that helps you create a backend for your application effortlessly.

## 🚀 Introduction

**QuickrStack** is an open-source tool that helps you create a backend for your application effortlessly. By answering a few simple questions, the tool generates the necessary files and project structure, saving time and streamlining the setup process.

---

## 🌟 Features

- **Interactive Setup**: Answer questions to generate backend files.
- **Customizable Structure**: Easily modify the generated project as needed.
- **Framework Support**: Works with popular backend frameworks like Express.js(Currently).
- **Fast & Lightweight**: Simple and efficient codebase for rapid prototyping.

---

---

## 💻 Commands

The CLI tool comes with several commands to help you manage your projects and generate files.

### Sample Commands

- **`create-project`** - A sample command to create a new project.
  - **alias** : `cp`
- **`generate-api`** - A sample command to generate an APIs. `(Beta)`
  - **alias** : `ga`
  - **notes** : please copy the route to your routes manually
- **`generate-model`** - A sample command to generate a model.
  - **alias** : `gm`
  - notes : please copy only prisma is suported currently.

All commands are located in the `src/commands/` folder. This organization makes it easy to find and modify commands or add new ones as needed.

### Script Commands - Development

This cli comes with several predefined scripts to help with development:

- `pnpm build` - Build the project using `tsup`.
- `pnpm build:watch` - Automatically rebuild the project on file changes.
- `pnpm commit` - run `commitizen` tool for helping with commit messages.
- `pnpm commitlint` - lint commit messages.
- `pnpm compile` - Compile TypeScript files using `tsc`.
- `pnpm clean` - Remove compiled code from the `dist/` directory.
- `pnpm format` - Check files for code style issues using Prettier.
- `pnpm format:fix` - Automatically fix code formatting issues with Prettier.
- `pnpm lint` - Check code for style issues with ESLint.
- `pnpm lint:fix` - Automatically fix code style issues with ESLint.
- `pnpm start [command]` - Run the CLI application using `ts-node`.
- `pnpm start:node [command]` - Run the CLI application from the `dist/` directory.
- `pnpm test` - Run unit tests.
- `pnpm test:watch` - Run tests and watch for file changes.
- **`pnpm run check-version`** - Check the version of the Packages in `dependecy.ts` file.

---

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/kiridharan/quickrstack.git
   ```
2. Navigate to the project directory:
   ```bash
   cd backend-builder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the tool:
   ```bash
   npm start
   ```

---

## 🔧 Usage

1. Run the tool using:
   ```bash
   npm start
   ```
2. Follow the prompts to answer questions about your backend requirements.
3. The tool will generate a backend folder with the necessary files and structure.

---

## 🖋️ Documentation

1. [Understand the code structure ](docs/cli.md)
2. [CLI moto and plan ](docs/templates.md)

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please check out the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

---

## 💌 Contact

Have questions, suggestions, or feedback?

- GitHub: [Kiridharan S](https://github.com/kiridharan)
- LinkedIn: [Kiridharan S](https://www.linkedin.com/in/kiridharans/)

---

## 📣 Acknowledgments

- Special thanks to the open-source community for inspiration and support.

## Note:

This cli is created using base cli-template. [Check it out](https://github.com/kucherenko/cli-typescript-starter)
