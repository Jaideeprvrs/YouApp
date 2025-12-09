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
      providesTags: ["Comments"], // 👈 tells RTK Query this data can be invalidated
    }),

    updateComment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/comment/${id}`,
        method: "PATCH",
        body,
      }),
      // invalidatesTags: ["Comments"], // 👈 refetch comments after update
    }),
  }),
});

export const { useGetCommentsQuery, useUpdateCommentMutation } = commentsApi;
