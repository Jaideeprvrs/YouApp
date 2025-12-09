import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/Colors";
import DetailsComponent from "../molecules/DetailsComponent";
import NoPostsComponent from "../molecules/NoPostsComponent";

const PostsSection = ({ openSheet }) => {
  const postsData = useSelector((s) => s?.postsData);

  const posts = postsData?.createdPosts;

  const renderItem = useCallback(({ item }) => {
    return (
      <View>
        <DetailsComponent
          title={item?.title}
          description={item?.body}
          fromPostsSection={true}
        />
      </View>
    );
  }, []);
  console.log(posts?.length, "posts?.length");
  return (
    <View style={{ flex: 1, padding: 10 }}>
      {posts?.length != 0 ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          initialNumToRender={3}
          maxToRenderPerBatch={2}
          contentContainerStyle={{ paddingBottom: 0 }}
          windowSize={5}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
      ) : (
        <NoPostsComponent
          message="You din't post anything about YOU"
          onOkText="Create a post"
          title="No Posts"
          onOk={openSheet}
        />
      )}
    </View>
  );
};

export default PostsSection;

const styles = StyleSheet.create({
  hLine: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: COLORS.disableButton,
  },
});
