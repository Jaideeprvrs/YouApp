import { COLORS } from "@/src/constants/Colors";
import CommentsScreen from "@/src/screens/CommentsScreen";
import React from "react";
import { StyleSheet, View } from "react-native";

const Comments = () => {
  return (
    <View style={styles.container} testID="comments-container">
      <CommentsScreen />
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
});
