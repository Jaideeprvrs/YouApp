import { COLORS } from "@/src/constants/Colors";
import Comments from "@/src/screens/Comments";
import React from "react";
import { StyleSheet, View } from "react-native";

const CommentsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Comments />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({});
