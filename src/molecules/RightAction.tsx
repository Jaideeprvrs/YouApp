import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import Delete from "../../assets/images/trash.svg";
import { COLORS } from "../constants/Colors";
const ACTION_WIDTH = 80;
const RightAction = ({ handleDelete, dragX }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value + ACTION_WIDTH }],
  }));

  return (
    <Animated.View style={[styles.rightAction, animatedStyle]}>
      <TouchableOpacity
        onPress={handleDelete}
        style={[styles.deleteIcon, styles.shadow]}
      >
        <Delete width={20} height={20} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RightAction;

const styles = StyleSheet.create({
  deleteIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: COLORS.white,
  },
  rightAction: {
    width: ACTION_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});
