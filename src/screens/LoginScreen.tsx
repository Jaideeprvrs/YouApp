import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { STRINGS } from "../constants/Strings";
import AnimatedLoginText from "../molecules/AnimatedLoginText";
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

  return (
    <View style={styles.container}>
      <AnimatedLoginText
        text={STRINGS.you}
        speed={150}
        style={styles.animatedText}
      />

      <CustomBottomSheet
        sheetRef={bottomSheetRef}
        initialSnap={1}
        snapPoints={["45%"]}
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
  animatedText: {
    fontSize: 50,
    fontWeight: "600",
    color: "#ffff",
    fontFamily: STRINGS.CedarvilleCursiveRegular,
  },
});
