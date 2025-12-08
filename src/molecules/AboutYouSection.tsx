import { router, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { dateConversion } from "../utils/dateConversion";

const AboutYouSection = () => {
  const signupForm = useSelector((s) => s?.userData);
  const navigation = useNavigation();
  const name = signupForm?.signupForm?.name;
  const email = signupForm?.signupForm?.email;
  const joinedOn = signupForm?.signupForm?.createdAt;
  const { formatDate } = dateConversion();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.body}>{name}</Text>
      </View>
      <View>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.body}>{email}</Text>
      </View>
      <View>
        <Text style={styles.title}>Joined On</Text>
        <Text style={styles.body}>{formatDate(joinedOn)}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push("/login");
        }}
      >
        <Text style={[styles.title, styles.logout]}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutYouSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "flex-start",
    gap: 30,
    alignItems: "flex-start",
    padding: 20,
  },
  title: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 14,
    color: COLORS.editComment,
  },
  body: {
    fontFamily: STRINGS.GoogleSansRegular,
    fontSize: 18,
    color: COLORS.black,
  },
  logout: {
    color: COLORS.secondary,
    textDecorationLine: "underline",
  },
});
