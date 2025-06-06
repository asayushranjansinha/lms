'use server';

import { ProfileFormData } from '@/constants/schema';
import { apiFetch } from '@/lib/api';
import { revalidatePath } from 'next/cache';

/**
 *
 * @returns
 */
export async function getUserProfileData() {
  const response = await apiFetch<any>('/user/profile');
  if (response.status === 'error') {
    throw new Error(response.error!);
  }
  return response.data;
}

export async function updateUserProfile(formData: ProfileFormData) {
  const formDataToSend = new FormData();

  formDataToSend.append('name', formData.name);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('bio', formData?.bio ?? '');
  formDataToSend.append('website', formData?.website ?? '');
  formDataToSend.append('location', formData?.location ?? '');
  formDataToSend.append('gender', formData.gender ?? '');
  formDataToSend.append('phoneNumber', formData.phoneNumber ?? '');

  if (formData.profilePicture instanceof File) {
    formDataToSend.append('profilePicture', formData.profilePicture);
  }

  const response = await apiFetch<any>('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(formDataToSend)
  });

  if (response.status === 'error') {
    throw new Error(response.error!);
  }
  revalidatePath('/dashboard/profile');
  return response.data;
}
