/**
 * Packages & Libraries
 */
import { Download, FileText, Play } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

/**
 * Components & Utilities
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Types & Api
 */
import { apiFetch } from '@/lib/api';
import { CourseModule } from '@/types';

interface CourseSyllabusProps {
  courseId: string;
}

export const CourseSyllabus = async ({ courseId }: CourseSyllabusProps) => {
  const { data } = await apiFetch<CourseModule[]>(
    `/course/${courseId}/modules`
  );

  if (!data) return notFound();

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className='h-4 w-4' />;
      case 'document':
        return <FileText className='h-4 w-4' />;
      case 'assignment':
        return <Download className='h-4 w-4' />;
      default:
        return <FileText className='h-4 w-4' />;
    }
  };

  function returnHrefForLecture(lesson: CourseModule['lectures'][0]) {
    if (lesson.type === 'video') {
      return lesson.videoUrl;
    } else if (lesson.type === 'document') {
      return lesson.documentUrl;
    } else if (lesson.type === 'assignment') {
      return lesson.assignmentUrl;
    } else {
      return lesson.videoUrl;
    }
  }
  return (
    <section id='course-syllabus'>
      <Card>
        {/* Section Heading */}
        <CardHeader className='flex items-center justify-between'>
          <CardTitle className='flex-1 text-left text-2xl font-bold'>
            Course Syllabus
          </CardTitle>
          <Button asChild variant='outline'>
            <Link href={`/dashboard/modules/${courseId}/new`}>Add Module</Link>
          </Button>
        </CardHeader>

        {/* Main Section Content & Syllabus as list */}
        <CardContent>
          <Accordion type='single' collapsible className='w-full'>
            {data.length > 0 ? (
              data.map((module) => (
                <AccordionItem key={module._id} value={module._id}>
                  <AccordionTrigger className='text-left'>
                    <div className='mr-4 flex w-full items-center justify-between'>
                      {/* Module Title */}
                      <span className='flex-1 font-semibold'>
                        {module.title}
                      </span>

                      {/* Module Actions */}
                      <div className='flex justify-end gap-4'>
                        <Badge variant='secondary'>{module.duration}</Badge>
                        <Link
                          href={`/dashboard/modules/${module.courseId}/${module._id}`}
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Lectures List */}
                    <div className='space-y-3'>
                      {module.lectures.map((lesson, index) => (
                        <Link
                          href={returnHrefForLecture(lesson)!}
                          key={index}
                          target='_blank'
                          rel='noopener'
                          className='flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800'
                        >
                          <div className='flex items-center space-x-3'>
                            {getIcon(lesson.type)}
                            <span className='text-sm'>{lesson.title}</span>
                          </div>
                          <span className='text-sm text-gray-600 dark:text-gray-400'>
                            {lesson.duration}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <h4 className='text-muted-foreground w-full text-center'>
                No Modules added yet. Please add a module to your course.
              </h4>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};

const CourseSyllabusSkeleton = () => {
  return (
    <section id='course-syllabus'>
      <div className='w-full'>
        <div className='mb-4 flex items-center justify-between'>
          <Skeleton className='h-8 w-1/3' />
          <Skeleton className='h-10 w-28' />
        </div>

        <div className='space-y-4'>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className='rounded-lg border p-4'>
              {/* Accordion Trigger Skeleton */}
              <div className='mb-3 flex items-center justify-between'>
                <Skeleton className='h-6 w-1/3' />
                <div className='flex gap-4'>
                  <Skeleton className='h-6 w-16' />
                  <Skeleton className='h-6 w-12' />
                </div>
              </div>

              {/* Accordion Content Skeleton */}
              <div className='space-y-3'>
                {[1, 2].map((_, j) => (
                  <div
                    key={j}
                    className='bg-muted/40 flex items-center justify-between rounded-lg p-3'
                  >
                    <div className='flex items-center space-x-3'>
                      <Skeleton className='h-5 w-5 rounded-full' />
                      <Skeleton className='h-4 w-40' />
                    </div>
                    <Skeleton className='h-4 w-12' />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

CourseSyllabus.Skeleton = CourseSyllabusSkeleton;
