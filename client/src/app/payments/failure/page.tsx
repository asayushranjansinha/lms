'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PaymentFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // Optional: Auto-redirect after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/courses'); // Or wherever you want
    }, 8000);

    return () => clearTimeout(timeout);
  }, [router]);

  const handleBackToCourses = () => {
    router.push('/courses');
  };

  return (
    <ScrollArea className='h-screen'>
      <div className='flex h-screen items-center justify-center'>
        <div className='bg-background w-full max-w-xl space-y-6 rounded-lg border p-6 shadow-md'>
          {/* Header */}
          <div className='text-center'>
            <div className='relative mx-auto mb-4'>
              <div className='absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-destructive opacity-20 dark:opacity-30'></div>
              <AlertCircle className='relative z-10 mx-auto h-16 w-16 text-destructive' />
            </div>
            <h1 className='text-foreground mb-2 text-2xl font-bold'>
              Payment Failed
            </h1>
            <p className='text-muted-foreground'>
              Unfortunately, your transaction could not be completed.
            </p>
          </div>

          {/* Session Info */}
          {sessionId && (
            <div className='bg-muted rounded-lg p-4'>
              <h3 className='text-foreground mb-2 font-semibold'>
                Session Info
              </h3>
              <div className='text-muted-foreground space-y-2 text-sm'>
                <div>
                  <p className='mb-1'>Session ID:</p>
                  <code className='bg-background rounded px-2 py-1 font-mono text-xs break-all'>
                    {sessionId}
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className='bg-destructive/10 flex items-center gap-3 rounded-lg p-3'>
            <AlertCircle className='text-destructive h-5 w-5' />
            <div>
              <p className='text-foreground font-medium'>
                Transaction Unsuccessful
              </p>
              <p className='text-muted-foreground text-sm'>
                You have not been charged. Please try again or use another payment method.
              </p>
            </div>
          </div>

          {/* Button */}
          <Button
            onClick={handleBackToCourses}
            className='w-full bg-destructive text-white hover:bg-red-600'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Courses
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
