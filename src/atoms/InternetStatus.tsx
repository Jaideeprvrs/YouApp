import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { STRINGS } from "../constants/Strings";

const InternetStatus = () => {
  const { isConnected } = useNetInfo();

  if (isConnected) {
    return null;
  }

  return (
    <View style={styles.offlineBanner}>
      <Text style={styles.offlineText}>{STRINGS.offline}</Text>
    </View>
  );
};

export default InternetStatus;

const styles = StyleSheet.create({
  offlineBanner: {
    backgroundColor: "gray",
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  offlineText: {
    color: "white",
    fontFamily: STRINGS.GoogleSansMedium,
  },
});
