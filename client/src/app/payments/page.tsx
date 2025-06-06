/**
 * This page shows all the payment methods available for the user to select.
 * @returns JSX.Element
 */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Smartphone, Wallet, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock payment gateways data - replace with your actual data source
const paymentGateways = [
  {
    id: "phonepe",
    name: "PhonePe",
    description: "Pay securely using PhonePe wallet or UPI",
    icon: <Smartphone className="w-8 h-8 text-purple-600" />,
    enabled: true,
    fees: "No additional fees"
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Pay with cards, UPI, wallets & more",
    icon: <CreditCard className="w-8 h-8 text-blue-600" />,
    enabled: true,
    fees: "2.5% processing fee"
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "International payments with cards",
    icon: <Wallet className="w-8 h-8 text-indigo-600" />,
    enabled: true,
    fees: "2.9% + ₹2 per transaction"
  },
  {
    id: "paytm",
    name: "Paytm",
    description: "Pay using Paytm wallet or UPI",
    icon: <Smartphone className="w-8 h-8 text-blue-500" />,
    enabled: false,
    fees: "Coming Soon"
  }
];

export default function PaymentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [courseId, setCourseId] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const id = searchParams.get('courseId');
    setCourseId(id);
    
    if (!id) {
      // Redirect back if no courseId is provided
      router.push('/courses');
    }
  }, [searchParams, router]);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleProceedToPayment = async () => {
    if (!selectedProvider || !courseId) return;
    
    setLoading(true);
    
    try {
      // Navigate to provider-specific payment page with courseId
      router.push(`/payments/${selectedProvider}/redirect?courseId=${courseId}`);
    } catch (error) {
      console.error("Payment navigation error:", error);
      setLoading(false);
    }
  };

  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Invalid Course</h2>
          <p className="text-gray-600 mb-4">No course selected for enrollment.</p>
          <Button onClick={() => router.push('/courses')}>
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className='h-screen'>
      <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
        <div className='container mx-auto px-4 py-12'>
          {/* Header */}
          <div className='mb-12 text-center'>
            <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
              Choose Payment Method
            </h1>
            <p className='mb-2 text-lg text-gray-600 dark:text-gray-300'>
              Select your preferred payment provider to complete enrollment
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Course ID:{' '}
              <span className='rounded bg-gray-200 px-2 py-1 font-mono dark:bg-gray-700'>
                {courseId}
              </span>
            </p>
          </div>

          {/* Payment Providers Grid */}
          <div className='mx-auto max-w-4xl'>
            <div className='mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
              {paymentGateways.map((gateway) => (
                <Card
                  key={gateway.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedProvider === gateway.id
                      ? 'border-blue-500 shadow-lg ring-2 ring-blue-500'
                      : 'hover:border-gray-300'
                  } ${!gateway.enabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  onClick={() =>
                    gateway.enabled && handleProviderSelect(gateway.id)
                  }
                >
                  <CardHeader className='pb-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-3'>
                        {gateway.icon}
                        <div>
                          <CardTitle className='text-xl'>
                            {gateway.name}
                          </CardTitle>
                          <CardDescription className='mt-1 text-sm'>
                            {gateway.description}
                          </CardDescription>
                        </div>
                      </div>
                      {selectedProvider === gateway.id && (
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500'>
                          <div className='h-2 w-2 rounded-full bg-white'></div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-gray-500'>
                        {gateway.fees}
                      </span>
                      {gateway.enabled && (
                        <ArrowRight className='h-4 w-4 text-gray-400' />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Proceed Button */}
            <div className='text-center'>
              <Button
                onClick={handleProceedToPayment}
                disabled={!selectedProvider || loading}
                size='lg'
                className='px-8 py-3 text-lg'
              >
                {loading ? (
                  <>
                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </>
                )}
              </Button>

              {selectedProvider && (
                <p className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
                  You selected:{' '}
                  <span className='font-semibold'>
                    {
                      paymentGateways.find((g) => g.id === selectedProvider)
                        ?.name
                    }
                  </span>
                </p>
              )}
            </div>

            {/* Back to Courses */}
            <div className='mt-8 text-center'>
              <Button
                variant='outline'
                onClick={() => router.push('/courses')}
                className='text-gray-600'
              >
                ← Back to Courses
              </Button>
            </div>
          </div>

          {/* Security Notice */}
          <div className='mx-auto mt-12 max-w-2xl rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
            <div className='flex items-start space-x-3'>
              <div className='flex-shrink-0'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
                  <svg
                    className='h-4 w-4 text-green-600 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
                  Secure Payment
                </h3>
                <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
                  Your payment information is encrypted and secure. We never
                  store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ScrollArea>
  );
}