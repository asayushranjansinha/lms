import { Request } from "express";

interface User {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User | undefined;
      startTime?: number;
    }
  }
}

// This export statement is crucial for module augmentation
export {};
