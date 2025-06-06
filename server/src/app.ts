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
  // Attach middleware
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      message: "Too many requests, please try again later.",
      headers: true,
    })
  );
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("dev"));

  app.use("/uploads", express.static("uploads"));

  // Attach routes
  app.use(`${config.API_PREFIX}`, appRouter);

  // Global error handler
  app.use(globalErrorHandler);
}

initializeMiddlewareAndRoutes();

export { app };
