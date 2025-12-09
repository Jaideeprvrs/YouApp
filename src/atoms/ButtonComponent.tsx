import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
interface ButtonProps {
  onClick: () => void;
  label: string;
  style?: any;
  disable?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  label,
  style,
  disable,
}) => {
  console.log(disable, "disable");
  return (
    <TouchableOpacity
      style={[styles.button, style, disable && styles.disableButton]}
      onPress={onClick}
      disabled={disable}
    >
      <Text style={disable ? styles.disableButtonText : styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.accordion,
    fontSize: 14,
    fontFamily: STRINGS.GoogleSansMedium,
  },
  disableButtonText: {
    color: COLORS.disableButton,
    fontSize: 14,
    fontFamily: STRINGS.GoogleSansMedium,
  },
  iconWrapper: {
    position: "absolute",
    right: 15,
    height: "100%",
    justifyContent: "center", // 👈 PERFECT vertical centering
  },
  disableButton: {
    backgroundColor: COLORS.accordion,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
