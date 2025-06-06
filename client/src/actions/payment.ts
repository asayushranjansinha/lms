import { apiMutation } from '@/lib/api';
import { StripeCheckoutResponse, StripeVerifyResponse } from '@/types';

// export async function initializePayment(request: PaymentInitRequest) {
//   const { provider, courseId, amount } = request;

//   switch (provider) {
//     case 'stripe':
//       return await initializeStripePayment({ courseId, amount });

//     case 'phonepe':
//       // Will implement later
//       throw new Error('PhonePe integration coming soon');

//     case 'razorpay':
//       // Will implement later
//       throw new Error('Razorpay integration coming soon');

//     default:
//       throw new Error(`Unsupported payment provider: ${provider}`);
//   }
// }

export async function createStripeCheckoutSession(courseId: string) {
  const response = await apiMutation<StripeCheckoutResponse>(
    '/payment/stripe/create-checkout-session',
    'POST',
    JSON.stringify({ courseId })
  );

  if (response.status === 'error') {
    throw new Error(response.error || 'Checkout session creation failed');
  }

  return response.data!;
}

export async function verifyStripeSession(sessionId:string){
  const response = await apiMutation<StripeVerifyResponse>(
    `/payment/stripe/verify-session/${sessionId}`,
    'POST',
  );

  if(response.status === 'error'){
    throw new Error(response.error || 'Session verification failed');
  }
  return response.data!;
}