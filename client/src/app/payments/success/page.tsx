'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { verifyStripeSession } from '@/actions/payment';
import { StripeVerifyResponse } from '@/types';

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const [verificationData, setVerificationData] =
    useState<StripeVerifyResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const courseIdParam = searchParams.get('courseId');

  // Verify session on component mount
  useEffect(() => {
    if (!sessionId) {
      router.push(`/payment/failure?session_id=${sessionId || 'missing'}`);
      return;
    }

    const verifySession = async () => {
      startTransition(async () => {
        try {
          const data = await verifyStripeSession(sessionId);
          setVerificationData(data);
        } catch (err) {
          // console.error('Session verification error:', err);
          router.push(`/payment/failure?session_id=${sessionId}`);
        }
      });
    };

    verifySession();
  }, [sessionId, router]);

  // Countdown timer for auto-redirect
  useEffect(() => {
    // Only start countdown if verification is successful
    if (!verificationData) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [verificationData]);

  // Handle redirect when countdown reaches 0
  useEffect(() => {
    if (countdown === 0 && verificationData) {
      handleRedirect();
    }
  }, [countdown, verificationData]);

  const handleRedirect = () => {
    const targetCourseId = verificationData?.courseId || courseIdParam;
    if (targetCourseId) {
      router.push(`/course/${targetCourseId}`);
    } else {
      router.push('/dashboard'); // Fallback route
    }
  };

  const handleRedirectNow = () => {
    startTransition(() => {
      handleRedirect();
    });
  };

  // Loading state during verification
  if (isPending && !verificationData) {
    return (
      <ScrollArea className='h-screen'>
        <div className='flex h-screen items-center justify-center'>
          <div className='bg-background w-full max-w-xl space-y-6 rounded-lg border p-6 shadow-md'>
            <div className='text-center'>
              <div className='border-primary mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent'></div>
              <h1 className='text-foreground mb-2 text-2xl font-bold'>
                Verifying Payment...
              </h1>
              <p className='text-muted-foreground'>
                Please wait while we confirm your transaction
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    );
  }

  // Success state
  return (
    <ScrollArea className='h-screen'>
      <div className='flex h-screen items-center justify-center'>
        <div className='bg-background w-full max-w-xl space-y-6 rounded-lg border p-6 shadow-md'>
          {/* Header */}
          <div className='text-center'>
            <div className='relative mx-auto mb-4'>
              <div className='absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-emerald-500 opacity-20 dark:opacity-30'></div>
              <CheckCircle className='relative z-10 mx-auto h-16 w-16 text-emerald-500' />
            </div>
            <h1 className='text-foreground mb-2 text-2xl font-bold'>
              Payment Successful!
            </h1>
            <p className='text-muted-foreground'>
              Your payment has been processed successfully
            </p>
          </div>

          {/* Session Info */}
          {sessionId && (
            <div className='bg-muted rounded-lg p-4'>
              <h3 className='text-foreground mb-2 font-semibold'>
                Transaction Details
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

          {/* Info Boxes */}
          <div className='space-y-3'>
            <div className='bg-primary/10 flex items-center gap-3 rounded-lg p-3'>
              <Download className='text-primary h-5 w-5' />
              <div>
                <p className='text-foreground font-medium'>
                  Course Access Granted
                </p>
                <p className='text-muted-foreground text-sm'>
                  You can now access all course materials
                </p>
              </div>
            </div>

            <div className='bg-secondary flex items-center gap-3 rounded-lg p-3'>
              <Mail className='text-secondary-foreground h-5 w-5' />
              <div>
                <p className='text-foreground font-medium'>
                  Confirmation Email Sent
                </p>
                <p className='text-muted-foreground text-sm'>
                  Check your inbox for receipt
                </p>
              </div>
            </div>
          </div>

          {/* Redirect Box */}
          {verificationData && countdown > 0 && (
            <div className='rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-center text-white dark:from-emerald-600 dark:to-emerald-700'>
              <p className='mb-2 font-semibold'>
                Redirecting to your course...
              </p>
              <div className='flex items-center justify-center gap-2'>
                <div className='h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                <span className='text-lg font-bold'>{countdown}s</span>
              </div>
            </div>
          )}

          {/* Button */}
          <Button
            onClick={handleRedirectNow}
            disabled={isPending}
            className='w-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50'
          >
            <ArrowRight className='mr-2 h-4 w-4' />
            {isPending ? 'Redirecting...' : 'Go to Course Now'}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
