'use server';
import { CourseFormSchema, ModuleFormSchema } from '@/constants/schema';
/**
 * Fetch course data from backend API
 */

import { apiFetch, apiMutation } from '@/lib/api';
import {
  Course,
  CourseDetail,
  CourseModule,
  SearchCourseResult
} from '@/types';
import { revalidatePath } from 'next/cache';

export async function fetchCourseDetails(courseId: string) {
  const response = await apiFetch<CourseDetail>(`/course/${courseId}`);

  if (response.status === 'error') {
    throw new Error(response.error!);
  }
  return response.data;
}

export async function searchCourses(queryString: string) {
  const { data } = await apiFetch<SearchCourseResult>(
    `/course/search?${queryString}`
  );
  return data;
}

export async function createCourse(values: CourseFormSchema) {
  const response = await apiMutation<Course>(
    '/course/create',
    'POST',
    JSON.stringify(values)
  );

  if (response.status === 'error') {
    console.log('Server erorr while creating course', response.error);
    throw new Error(response.error!);
  }

  revalidatePath('/dashboard/courses');
  return;
}

export async function updateCourse(courseId: string, values: CourseFormSchema) {
  const response = await apiMutation<Course>(
    `/course/${courseId}`,
    'PUT',
    JSON.stringify(values)
  );

  if (response.status === 'error') {
    throw new Error(response.error!);
  }

  revalidatePath('/dashboard/courses');
  return;
}

export async function getModuleDetails(courseId: string, moduleId: string) {
  const response = await apiFetch<CourseModule>(
    `/course/${courseId}/module/${moduleId}`
  );

  if (response.status === 'error') {
    throw new Error(response.error!);
  }
  return response.data;
}

export async function createModule(courseId: string, values: ModuleFormSchema) {
  const response = await apiMutation<CourseModule>(
    `/course/${courseId}/module`,
    'POST',
    JSON.stringify(values)
  );
  if (response.status === 'error') {
    throw new Error(response.error!);
  }
  return response.data;
}

export async function updateModule(
  courseId: string,
  moduleId: string,
  values: ModuleFormSchema
) {
  const response = await apiMutation<CourseModule>(
    `/course/${courseId}/module/${moduleId}`,
    'PUT',
    JSON.stringify(values)
  );

  if (response.status === 'error') {
    throw new Error(response.error!);
  }
  revalidatePath(`/dashboard/modules/${courseId}/${moduleId}`);
  return response.data;
}
