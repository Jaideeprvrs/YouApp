import { COLORS } from "@/src/constants/Colors";
import Posts from "@/src/screens/Posts";
import React from "react";
import { StyleSheet, View } from "react-native";
const PostsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      {/* <StatusBar style="dark" /> */}
      <Posts />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({});
