
import DashboardPageContainer from '@/components/layout/DashboardPageContainer';
import { Suspense } from 'react';
import ProductViewPage from '@/features/admin-dashboard/products/components/product-view-page';
import FormCardSkeleton from '@/components/admin-dashboard/form-card-skeleton';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = { params: Promise<{ productId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <DashboardPageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={params.productId} />
        </Suspense>
      </div>
    </DashboardPageContainer>
  );
}
