import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/Colors";
import { useUserServices } from "../hooks/useUserServices";
import CreatePosts from "../organisms/CreatePosts";
import CustomBottomSheet from "../organisms/CustomBottomSheet";
import ProfileContentComponent from "../organisms/ProfileContentComponent";

const ProfileScreen = () => {
  const [post, setPost] = useState(null);
  const [postTitle, setPostTitle] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const signupForm = useSelector((s) => s?.userData);
  const name = signupForm?.signupForm?.name;
  const email = signupForm?.signupForm?.email;
  const {
    handleCreatePost,
    isLoading: postLoading,
    isSuccess: postSuccess,
  } = useUserServices();
  const handleSheetChanges = useCallback((index: number) => {
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
      await handleCreatePost({ post, postTitle });
      bottomSheetRef.current?.close();
      Keyboard.dismiss();
      setPost("");
      setPostTitle("");
    } catch (e) {
      // optional extra handling
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <ProfileContentComponent openSheet={handleOpenSheet} />
      <CustomBottomSheet
        backDrop={true}
        enablePanDown={true}
        enableHandlePanning={true}
        enableContentPanning={true}
        initialSnap={-1}
        onChange={handleSheetChanges}
        sheetRef={bottomSheetRef}
        snapPoints={["45%"]}
      >
        <CreatePosts
          userName={name}
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
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
