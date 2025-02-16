import React, { FC, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import { styles } from "@/style/auth.module";
import { useTheme } from "@react-navigation/native";
import { AuthResponseConfig } from "@/components/interfaces";
import { storeData } from "@/components/cred/cred_functions";
import { useRouter } from "expo-router";
import { useReplyContext } from "@/components/context/replyContext";

const Login: FC = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const { setReply } = useReplyContext();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInput =
    (key: string) =>
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const inputValue = event.nativeEvent.text;
      setUserData((prevData) => ({
        ...prevData,
        [key]: inputValue,
      }));
    };

  const submitForm = async () => {
    if (userData.email && userData.password) {
      const response = await fetch(
        "https://minimal-blog-ivory.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(userData),
        }
      );
      const res = (await response.json()) as AuthResponseConfig;
      if (res) {
        if (res.status == 200) {
          setReply(res.message);
          storeData("USERCRED", res.credentials);
          router.push("/feeds");
        } else {
          setReply(res.message);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.auth_container}>
        <View>
          <Text style={[styles.title,{color:colors.text}]}>Minimal Blog</Text>
          <Text style={styles.title}>Login</Text>
          <View style={styles.input_container}>
            <Text style={styles.label}>Enter Email</Text>
            <TextInput
              onChange={handleInput("email")}
              style={styles.input}
              autoCapitalize="none" // To prevent auto-capitalization
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Enter Password</Text>
            <TextInput
              onChange={handleInput("password")}
              style={styles.input}
              autoCapitalize="none" // To prevent auto-capitalization
            />
          </View>
          <Pressable
            onPress={() => {
              router.push("/(auth)/signup");
            }}
          >
            <Text style={styles.forget_password}>Create New Account</Text>
          </Pressable>

          <View style={styles.button}>
            <Button title="Login" onPress={submitForm}></Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
