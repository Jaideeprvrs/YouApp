import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import CommentsComponent from "../molecules/CommentsComponent";
import ErrorComponent from "../molecules/ErrorComponent";
import PostInsideComments from "../molecules/PostInsideComments";
import UpdatedCommentForm from "../molecules/UpdatedCommentForm";
import CustomBottomSheet from "../organisms/CustomBottomSheet";
import { useGetCommentsQuery } from "../redux/slices/commentsApi";
import { useUserServices } from "../services/userService";

export default function CommentsScreen() {
  const { postId, postName, postBody } = useLocalSearchParams();
  const { data, error, refetch, isLoading, isFetching } =
    useGetCommentsQuery(postId);
  const { handleUpdateComment } = useUserServices();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenSheet = useCallback((item) => {
    setSelectedComment(item);
    bottomSheetRef.current?.expand();
  }, []);

  const renderItem = useCallback(
    (item, index) => (
      <CommentsComponent
        item={item}
        onEditPress={handleOpenSheet}
        index={index}
      />
    ),
    []
  );
  const handleOnUpdate = async () => {
    if (!selectedComment) return;
    const id = selectedComment.id;
    const body = selectedComment.body;
    try {
      await handleUpdateComment({ id, body });
      refetch();
      bottomSheetRef.current?.close();
    } catch (error) {
      console.log("API Error:", error);
    }
  };
  useEffect(() => {
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      bottomSheetRef.current?.snapToIndex(0);
    });

    return () => hide.remove();
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

  if (isLoading || isFetching)
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={COLORS.secondary}
      />
    );

  return (
    <View style={styles.container}>
      <PostInsideComments
        title={postName}
        description={postBody}
        postId={postId}
        commentsCount={data?.length}
      />
      {!error ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 0 }}
            style={{ flex: 1 }}
            renderItem={({ item, index }) => renderItem(item, index)}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.secondary]}
                progressBackgroundColor={COLORS.white}
              />
            }
          />
        </View>
      ) : (
        <ErrorComponent
          message={STRINGS.errorMessage}
          onClick={refetch}
          onClickText={STRINGS.retry}
          title={STRINGS.errorTitle}
        />
      )}
      <CustomBottomSheet
        sheetRef={bottomSheetRef}
        onChange={handleSheetChanges}
        initialSnap={-1}
        snapPoints={["45%"]}
        backDrop={true}
        enablePanDown={true}
        enableHandlePanning={true}
        enableContentPanning={true}
      >
        {isSheetOpen && (
          <UpdatedCommentForm
            value={selectedComment?.body}
            label={selectedComment?.name}
            email={selectedComment?.email}
            onChangeText={(text) =>
              setSelectedComment((prev) => ({ ...prev, body: text }))
            }
            id={postId}
            onUpdate={handleOnUpdate}
            isSheetOpen={isSheetOpen}
          />
        )}
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 12,
  },
  email: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 12,
  },
  body: {
    fontFamily: STRINGS.GoogleSansRegular,
    marginVertical: 5,
    fontSize: 13,
    width: "100%",
    borderRadius: 10,
  },
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    fontFamily: STRINGS.GoogleSansMedium,
    color: COLORS.commentEmail,
    marginVertical: 10,
  },
});
