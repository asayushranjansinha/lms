import mongoose from "mongoose";
import { logger } from "./logger";
import { NODE_ENV, MONGODB_URI } from "./env";

/**
 * Function to connect to MongoDB
 */
export const connectToDatabase = async () => {
  // Check for already connected database
  if (await isConnectedToDatabase()) {
    logger.info(`MongoDB is already connected: ${NODE_ENV} - database`);
    return;
  }

  try {
    logger.info(`Connecting to MongoDB: ${NODE_ENV} - database`);
    await mongoose.connect(MONGODB_URI);
    logger.info(`✅ Connected to MongoDB: ${NODE_ENV} - database`);
  } catch (error) {
    logger.error(`❌ Failed to connect to MongoDB: ${NODE_ENV} - database`);
    throw error;
  }
};

/**
 * Function to disconnect from MongoDB
 */
export const disconnectFromDatabase = async () => {
  // Check for not connected database
  if (!(await isConnectedToDatabase())) {
    logger.info(`MongoDB is not connected: ${NODE_ENV} - database`);
    return;
  }

  try {
    logger.info(`Disconnecting from MongoDB: ${NODE_ENV} - database`);
    await mongoose.disconnect();
    logger.info(`✅ Disconnected from MongoDB: ${NODE_ENV} - database`);
  } catch (error) {
    logger.error(
      `❌ Failed to disconnect from MongoDB: ${NODE_ENV} - database`
    );
    throw error;
  }
};

/**
 * Function to check if MongoDB is connected
 */
const isConnectedToDatabase = async () => {
  try {
    const db = mongoose.connection;
    if (db.readyState === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.error(
      `Failed to check if MongoDB is connected: ${NODE_ENV} - database`
    );
    throw error;
  }
};
