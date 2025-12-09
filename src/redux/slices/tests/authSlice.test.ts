import reducer, { loginSuccess, logout, UserData } from "../authSlice";

describe("authSlice reducer", () => {
  const initialState = {
    userData: null,
  };

  const mockUserData: UserData = {
    isLoggedIn: true,
    name: "Test User",
    email: "test@example.com",
    id: 123,
    joinedOn: new Date().toISOString(),
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle a loginSuccess action correctly", () => {
    const action = loginSuccess(mockUserData);
    const newState = reducer(initialState, action);

    expect(newState.userData).toEqual(mockUserData);
    expect(newState.userData?.isLoggedIn).toBe(true);
    expect(newState.userData?.name).toBe("Test User");
  });

  it("should overwrite existing user data on a new loginSuccess action", () => {
    const existingState = {
      userData: { ...mockUserData, name: "Old Name" },
    };
    const newUserData = {
      ...mockUserData,
      name: "New Name",
      email: "new@example.com",
    };

    const action = loginSuccess(newUserData);
    const newState = reducer(existingState, action);

    expect(newState.userData).toEqual(newUserData);
    expect(newState.userData?.name).toBe("New Name");
  });

  it("should handle a logout action correctly", () => {
    const loggedInState = {
      userData: mockUserData,
    };

    const action = logout();
    const newState = reducer(loggedInState, action);

    expect(newState.userData).toBeNull();
    expect(newState).toEqual(initialState);
  });
});
