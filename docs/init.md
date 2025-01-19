# No-Code Backend CLI Setup

## Introduction

This CLI tool is designed to help users create a no-code backend for their applications. It asks users a series of questions to gather the necessary configurations, such as which ORM (Object-Relational Mapping) system to use, which database to connect to, and which common tables and endpoints to include. Based on the user's input, the tool generates a basic API setup, including database connections, common endpoints, and CRUD operations for the specified tables.

## Features

- **ORM Selection**: Choose from popular ORM tools such as Sequelize, TypeORM, or Prisma.
- **Database Configuration**: Configure a connection to databases like MySQL, PostgreSQL, or MongoDB.
- **API Generation**: Generate basic API endpoints and controllers for common resources such as products, users, and orders.
- **Table Setup**: Create common tables such as `products`, `users`, `orders`, etc.

## Requirements

Before using the CLI tool, make sure you have the following installed:

- **Node.js**: Ensure that Node.js (version 14.x or higher) is installed.
- **npm**: Node Package Manager should be installed along with Node.js.
- **CLI Tool**: This CLI tool can be installed globally or locally using npm.

## Installation

To install the CLI tool, run the following command:

```bash
npm install -g no-code-backend-cli
```

If you want to install it locally in your project, run:

```bash
npm install --save-dev no-code-backend-cli
```

## Usage

To start the setup process, run the following command in your terminal:

```bash
ncb-cli init
```

The tool will guide you through the following questions:

### 1. Choose an ORM

Select the ORM you want to use for your backend.

- **Sequelize**: Works with SQL databases like PostgreSQL, MySQL, MariaDB, and SQLite.
- **TypeORM**: Supports SQL and NoSQL databases like MySQL, PostgreSQL, SQLite, MongoDB, and more.
- **Prisma**: A modern ORM for Node.js and TypeScript, primarily focusing on relational databases.

**Example Prompt:**

```
Which ORM would you like to use?
1. Sequelize
2. TypeORM
3. Prisma
Please enter your choice (1/2/3): 2
```

### 2. Choose a Database

Select the database for your backend application.

- **MySQL**
- **PostgreSQL**
- **MongoDB**

**Example Prompt:**

```
Which database would you like to use?
1. MySQL
2. PostgreSQL
3. MongoDB
Please enter your choice (1/2/3): 1
```

### 3. Define Common Tables

Define which common tables your application needs. For an platform, the following are the common tables that you can include:

- **Users**: Stores user details.
- **Products**: Stores product information.
- **Orders**: Stores customer orders.
- **Categories**: Organizes products into categories.
- **Payments**: Stores payment details for orders.

**Example Prompt:**

```
Which tables do you need?
1. Users
2. Products
3. Orders
4. Categories
5. Payments
Please select the tables (comma separated, e.g., 1,2,3): 1,2,3
```

### 4. Define Common Endpoints

Select the common API endpoints you want to generate for each table. These usually include:

- **GET**: Retrieve all records or a specific record.
- **POST**: Create a new record.
- **PUT**: Update an existing record.
- **DELETE**: Delete a record.

**Example Prompt:**

```
Which endpoints would you like to generate?
1. GET (Retrieve data)
2. POST (Create data)
3. PUT (Update data)
4. DELETE (Delete data)
Please select the endpoints (comma separated, e.g., 1,2,3): 1,2,3
```

### 5. Generate the API

After collecting the necessary configurations, the tool will generate the following files:

- **Database Connection Setup**: A configuration file that connects to your chosen database.
- **Models**: Sequelize/TypeORM/Prisma models for the selected tables.
- **Controllers**: CRUD operations for the generated tables.
- **Routes**: API routes for the common endpoints you selected.
- **Environment Variables**: Configuration for database credentials, port, and other settings.

Run the following command to generate the API:

```bash
ncb-cli generate
```

This will create the files and structure needed for your backend.

---

## Example Output

Here's an example of the generated files:

```
src/
  controllers/
    userController.js
    productController.js
  models/
    userModel.js
    productModel.js
  routes/
    userRoutes.js
    productRoutes.js
  config/
    database.js
.env
```
