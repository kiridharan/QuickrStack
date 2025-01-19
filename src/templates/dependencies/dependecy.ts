// templates/dependencies/versions.ts
export const dependencies = {
  base: {
    // Core dependencies with latest stable versions
    express: '^4.18.2',
    '@types/express': '^4.17.21',
    dotenv: '^16.3.1',
    cors: '^2.8.5',
    '@types/cors': '^2.8.17',
    winston: '^3.11.0',
    'class-validator': '^0.14.0',
    'class-transformer': '^0.5.1',
    compression: '^1.7.4',
    '@types/compression': '^1.7.5',
    'express-rate-limit': '^7.1.5',
    morgan: '^1.10.0',
    '@types/morgan': '^1.9.9',
    jsonwebtoken: '^9.0.2',
    '@types/jsonwebtoken': '^9.0.5',
    bcryptjs: '^2.4.3',
    '@types/bcryptjs': '^2.4.6',
  },
  dev: {
    // Development dependencies
    typescript: '^5.3.2',
    '@types/node': '^20.10.3',
    'ts-node': '^10.9.1',
    'ts-node-dev': '^2.0.0',
    nodemon: '^3.0.2',
    eslint: '^8.55.0',
    '@typescript-eslint/parser': '^6.13.2',
    '@typescript-eslint/eslint-plugin': '^6.13.2',
    prettier: '^3.1.0',
    jest: '^29.7.0',
    '@types/jest': '^29.5.10',
    'ts-jest': '^29.1.1',
  },
  orms: {
    prisma: {
      dependencies: {
        '@prisma/client': '^5.6.0',
      },
      devDependencies: {
        prisma: '^5.6.0',
      },
    },
    typeorm: {
      dependencies: {
        typeorm: '^0.3.17',
        'reflect-metadata': '^0.1.13',
      },
      devDependencies: {},
    },
    sequelize: {
      dependencies: {
        sequelize: '^6.35.1',
        'sequelize-typescript': '^2.1.6',
      },
      devDependencies: {
        '@types/validator': '^13.11.7',
      },
    },
  },
  databases: {
    postgres: {
      dependencies: {
        pg: '^8.11.3',
        'pg-hstore': '^2.3.4',
      },
      devDependencies: {
        '@types/pg': '^8.10.9',
      },
    },
    mysql: {
      dependencies: {
        mysql2: '^3.6.5',
      },
      devDependencies: {},
    },
    sqlite: {
      dependencies: {
        sqlite3: '^5.1.6',
      },
      devDependencies: {},
    },
  },
}
