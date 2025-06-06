import { Icons } from '@/components/common/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

/**
 * Types for the Courses Management
 */

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  profilePicture?: string;
  rating: number;
  students: number;
  courses: number;
  expertise: string[];
}

/**
 * Course related types
 */

export interface SearchCourseResult {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  price: number;
  createdAt: Date;
  duration: string;
  thumbnail?: string;

  rating: number;
  enrolledStudents: number; // count only
  reviews: number; // count only

  createdBy: {
    _id: string;
    name: string;
    profilePicture: string;
  };
}

export interface CourseDetail {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  price: number;
  isPublished: boolean;
  duration: string;
  rating: number;
  thumbnail?: string;
  createdAt: Date;

  isEnrolled: boolean;
  enrolledStudents: number;

  createdBy: CreatedBy;

  modules: CourseModule[];

  reviews: UserReview[];
}

export interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  price: number;
  isPublished: boolean;
  isEnrolled: boolean;
  createdAt: Date;

  duration: string;
  rating: number;
  reviews: UserReview[];
  enrolledStudents: number;
  thumbnail?: string;
  createdBy: Instructor;
  modules: CourseModule[];
}

export enum CourseLectureType {
  Video = 'video',
  Document = 'document',
  Assignment = 'assignment'
}

export interface CreatedBy {
  _id: string;
  name: string;
  profilePicture?: string;
  bio?: string;
  website?: string;
  location?: string;
}
export interface CourseModule {
  _id: string;
  courseId?: string;
  title: string;
  duration: string;
  lectures: {
    _id: string;
    title: string;
    duration: string;
    type: CourseLectureType;
    videoUrl?: string;
    documentUrl?: string;
    assignmentUrl?: string;
  }[];
}

export type PaymentProvider = 'stripe' | 'phonepe' | 'razorpay';

export interface PaymentInitRequest {
  courseId: string;
  provider: PaymentProvider;
  amount?: number; // Optional if backend calculates from courseId
}

export interface StripeCheckoutResponse {
  sessionId: string;
  sessionUrl: string;
  paymentId: string;
}

export interface StripeVerifyResponse {
  paymentId: string;
  status: string;
  courseId: string;
  sessionId: string;
}

// export interface PaymentInitResponse {
//   provider: PaymentProvider;
//   stripe?: StripePaymentResponse;
//   // Add other provider response types later
//   phonepe?: any;
//   razorpay?: any;
// }

/**
 * Reviews
 */

export interface UserReview {
  _id: string;
  user: {
    name: string;
    bio: string;
    profilePicture: string;
  };
  rating: number;
  review: string;
  createdAt: string;
}

/**
 * Api Response
 */

export type ApiResponse<T> = {
  status: 'success' | 'error';
  error: string | null;
  data: T | null;
};

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Auth
 */
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}
