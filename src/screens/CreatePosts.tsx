import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../atoms/ButtonComponent";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import NewPost from "../molecules/NewPost";
import ProfileHeader from "../molecules/ProfileHeader";
interface CreatePostsProps {
  userName: string;
  openSheet: any;
  sendPost: () => void;
  fromSheet: boolean;
  setPost: any;
  post: any;
  postTitle: any;
  setPostTitle: any;
}
const CreatePosts: React.FC<CreatePostsProps> = ({
  userName,
  openSheet,
  sendPost,
  fromSheet,
  setPost,
  post,
  postTitle,
  setPostTitle,
}) => {
  const { isConnected } = useNetInfo();
  console.log(isConnected, "isConnected");
  return (
    <View style={[styles.container, { padding: fromSheet ? 0 : 10 }]}>
      <ProfileHeader userName={userName} />
      {fromSheet ? (
        <NewPost
          post={post}
          postTitle={postTitle}
          setPost={setPost}
          setPostTitle={setPostTitle}
        />
      ) : (
        <TouchableOpacity
          style={{ backgroundColor: COLORS.accordion, borderRadius: 10 }}
          onPress={openSheet}
        >
          <Text style={styles.descText}>{STRINGS.postDescPlaceholder}</Text>
        </TouchableOpacity>
      )}
      {fromSheet && (
        <ButtonComponent
          label="Post"
          onClick={() => sendPost()}
          disable={!post || !isConnected}
        />
      )}
      {!fromSheet && <View style={styles.hLine} />}
    </View>
  );
};

export default CreatePosts;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    width: "100%",
    gap: 20,
  },
  descText: {
    fontFamily: STRINGS.GoogleSansRegular,
    color: COLORS.disableButton,
    padding: 15,
  },
  hLine: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: COLORS.disableButton,
  },
});
