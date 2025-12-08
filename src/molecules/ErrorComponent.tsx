import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NetworkError from "../../assets/images/networkError.svg";
import ButtonComponent from "../atoms/ButtonComponent";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
type Props = {
  onOk: () => void;
  onOkText: string;
  title: string;
  message: string;
};

const ErrorComponent: React.FC<Props> = ({
  onOk,
  onOkText,
  title,
  message,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.Container}>
        <View style={{ alignSelf: "center", marginVertical: 10 }}>
          <NetworkError width={150} height={150} />
        </View>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttonRow}>
          {onOk && <ButtonComponent label={onOkText} onClick={onOk} />}
        </View>
      </View>
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Container: {
    width: "80%",
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: STRINGS.GoogleSansMedium,
    marginBottom: 10,
    color: COLORS.black,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    fontFamily: STRINGS.GoogleSansRegular,
    color: COLORS.black,
    marginBottom: 30,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  cancelBtn: {
    backgroundColor: COLORS.black,
  },
  cancelText: {
    color: COLORS.white,
    fontFamily: STRINGS.GoogleSansMedium,
    textAlign: "center",
  },
});
