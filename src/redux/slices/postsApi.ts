import { STRINGS } from "@/src/constants/Strings";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: STRINGS.url,
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
