import { STRINGS } from "@/src/constants/Strings";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: STRINGS.url,
  }),
  tagTypes: ["Comments"],
  keepUnusedDataFor: 24 * 60 * 60,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: ["Comments"],
    }),

    updateComment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetCommentsQuery, useUpdateCommentMutation } = commentsApi;
