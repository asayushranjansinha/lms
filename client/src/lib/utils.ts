import { CourseModule } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString("en-IN")}`;
};

export const formatCategory = (category: string): string => {
  return category.replace("-", " ");
};


/**
 * URL Helper Function
 */
export const getLectureUrl = (lesson: CourseModule['lectures'][0]): string => {
  const urlMap = {
    video: lesson.videoUrl,
    document: lesson.documentUrl,
    assignment: lesson.assignmentUrl
  };
  return urlMap[lesson.type as keyof typeof urlMap] || lesson.videoUrl || '';
};

export /**
 * Type Badge Component
 */
const getTypeBadgeStyles = (type: string) => {
  const styleMap = {
    video:
      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800/50',
    document:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/50',
    assignment:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/50'
  };
  return (
    styleMap[type as keyof typeof styleMap] ||
    'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/50 dark:text-slate-300 dark:border-slate-800/50'
  );
};