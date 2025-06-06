/**
 * Packages & Libraries
 */
import { notFound } from 'next/navigation';

/**
 * Components & Utilities
 */

import { ScrollArea } from '@/components/ui/scroll-area';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { CourseSyllabusSection } from '@/components/website/course-detail-page/CourseSyllabusSection';
import { HeroSection } from '@/components/website/course-detail-page/hero-section';

/**
 * Types & Api
 */
import { fetchCourseDetails } from '@/actions/courses';
import CourseReviewSection from '@/components/website/course-detail-page/CourseReviewSection';

type PageProps = { params: Promise<{ slug: string }> };

/**
 *
 * @param props {params: Promise<{ slug: string }>}
 * @returns CourseDetailPage component
 */
const CourseDetailsPage = async (props: PageProps) => {
  const params = await props.params;
  const course = await fetchCourseDetails(params.slug);

  if (!course) {
    return notFound();
  }
  return (
    <ScrollArea className='h-screen'>
      <div className='flex min-h-screen flex-col'>
        {/* Header */}
        <Header />

        <main className='flex-1'>
          <HeroSection course={course} />

          <CourseSyllabusSection modules={course.modules} />

          <CourseReviewSection
            isEnrolled={course.isEnrolled}
            courseId={course._id}
            reviews={course.reviews}
          />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ScrollArea>
  );
};
export default CourseDetailsPage;
