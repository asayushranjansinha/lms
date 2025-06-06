'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { SearchCourseResult } from '@/types';
import { Clock, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CourseListLMS({ courses }: { courses: SearchCourseResult[] }) {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}

interface CourseCardProps {
  course: SearchCourseResult;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <div className='bg-card border-border mt-4 flex h-[500px] flex-col overflow-hidden rounded border shadow-sm'>
      {/* Image Section */}
      <div className='bg-muted relative h-48 shrink-0'>
        <Image
          src={course.thumbnail || '/assets/placeholder.jpg'}
          alt={course.title}
          className='h-full w-full object-cover'
          fill
        />

        {/* Category Badge - Top Left */}
        <div className='absolute top-3 left-3 z-10'>
          <Badge variant='secondary'>{course.category}</Badge>
        </div>

        {/* Level Badge - Top Right */}
        <div className='absolute top-3 right-3 z-10'>
          <Badge>{course.level}</Badge>
        </div>

        {/* Duration - Bottom Right on Image */}
        <div className='bg-secondary/90 absolute right-3 bottom-3 z-10 flex items-center gap-1 rounded px-2 py-1 text-xs'>
          <Clock className='h-4 w-4' />
          <span>{course.duration}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex grow flex-col p-4'>
        <div className='mb-3'>
          <h3 className='text-foreground mb-1 line-clamp-2 text-lg font-semibold'>
            {course.title}
          </h3>
          {course.subtitle && (
            <p className='text-muted-foreground line-clamp-1 text-sm'>
              {course.subtitle}
            </p>
          )}
        </div>

        <p className='text-muted-foreground mb-4 line-clamp-2 text-sm'>
          {course.description}
        </p>

        {/* Instructor */}
        <div className='mb-4 flex items-center'>
          <Avatar className='mr-2 h-6 w-6'>
            <AvatarImage
              src={course.createdBy?.profilePicture || '/placeholder.svg'}
              alt={course.createdBy?.name}
            />
            <AvatarFallback className='text-xs'>
              {course.createdBy?.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <span className='text-foreground text-sm font-medium'>
            {course.createdBy?.name}
          </span>
        </div>

        {/* Spacer to push footer down */}
        <div className='flex grow flex-col justify-end'>
          {/* Stats */}
          <div className='text-muted-foreground mb-4 flex items-center justify-between text-sm'>
            <div className='flex items-center gap-1'>
              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              <span className='text-foreground font-medium'>
                {course.rating && course.rating > 0
                  ? course.rating.toFixed(1)
                  : 'Not rated yet'}
              </span>
              {course.rating && course.rating > 0 && (
                <span>
                  (
                  {course.reviews === 1
                    ? '1 review'
                    : `${course.reviews.toLocaleString()} reviews`}
                  )
                </span>
              )}
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1'>
                <Users className='h-4 w-4' />
                <span>
                  {course.enrolledStudents
                    ? course.enrolledStudents === 1
                      ? '1 student'
                      : `${course.enrolledStudents.toLocaleString()} students`
                    : 'No students yet'}
                </span>
              </div>
            </div>
          </div>

          {/* Price and Action */}
          <div className='border-border flex items-center justify-between border-t pt-3'>
            <div className='text-foreground text-xl font-bold'>
              {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}

            </div>

            <Button variant='outline' size='sm' className='font-medium' asChild>
              <Link href={`/course/${course._id}`}>View Course</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
