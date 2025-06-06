'use server';

import { ApiResponse } from '@/types';
import { cookies } from 'next/headers';

async function refreshAccessToken(): Promise<boolean> {
  // Get access token from cookies
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh-token`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ refreshToken: refreshToken })
      }
    );

    if (!res.ok) {
      return false;
    }

    const json = await res.json();
    return json.success ?? false;
  } catch {
    // console.error("Refresh token error:", err);
    return false;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<ApiResponse<T>> {
  // Get access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`
    },
    cache: 'no-store'
  });

  if (res.status === 401 && retry) {
    // Attempt refresh token once
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch<T>(path, options, false); // retry once
    }
  }

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      status: 'error',
      error: json?.message || `API Error: ${res.status}`,
      data: null
    };
  }

  return {
    status: 'success',
    error: null,
    data: json?.data ?? (null as T)
  };
}

export async function apiMutation<T>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: string | FormData,
  options: RequestInit = {},
  retry = true
): Promise<ApiResponse<T>> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
  // Get access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`
    },
    body,
    ...options
  });

  if (res.status === 401 && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiMutation<T>(path, method, body, options, false); // Retry once
    }
  }

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      status: 'error',
      error: json?.message || `API Error: ${res.status}`,
      data: null
    };
  }

  return {
    status: 'success',
    error: null,
    data: json?.data ?? (null as T)
  };
}


