import FormCardSkeleton from '@/components/form-card-skeleton';
import DashboardPageContainer from '@/components/layout/DashboardPageContainer';
import { Suspense } from 'react';
import ProductViewPage from '@/features/admin-dashboard/products/components/product-view-page';

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
