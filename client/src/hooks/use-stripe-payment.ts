// hooks/useStripePayment.ts
import { stripePromise } from '@/lib/stripe';
import { StripePaymentResponse } from '@/types';
import { useState } from 'react';

export function useStripePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (paymentData: StripePaymentResponse) => {
    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Redirect to Stripe Checkout or use Elements
      // Option 1: Redirect to Stripe hosted checkout (simpler)
      const { error } = await stripe.redirectToCheckout({
        sessionId: paymentData.paymentIntentId // If you're using checkout sessions
      });

      // Option 2: Use Stripe Elements (more customizable)
      // You would render Elements component and handle payment there

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processPayment,
    isLoading,
    error
  };
}
