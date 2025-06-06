import { NODE_ENV } from "@/config/env";
import winston from "winston";

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length
      ? `\n${JSON.stringify(meta, null, 2)}`
      : "";
    return `${timestamp} [${level}]: ${message}${metaStr}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format: logFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  new winston.transports.File({
    filename: "logs/combined.log",
    format: logFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
];

if (NODE_ENV === "development") {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: "debug",
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "info",
    })
  );
}

export const logger = winston.createLogger({
  level: NODE_ENV === "development" ? "debug" : "info",
  format: logFormat,
  defaultMeta: { service: "backend-api" },
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

// Create logs directory if it doesn't exist
import { existsSync, mkdirSync } from "fs";
import { config } from "./env";
if (!existsSync("logs")) {
  mkdirSync("logs");
}
