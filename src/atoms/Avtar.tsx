import React from "react";
import { StyleSheet, View } from "react-native";
import Avatar from "../../assets/images/person.svg";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { getColorFromId } from "../utils/getColorFromId";
const Avtar = ({ id }: any) => {
  const bgColor = getColorFromId(id.toString());
  return (
    <View
      style={[styles.avtar, { backgroundColor: bgColor }]}
      testID="avatar-container"
    >
      <Avatar width={15} height={15} />
    </View>
  );
};

export default Avtar;

const styles = StyleSheet.create({
  avtar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center", // vertical center
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
  id: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 12,
    color: COLORS.white,
  },
});
