import { PORT, NODE_ENV } from "@/config/env";
import { app } from "./app";
import { logger } from "./config/logger";
import { connectToDatabase, disconnectFromDatabase } from "./config/database";

// Start Server
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
      logger.info(`Server Started in ${NODE_ENV} mode`);
    });
  } catch (error) {
    await disconnectFromDatabase();
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  disconnectFromDatabase();
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  disconnectFromDatabase();
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  disconnectFromDatabase();
  logger.info("👋 SIGTERM RECEIVED. Shutting down gracefully");
  process.exit(0);
});

startServer();
