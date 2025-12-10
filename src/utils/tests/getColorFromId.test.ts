import { getColorFromId } from "../getColorFromId";

describe("getColorFromId Utility Function Unit Tests", () => {
  it("returns a consistent hex color for a given string ID", () => {
    const id = "user-abc-123";
    const expectedColor = "#4ECDC4";
    const result = getColorFromId(id);

    expect(result).toBe(expectedColor);
  });

  it("always returns the same color for the same input ID", () => {
    const id = "another-test-id";
    const color1 = getColorFromId(id);
    const color2 = getColorFromId(id);
    const color3 = getColorFromId(id);

    expect(color1).toBe(color2);
    expect(color2).toBe(color3);
    expect(color1).toBe("#E91E63");
  });

  it("returns different colors for different input IDs", () => {
    const id1 = "post-1";
    const id2 = "post-2";
    const color1 = getColorFromId(id1);
    const color2 = getColorFromId(id2);

    expect(color1).toBe("#4ECDC4");
    expect(color2).toBe("#6A5ACD");
    expect(color1).not.toBe(color2);
  });

  it("handles numeric IDs passed as strings correctly", () => {
    const idString = "999";
    const expectedColor = "#4ECDC4";
    const result = getColorFromId(idString);

    expect(result).toBe(expectedColor);
  });

  it("returns a color for an empty string input (defaults to index 0 due to hash being 0)", () => {
    const id = "";
    const expectedColor = "#FF6B6B";
    const result = getColorFromId(id);

    expect(result).toBe(expectedColor);
  });

  it("always returns one of the colors in the internal color array", () => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA500",
      "#6A5ACD",
      "#2ECC71",
      "#E91E63",
      "#3498DB",
      "#9B59B6",
      "#F1C40F",
    ];
    const testIds = ["1", "2", "3", "userA", "userB", "test!", "@#$"];

    testIds.forEach((id) => {
      const color = getColorFromId(id);
      expect(colors).toContain(color);
    });
  });
});
