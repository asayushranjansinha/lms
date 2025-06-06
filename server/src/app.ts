import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env";
import { appRouter } from "./routes";
import { globalErrorHandler } from "./middlewares/error-handler.middleware";

// Create Express App
const app = express();

const allowedOrigins = [
  config.CLIENT_URL,
  config.CLIENT_URL_1,
  config.CLIENT_URL_2,
];

// Attach middleware and routes
async function initializeMiddlewareAndRoutes() {
  // CORS must be the first middleware
  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, curl requests)
        if (!origin) {
          return callback(null, true);
        }

        // Check if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
          return callback(null, true);
        }

        // Log the rejected origin for debugging
        console.log("CORS rejected origin:", origin);
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
        "Cache-Control",
        "X-Access-Token",
      ],
      optionsSuccessStatus: 200, // For legacy browser support
    })
  );

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      message: "Too many requests, please try again later.",
      headers: true,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cookieParser());

  // Security middleware
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    })
  );

  // Logging
  app.use(morgan("combined"));

  // Static files
  app.use("/uploads", express.static("uploads"));

  // Health check endpoint
  app.get("/", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
  });

  // Attach routes
  app.use(`${config.API_PREFIX}`, appRouter);

  // Global error handler (must be last)
  app.use(globalErrorHandler);
}

initializeMiddlewareAndRoutes();

export { app };
