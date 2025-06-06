'use client';
import { searchCourses } from '@/actions/courses';
import { Skeleton } from '@/components/ui/skeleton';
import { courseSearchParams } from '@/lib/course-search-params-cache';
import { SearchCourseResult } from '@/types';
import { BookOpen, Loader2 } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CourseListLMS } from './CourseListComponent';
import { CourseListFilters } from './CourseListFilter';

function buildQueryString(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();

  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  }

  return query.toString();
}

export function CoursesDataFetcher() {
  const [searchState] = useQueryStates(courseSearchParams);
  const [courses, setCourses] = useState<SearchCourseResult[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep track of the current request to avoid race conditions
  const abortControllerRef = useRef<AbortController | null>(null);
  const isFirstRender = useRef(true);

  const fetchCourses = useCallback(
    async (showFilteringIndicator = false) => {
      try {
        // Cancel previous request if it exists
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();

        if (showFilteringIndicator) {
          setIsFiltering(true);
        } else if (isFirstRender.current) {
          setIsInitialLoading(true);
        }

        setError(null);

        // Get current search params
        const { page, limit, query, category, level, minPrice, maxPrice } =
          searchState;

        // Handle category conversion if needed (• separated to comma separated)
        const processedCategory = category
          ? category.replace(/•/g, ',')
          : undefined;

        const filters = {
          page,
          limit,
          ...(query && { query }),
          ...(processedCategory && { category: processedCategory }),
          ...(level && { level }),
          ...(minPrice !== null && minPrice !== undefined && { minPrice }),
          ...(maxPrice !== null && maxPrice !== undefined && { maxPrice })
        };

        const queryString = buildQueryString(filters);

        const data = await searchCourses(queryString);

        // Only update if this request wasn't cancelled
        if (!abortControllerRef.current?.signal.aborted) {
          setCourses(data || ([] as any));
        }
      } catch (err: any) {
        // Only handle error if request wasn't cancelled
        if (!abortControllerRef.current?.signal.aborted) {
          // console.error('Error fetching courses:', err);
          setError('Failed to fetch courses. Please try again.');
          setCourses([]);
        }
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          setIsInitialLoading(false);
          setIsFiltering(false);
          isFirstRender.current = false;
        }
      }
    },
    [searchState]
  );

  useEffect(() => {
    // Debounce the API call slightly to avoid too many requests
    const timeoutId = setTimeout(
      () => {
        fetchCourses(!isFirstRender.current);
      },
      isFirstRender.current ? 0 : 300
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchCourses]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Show full skeleton only on initial load
  if (isInitialLoading && courses.length === 0) {
    return <CoursesLoadingSkeleton />;
  }

  // Show error state
  if (error && courses.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <p className='text-destructive mb-4 text-center'>{error}</p>
        <button
          onClick={() => fetchCourses(false)}
          disabled={isFiltering}
          className='bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isFiltering && <Loader2 className='h-4 w-4 animate-spin' />}
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className='flex flex-col justify-between space-y-1 border-b pb-6 md:flex-row md:items-center md:space-y-0'>
        <div>
          <h2 className='text-foreground text-3xl font-bold tracking-tight'>
            Available Courses
          </h2>
          <p className='text-muted-foreground mt-2'>
            {courses.length === 0
              ? 'No courses found'
              : `Discover ${courses.length} expertly crafted courses to advance your skills`}
          </p>
        </div>
        <div className='text-muted-foreground bg-muted relative flex items-center gap-2 rounded-full px-4 py-2 text-sm'>
          <BookOpen className='h-4 w-4' />
          <span>{courses.length} courses</span>
          {isFiltering && (
            <div className='absolute -top-1 -right-1'>
              <div className='h-3 w-3 animate-pulse rounded-full bg-blue-500'></div>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-10 lg:flex-row lg:gap-12'>
        <aside className='relative flex-shrink-0 lg:w-64 lg:border-r lg:pr-3'>
          <CourseListFilters />
          {/* Subtle loading indicator on sidebar */}
          {isFiltering && (
            <div className='absolute top-0 right-0 lg:right-3'>
              <Loader2 className='text-muted-foreground h-4 w-4 animate-spin' />
            </div>
          )}
        </aside>

        <div className='relative flex-1'>
          {/* Subtle overlay when filtering */}
          {isFiltering && (
            <div className='bg-background/50 pointer-events-none absolute inset-0 z-10 rounded-lg backdrop-blur-[1px]'>
              <div className='flex h-20 items-center justify-center'>
                <div className='bg-background/80 flex items-center gap-2 rounded-lg px-3 py-2 shadow-sm backdrop-blur'>
                  <Loader2 className='text-primary h-4 w-4 animate-spin' />
                  <span className='text-muted-foreground text-sm'>
                    Updating results...
                  </span>
                </div>
              </div>
            </div>
          )}

          <CourseListLMS courses={courses as any} />

          {/* Empty state when no courses found */}
          {!isInitialLoading && !isFiltering && courses.length === 0 && (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <BookOpen className='text-muted-foreground/50 mb-4 h-12 w-12' />
              <h3 className='text-foreground mb-2 text-lg font-medium'>
                No courses found
              </h3>
              <p className='text-muted-foreground mb-4'>
                Try adjusting your filters to see more results
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CoursesLoadingSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className='flex flex-col justify-between space-y-1 border-b pb-6 md:flex-row md:items-center md:space-y-0'>
        <div>
          <Skeleton className='mb-2 h-9 w-64' />
          <Skeleton className='h-5 w-96' />
        </div>
        <div className='flex items-center gap-2 rounded-full px-4 py-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-20' />
        </div>
      </div>

      <div className='flex flex-col gap-10 lg:flex-row lg:gap-12'>
        {/* Sidebar Skeleton */}
        <aside className='flex-shrink-0 lg:w-64 lg:border-r lg:pr-3'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-20' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-24' />
              <div className='flex gap-2'>
                <Skeleton className='h-10 flex-1' />
                <Skeleton className='h-10 flex-1' />
              </div>
            </div>
            <Skeleton className='h-10 w-full' />
          </div>
        </aside>

        {/* Course Grid Skeleton */}
        <div className='flex-1'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='bg-card rounded-lg border p-6 shadow-sm'
              >
                <Skeleton className='mb-4 h-48 w-full rounded-md' />
                <Skeleton className='mb-2 h-6 w-3/4' />
                <div className='mb-4 space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/3' />
                </div>
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4 rounded-full' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                  <Skeleton className='h-5 w-12 rounded-full' />
                </div>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-6 w-16' />
                  <Skeleton className='h-9 w-20' />
                </div>
              </div>
            ))}
          </div>
          <div className='mt-8 flex justify-center'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-9 w-20' />
              <Skeleton className='h-9 w-9' />
              <Skeleton className='h-9 w-9' />
              <Skeleton className='h-9 w-9' />
              <Skeleton className='h-9 w-16' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CoursesDataFetcher.Skeleton = CoursesLoadingSkeleton;
