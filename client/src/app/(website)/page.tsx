import { Header } from '@/components/common/Header';

import { Footer } from '@/components/common/Footer';
import { ThemeSelector } from '@/components/layout/theme/ThemeSelector';
import { ThemeToggleButton } from '@/components/layout/theme/ThemeToggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CallToAction } from '@/components/website/landing-page/C2ASection';
import { ClientsSection } from '@/components/website/landing-page/ClientsSection';
import { CompetitorComparison } from '@/components/website/landing-page/CompetitionSection';
import { FeaturesSection } from '@/components/website/landing-page/FeaturesSection';
import { HeroSection } from '@/components/website/landing-page/HeroSection';
import { StatsSection } from '@/components/website/landing-page/StatsSection';

function WebsiteLandingPage() {
  return (
    <ScrollArea className='h-screen'>
      <ScrollArea className='h-screen'>
        <div className='flex min-h-screen flex-col'>
          {/* Mode Toggle */}
          <div className='absolute right-4 bottom-4 z-50'>
            <ThemeToggleButton />
          </div>

          {/* Theme Selector */}
          <div className='absolute bottom-4 left-4 z-50 hidden md:block'>
            <ThemeSelector />
          </div>
          {/* Header */}
          <Header />

          <main className='flex-1'>
            {/* Hero Section */}
            <HeroSection />

            {/* Stats Section */}
            <StatsSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* Clients Section */}
            <ClientsSection />

            {/* Call to Action Section */}
            <CallToAction />

            <CompetitorComparison />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </ScrollArea>
    </ScrollArea>
  );
}
export default WebsiteLandingPage;
