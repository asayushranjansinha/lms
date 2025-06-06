/**
 * Components & Utilities
 */
import { CourseTable } from './courses-table';
import { columns } from './courses-table/columns';
// import { searchParamsCache } from '@/lib/searchparams';

/**
 * Types & Api
 */
import { Course } from '@/types';
import { apiFetch } from '@/lib/api';

type CourseListingPage = {};

export default async function CourseListingPage({}: CourseListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  // const page = searchParamsCache.get('page');
  // const search = searchParamsCache.get('name');
  // const pageLimit = searchParamsCache.get('perPage');
  // const categories = searchParamsCache.get('category');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories })
  // };

  const { data } = await apiFetch<Course[]>(`/course/search`);
  return (
    <CourseTable
      data={data ?? []}
      totalItems={data?.length ?? 0}
      columns={columns}
    />
  );
}
