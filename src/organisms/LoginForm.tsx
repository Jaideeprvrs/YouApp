import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../atoms/ButtonComponent";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";

const LoginForm = ({ name, email, setName, setEmail, handleOnClick }) => {
  const isValidEmail = (text) => {
    const regex = STRINGS.emailRegex;
    return regex.test(text);
  };

  const isButtonDisabled =
    !name?.trim() || !email?.trim() || !isValidEmail(email);

  return (
    <View style={styles.parent}>
      <View>
        <Text
          style={{
            fontFamily: STRINGS.GoogleSansMedium,
            textAlign: "center",
          }}
        >
          {STRINGS.loginDesc}
        </Text>
      </View>

      <View>
        <Text style={styles.label}>{STRINGS.name}</Text>
        <BottomSheetTextInput
          style={styles.input}
          placeholder={STRINGS.name}
          placeholderTextColor={COLORS.placeHolder}
          value={name}
          onChangeText={setName}
          maxLength={20}
        />
      </View>

      <View>
        <Text style={styles.label}>{STRINGS.email}</Text>
        <BottomSheetTextInput
          style={styles.input}
          placeholder={STRINGS.email}
          placeholderTextColor={COLORS.placeHolder}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <ButtonComponent
        label={STRINGS.loginButtonText}
        onClick={handleOnClick}
        style={styles.button}
        disable={isButtonDisabled}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: STRINGS.GoogleSansRegular,
    color: COLORS.black,
    marginBottom: 6,
    fontWeight: "500",
  },

  input: {
    height: 50,
    fontFamily: STRINGS.GoogleSansRegular,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    fontSize: 14,
  },
  button: {
    // height: "15%",
    justifyContent: "center",
    borderRadius: 50,
  },
  parent: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 20,
    borderRadius: 20,
    gap: 30,
  },
});
