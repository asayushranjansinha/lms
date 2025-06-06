/**
 * Packages & Libraries
 */
import { Suspense } from 'react';

/**
 * Components & Utilities
 */
import DashboardPageContainer from '@/components/layout/DashboardPageContainer';
import ModuleViewPage from '@/features/admin-dashboard/courses/course-details/module-view-page';

export const metadata = {
  title: 'Dashboard : Course View'
};

type PageProps = { params: Promise<{ slug: string; courseId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <DashboardPageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<ModuleViewPage.Skeleton />}>
          <ModuleViewPage courseId={params.courseId} moduleId={params.slug} />
        </Suspense>
      </div>
    </DashboardPageContainer>
  );
}
