import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { LogBox, useColorScheme, View } from "react-native";
import ReplyHolder from "@/components/context/replyContext";
import ReplyPopup from "@/components/small_components/replyPopup";
import UserCredHolder from "@/components/context/userContext";
import { style } from "@/style/global.css";
import LoadingHolder from "@/components/context/loadingContext";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

LogBox.ignoreLogs([
  "[Reanimated] Reduced motion setting is enabled on this device.",
]);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <View style={style.safearea}>
      <UserCredHolder>
        <ReplyHolder>
          <LoadingHolder>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <ReplyPopup />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="(user)"
                  options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </LoadingHolder>
        </ReplyHolder>
      </UserCredHolder>
    </View>
  );
}
