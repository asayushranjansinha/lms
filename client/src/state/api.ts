import { createApi } from '@reduxjs/toolkit/query/react';

import { LoginRequest } from '@/types';
import { clearUser, setUser } from '.';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'api',
  tagTypes: ['user'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials: LoginRequest) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.data.user));
        } catch (error) {
          throw error;
        }
      },
      invalidatesTags: ['user']
    }),

    login: builder.mutation({
      query: (credentials: LoginRequest) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.data.user));
        } catch (error) {
          throw error;
        }
      },
      invalidatesTags: ['user']
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
        } catch (error) {
          throw error;
        }
      },
      invalidatesTags: ['user']
    })
  })
});


/**
 * Migrated back to simple server actions
 */
export const userApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'userApi',
  tagTypes: ['user-profile'],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: 'user/profile',
        method: 'GET'
      }),
      providesTags: ['user-profile']
    }),
    updateUserProfile: builder.mutation({
      query: (data: FormData) => ({
        url: 'user/profile',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['user-profile']
    })
  })
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
