'use client';

/**
 * Packages & Libraries
 */
import { Award, BookOpen, Clock, Users } from 'lucide-react';

/**
 * Components & Utlities
 */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import EnrollNowButton from './EnrollNowBtn';

/**
 * Types & Api
 */
import { StarRating } from '@/components/ui/star-rating';
import type { CourseDetail } from '@/types';

interface CourseInfoSectionProps {
  course: CourseDetail;
}
const CourseInfoSection = ({ course }: CourseInfoSectionProps) => {
  return (
    <div className='space-y-8 lg:col-span-7'>
      {/* Category Badge */}
      <div className='flex items-center gap-3'>
        <div className='bg-primary/10 border-primary/20 rounded-lg border p-2'>
          <BookOpen className='text-primary h-4 w-4' />
        </div>
        <Badge
          variant='secondary'
          className='bg-secondary/80 hover:bg-secondary text-sm font-medium transition-colors duration-200'
        >
          {course.category}
        </Badge>
      </div>

      {/* Title & Description */}
      <div className='space-y-6'>
        <h1 className='text-foreground max-w-4xl text-4xl leading-[1.1] font-bold tracking-tight lg:text-5xl'>
          {course.title}
        </h1>

        <p className='text-muted-foreground max-w-3xl text-lg leading-relaxed'>
          {course.description}
        </p>
      </div>

      {/* Instructor Card */}
      <div className='group relative'>
        <div className='from-primary/5 to-secondary/5 absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />
        <div className='bg-card/60 border-border/60 hover:border-border hover:bg-card/80 relative flex items-center gap-4 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300'>
          <Avatar className='ring-primary/20 ring-offset-background h-16 w-16 ring-2 ring-offset-2'>
            <AvatarImage
              src={course.createdBy.profilePicture || '/placeholder.svg'}
              alt={course.createdBy.name}
              className='object-cover'
            />
            <AvatarFallback className='bg-primary/10 text-primary text-lg font-semibold'>
              {course.createdBy.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0 flex-1'>
            <div className='mb-1 flex items-center gap-2'>
              <p className='text-foreground truncate text-lg font-semibold'>
                {course.createdBy.name}
              </p>
              <Award className='text-primary h-4 w-4 flex-shrink-0' />
            </div>
            <p className='text-muted-foreground line-clamp-2 text-sm'>
              {course.createdBy.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className='flex flex-wrap items-center gap-8 py-4'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1'>
            <StarRating defaultValue={course.rating} disabled size='sm' />
          </div>
          <span className='text-foreground font-semibold'>
            {course.rating.toFixed(1)}
          </span>
          <span className='text-muted-foreground'>
            {!!course.reviews
              ? course.reviews.length + ' reviews'
              : 'No reviews yet'}
          </span>
        </div>

        <div className='text-muted-foreground flex items-center gap-3'>
          <Users className='h-4 w-4' />
          <span className='text-foreground font-medium'>
            {course.enrolledStudents
              ? `${course.enrolledStudents.toLocaleString()} ${course.enrolledStudents === 1 ? 'student' : 'students'}`
              : 'Be the first to experience this course'}
          </span>
        </div>

        {!!course.duration && (
          <div className='text-muted-foreground flex items-center gap-3'>
            <Clock className='h-4 w-4' />
            <span className='text-foreground font-medium'>
              {course.duration}
            </span>
          </div>
        )}
      </div>

      {/* Pricing & CTA */}
      <div className='flex flex-col items-start gap-8 pt-6 sm:flex-row sm:items-center'>
        <div className='space-y-2'>
          <div className='text-foreground text-4xl font-bold'>
            {course.price === 0 ? (
              <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                Free
              </span>
            ) : (
              formatPrice(course.price)
            )}
          </div>
          {course.price > 0 && (
            <p className='text-muted-foreground text-sm'>
              One-time payment • Lifetime access
            </p>
          )}
        </div>

        {!course.isEnrolled && (
          <EnrollNowButton
            courseId={course._id}
            size='lg'
            className='bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden rounded-xl px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl'
          >
            <span className='relative z-10'>Enroll Now</span>
            <div className='absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full' />
          </EnrollNowButton>
        )}
      </div>
    </div>
  );
};
export default CourseInfoSection;
