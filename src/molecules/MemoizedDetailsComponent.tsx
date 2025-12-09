import { router } from "expo-router";
import { memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import DetailsComponent from "./DetailsComponent";

export const MemoizedDetailsComponent = memo(({ item }) => {
  const handlePress = useCallback(() => {
    router.push({
      pathname: "/comments",
      params: {
        postId: item?.id,
        postName: item?.title,
        postBody: item?.body,
      },
    });
  }, [item]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <DetailsComponent
        title={item?.title}
        description={item?.body}
        postId={item?.id}
      />
    </TouchableOpacity>
  );
});
