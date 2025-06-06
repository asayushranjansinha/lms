import type { Metadata } from "next"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Cookie Policy - Learnova",
  description: "Learnova cookie policy and usage information",
}

export default function CookiesPage() {
  return (
    <ScrollArea className='h-screen'>
      <div className='flex min-h-screen flex-col'>
        <Header />
        <main className='container mx-auto flex-1 px-4 py-8'>
          <div className='mx-auto max-w-4xl'>
            <h1 className='mb-8 text-4xl font-bold'>Cookie Policy</h1>

            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>What Are Cookies</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    Cookies are small text files that are stored on your device
                    when you visit our website. They help us provide you with a
                    better experience by remembering your preferences and
                    improving our services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Types of Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <ul>
                    <li>
                      <strong>Essential Cookies:</strong> Required for the
                      website to function properly
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Help us understand how
                      visitors use our site
                    </li>
                    <li>
                      <strong>Preference Cookies:</strong> Remember your
                      settings and preferences
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to deliver
                      relevant advertisements
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Managing Cookies</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    You can control and manage cookies through your browser
                    settings. However, disabling certain cookies may affect the
                    functionality of our website.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent className='prose dark:prose-invert max-w-none'>
                  <p>
                    We may update this Cookie Policy from time to time. Any
                    changes will be posted on this page with an updated revision
                    date.
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
