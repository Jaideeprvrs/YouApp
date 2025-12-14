import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
const BASE_URL = Constants?.expoConfig?.extra?.apiBaseUrl;
export const postsApi = createApi({
  reducerPath: "postsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json; charset=utf-8");
      return headers;
    },
  }),

  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformErrorResponse: (response, meta, arg) => {
        // When offline or fetch fails:
        return {
          message: "Unable to load posts. You might be offline.",
          details: response,
        };
      },
    }),
    postPosts: builder.mutation({
      query: ({ body }) => ({
        url: `/posts`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Auto-generated React hook
export const { useGetPostsQuery, usePostPostsMutation } = postsApi;
