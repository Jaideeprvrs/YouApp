import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { NewPostProps } from "../types/NewPostProps";

const NewPost: React.FC<NewPostProps> = ({
  postTitle,
  setPostTitle,
  post,
  setPost,
}) => {
  return (
    <View style={{ backgroundColor: COLORS.accordion, borderRadius: 10 }}>
      <BottomSheetTextInput
        style={[styles.input, { padding: 15 }]}
        placeholder={STRINGS.title}
        placeholderTextColor={COLORS.disableButton}
        multiline
        value={postTitle}
        onChangeText={setPostTitle}
        maxLength={30}
      />
      <BottomSheetTextInput
        style={[styles.input, { padding: 15 }]}
        placeholder={STRINGS.postDescPlaceholder}
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
