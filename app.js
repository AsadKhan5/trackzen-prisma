// Importing necessary packages and middlewares
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

// Import database configuration
const { connectDatabase, disconnectDatabase } = require("./config/database");

// Import routes
const adminRoutes = require("./routes/adminRoutes");

// Import custom error handling middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
// Import middleware to handle 404 (Not Found) errors
const notFoundMiddleware = require("./middleware/not-found");

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001"
];

// CORS Middleware Options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use Helmet to set secure HTTP headers
app.use(helmet());

// Enable CORS for all routes
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests
app.options("*", cors(corsOptions));

// Fallback middleware for manual headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Enable CORS with the options
app.use(express.json({ limit: "5mb" }));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "TrackZen Backend is running",
    timestamp: new Date().toISOString()
  });
});

// Use the user routes for the specified paths
app.use("/trackzen/admin", adminRoutes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// Start server with database connection
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(port, () => {
      console.log(`🚀 Server is listening at http://localhost:${port}`);
      console.log(`📊 Health check: http://localhost:${port}/health`);
      console.log(`🗄️  Database connected successfully`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received');
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received');
  await disconnectDatabase();
  process.exit(0);
});

startServer();
