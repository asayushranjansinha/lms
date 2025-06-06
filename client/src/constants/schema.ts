import { CourseLectureType } from '@/types';
import * as z from 'zod';

export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export const courseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  subtitle: z.string().min(5, 'Subtitle must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
  level: z.nativeEnum(CourseLevel),
  price: z.coerce.number().min(0, 'Price must be 0 or greater'),
  isPublished: z.boolean()
});
export type CourseFormSchema = z.infer<typeof courseSchema>;

export const lectureSchema = z
  .object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    duration: z.string().min(3, 'Duration must be at least 3 characters'),
    type: z.nativeEnum(CourseLectureType),
    videoUrl: z.string().optional().or(z.literal('')),
    documentUrl: z.string().optional().or(z.literal('')),
    assignmentUrl: z.string().optional().or(z.literal(''))
  })
  .superRefine((lecture, ctx) => {
    const validateUrl = (url: string | undefined, fieldName: string) => {
      if (url && url.trim() !== '') {
        try {
          new URL(url);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid URL format',
            path: [fieldName]
          });
        }
      }
    };

    validateUrl(lecture.videoUrl, 'videoUrl');
    validateUrl(lecture.documentUrl, 'documentUrl');
    validateUrl(lecture.assignmentUrl, 'assignmentUrl');

    // Check required URLs based on lecture type
    if (
      lecture.type === CourseLectureType.Video &&
      (!lecture.videoUrl || lecture.videoUrl.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Video URL is required for video type',
        path: ['videoUrl']
      });
    }

    if (
      lecture.type === CourseLectureType.Document &&
      (!lecture.documentUrl || lecture.documentUrl.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Document URL is required for document type',
        path: ['documentUrl']
      });
    }

    if (
      lecture.type === CourseLectureType.Assignment &&
      (!lecture.assignmentUrl || lecture.assignmentUrl.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Assignment URL is required for assignment type',
        path: ['assignmentUrl']
      });
    }
  });

export const moduleSchema = z.object({
  courseId: z.string({ required_error: 'Course ID is required' }),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  duration: z.string().min(3, 'Duration must be at least 3 characters'),
  lectures: z.array(lectureSchema).optional()
});

export type ModuleFormSchema = z.infer<typeof moduleSchema>;

// Login Schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean()
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const SignupSchema = z
  .object({
    name: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, 'You must agree to the terms')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export type SignupFormData = z.infer<typeof SignupSchema>;

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(
    (file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
    { message: 'Invalid image file type' }
  );

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z.string().email('Invalid email address'),

  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),

  website: z.string().url('Invalid URL').optional().or(z.literal('')),

  location: z.string().optional(),

  gender: z.enum(["male", "female", "other"]).optional(),

  phoneNumber: z.string().optional(),

  profilePicture: IMAGE_SCHEMA.optional()
});

export type ProfileFormData = z.infer<typeof profileSchema>;
