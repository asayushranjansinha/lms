/**
 * Packages & Libraries
 */
import {
  BookOpen,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Play
} from 'lucide-react';
import Link from 'next/link';

/**
 * Components & Utilities
 */
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Types & Api
 */
import { getLectureUrl, getTypeBadgeStyles } from '@/lib/utils';
import { CourseModule } from '@/types';

interface CourseSyllabusProps {
  modules: CourseModule[];
}

/**
 * Module Icon Component
 */
const getModuleIcon = (type: string) => {
  const iconMap = {
    video: <Play className='h-4 w-4 text-red-500' />,
    document: <FileText className='h-4 w-4 text-blue-500' />,
    assignment: <Download className='h-4 w-4 text-emerald-500' />
  };
  return (
    iconMap[type as keyof typeof iconMap] || (
      <FileText className='h-4 w-4 text-slate-500' />
    )
  );
};

/**
 * Main Component
 */
export async function CourseSyllabusSection({ modules }: CourseSyllabusProps) {
  if (modules.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      id='course-syllabus-course-detail'
      className='space-y-8 py-16 pt-0'
    >
      {/* Header */}
      <div className='container mx-auto space-y-2 px-4 md:px-0'>
        <h2 className='text-foreground text-3xl font-bold tracking-tight'>
          Course Modules
        </h2>
        <p className='text-muted-foreground text-lg'>
          Explore {modules.length} module{modules.length !== 1 ? 's' : ''}{' '}
          designed for your learning journey
        </p>
      </div>

      {/* Modules List */}
      <div className='container mx-auto space-y-4 px-4 sm:space-y-6 md:px-0'>
        {modules.map((module, moduleIndex) => (
          <Card
            key={module._id}
            className='group border-border/40 hover:border-border/60 bg-card/50 mx-2 border backdrop-blur-sm transition-all duration-300 hover:shadow-lg sm:mx-0'
          >
            <CardHeader className='px-3 pb-3 sm:px-6 sm:pb-4'>
              <div className='flex items-start gap-3 sm:gap-4'>
                {/* Module Number */}
                <div className='from-primary/10 to-primary/5 border-primary/20 text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br text-base font-semibold sm:h-12 sm:w-12 sm:rounded-xl sm:text-lg'>
                  {moduleIndex + 1}
                </div>

                {/* Module Info */}
                <div className='min-w-0 flex-1 overflow-hidden'>
                  <CardTitle className='text-foreground group-hover:text-primary line-clamp-2 text-lg font-semibold break-words transition-colors duration-200 sm:text-xl'>
                    {module.title}
                  </CardTitle>
                  <div className='mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
                    <span className='text-muted-foreground text-sm'>
                      {module.lectures.length} lecture
                      {module.lectures.length !== 1 ? 's' : ''}
                    </span>
                    {module.duration && (
                      <Badge
                        variant='outline'
                        className='bg-background/80 w-fit text-xs'
                      >
                        <Clock className='mr-1.5 h-3 w-3' />
                        {module.duration}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className='px-3 pt-0 sm:px-6'>
              {/* Lectures List */}
              <div className='space-y-2 sm:space-y-3'>
                {module.lectures.map((lecture, lectureIndex) => (
                  <Link
                    key={lectureIndex}
                    href={getLectureUrl(lecture)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group/lecture border-border/30 hover:border-border/50 bg-background/30 hover:bg-background/60 flex items-start gap-3 rounded-lg border p-3 transition-all duration-300 hover:shadow-md sm:items-center sm:gap-4 sm:rounded-xl sm:p-4'
                  >
                    {/* Lecture Icon */}
                    <div className='bg-background border-border/50 group-hover/lecture:border-border mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 sm:mt-0 sm:h-10 sm:w-10'>
                      {getModuleIcon(lecture.type)}
                    </div>

                    {/* Lecture Info */}
                    <div className='min-w-0 flex-1 overflow-hidden'>
                      <div className='mb-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3'>
                        <h4 className='text-foreground group-hover/lecture:text-primary line-clamp-2 font-medium break-words transition-colors duration-200 sm:line-clamp-1'>
                          {lecture.title}
                        </h4>
                        <Badge
                          variant='outline'
                          className={`w-fit border px-2 py-0.5 text-xs uppercase ${getTypeBadgeStyles(lecture.type)}`}
                        >
                          {lecture.type}
                        </Badge>
                      </div>
                      <p className='text-muted-foreground hidden text-xs sm:block'>
                        Lecture {lectureIndex + 1} of {module.lectures.length}
                      </p>
                    </div>

                    {/* Lecture Duration & Icon */}
                    <div className='flex flex-shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3'>
                      {lecture.duration && (
                        <Badge
                          variant='secondary'
                          className='bg-background/80 text-xs'
                        >
                          <Clock className='mr-1 h-3 w-3' />
                          {lecture.duration}
                        </Badge>
                      )}
                      <ExternalLink className='text-muted-foreground group-hover/lecture:text-primary h-4 w-4 transition-colors duration-200' />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

/**
 * Loading Skeleton Component
 */
function CourseSyllabusSkeleton() {
  return (
    <section className='space-y-8'>
      <div className='space-y-2'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-4 w-96' />
      </div>

      <div className='space-y-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className='border-border/40 border'>
            <CardHeader className='pb-4'>
              <div className='flex items-center gap-4'>
                <Skeleton className='h-10 w-10 rounded-lg' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-5 w-48' />
                  <Skeleton className='h-4 w-32' />
                </div>
                <Skeleton className='h-6 w-16 rounded-full' />
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='space-y-3'>
                {Array.from({ length: 2 }).map((_, lectureIndex) => (
                  <div
                    key={lectureIndex}
                    className='border-border/20 flex items-center gap-4 rounded-lg border p-3'
                  >
                    <Skeleton className='h-8 w-8 rounded-lg' />
                    <div className='flex-1 space-y-2'>
                      <Skeleton className='h-4 w-40' />
                      <Skeleton className='h-3 w-24' />
                    </div>
                    <Skeleton className='h-5 w-12 rounded-full' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

/**
 * Empty State Component
 */
function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center px-6 py-24'>
      <div className='relative'>
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl' />
        <div className='relative rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-blue-800/50 dark:from-blue-950/50 dark:to-indigo-950/50'>
          <BookOpen className='mx-auto h-12 w-12 text-blue-500' />
        </div>
      </div>

      <div className='mt-8 space-y-3 text-center'>
        <h3 className='text-foreground text-2xl font-semibold'>
          No modules available
        </h3>
        <p className='text-muted-foreground max-w-md leading-relaxed'>
          This course doesn&apos;t have any modules yet. Check back later or
          contact your instructor for updates.
        </p>
      </div>
    </div>
  );
}

CourseSyllabusSection.Skeleton = CourseSyllabusSkeleton;
