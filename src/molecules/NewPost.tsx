import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";

const NewPost = ({ postTitle, setPostTitle, post, setPost }) => {
  return (
    <View style={{ backgroundColor: COLORS.accordion, borderRadius: 10 }}>
      <BottomSheetTextInput
        style={[styles.input, { padding: 15 }]}
        placeholder="Title"
        placeholderTextColor={COLORS.disableButton}
        multiline
        value={postTitle}
        onChangeText={setPostTitle}
        maxLength={20}
      />
      <BottomSheetTextInput
        style={[styles.input, , { padding: 15 }]}
        placeholder="Write about YOU..."
        placeholderTextColor={COLORS.disableButton}
        multiline
        value={post}
        onChangeText={setPost}
      />
    </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderRadius: 10,
    fontFamily: STRINGS.GoogleSansRegular,
  },
});
