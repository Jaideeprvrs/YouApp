import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import CommentsIcon from "../../assets/images/message.svg";
import Avtar from "../atoms/Avtar";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { PostProps } from "../types/PostProps";

const PostInsideComments: React.FC<PostProps> = ({
  title,
  description,
  postId,
  commentsCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Avtar id={postId} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.body}>{description}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <CommentsIcon width={18} height={18} />
        <Text style={styles.body}>{commentsCount}</Text>
      </View>
    </View>
  );
};

export default memo(PostInsideComments);

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginHorizontal: 10,
    marginTop: 10,
    // paddingHorizontals: 10,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 10,
  },

  title: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 14,
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
  },

  body: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black,
    flexShrink: 1,
  },
});
