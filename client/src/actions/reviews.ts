'use server';
import { apiMutation } from '@/lib/api';
import { ApiResponse, UserReview } from '@/types';
import { revalidatePath } from 'next/cache';

/**
 * Submits a course review with rating and text for the given course ID.
 *
 * Sends a POST request to the backend with the user's rating and review.
 * If successful, the course page is revalidated to reflect the new review.
 *
 * @param courseId - The ID of the course being reviewed.
 * @param data - An object containing the user's rating (1–5) and textual review.
 * @returns The created review object on success.
 * @throws An error if the API response indicates failure.
 */
export async function submitReview(
  courseId: string,
  data: { rating: number; review: string }
) {
  const response = await apiMutation<ApiResponse<UserReview>>(
    `/review/${courseId}/`,
    'POST',
    JSON.stringify(data)
  );

  if (response.status === 'error') {
    throw new Error(response.error!);
  }

  revalidatePath(`/course/${courseId}`);
  return response.data;
}
