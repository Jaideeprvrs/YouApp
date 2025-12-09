import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import InternetStatus from "../atoms/InternetStatus";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import ErrorComponent from "../molecules/ErrorComponent";
import { MemoizedDetailsComponent } from "../molecules/MemoizedDetailsComponent";
import CreatePosts from "../organisms/CreatePosts";
import CustomBottomSheet from "../organisms/CustomBottomSheet";
import { useGetPostsQuery } from "../redux/slices/postsApi";
import { useUserServices } from "../services/userService";
const PostsScreen = () => {
  const { isConnected } = useNetInfo();
  const [connectionInitialized, setConnectionInitialized] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const userData = useSelector((state) => state.authData.userData);
  const userName = userData?.name;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [postTitle, setPostTitle] = useState(null);
  useEffect(() => {
    if (isConnected !== null) {
      setConnectionInitialized(true);
    }
  }, [isConnected]);
  const {
    handleCreatePost,
    isLoading: postLoading,
    isSuccess: postSuccess,
  } = useUserServices();
  const {
    data: onlinePosts,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useGetPostsQuery();

  const [refreshing, setRefreshing] = useState(false);
  const handlePress = useCallback((item) => {
    router.push({
      pathname: "/comments",
      params: {
        postId: item?.id,
        postName: item?.title,
        postBody: item?.body,
      },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      return <MemoizedDetailsComponent item={item} handlePress={handlePress} />;
    },
    [handlePress]
  );
  useEffect(() => {
    (async () => {
      const persisted = await AsyncStorage.getItem("persist:root");
      // console.log("PERSIST ROOT RAW =>", persisted);
    })();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      refetch();
      setRefreshing(false);
    }, 2000);
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setIsSheetOpen(false);
    } else {
      setIsSheetOpen(true);
    }
  }, []);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const createPost = async () => {
    try {
      const res = await handleCreatePost({ post, postTitle });
      refetch();
      bottomSheetRef.current?.close();
      setPost("");
      setPostTitle("");
    } catch (e) {
      // optional extra handling
    }
  };
  const Header = useCallback(
    () => <CreatePosts userName={userName} openSheet={handleOpenSheet} />,
    [userName, handleOpenSheet]
  );

  if (isLoading && !onlinePosts)
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={COLORS.secondary}
      />
    );
  if (isFetching)
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={COLORS.secondary}
      />
    );
  if (error && !onlinePosts)
    return (
      <ErrorComponent
        message={STRINGS.errorMessage}
        onClick={() => {
          refetch();
        }}
        onClickText={STRINGS.retry}
        title={STRINGS.errorTitle}
      />
    );

  return (
    <View style={styles.container}>
      {connectionInitialized && !isConnected && <InternetStatus />}
      <FlatList
        data={onlinePosts}
        ListHeaderComponent={Header}
        renderItem={renderItem}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        contentContainerStyle={{ paddingBottom: 0 }}
        windowSize={5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.secondary]}
            progressBackgroundColor={COLORS.white}
          />
        }
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      />
      <CustomBottomSheet
        backDrop={true}
        enablePanDown={true}
        enableHandlePanning={true}
        enableContentPanning={true}
        initialSnap={-1}
        onChange={handleSheetChanges}
        sheetRef={bottomSheetRef}
        snapPoints={["60%"]}
      >
        <CreatePosts
          userName={userName}
          openSheet={handleOpenSheet}
          sendPost={createPost}
          fromSheet={true}
          isSheetOpen={isSheetOpen}
          setPost={setPost}
          post={post}
          setPostTitle={setPostTitle}
          postTitle={postTitle}
        />
      </CustomBottomSheet>
    </View>
  );
};

export default PostsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: COLORS.white,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    fontFamily: STRINGS.GoogleSansRegular,
  },
  indicator: { alignSelf: "center", justifyContent: "center", flex: 1 },
  parent: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 12,
    color: COLORS.black,
  },
  subTitle: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 12,
    color: COLORS.editComment,
  },
});
