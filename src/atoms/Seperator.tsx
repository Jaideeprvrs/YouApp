import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/Colors";

const Seperator = () => {
  return <View style={styles.container} />;
};

export default Seperator;

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: COLORS.postsBackground,
  },
});
