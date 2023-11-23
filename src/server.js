require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./models");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config").swaggerSpec;

const app = express();

const corsPORT = process.env.CORS_PORT || 8081;
let corsOptions = {
  origin: `http://localhost:${corsPORT}`,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Swagger setup
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
require("./routes/user.route.js")(app);

const startServer = async () => {
  try {
    await initializeDatabase();

    // Start server
    const PORT = process.env.SERVER_PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error(
      "Server failed to start due to database initialization error:",
      error.message
    );
  }
};

startServer();
