// utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserFromStorage = async () => {
  try {
    const json = await AsyncStorage.getItem("user");
    return json != null ? JSON.parse(json) : null;
  } catch (e) {
    console.log("Storage read error:", e);
    return null;
  }
};
