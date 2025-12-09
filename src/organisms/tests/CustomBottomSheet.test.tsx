import BottomSheet from "@gorhom/bottom-sheet";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomBottomSheet from "../CustomBottomSheet";

jest.mock("@gorhom/bottom-sheet", () => {
  const RN = require("react-native");

  return {
    __esModule: true,
    default: jest.fn(({ children, ...props }) => (
      <RN.View testID="mock-bottom-sheet" {...props}>
        {children}
      </RN.View>
    )),
    BottomSheetView: jest.fn(({ children, style }) => (
      <RN.View style={style}>{children}</RN.View>
    )),
    BottomSheetBackdrop: jest.fn((props) => (
      <RN.Text testID="mock-backdrop" {...props}>
        Backdrop
      </RN.Text>
    )),
  };
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(),
}));

const mockUseSafeAreaInsets = useSafeAreaInsets as jest.Mock;
const mockBottomSheet = BottomSheet as jest.Mock;

describe("CustomBottomSheet", () => {
  const mockSheetRef = React.createRef<BottomSheet>();
  const mockOnChange = jest.fn();
  const defaultSnapPoints = ["25%", "50%"];

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSafeAreaInsets.mockReturnValue({
      top: 0,
      bottom: 20,
      left: 0,
      right: 0,
    });
  });

  const defaultProps = {
    children: <React.Text>Test Content</React.Text>,
    sheetRef: mockSheetRef,
    snapPoints: defaultSnapPoints,
    initialSnap: 0,
    onChange: mockOnChange,
    backDrop: true,
    enablePanDown: true,
    enableContentPanning: true,
    enableHandlePanning: true,
    handleIndicator: undefined,
  };

  it("renders children and applies default safe area insets padding", () => {
    render(<CustomBottomSheet {...defaultProps} />);

    expect(screen.getByText("Test Content")).toBeDefined();

    const bottomSheetView = screen.getByText("Test Content").parent;
    expect(bottomSheetView.props.style.paddingBottom).toBe(36);

    expect(mockBottomSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        backgroundStyle: expect.arrayContaining([
          expect.objectContaining({ paddingBottom: 20 }),
        ]),
      }),
      {}
    );
  });

  it("passes all standard props correctly to the underlying BottomSheet component", () => {
    render(<CustomBottomSheet {...defaultProps} />);

    expect(mockBottomSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        ref: mockSheetRef,
        index: 0,
        snapPoints: defaultSnapPoints,
        onChange: mockOnChange,
        enablePanDownToClose: true,
        enableContentPanningGesture: true,
        enableHandlePanningGesture: true,
        handleComponent: undefined,
      }),
      {}
    );
  });

  it("renders the backdrop when the backDrop prop is true", () => {
    render(<CustomBottomSheet {...defaultProps} backDrop={true} />);

    expect(mockBottomSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        backdropComponent: expect.any(Function),
      }),
      {}
    );
  });

  it("does NOT render a backdrop when the backDrop prop is false", () => {
    render(<CustomBottomSheet {...defaultProps} backDrop={false} />);

    expect(mockBottomSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        backdropComponent: undefined,
      }),
      {}
    );
  });

  it("configures the BottomSheet correctly when pan down/content panning are disabled", () => {
    render(
      <CustomBottomSheet
        {...defaultProps}
        enablePanDown={false}
        enableContentPanning={false}
        enableHandlePanning={false}
      />
    );

    expect(mockBottomSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        enablePanDownToClose: false,
        enableContentPanningGesture: false,
        enableHandlePanningGesture: false,
      }),
      {}
    );
  });
});
