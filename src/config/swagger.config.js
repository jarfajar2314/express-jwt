const swaggerJSDoc = require("swagger-jsdoc");
const packageInfo = require("../../package.json");

const address = process.env.SERVER_ADDRESS || "localhost";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express JWT API",
    version: packageInfo.version,
    description: "Documentation for API using Express with JWT Authentication",
  },
  servers: [
    {
      url: `http://${address}:${process.env.SERVER_PORT}`,
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routes/*.js"],
};

exports.swaggerSpec = swaggerJSDoc(options);
