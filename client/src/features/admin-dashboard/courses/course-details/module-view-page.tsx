/**
 * Packages & Libraries
 */
import { notFound } from 'next/navigation';

/**
 * Components & Utils
 */
import { Skeleton } from '@/components/ui/skeleton';
import ModuleForm from './module-form';

/**
 * Types & Api
 */
import { getModuleDetails } from '@/actions/courses';

type TModuleViewProps = {
  courseId: string;
  moduleId: string;
};

export default async function ModuleViewPage({
  courseId,
  moduleId
}: TModuleViewProps) {
  // eslint-disable-next-line @next/next/no-assign-module-variable
  let module = null;
  let pageTitle = 'Add New Module';

  if (moduleId !== 'new') {
    try {
      module = await getModuleDetails(courseId, moduleId);
      pageTitle = 'Edit Module';
    } catch (err) {
      notFound();
    }
  }
  return (
    <ModuleForm
      initialData={module}
      pageTitle={pageTitle}
      courseId={courseId}
    />
  );
}

function ModuleViewSkeleton() {
  return (
    <div className='w-full'>
      <div className='mb-6'>
        <Skeleton className='h-8 w-1/3' />
      </div>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>

      <div className='mb-4 flex items-center justify-between'>
        <Skeleton className='h-6 w-24' />
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Simulate 2 lecture blocks */}
      {[1, 2].map((_, index) => (
        <div
          key={index}
          className='bg-muted/20 mb-6 space-y-4 rounded-lg border p-6'
        >
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-8 w-20' />
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>

          <Skeleton className='h-10 w-[200px]' />
          <Skeleton className='h-10 w-full' />
        </div>
      ))}

      <div className='flex justify-end gap-3 pt-4'>
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-32' />
      </div>
    </div>
  );
}

ModuleViewPage.Skeleton = ModuleViewSkeleton;
