import reducer, { addUserPost, UserPost } from "../postDataSlice";

describe("postsDataSlice reducer", () => {
  const initialState = {
    createdPosts: [],
  };

  const mockPost: UserPost = {
    title: "Test Title",
    body: "This is a test post body.",
    id: 1,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle adding the first user post correctly", () => {
    const action = addUserPost(mockPost);
    const newState = reducer(initialState, action);

    expect(newState.createdPosts).toHaveLength(1);
    expect(newState.createdPosts[0]).toEqual(mockPost);
  });

  it("should prepend a new post to existing posts", () => {
    const existingPost: UserPost = {
      title: "Older Post",
      body: "This was posted first.",
      id: 0,
    };
    const stateWithExistingPost = {
      createdPosts: [existingPost],
    };

    const action = addUserPost(mockPost);
    const newState = reducer(stateWithExistingPost, action);

    expect(newState.createdPosts).toHaveLength(2);

    expect(newState.createdPosts[0]).toEqual(mockPost);

    expect(newState.createdPosts[1]).toEqual(existingPost);
  });
});
