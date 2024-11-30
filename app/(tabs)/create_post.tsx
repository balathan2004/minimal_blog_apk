import React, { useState, useEffect, FC, useContext } from "react";
import { useSelector, UseSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  PermissionsAndroid,
  Platform,
  Alert,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { RootState } from "@/components/redux-config/store";
import { UserDataInterface } from "@/components/interfaces";
import SendFile from "@/components/fetching/sendFile";
import { ReplyProviderContext } from "@/components/context/replyContext";
import { ResponseConfig } from "@/components/interfaces";
import { router } from "expo-router";

const CreatePost: FC = () => {
  const USERCRED = useSelector(
    (state: RootState) => state.USERCRED as UserDataInterface
  );
  const [userData, setUserData] = useState<UserDataInterface | null>();
  const [caption, setCaption] = useState("");
  const {setReply}=ReplyProviderContext();
  const [image,setImage]=useState<File|null>(null);
  const [showImage, SetShowImage] = useState<string | null>(null);

  const requestPermission = async () => {
    console.log("Request permission");
    console.log(Platform.OS);
    if (Platform.OS === "android") {
      console.log("if to get permission");

      try {
        console.log("try to get permission");
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage to pick images.",
            buttonPositive: "OK",
          }
        );
        console.log("Storage permission granted");
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        console.log("Storage permission denied");
        return false;
      }
    }
    console.log("permissions finished");
    return true;
  };

  const PickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      console.log("Permission denied");
      Alert.alert(
        "Permission Denied",
        "You need to allow storage permission to pick an image."
      );
      return;
    }

    console.log("Permission granted");
    launchImageLibrary({ mediaType: "photo" }, async (res) => {
      if (res.didCancel) {
        console.log("User canceled image picker");
      } else if (res.errorMessage) {
        console.log("Error retrieving image", res.errorMessage);
      } else if (res.assets && res.assets.length > 0 ) {
        const { uri, fileName, type } = res.assets[0];
        if (uri) {
          const res = await fetch(uri);
          const blob = await res.blob();
          const file = new File([blob], fileName || "image.jpg", {
            type: "image/jpeg",
          });
         
          setImage(file);
          SetShowImage(uri);
        }

        console.log(uri, fileName, type);
      }
    });
  };

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setCaption(event.nativeEvent.text);
  };

  const handleSubmit=async ()=>{
    if(userData&& caption && image && image){

      setReply("post sent successfully")
      const form = new FormData();
      form.append("file", image);
      form.append("caption", caption);
      form.append("userId", userData.uid);
      form.append("username", userData.display_name);
      const res=await SendFile({data:form,route:"https://minimal-blog-ivory.vercel.app/api/create"})
    
      if(res){
        console.log(res)
        if(res.status==200){
          setReply(res.message);
          //router.push('/(tabs)/feeds')
        }
        setReply(res.message)
        
      }
  
    }
    

  }

  useEffect(() => {
    if (USERCRED) {
      setUserData(USERCRED);
    }
  }, [USERCRED]);

  return (
    <SafeAreaView style={styles.safearea}>
      <Pressable onPress={PickImage}>
        <Text style={styles.label}>Select Image</Text>
      </Pressable>

      {showImage ? (
        <Image style={styles.image} source={{ uri: showImage }}></Image>
      ) : (
        <Text>No image selected</Text>
      )}

      <Text>Type Something</Text>
      <TextInput style={styles.input} onChange={handleInput}></TextInput>
    <Button title="Post" onPress={handleSubmit}></Button>
    </SafeAreaView>
  );
};

export default CreatePost;

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
  image: {
    height: 400,
    width: 400,
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 50,
    fontSize: 22,
  },
  label: {
    marginBottom: 10,
    fontSize: 22,
    lineHeight: 50,
  },
  forget_password: {
    textAlign: "center",
    lineHeight: 50,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    width: "75%",
    margin: "auto",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderBlockColor: "black",
    borderRadius: 4,
    paddingLeft: 5,
  },
});
