import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
const BASE_URL = Constants?.expoConfig?.extra?.apiBaseUrl;
export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
