import { dateConversion } from "../dateConversion";

const { formatDate } = dateConversion();

describe("dateConversion Utility Function Unit Tests", () => {
  const originalDate = global.Date;

  beforeAll(() => {
    const MockDate = jest.fn(
      () => new originalDate("2024-05-20T10:00:00.000Z")
    );
    MockDate.UTC = originalDate.UTC;
    MockDate.parse = originalDate.parse;
    MockDate.now = originalDate.now;
    global.Date = MockDate;
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  it('formats a standard ISO date string to "DD Mon, YYYY" format', () => {
    const inputDateString = "2023-05-15T12:00:00Z";
    const expectedOutput = "15 May, 2023";

    const result = formatDate(inputDateString);
    expect(result).toBe(expectedOutput);
  });

  it("formats a date string for a different month and year", () => {
    const inputDateString = "2025-01-01T05:00:00Z";
    const expectedOutput = "01 Jan, 2025";

    const result = formatDate(inputDateString);
    expect(result).toBe(expectedOutput);
  });

  it("handles a Date object input correctly", () => {
    const inputDateObject = new originalDate(2022, 11, 25);
    const expectedOutput = "25 Dec, 2022";

    const result = formatDate(inputDateObject);
    expect(result).toBe(expectedOutput);
  });

  it("ensures single-digit days have a leading zero", () => {
    const inputDateString = "2021-07-07T00:00:00Z";
    const expectedOutput = "07 Jul, 2021";

    const result = formatDate(inputDateString);
    expect(result).toBe(expectedOutput);
  });

  it('returns "Invalid Date" for an invalid input string', () => {
    const invalidInput = "not a date string";
    const expectedOutput = "Invalid Date";

    const result = formatDate(invalidInput);

    expect(result).toBe(expectedOutput);
  });
});
