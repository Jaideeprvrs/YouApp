import { COLORS } from "@/src/constants/Colors";
import PostsScreen from "@/src/screens/PostsScreen";

import React from "react";
import { StyleSheet, View } from "react-native";
const Posts = () => {
  return (
    <View style={styles.conatiner} testID="posts-container">
      <PostsScreen />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  conatiner: { flex: 1, backgroundColor: COLORS.primary },
});
