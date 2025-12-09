import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import AnimatedLoginText from "../molecules/AnimatedLoginText";
// import LoginForm from "../organisms/LoginForm";
import CustomBottomSheet from "../organisms/CustomBottomSheet";
import LoginForm from "../organisms/LoginForm";
import { loginSuccess } from "../redux/slices/authSlice";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOnClick = () => {
    const obj = {
      name: name,
      email: email,
      joinedOn: new Date().toISOString(),
      id: Date.now().toString(),
      isLoggedIn: true,
    };
    dispatch(loginSuccess(obj));
    router.push({ pathname: "/posts", params: { userName: name } });
  };

  useEffect(() => {
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      bottomSheetRef.current?.snapToIndex(0);
    });

    return () => hide.remove();
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedLoginText
        text={STRINGS.you}
        speed={150}
        style={styles.animatedText}
      />

      <CustomBottomSheet
        sheetRef={bottomSheetRef}
        initialSnap={0}
        snapPoints={["50%"]}
        backDrop={false}
        enablePanDown={false}
        enableContentPanning={false}
        enableHandlePanning={false}
        handleIndicator={null}
      >
        <LoginForm
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          handleOnClick={handleOnClick}
        />
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.secondary,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 20,
  },
  parent: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 20,
    borderRadius: 20,
    gap: 30,
  },
  appTitle: {
    textAlign: "left",
    fontSize: 50,
    fontFamily: STRINGS.GoogleSansBold,
    color: COLORS.white,
    // marginBottom: 10,
  },

  animatedText: {
    fontSize: 50,
    fontWeight: "600",
    color: "#ffff",
    fontFamily: STRINGS.CedarvilleCursiveRegular,
  },
});
