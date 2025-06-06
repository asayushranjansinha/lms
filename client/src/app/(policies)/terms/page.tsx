import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export const metadata: Metadata = {
  title: 'Terms of Service - Learnova',
  description: 'Learnova terms of service and user agreement'
};

export default function TermsPage() {
  return (
    <ScrollArea className='h-screen'>
      <div className='flex min-h-screen flex-col'>
        <Header />
        <main className='container mx-auto flex-1 px-4 py-8'>
          <div className='mx-auto max-w-4xl'>
            <h1 className='mb-8 text-4xl font-bold'>Terms of Service</h1>

            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    By accessing or using the Learnova platform, you agree to be
                    bound by these Terms of Service. If you do not agree to
                    these terms, please do not use our services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    To access certain features of the platform, you may be
                    required to register for an account. You are responsible for
                    maintaining the confidentiality of your account information
                    and for all activities that occur under your account.
                  </p>
                  <p>
                    You agree to provide accurate and complete information when
                    creating an account and to update your information to keep
                    it accurate and current.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Course Enrollment and Payments</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    When you enroll in a course, you agree to pay all applicable
                    fees. Fees are non-refundable except as expressly set forth
                    in our Refund Policy.
                  </p>
                  <p>
                    We reserve the right to modify our pricing at any time. Any
                    price changes will not affect courses you have already
                    enrolled in.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Intellectual Property Rights</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    All content on the Learnova platform, including courses,
                    videos, text, graphics, logos, and images, is the property
                    of Learnova or its content providers and is protected by
                    copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    You may access and view content for personal, non-commercial
                    use only. You may not reproduce, distribute, modify, create
                    derivative works of, publicly display, or publicly perform
                    any content without explicit permission.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. User Conduct</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>You agree not to:</p>
                  <ul>
                    <li>
                      Use the platform for any illegal purpose or in violation
                      of any laws
                    </li>
                    <li>
                      Post or transmit any content that is unlawful, harmful,
                      threatening, or otherwise objectionable
                    </li>
                    <li>
                      Impersonate any person or entity or falsely state your
                      affiliation with a person or entity
                    </li>
                    <li>
                      Interfere with or disrupt the platform or servers or
                      networks connected to the platform
                    </li>
                    <li>
                      Attempt to gain unauthorized access to any part of the
                      platform
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Termination</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    We reserve the right to terminate or suspend your account
                    and access to the platform at our sole discretion, without
                    notice, for conduct that we believe violates these Terms of
                    Service or is harmful to other users, us, or third parties,
                    or for any other reason.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Disclaimer of Warranties</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    The platform and all content and services provided on the
                    platform are provided on an as is and as available basis,
                    without warranties of any kind, either express or implied.
                  </p>
                  <p>
                    We do not guarantee that the platform will be uninterrupted,
                    secure, or error-free, or that any defects will be
                    corrected.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    In no event shall Learnova, its officers, directors,
                    employees, or agents be liable for any indirect, incidental,
                    special, consequential, or punitive damages arising out of
                    or relating to your use of the platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    We reserve the right to modify these Terms of Service at any
                    time. We will provide notice of significant changes by
                    posting the updated terms on the platform. Your continued
                    use of the platform after such changes constitutes your
                    acceptance of the new terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    If you have any questions about these Terms of Service,
                    please contact us at legal@learnova.com.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='mt-8 text-center text-gray-600 dark:text-gray-400'>
              <p>Last updated: May 29, 2024</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ScrollArea>
  );
}
