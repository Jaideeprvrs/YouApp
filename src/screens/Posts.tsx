import BottomSheet from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-root-toast";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { router } from "expo-router";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import DetailsComponent from "../molecules/DetailsComponent";
import ErrorComponent from "../molecules/ErrorComponent";
import CustomBottomSheet from "../organisms/CustomBottomSheet";
import { useGetPostsQuery } from "../redux/slices/postsApi";
import { useUserServices } from "../services/userService";
import CreatePosts from "./CreatePosts";
const Posts = () => {
  const { isConnected } = useNetInfo();
  const navigation = useNavigation();
  const route = useRoute();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { userName } = route?.params;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [postTitle, setPostTitle] = useState(null);

  const {
    handleCreatePost,
    isLoading: postLoading,
    isSuccess: postSuccess,
  } = useUserServices();
  const { data, error, isLoading, refetch, isFetching } = useGetPostsQuery(
    undefined,
    {
      skip: !isConnected,
    }
  );
  const [refreshing, setRefreshing] = useState(false);
  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        onPress={
          () =>
            router.push({
              pathname: "/comments",
              params: {
                postId: item?.id,
                postName: item?.title,
                postBody: item?.body,
              },
            })
          // navigation.navigate("comments", {
          //   postId: item?.id,
          //   postName: item?.title,
          //   postBody: item?.body,
          // })
        }
      >
        <DetailsComponent
          title={item?.title}
          description={item?.body}
          postId={item?.id}
        />
      </TouchableOpacity>
    );
  }, []);
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
    // setSelectedComment(item);
    bottomSheetRef.current?.expand(); // or .snapToIndex(1)
  }, []);

  const createPost = async () => {
    try {
      const res = await handleCreatePost({ post, postTitle });
      console.log(res, "testres");
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

  if (isLoading || isFetching || postLoading)
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={COLORS.secondary}
      />
    );
  if (error)
    return (
      <ErrorComponent
        message={STRINGS.errorMessage}
        onOk={() => {
          refetch();
        }}
        onOkText={STRINGS.retry}
        title={STRINGS.errorTitle}
      />
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
      <Toast />
    </View>
  );
};

export default Posts;
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
