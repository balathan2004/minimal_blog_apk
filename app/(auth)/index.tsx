import React, { FC, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import { AuthResponseConfig } from "@/components/interfaces";
import { storeData } from "@/components/cred/cred_functions";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { ReplyProviderContext } from "@/components/context/replyContext";

import { UserDataUpload } from "@/components/redux-config/user_slice";





const Login: FC = () => {

  const router=useRouter();

  const dispatch = useDispatch();
  const {setReply}=ReplyProviderContext();

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
      const res=await response.json() as AuthResponseConfig
      if(res ){
        if(res.status==200){
          setReply(res.message)
          dispatch(UserDataUpload(res.credentials))
          storeData("USERCRED",res.credentials)
          router.push('/feeds')
        }else{
          setReply(res.message)
        }
        
      }
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.auth_container}>
        <View>
          <Text style={styles.title}>Minimal Blog</Text>
          <Text style={styles.title}>Login Page</Text>
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
          <Pressable onPress={()=>{router.push("/(auth)/signup")}}>
          <Text  style={styles.forget_password}>Create New Account</Text>
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

const styles = StyleSheet.create({
  safearea: {
    marginTop: 50,
    backgroundColor: "inherit",
    position: "relative",
    width: "100%",
    display: "flex",
    height: "100%",
  },
  auth_container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 20,
    paddingBottom: 100,
  },
  input_container: {
    display: "flex",
    width: "75%",
    gap: 5,
    margin: "auto",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderBlockColor: "black",
    borderRadius: 4,
    paddingLeft: 5,
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 50,
    fontSize: 22,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
  },
  forget_password: {
    textAlign:"center",
    lineHeight: 50,
    fontSize: 18,
   
  },
  button: {
    marginTop: 20,
    width: "75%",
    margin: "auto",
  },
});
