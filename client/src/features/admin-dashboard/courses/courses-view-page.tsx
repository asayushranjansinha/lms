/**
 * Packages & Libraries
 */
import { notFound } from 'next/navigation';

/**
 * Components & Utilities
 */
import { fetchCourseDetails } from '@/actions/courses';
import { Skeleton } from '@/components/ui/skeleton';
import CourseForm from './courses-form';

type TCourseViewProps = {
  courseId: string;
};

export default async function CourseViewPage({ courseId }: TCourseViewProps) {
  let course = null;
  let pageTitle = 'Create New Course';

  if (courseId !== 'new') {
    try {
      course = await fetchCourseDetails(courseId);
      pageTitle = 'Edit Course';
    } catch (err) {
      notFound();
    }
  }

  return <CourseForm initialData={course} pageTitle={pageTitle} />;
}

function CourseFormSkeleton() {
  return (
    <div className='mx-auto w-full'>
      <div className='space-y-8 p-6'>
        {/* Header */}
        <div className='space-y-2'>
          <Skeleton className='h-8 w-1/3' />
          <Skeleton className='h-4 w-1/2' />
        </div>

        {/* Form Fields */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Title */}
          <div className='space-y-2'>
            <Skeleton className='h-5 w-1/4' />
            <Skeleton className='h-10 w-full' />
          </div>

          {/* Subtitle */}
          <div className='space-y-2'>
            <Skeleton className='h-5 w-1/4' />
            <Skeleton className='h-10 w-full' />
          </div>

          {/* Price */}
          <div className='space-y-2'>
            <Skeleton className='h-5 w-1/4' />
            <Skeleton className='h-10 w-full' />
          </div>

          {/* Category and Level */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-1/3' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-1/3' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='space-y-2'>
          <Skeleton className='h-5 w-1/4' />
          <Skeleton className='h-32 w-full' />
        </div>

        {/* Published */}
        <div className='mt-8 space-y-2'>
          <Skeleton className='h-5 w-1/4' />
          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <div className='space-y-0.5'>
              <Skeleton className='h-4 w-24' /> {/* Label skeleton */}
              <Skeleton className='h-3 w-48' /> {/* Description skeleton */}
            </div>
            <Skeleton className='h-6 w-11 rounded-full' />{' '}
            {/* Switch skeleton */}
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <Skeleton className='h-10 w-32' />
        </div>
      </div>
    </div>
  );
}

CourseViewPage.Skeleton = CourseFormSkeleton;
