import React, { FC } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
const profile = require("../../assets/images/gwen.jpg");

const SingleCircle: FC = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={profile}></Image>
      <Text>Gwen Stacy</Text>
    </View>
  );
};

export default SingleCircle;

const styles = StyleSheet.create({
  container:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  ,
  image: {
    width:75,
    height:75,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 2.5,
    margin:10
  },
});
