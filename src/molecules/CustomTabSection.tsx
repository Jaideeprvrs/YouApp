import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { CustomTabsProps } from "../types/CustomTabsProps";
const { width } = Dimensions.get("window");

const CustomTabsSection: React.FC<CustomTabsProps> = ({
  tabs,
  onChange,
  initialIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const tabWidth = width / tabs.length;

  const translateX = useRef(
    new Animated.Value(initialIndex * tabWidth)
  ).current;

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);

    Animated.timing(translateX, {
      toValue: index * tabWidth,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, { width: tabWidth }]}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabLabel,
                activeIndex === index && styles.tabLabelActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}

        {/* ✅ Sliding Indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth - 30,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default CustomTabsSection;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  },
  tabRow: {
    flexDirection: "row",
    // position: "relative",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  tab: {
    paddingVertical: 12,
    alignItems: "center",
    // justifyContent: "center",
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: STRINGS.GoogleSansMedium,
    color: COLORS.editComment,
  },
  tabLabelActive: {
    color: COLORS.secondary,
    fontWeight: "600",
  },
  indicator: {
    position: "absolute",
    height: 3,
    borderRadius: 999,
    backgroundColor: COLORS.secondary,
    bottom: 0,
    left: 15,
  },
});
