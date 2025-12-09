import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { TextButtonProps } from "../types/TextButtonProps";

const TextButton: React.FC<TextButtonProps> = ({
  onEditPress,
  item,
  label,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onEditPress(item)}
      style={styles.wrapper}
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
    >
      <Text style={styles.edit}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
  },
  edit: {
    fontSize: 12,
    fontFamily: STRINGS.GoogleSansMedium,
    paddingTop: 10,
    color: COLORS.editComment,
    textDecorationLine: "underline",
  },
});
