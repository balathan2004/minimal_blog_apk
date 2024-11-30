import React, { Component } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <View>
          <Text style={styles.headerText}>Instagram</Text>
        </View>
        <View>
          <View style={styles.icons_container}>
            <Pressable>
              <Feather name="heart" size={24} color="black" />
            </Pressable>
            <Pressable>
              <AntDesign name="message1" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "black",
  },
});
