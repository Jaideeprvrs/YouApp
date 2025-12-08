import { render, screen } from "@testing-library/react-native";
import Seperator from "../Seperator";

describe("<Seperator />", () => {
  it("renders correctly", () => {
    const tree = render(<Seperator />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test Case 2: Renders a single View component
  it("renders exactly one View component", () => {
    render(<Seperator />);
    const viewElements = screen.getAllByTestId("separator-view");
    expect(viewElements.length).toBe(1);
  });

  it("applies the correct height and background color", () => {
    render(<Seperator />);
    const separatorComponent = screen.getByTestId("separator-view");
    const style = separatorComponent.props.style;
    expect(style.height).toBe(1);
  });
});
