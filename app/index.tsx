import React, { useEffect } from "react";
import { useUserContext } from "@/components/context/userContext";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoadingContext } from "@/components/context/loadingContext";
import LoadingIndicator from "@/components/elements/loadingComponent";
import { UserDataInterface } from "@/components/interfaces";
export default function Index() {
  const { setUserCred } = useUserContext();
  const { loading, setLoading } = useLoadingContext();

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        setLoading(true)
        const userCredString = await AsyncStorage.getItem("USERCRED");
        const parsedUserCred = userCredString
          ? (JSON.parse(userCredString) as UserDataInterface)
          : null;

        if (parsedUserCred) {
          setUserCred(parsedUserCred);
          router.replace("/(tabs)/feeds"); // Navigate to tabs if logged in
        } else {
          router.replace("/(auth)/"); // Navigate to auth if not logged in
        }
      } catch (error) {
        console.error("Error checking user login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLogin();
  }, []);

  if (loading) {
    return <LoadingIndicator />; // Show a loading spinner or splash screen
  }

  return null;
}
