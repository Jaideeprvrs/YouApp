import { COLORS } from "@/src/constants/Colors";
import Posts from "@/src/screens/Posts";
import React from "react";
import { StyleSheet, View } from "react-native";
const PostsScreen = () => {
  return (
    <View style={styles.conatiner}>
      <Posts />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  conatiner: { flex: 1, backgroundColor: COLORS.primary },
});
