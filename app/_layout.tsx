import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo, useState } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import userSlice from "../components/redux-config/user_slice";
import { UserDataInterface } from "@/components/interfaces";
import { useColorScheme } from "@/components/useColorScheme";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDataUpload } from "../components/redux-config/user_slice";
import LoadingPage from "@/components/small_components/loadingPage";
import { useRouter } from "expo-router";
import { LogBox } from "react-native";
import ReplyHolder from "@/components/context/replyContext";
import ReplyPopup from "@/components/small_components/replyPopup";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

LogBox.ignoreLogs([
  '[Reanimated] Reduced motion setting is enabled on this device.',
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

  const store = useMemo(() => {
    return configureStore({
      reducer: {
        USERCRED: userSlice,
      },
    });
  }, []);

  return (
    <Provider store={store}>
      <ReplyHolder>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ReplyPopup/>
        <ConditionalNavigator />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
      </ReplyHolder>
    </Provider>
  );
}

function ConditionalNavigator() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const userCred = useSelector(
    (state: { USERCRED: UserDataInterface }) => state.USERCRED
  );

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const userCredString = await AsyncStorage.getItem("USERCRED");
        const parsedUserCred = userCredString
          ? JSON.parse(userCredString)
          : null;

        if (parsedUserCred) {
          dispatch(UserDataUpload(parsedUserCred));
          router.replace("/(tabs)/feeds"); // Navigate to tabs if logged in
        } else {
          router.replace("/(auth)"); // Navigate to auth if not logged in
        }
      } catch (error) {
        console.error("Error checking user login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLogin();
  }, [dispatch, router]);

  if (loading) {
    return <LoadingPage />; // Show a loading spinner or splash screen
  }

  return null;
}
