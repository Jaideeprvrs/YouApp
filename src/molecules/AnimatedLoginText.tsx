import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedText from "../atoms/AnimatedText";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";

const AnimatedLoginText = ({ text, speed = 60, style }) => {
  return (
    <View style={styles.headerCard}>
      <Text style={styles.appTitle} numberOfLines={4}>
        {STRINGS.loginText1}
      </Text>
      <AnimatedText text={text} speed={speed} style={style} />
      <Text
        style={styles.appTitle}
        numberOfLines={4}
        testID="mock-animated-text"
      >
        {STRINGS.loginText2}
      </Text>
    </View>
  );
};

export default AnimatedLoginText;

const styles = StyleSheet.create({
  headerCard: {
    height: "80%",
    width: "100%",
    backgroundColor: COLORS.secondary,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 20,
  },
  appTitle: {
    textAlign: "left",
    fontSize: 30,
    fontFamily: STRINGS.GoogleSansBold,
    color: COLORS.white,
    // marginBottom: 10,
  },
});
