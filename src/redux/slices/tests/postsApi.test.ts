import { STRINGS } from "@/src/constants/Strings";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { postsApi } from "../postsApi";

jest.mock("@reduxjs/toolkit/query/react", () => {
  const actual = jest.requireActual("@reduxjs/toolkit/query/react");
  return {
    ...actual,
    fetchBaseQuery: jest.fn(actual.fetchBaseQuery),
  };
});

const mockFetchBaseQuery = fetchBaseQuery as jest.Mock;

describe("postsApi configuration", () => {
  it("should have the correct reducer path", () => {
    expect(postsApi.reducerPath).toBe("postsApi");
  });

  it("should use the correct base URL from constants", () => {
    expect(mockFetchBaseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        baseUrl: STRINGS.url,
      })
    );
  });

  it("should have correct caching and refetching policies", () => {
    expect(postsApi.keepUnusedDataFor).toBe(0);
    expect(postsApi.refetchOnMountOrArgChange).toBe(true);
    expect(postsApi.refetchOnFocus).toBe(false);
    expect(postsApi.refetchOnReconnect).toBe(true);
  });

  it("prepares headers correctly with Content-Type application/json", () => {
    const fetchBaseQueryArgs = mockFetchBaseQuery.mock.calls[0][0];
    const prepareHeaders = fetchBaseQueryArgs.prepareHeaders;

    const headers = new Headers();
    const resultHeaders = prepareHeaders(headers, {} as any);

    expect(resultHeaders.get("Content-Type")).toBe(
      "application/json; charset=utf-8"
    );
  });
});

describe("postsApi endpoints", () => {
  it("getPosts query generates the correct URL path", () => {
    const queryDefinition = postsApi.endpoints.getPosts.query();
    expect(queryDefinition).toBe("/posts");
  });

  it("getPosts query includes a transformErrorResponse function", () => {
    expect(typeof postsApi.endpoints.getPosts.transformErrorResponse).toBe(
      "function"
    );

    const mockErrorResponse = { status: 404, data: "Not Found" };
    const transformedError = postsApi.endpoints.getPosts.transformErrorResponse(
      mockErrorResponse as any,
      {} as any,
      undefined
    );

    expect(transformedError.message).toBe(
      "Unable to load posts. You might be offline."
    );
    expect(transformedError.details).toEqual(mockErrorResponse);
  });

  it("postPosts mutation generates the correct request object", () => {
    const postDetails = { body: { title: "New Post", body: "Content" } };

    const mutationDefinition = postsApi.endpoints.postPosts.query(postDetails);

    expect(mutationDefinition).toEqual({
      url: "/posts",
      method: "POST",
      body: postDetails.body,
    });
  });
});
