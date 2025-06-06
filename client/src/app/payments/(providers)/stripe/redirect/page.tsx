/**
 * This page is used to redirect the user to the Stripe payment page.
 * @returns JSX.Element
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createStripeCheckoutSession } from '@/actions/payment';
import { Loader2, CreditCard, ArrowLeft, ExternalLink } from 'lucide-react';

export default function StripePaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      router.push('/courses');
      return;
    }
  }, [courseId, router]);

  const handleProceedToCheckout = async () => {
    if (!courseId) return;

    setLoading(true);
    setError(null);

    try {
      const checkoutData = await createStripeCheckoutSession(courseId);

      // Redirect to Stripe Checkout
      window.location.href = checkoutData.sessionUrl;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create checkout session'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!courseId) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h2 className='mb-4 text-xl font-semibold'>Invalid Course</h2>
          <Button onClick={() => router.push('/courses')}>
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-950 dark:to-slate-900'>
      <div className='w-full max-w-md space-y-6'>
        {/* Header */}
        <div className='space-y-2 text-center'>
          <div className='bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
            <CreditCard className='text-primary h-6 w-6' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>Secure Payment</h1>
          <p className='text-muted-foreground'>
            You'll be redirected to Stripe's secure checkout
          </p>
        </div>

        {/* Payment Card */}
        <Card className='bg-card/50 border-0 shadow-xl backdrop-blur-sm'>
          <CardHeader className='pb-4 text-center'>
            <CardTitle className='text-xl font-semibold'>
              Complete Your Purchase
            </CardTitle>
            <p className='text-muted-foreground text-sm'>
              Secure payment processing powered by Stripe
            </p>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Features */}
            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-sm'>
                <div className='h-2 w-2 rounded-full bg-green-500'></div>
                <span>256-bit SSL encryption</span>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <div className='h-2 w-2 rounded-full bg-green-500'></div>
                <span>PCI DSS compliant</span>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <div className='h-2 w-2 rounded-full bg-green-500'></div>
                <span>Multiple payment methods</span>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <div className='h-2 w-2 rounded-full bg-green-500'></div>
                <span>Instant course access</span>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className='bg-destructive/10 border-destructive/20 rounded-lg border p-4'>
                <p className='text-destructive text-sm font-medium'>{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className='space-y-3'>
              <Button
                onClick={handleProceedToCheckout}
                disabled={loading}
                className='h-12 w-full text-base font-semibold'
                size='lg'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Creating Checkout...
                  </>
                ) : (
                  <>
                    <ExternalLink className='mr-2 h-4 w-4' />
                    Proceed to Secure Checkout
                  </>
                )}
              </Button>

              <Button
                variant='outline'
                onClick={() => router.push(`/payments?courseId=${courseId}`)}
                className='w-full'
                disabled={loading}
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Payment Methods
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className='border-t pt-4'>
              <p className='text-muted-foreground text-center text-xs'>
                Powered by{' '}
                <span className='text-foreground font-semibold'>Stripe</span> •
                Trusted by millions worldwide
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className='text-center'>
          <p className='text-muted-foreground text-xs'>
            You'll be redirected to Stripe's secure servers to complete your
            payment
          </p>
        </div>
      </div>
    </div>
  );
}
