import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env.local') });


interface Config {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  API_VERSION: string;
  API_PREFIX:string;

  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string | number;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRE: string | number;

  // Client
  CLIENT_URL: string;

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;

  // File Upload
  MAX_FILE_SIZE: number;
  MAX_FILES_PER_REQUEST: number;

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;

  // Terms of Service
  TERMS_VERSION: string;


  // Stripe
  STRIPE_SECRET_KEY: string;
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
}

const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  'STRIPE_SECRET_KEY',
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET'
] as const;

// Validate required environment variables
const validateEnv = (): void => {
  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        "Please check your .env file and ensure all required variables are set."
    );
  }
};

// Validate environment variables
validateEnv();

export const config: Config = {
  // Server Configuration
  NODE_ENV: process.env.NODE_ENV as Config["NODE_ENV"],
  PORT: parseInt(process.env.PORT || "8000", 10),
  API_VERSION: process.env.API_VERSION || "v1",
  API_PREFIX: process.env.API_PREFIX!,

  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI!,

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || "30d",

  // Client Configuration
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(
    process.env.RATE_LIMIT_WINDOW_MS || "900000",
    10
  ), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(
    process.env.RATE_LIMIT_MAX_REQUESTS || "100",
    10
  ),

  // File Upload Configuration
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || "10485760", 10), // 10MB
  MAX_FILES_PER_REQUEST: parseInt(process.env.MAX_FILES_PER_REQUEST || "5", 10),
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,

  // Terms of Service
  TERMS_VERSION: process.env.TERMS_VERSION || "1.0.0",

  // Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY!,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
};

// Export individual configurations for convenience
export const {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  CLIENT_URL,
  API_PREFIX,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = config;
