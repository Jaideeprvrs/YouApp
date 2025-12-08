import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import CommentsIcon from "../../assets/images/message.svg";
import Avtar from "../atoms/Avtar";
import { STRINGS } from "../constants/Strings";
import { useGetCommentsQuery } from "../redux/slices/commentsApi";
interface DetailsComponentProps {
  title: string;
  description: string;
  postId?: number;

  fromPostsSection?: boolean;
}
const DetailsComponent: React.FC<DetailsComponentProps> = ({
  title,
  description,
  postId,
  fromPostsSection,
}) => {
  const { data, error, refetch } = useGetCommentsQuery(postId);
  const AnimatedView = Animated.View;

  return (
    <AnimatedView
      style={styles.container}
      entering={FadeInUp.delay(postId * 60).duration(300)}
    >
      {fromPostsSection ? (
        <Image
          source={require("../../assets/images/man.png")}
          style={{ width: 30, height: 30, borderRadius: 50 }}
          resizeMode="cover"
        />
      ) : (
        <Avtar id={postId ?? 1} />
      )}
      <View style={styles.parent}>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.body]}>{description}</Text>
        {!error && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 5,
            }}
          >
            <CommentsIcon width={18} height={18} />
            <Text style={[styles.body]}>{data?.length}</Text>
          </View>
        )}
      </View>
    </AnimatedView>
  );
};

export default memo(DetailsComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 14,
    flexShrink: 1,
  },
  body: {
    fontFamily: STRINGS.GoogleSansRegular,
    marginVertical: 5,
    fontSize: 14,
    width: "100%",
    borderRadius: 10,
    flexShrink: 1,
  },
  parent: {
    flex: 1,
    flexShrink: 1,
  },
});
