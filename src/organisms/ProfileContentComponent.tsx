import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import AboutYouSection from "../molecules/AboutYouSection";
import CustomTabsSection from "../molecules/CustomTabSection";
import ProfileHeader from "../molecules/ProfileHeader";
import PostsSection from "./PostsSection";

interface ProfileContentComponent {
  openSheet: () => void;
}
const ProfileContentComponent: React.FC<ProfileContentComponent> = ({
  openSheet,
}) => {
  const TABS = ["Posts", "About YOU"];
  const [tabIndex, setTabIndex] = useState(0);
  const signupForm = useSelector((s) => s?.userData);
  const name = signupForm?.signupForm?.name;
  const email = signupForm?.signupForm?.email;

  return (
    <View style={[styles.container]}>
      <View style={{ marginHorizontal: 10 }}>
        <ProfileHeader
          userName={name}
          style={{ width: 60, height: 60 }}
          email={email}
        />
      </View>
      <CustomTabsSection
        tabs={TABS}
        initialIndex={0}
        onChange={(index) => setTabIndex(index)}
      />

      <View style={styles.content}>
        {tabIndex === 0 && <PostsSection openSheet={openSheet} />}
        {tabIndex === 1 && <AboutYouSection />}
      </View>
    </View>
  );
};

export default ProfileContentComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "flex-start", // 👈 was "center" before
  },
  content: {
    justifyContent: "center",
  },
  title: {
    fontFamily: STRINGS.GoogleSansMedium,
    fontSize: 20,
    textAlign: "center",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  header: {
    marginHorizontal: 20,
    paddingTop: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
});
