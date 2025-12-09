import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { logout } from "../redux/slices/authSlice";
import { dateConversion } from "../utils/dateConversion";

const AboutYouSection = () => {
  const authData = useSelector((state) => state.authData.userData);
  const name = authData?.name;
  const email = authData?.email;
  const joinedOn = authData?.joinedOn;
  console.log(joinedOn, "joinedOn");
  const { formatDate } = dateConversion();
  const dispatch = useDispatch();
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
          const obj = {
            name: "",
            email: "",
            joinedOn: "",
            id: "",
            isLoggedIn: false,
          };
          dispatch(logout());
          // router.push("/index");
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
