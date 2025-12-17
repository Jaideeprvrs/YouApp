import { memo } from "react";
import { TouchableOpacity } from "react-native";
import { MemoizedDetailsComponentProps } from "../types/MemoizedDetailsComponentProps";
import DetailsComponent from "./DetailsComponent";

export const MemoizedDetailsComponent: React.FC<MemoizedDetailsComponentProps> =
  memo(({ item, handlePress }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <DetailsComponent
          title={item?.title}
          description={item?.body}
          postId={item?.id}
          fromPostsSection={false}
        />
      </TouchableOpacity>
    );
  });
