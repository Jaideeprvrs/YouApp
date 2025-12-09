import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NoData from "../../assets/images/nodata.svg";
import ButtonComponent from "../atoms/ButtonComponent";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
import { NoPostComponentProps } from "../types/NoPostComponentProps";

const NoPostsComponent: React.FC<NoPostComponentProps> = ({
  onClick,
  onClickText,
  title,
  message,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.Container}>
        <View style={styles.image}>
          <NoData width={150} height={150} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttonRow}>
          {onClick && <ButtonComponent label={onClickText} onClick={onClick} />}
        </View>
      </View>
    </View>
  );
};

export default NoPostsComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Container: {
    width: "80%",
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: STRINGS.GoogleSansMedium,
    marginBottom: 10,
    color: COLORS.black,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    fontFamily: STRINGS.GoogleSansRegular,
    color: COLORS.black,
    marginBottom: 30,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 10,
  },
  image: { alignSelf: "center", marginVertical: 10 },
});
