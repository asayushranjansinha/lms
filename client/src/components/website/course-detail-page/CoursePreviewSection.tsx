import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { CourseDetail } from '@/types';
import { Clock, PlayCircle, Users } from 'lucide-react';
import Image from 'next/image';

interface CoursePreviewCardProps {
  course: CourseDetail;
}
export const CoursePreviewCard = ({ course }: CoursePreviewCardProps) => {
  return (
    <div className='lg:col-span-5'>
      <div className='sticky top-8'>
        <div className='group relative'>
          {/* Glow Effect */}
          <div className='from-primary/20 to-secondary/20 absolute -inset-1 rounded-3xl bg-gradient-to-r opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100' />

          {/* Main Card */}
          <div className='bg-card border-border/60 hover:border-border relative overflow-hidden rounded-3xl border shadow-2xl transition-all duration-500'>
            {/* Video Thumbnail */}
            <div className='bg-muted group-hover:bg-muted/80 relative aspect-video transition-colors duration-300'>
              <Image
                fill
                src={course.thumbnail || '/assets/placeholder.jpg'}
                alt={course.title}
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />

              {/* Play Button Overlay */}
              <div className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-all duration-300 group-hover:opacity-100'>
                <div className='relative'>
                  <div className='bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-xl' />
                  <Button
                    size='lg'
                    className='bg-background/90 hover:bg-background text-foreground relative h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110'
                  >
                    <PlayCircle className='h-6 w-6' />
                  </Button>
                </div>
              </div>

              {/* Duration Badge */}
              {!!course.duration && (
                <div className='bg-background/90 text-foreground border-border/60 absolute right-4 bottom-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-sm'>
                  <Clock className='h-3 w-3' />
                  <span>{course.duration}</span>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className='space-y-6 p-8'>
              {/* Quick Stats Grid */}
              <div className='grid grid-cols-2 gap-4'>
                {/* Rating Box */}
                <div className='bg-muted/30 border-border/30 hover:bg-muted/50 flex flex-col justify-center rounded-xl border p-4 text-center transition-colors duration-200'>
                  <div className='text-foreground mb-1 text-2xl font-bold'>
                    {course.rating && course.rating > 0
                      ? course.rating.toFixed(1)
                      : '—'}
                  </div>
                  <div className='text-muted-foreground text-xs tracking-wide uppercase'>
                    {course.rating && course.rating > 0
                      ? 'Average Rating'
                      : 'Not rated yet'}
                  </div>
                </div>

                {/* Enrolled Students Box */}
                <div className='bg-muted/30 border-border/30 hover:bg-muted/50 flex flex-col justify-center rounded-xl border p-4 text-center transition-colors duration-200'>
                  <div className='text-foreground mb-1 text-2xl font-bold'>
                    {course.enrolledStudents && course.enrolledStudents > 0
                      ? course.enrolledStudents.toLocaleString()
                      : '—'}
                  </div>
                  <div className='text-muted-foreground text-xs tracking-wide uppercase'>
                    {course.enrolledStudents && course.enrolledStudents > 0
                      ? course.enrolledStudents === 1
                        ? '1 student'
                        : `${course.enrolledStudents.toLocaleString()} students`
                      : 'No students yet'}
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <StarRating
                      defaultValue={course.rating}
                      disabled
                      size='sm'
                    />
                    <span className='text-muted-foreground text-sm'>
                      {course.reviews && course.reviews.length > 0
                        ? `${course.reviews.length} ${
                            course.reviews.length === 1 ? 'review' : 'reviews'
                          }`
                        : 'No reviews yet'}
                    </span>
                  </div>
                  <Badge variant='outline' className='text-xs'>
                    {course.level}
                  </Badge>
                </div>

                <div className='text-muted-foreground flex items-center gap-3 text-sm'>
                  <Users className='h-4 w-4' />
                  <span>
                    {course.enrolledStudents && course.enrolledStudents > 0
                      ? `${course.enrolledStudents.toLocaleString()} ${
                          course.enrolledStudents === 1 ? 'student' : 'students'
                        }`
                      : 'Be the first to enroll'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
