import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { STRINGS } from "../constants/Strings";
import DetailsComponent from "../molecules/DetailsComponent";
import NoPostsComponent from "../molecules/NoPostsComponent";
import { ProfileComponentProps } from "../types/ProfileChildrenProps";

const PostsSection: React.FC<ProfileComponentProps> = ({ openSheet }) => {
  const postsData = useSelector((s) => s?.postsData);

  const posts = postsData?.createdPosts;

  const renderItem = useCallback(({ item, index }) => {
    return (
      <DetailsComponent
        title={item?.title}
        description={item?.body}
        fromPostsSection={true}
        postId={item?.id}
        index={index}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
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
          message={STRINGS.noPostsdesc}
          onClickText={STRINGS.createPost}
          title={STRINGS.noPostsTitle}
          onClick={openSheet}
        />
      )}
    </View>
  );
};

export default PostsSection;

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 10 },
});
