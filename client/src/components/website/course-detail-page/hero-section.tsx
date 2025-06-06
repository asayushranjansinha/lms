/**
 * Packages & Libraries
 */
import { BookOpen, Clock, Star, Users } from 'lucide-react';

/**
 * Components & Utlities
 */
import { Skeleton } from '@/components/ui/skeleton';
import { CoursePreviewCard } from '../../../../src/components/website/course-detail-page/CoursePreviewSection';

/**
 * Types & Api
 */
import CourseInfoSection from '@/components/website/course-detail-page/CourseInfoSection';
import { CourseDetail } from '@/types';

interface CourseHeroProps {
  course: CourseDetail;
}

/**
 * Hero section component in the course details page
 */
export async function HeroSection({ course }: CourseHeroProps) {
  return (
    <section
      id='hero-section-course-details'
      className='relative min-h-[600px] w-full overflow-hidden'
    >
      {/* Background Pattern */}
      <BackgroundPattern />

      <div className='relative container mx-auto px-4 py-20 md:px-0'>
        <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-12'>
          {/* Content Section */}
          <CourseInfoSection course={course} />

          {/* Course Preview Card */}
          <CoursePreviewCard course={course} />
        </div>
      </div>
    </section>
  );
}

/**
 *
 * @returns Background pattern component
 */
const BackgroundPattern = () => {
  return (
    <div className='from-background via-muted/10 to-background absolute inset-0 bg-gradient-to-br'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]' />
      <div className='from-primary/5 absolute top-0 right-0 h-72 w-72 rounded-full bg-gradient-to-bl to-transparent blur-3xl' />
      <div className='from-secondary/5 absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-tr to-transparent blur-3xl' />
    </div>
  );
};

/**
 *
 * @returns Skeleton component for course detail page
 */
function HeroSectionSkeleton() {
  return (
    <section className='relative min-h-[600px] w-full overflow-hidden'>
      <BackgroundPattern />

      <div className='relative container mx-auto px-4 py-20 md:px-0'>
        <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-12'>
          {/* Left Section */}
          <div className='space-y-8 lg:col-span-7'>
            {/* Category Badge */}
            <div className='flex items-center gap-3'>
              <div className='bg-primary/10 border-primary/20 rounded-lg border p-2'>
                <BookOpen className='text-primary h-4 w-4' />
              </div>
              <Skeleton className='h-6 w-24 rounded-md' />
            </div>

            {/* Title & Description */}
            <div className='space-y-6'>
              <Skeleton className='h-10 w-3/4 rounded-md' />
              <Skeleton className='h-6 w-full max-w-2xl' />
              <Skeleton className='h-6 w-5/6' />
            </div>

            {/* Instructor Card */}
            <div className='group relative'>
              <div className='from-primary/5 to-secondary/5 absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />
              <div className='bg-card/60 border-border/60 hover:border-border hover:bg-card/80 relative flex items-center gap-4 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300'>
                <Skeleton className='h-16 w-16 rounded-full' />
                <div className='min-w-0 flex-1 space-y-2'>
                  <Skeleton className='h-5 w-1/3' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className='flex flex-wrap items-center gap-8 py-4'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='text-muted-foreground/30 h-4 w-4'
                    />
                  ))}
                </div>
                <Skeleton className='h-4 w-10' />
                <Skeleton className='h-4 w-16' />
              </div>

              <div className='text-muted-foreground flex items-center gap-3'>
                <Users className='h-4 w-4' />
                <Skeleton className='h-4 w-10' />
                <span>students</span>
              </div>

              <div className='text-muted-foreground flex items-center gap-3'>
                <Clock className='h-4 w-4' />
                <Skeleton className='h-4 w-12' />
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className='flex flex-col items-start gap-8 pt-6 sm:flex-row sm:items-center'>
              <div className='space-y-2'>
                <Skeleton className='h-10 w-32' />
                <Skeleton className='h-4 w-40' />
              </div>
              <Skeleton className='h-12 w-40 rounded-xl' />
            </div>
          </div>

          {/* Course Preview Placeholder */}
          <div className='lg:col-span-5'>
            <Skeleton className='h-[300px] w-full rounded-xl' />
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSection.Skeleton = HeroSectionSkeleton;
