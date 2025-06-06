/**
 * Packages & Libraries
 */
import { Suspense } from 'react';

/**
 * Components & Utilities
 */
import DashboardPageContainer from '@/components/layout/DashboardPageContainer';
import { CourseSyllabus } from '@/features/admin-dashboard/courses/course-details/course-syllabus';
import CourseViewPage from '@/features/admin-dashboard/courses/courses-view-page';

export const metadata = {
  title: 'Dashboard : Module View'
};

type PageProps = { params: Promise<{ slug: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <DashboardPageContainer scrollable>
      <div className='flex-1 space-y-4'>
        {/* Course Form & Details */}
        <Suspense fallback={<CourseViewPage.Skeleton />}>
          <CourseViewPage courseId={params.slug} />
        </Suspense>

        {/* Course Syllabus */}
        {params.slug !== 'new' && (
          <Suspense fallback={<CourseSyllabus.Skeleton />}>
            <CourseSyllabus courseId={params.slug} />
          </Suspense>
        )}
      </div>
    </DashboardPageContainer>
  );
}
