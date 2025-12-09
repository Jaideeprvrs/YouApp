import { render, screen } from "@testing-library/react-native";
import { STRINGS } from "../../constants/Strings";
import AnimatedLoginText from "../AnimatedLoginText"; // Adjust import path

describe("<AnimatedLoginText />", () => {
  // Test Case 1: Renders all the expected text elements
  it("displays static strings and the dynamic text provided in props", () => {
    const dynamicTextProp = "";

    render(<AnimatedLoginText text={dynamicTextProp} speed={100} />);

    // Verify the static text from STRINGS constants is present
    expect(screen.getByText(STRINGS.loginText1)).toBeDefined();
    expect(screen.getByText(STRINGS.loginText2)).toBeDefined();

    // Verify the dynamic text is rendered by our mock component
    expect(screen.getByText(dynamicTextProp)).toBeDefined();
  });

  // Test Case 2: Passes the correct props to the internal component
  it('passes the correct "text" prop to the mocked AnimatedText component', () => {
    const testText = "can’t explain.";

    render(<AnimatedLoginText text={testText} />);

    // Find the mocked component using the testID we defined in the mock
    const animatedTextMock = screen.getByTestId("mock-animated-text");

    // Verify the children (text content) of that mock element is correct
    expect(animatedTextMock.props.children).toBe(testText);
  });
});
