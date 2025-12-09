import { STRINGS } from "@/src/constants/Strings";
import { commentsApi } from "../commentsApi";

describe("commentsApi configuration", () => {
  it("should have the correct reducer path", () => {
    expect(commentsApi.reducerPath).toBe("commentsApi");
  });

  it("should use the correct base URL from constants", () => {
    const baseQueryUrl = commentsApi.endpoints.getComments.match.baseQuery({
      getState: () => ({}),
      endpoint: "getComments",
      type: "query",
    }).baseUrl;

    expect(baseQueryUrl).toBe(STRINGS.url);
  });

  it('should define the "Comments" tag type', () => {
    expect(commentsApi.tagTypes).toEqual(["Comments"]);
  });

  it("should generate the useGetCommentsQuery hook", () => {
    expect(typeof commentsApi.useGetCommentsQuery).toBe("function");
  });

  it("should generate the useUpdateCommentMutation hook", () => {
    expect(typeof commentsApi.useUpdateCommentMutation).toBe("function");
  });
});

describe("commentsApi endpoints configuration", () => {
  it("getComments query generates the correct URL", () => {
    const postId = 1;

    const queryDefinition = commentsApi.endpoints.getComments.query(postId);

    expect(queryDefinition).toBe(`/posts/${postId}/comments`);

    const providedTags = commentsApi.endpoints.getComments.providesTags(
      {} as any,
      undefined,
      postId
    );
    expect(providedTags).toEqual(["Comments"]);
  });

  it("updateComment mutation generates the correct request object", () => {
    const updateDetails = { id: 5, body: { comment: "Updated Comment Body" } };

    const mutationDefinition =
      commentsApi.endpoints.updateComment.query(updateDetails);

    expect(mutationDefinition).toEqual({
      url: `/comments/${updateDetails.id}`,
      method: "PATCH",
      body: updateDetails.body,
    });
  });
});
