import Foundation from "@expo/vector-icons/Foundation";
import React, { FC } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import {
  NativeStackNavigationProp,

} from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";
const profile = require("../../assets/images/gwen.jpg");
import { useNavigation } from "@react-navigation/native";

const BottomTab: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Feed")}>
        <Foundation name="home" size={24} color="black" />
      </Pressable>
      <Pressable>
        <AntDesign name="search1" size={24} color="black" />
      </Pressable>
      <Pressable>
        <Feather name="plus-circle" size={24} color="black" />
      </Pressable>
      <Pressable>
        <Octicons name="video" size={24} color="black" />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Image style={styles.profile} source={profile}></Image>
      </Pressable>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "#c0c2be",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
