/**
 * Packages & Libraries
 */
import { Suspense } from 'react';

/**
 * Components & Utilities
 */
import DashboardPageContainer from '@/components/layout/DashboardPageContainer';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ProfileViewPage from '@/features/admin-dashboard/profile/components/profile-view-page';

export const metadata = {
  title: 'Dashboard : Profile View'
};

export default async function Page() {
  return (
    <DashboardPageContainer scrollable>
      <div className='flex w-full flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Profile' description='Manage your profile' />
        </div>
        <Separator />
        <Suspense fallback={<ProfileViewPage.Skeleton />}>
          <ProfileViewPage />
        </Suspense>
      </div>
    </DashboardPageContainer>
  );
}
