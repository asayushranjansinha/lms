'use client';
/**
 * Packages & Libraries
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Components & Hooks
 */

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CTAButton } from "@/components/common/CTAButton";
/**
 * States & Schemas
*/
import { useLoginMutation } from '@/state/api';
import { LoginFormData, loginSchema } from '@/constants/schema';


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false // Set default here insteadk
    }
  });

  const onSubmit = async (credentials: LoginFormData) => {
    try {
      await login(credentials).unwrap();

      toast({
        title: 'Login successful',
        description: 'Welcome back to Learnova!'
      });
      router.replace('/');

      // Handle successful login (redirect, store token, etc.)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Login failed:', error);

      // Extract error message from your backend response structure
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        'Please check your credentials and try again.';

      toast({
        title: errorMessage,
        description: 'Please check your credentials and try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Email Field */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder='Enter your email'
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    disabled={isLoading}
                    className='pr-10'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Remember Me Checkbox */}
        <FormField
          control={form.control}
          name='rememberMe'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel className='text-sm font-normal'>
                  Remember me
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <CTAButton
          type='submit'
          title={isLoading ? 'Signing in...' : 'Log In'}
          className='w-full'
          disabled={isLoading}
        />
      </form>
    </Form>
  );
}
