import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import Avtar from "../atoms/Avtar";
import ButtonComponent from "../atoms/ButtonComponent";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";

interface TextInputProps {
  label?: string;
  email?: string;
  onChangeText?: any;
  id?: number;
  onUpdate?: () => void;
}

const TextInputField: React.FC<TextInputProps> = ({
  label,
  value,
  email,
  onChangeText,
  id,
  isSheetOpen,
  onUpdate,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avtar id={id} />
        <View style={{ flex: 1 }}>
          {label && <Text style={[styles.label]}>{label}</Text>}
          {email && <Text style={[styles.email]}>{email}</Text>}
        </View>
      </View>
      <BottomSheetTextInput
        style={styles.input}
        placeholderTextColor="#999"
        value={value}
        multiline
        onChangeText={onChangeText}
        // autoFocus={isSheetOpen}
      />
      <ButtonComponent label="Update" onClick={onUpdate} />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 14,
    color: COLORS.black,
    flexShrink: 1,
  },
  input: {
    width: "100%",
    fontFamily: STRINGS.GoogleSansRegular,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: COLORS.black,
    backgroundColor: COLORS.white,
    marginVertical: 15,
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
  email: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 12,
    color: COLORS.commentEmail,
    flexShrink: 1,
  },
  profile: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    // flexShrink: 1,
  },
});
