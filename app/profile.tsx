import { COLORS } from "@/src/constants/Colors";
import ProfileScreen from "@/src/screens/Profile";
import React from "react";
import { StyleSheet, View } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <ProfileScreen />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
  },
});
