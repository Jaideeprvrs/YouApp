import { COLORS } from "@/src/constants/Colors";
import { STRINGS } from "@/src/constants/Strings";
import { persistor, store } from "@/src/redux/store";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate
          loading={<Text>Loading cached data...</Text>}
          persistor={persistor}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthWrapper />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
}

function AuthWrapper() {
  const isLoggedIn = useSelector((state) => state.authData?.isLoggedIn);
  const [fontsLoaded] = useFonts({
    GoogleSansBold: require("../assets/fonts/GoogleSans-Bold.ttf"),
    GoogleSansMedium: require("../assets/fonts/GoogleSans-Medium.ttf"),
    GoogleSansRegular: require("../assets/fonts/GoogleSans-Regular.ttf"),
    CedarvilleCursiveRegular: require("../assets/fonts/CedarvilleCursiveRegular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate
          loading={<Text>Loading cached data...</Text>}
          persistor={persistor}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={() => ({
                headerShown: true,
                headerTitleStyle: {
                  fontFamily: STRINGS.CedarvilleCursiveRegular,
                  fontSize: 20,
                },
                headerStyle: { backgroundColor: COLORS.white },
                headerTintColor: COLORS.black,
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerRight: () => (
                  <TouchableOpacity onPress={() => router.push("/profile")}>
                    <Image
                      source={require("../assets/images/man.png")}
                      style={{ width: 35, height: 35, borderRadius: 50 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ),
              })}
            >
              {!isLoggedIn && (
                <Stack.Screen
                  name="index"
                  options={{ title: "Login", headerShown: false }}
                />
              )}

              <Stack.Screen
                name="posts"
                options={{
                  title: "YOU",
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="comments"
                options={{
                  title: "COMMENTS",
                  headerTitleStyle: { fontFamily: STRINGS.GoogleSansMedium },
                  headerRight: () => <View />,
                }}
              />
              <Stack.Screen
                name="profile"
                options={{
                  headerShown: true,
                  title: "",
                  headerRight: () => <View />,
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
}
