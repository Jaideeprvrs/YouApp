import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Avtar from "../atoms/Avtar";
import TextButton from "../atoms/TextButton";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
const CommentsComponent = ({ item, onEditPress, index }) => {
  const AnimatedView = Animated.View;

  return (
    <AnimatedView
      style={styles.container}
      entering={FadeInUp.delay(index * 20).duration(300)}
    >
      <Avtar id={item?.id} />
      <View style={styles.parent}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.email}>{item?.email}</Text>
        <Text style={styles.body}>{item?.body}</Text>
        <TextButton item={item} onEditPress={onEditPress} label={"Edit"} />
      </View>
    </AnimatedView>
  );
};

export default CommentsComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
    gap: 10,
    flex: 1,
    backgroundColor: COLORS.accordion,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
  },
  title: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 14,
    flexShrink: 1,
  },
  email: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 12,
    color: COLORS.commentEmail,
  },
  body: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 14,
    borderRadius: 10,
    textAlign: "justify",
    paddingVertical: 5,
    flexShrink: 1,
  },
  parent: {
    flex: 1,
    flexShrink: 1,
  },
  edit: {
    fontSize: 12,
    fontFamily: STRINGS.GoogleSansMedium,
    paddingTop: 10,
    width: "20%",
    color: COLORS.editComment,
    // backgroundColor: "red",
  },
});
