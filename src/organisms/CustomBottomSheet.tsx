import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/Colors";

interface CustomBottomSheetProps {
  children: React.ReactNode;
  sheetRef: React.RefObject<BottomSheet>;
  onChange: (index: number) => void;
  initialSnap: number;
  snapPoints: number[];
  backDrop: boolean;
  enablePanDown: boolean;
  enableContentPanning: boolean;
  enableHandlePanning: boolean;
  handleIndicator: any;
}
const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  children,
  sheetRef,
  onChange,
  initialSnap,
  snapPoints,
  backDrop,
  enablePanDown,
  enableContentPanning,
  enableHandlePanning,
  handleIndicator,
}) => {
  const insets = useSafeAreaInsets();
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (
    <BottomSheet
      ref={sheetRef}
      index={initialSnap} // Initial snap point
      snapPoints={snapPoints}
      onChange={onChange}
      enablePanDownToClose={enablePanDown}
      enableContentPanningGesture={enableContentPanning}
      enableHandlePanningGesture={enableHandlePanning}
      handleComponent={handleIndicator}
      backgroundStyle={[
        styles.bottomSheetBackground,
        { paddingBottom: insets.bottom },
      ]}
      backdropComponent={backDrop && renderBackdrop}
    >
      <BottomSheetView
        style={[styles.contentContainer, { paddingBottom: insets.bottom + 16 }]}
      >
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  bottomSheetBackground: {
    backgroundColor: COLORS.white, // Or any background color
    elevation: 20, // Adjust the value as needed for desired elevation
    shadowColor: COLORS.black, // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: COLORS.accordion,
  },
});

export default CustomBottomSheet;
