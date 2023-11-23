# Express JWT Authentication

NodeJS Express with JWT Authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Create .env file that contains your database setting such as hostname, username, password, database name, and secret key for authentication purpose.

```
NODE_ENV=development

# Database Config
DB_DATABASE = test-db
DB_HOST = localhost
DB_USER = postgres
DB_PASSWORD = 123

# Server Config
SERVER_ADDRESS = localhost
SERVER_PORT = 8000
CORS_PORT = 8082
SECRET_KEY = this-is-secret-key
```

### Installing

Clone this repository then run

```
npm install
npm install --save-dev
```

After all packages installed, place the .env files on this app folder. The directory should be like this

```
├── .env
├── package-lock.json
├── package.json
├── node_modules
└── src
    ├── config
    ├── controllers
    ├── middleware
    ├── migrations
    ├── models
    ├── routes
    ├── seeders
    └── server.js
```

## Running the program

Create the database first, then run migrations

```
npm run db-init
```

Run the server

```
npm run dev # for development
npm run start # for production
```

## Access Documentation

This application documentation can be accesed through:

[http://localhost:8000/docs](http://localhost:8000/docs/)

## Built With

- [Express](https://expressjs.com/) - Node JS Framework used to create API
- [Sequelize](https://sequelize.org/) - ORM (Object Relational Mapping)
- [Swagger](https://swagger.io/) - Used to create application documentation
