import BottomSheet from "@gorhom/bottom-sheet";

export interface CustomBottomSheetProps {
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
