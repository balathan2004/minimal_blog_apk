import { View, Text, Pressable, SafeAreaView, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { UserDataInterface } from "@/components/interfaces";
const image = require("../../assets/images/gwen.jpg")
import { storeData,getData } from "@/components/cred/cred_functions";
import { Image } from "react-native";

import React, { useState, useEffect } from "react";
import CirlesHolder from "@/components/circles_holder";
import { Alert } from "react-native";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/components/redux-config/store";
import { StyleSheet } from "react-native";

export default function HomeScreen() {

  const   USERCRED = useSelector((state:RootState)=>state.USERCRED as UserDataInterface)
  const [userData,setUserData] = useState<UserDataInterface|null>()

  useEffect(()=>{
    if(USERCRED){
      setUserData(USERCRED)
    }

  },[USERCRED])


  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.top_name}>{userData?userData.display_name:"unknown"}</Text>
          </View>

          <View style={styles.headerRight}>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color="white"
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.img_container}>
          <View style={styles.img_holder}>
            <Image style={styles.image} source={userData?{uri:userData.profile_url}:image}></Image>
          </View>
          <View style={styles.counts}>
            <View>
              <Text style={styles.count_text_num}>38</Text>
              <Text style={styles.count_text_type}>posts</Text>
            </View>
            <View>
              <Text style={styles.count_text_num}>509</Text>
              <Text style={styles.count_text_type}>followers</Text>
            </View>
            <View>
              <Text style={styles.count_text_num}>262</Text>
              <Text style={styles.count_text_type}>following</Text>
            </View>
          </View>
        </View>
        <View style={styles.bio}>
          <View style={styles.name_holder}>
            <Text style={styles.name_holder_text}>Emma Stone</Text>
            <Ionicons name="heart" size={22} color="#eb023c" />
          </View>

          <View style={styles.threads_holder}>
            <View style={styles.threads_holder_inner}>
              <FontAwesome6 name="threads" size={22} color="white" />
              <Text style={styles.text}>gwen_stacy</Text>
            </View>
          </View>

          <Text style={styles.text}>Amazing Spiderman</Text>
          <Text style={styles.text}>La La Land</Text>
        </View>
      </View>
      <CirlesHolder />
      <Button title="click"></Button>
      <Button title="alert"></Button>
    </SafeAreaView>
  );
}





const styles = StyleSheet.create({
  safearea: {
    marginTop: 20,
    backgroundColor: "inherit",
    position: "relative",
    width: "100%",
  },
  container: {
    margin: 10,
    color: "white",
    marginBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  icon: {
    color: "black",
  },

  headerLeft: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  top_name: {
    color: "black",
    ////fontWeight:700,
    fontSize: 22,
  },
  headerRight: {},

  img_container: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  img_holder: {},
  image: {
    borderRadius: 100,
    height: 90,
    width: 90,
  },
  counts: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  count_text_num: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
  count_text_type: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
  },
  bio: {
    marginTop: 20,
  },

  threads_holder: {
    marginBottom: 10,
    display: "flex",
    alignItems: "flex-start",
  },

  threads_holder_inner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 35,
    padding:10,
    borderRadius: 20,
    backgroundColor: "#6f7872",
  },

  name_holder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  name_holder_text: {
    color: "black",
    fontSize: 14,
    //fontWeight:600
  },
  follow_btn: {
    width: "100%",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#1783c2",
    borderRadius: 10,
  },
  follow_btn_text: {
    textAlign: "center",
    color: "black",
  },
});

