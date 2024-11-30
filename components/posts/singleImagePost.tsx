import React, { Component, FC } from "react";
import { View, Text, Image } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const profile = require("../../assets/images/gwen.jpg");

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { PostDataInterface } from "../interfaces";

interface Props {
  data:PostDataInterface;
}

const SingleImagePost: FC<Props> = ({ data }: Props) => {
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <View style={styles.header_left}>
          <View>
            <Image style={styles.profile_image} source={profile}></Image>
          </View>
          <View>
            <Text style={styles.username}>{data.post_user_name}</Text>
            <Text>No Audio</Text>
          </View>
        </View>
        <View>
          <FontAwesome5 name="ellipsis-v" size={28} color="black" />
        </View>
      </View>
      <View>
        <Image alt="image" style={styles.content_image} source={{ uri: data.post_image_url }} />
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_icons}>
          <View style={styles.footer_icons_left}>
            <Feather name="heart" size={30} color="black" />
            <AntDesign name="message1" size={30} color="black" />
            <Ionicons name="paper-plane-outline" size={30} color="black" />
          </View>

          <FontAwesome name="bookmark-o" size={30} color="black" />
        </View>

        <View style={styles.footer_caption}>
          <Text style={styles.username}>{data.post_user_name}</Text>
          <Text>{data.post_caption}</Text>
        </View>
      </View>
    </View>
  );
};

export default SingleImagePost;


import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  post:{
    width:"100%",
    height:'auto',
    padding:7
  }
  ,
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom:10,
    paddingTop:10,
  },
  profile_image: {
    borderRadius: 100,
    height: 55,
    width: 55,
    resizeMode:"cover"
  },
  header_left: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  img_container: {},
  content_image:{
    width: "auto",
    height: 450,
    resizeMode:"cover",
    borderRadius:4
  
  },
  footer: {
    paddingTop:10
  },
  footer_icons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:10,
    cursor:"pointer",
  },
  footer_icons_left: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  footer_caption: {
    display: "flex",
    flexDirection: "row",
    gap:10,
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
});


