import Toast from "react-native-root-toast";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";

export const showToast = (message: string) => {
  let toast = Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    backgroundColor: COLORS.toast,
    textColor: COLORS.white,
    opacity: 1,
    shadow: false,
    containerStyle: {
      borderRadius: 12,
      paddingHorizontal: 20,
    },
    textStyle: {
      fontSize: 16,
      fontFamily: STRINGS.GoogleSansMedium,
    },
  });
  return toast;
};
