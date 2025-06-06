import type { Metadata } from "next"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Privacy Policy - Learnova",
  description: "Learnova privacy policy and data protection information",
}

export default function PrivacyPage() {
  return (
    <ScrollArea className='h-screen'>
      <div className='flex min-h-screen flex-col'>
        <Header />
        <main className='container mx-auto flex-1 px-4 py-8'>
          <div className='mx-auto max-w-4xl'>
            <h1 className='mb-8 text-4xl font-bold'>Privacy Policy</h1>

            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    We collect information you provide directly to us, such as
                    when you create an account, enroll in courses, or contact us
                    for support.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    We use the information we collect to provide, maintain, and
                    improve our services, process transactions, and communicate
                    with you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Information Sharing</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except as
                    described in this policy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Security</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    We implement appropriate security measures to protect your
                    personal information against unauthorized access,
                    alteration, disclosure, or destruction.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at privacy@learnova.com.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ScrollArea>
  );
}
