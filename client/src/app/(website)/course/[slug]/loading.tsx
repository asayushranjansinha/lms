import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CourseSyllabusSection } from '@/components/website/course-detail-page/CourseSyllabusSection';
import { HeroSection } from '@/components/website/course-detail-page/hero-section';

const LoadingPageSkeleton = () => {
  return (
    <ScrollArea className='h-screen'>
      <div className='flex min-h-screen flex-col'>
        {/* Header */}
        <Header />

        <main className='flex-1'>
          <HeroSection.Skeleton />

          <CourseSyllabusSection.Skeleton />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ScrollArea>
  );
};
export default LoadingPageSkeleton;
