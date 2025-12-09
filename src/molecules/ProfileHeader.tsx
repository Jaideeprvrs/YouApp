import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { ProfileHeaderProps } from "../types/ProfileHeaderProps";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  style,
  email,
}) => {
  return (
    <View style={styles.parent}>
      <Image
        source={require("../../assets/images/man.png")}
        style={[styles.image, style]}
        resizeMode="cover"
      />
      <View style={{ gap: 2 }}>
        <Text style={styles.title}>Hello {userName}!</Text>
        {email ? (
          <Text style={styles.email}>{email}</Text>
        ) : (
          <Text style={styles.subTitle}>What's New?</Text>
        )}
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  title: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 14,
    color: COLORS.black,
  },
  subTitle: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 12,
    color: COLORS.editComment,
  },
  email: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 14,
    textAlign: "left",
    color: COLORS.editComment,
  },
});
