import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Remainder from "../../assets/images/remainder.svg";
import { COLORS } from "../constants/Colors";
import { STRINGS } from "../constants/Strings";
type Props = {
  visible: boolean;
  onOk?: () => void;
  onOkText: string;
  title: string;
  message: string;
};

const ConfirmationComponent: React.FC<Props> = ({
  visible,
  onOk,
  onOkText,
  title,
  message,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={{ alignSelf: "center", marginBottom: 20 }}>
            <Remainder />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            <View style={styles.buttonRow}>
              {onOk && (
                <TouchableOpacity
                  style={[styles.button, styles.deleteBtn]}
                  onPress={onOk}
                >
                  <Text style={styles.deleteText}>{onOkText}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontFamily: STRINGS.GoogleSansMedium,
    marginBottom: 10,
    color: COLORS.black,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontFamily: STRINGS.GoogleSansRegular,
    color: COLORS.black,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },

  deleteBtn: {
    backgroundColor: COLORS.secondary,
  },

  deleteText: {
    color: COLORS.white,
    fontFamily: STRINGS.GoogleSansMedium,
    textAlign: "center",
  },
});
