import React, { FC } from "react";
import { View, StyleSheet ,ScrollView} from "react-native";
import SingleCircle from "./layout_components/single_circle";
const CirlesHolder: FC = () => {
  return (
    <ScrollView 
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.circle_container}>
      <SingleCircle/>
      <SingleCircle/>
      <SingleCircle/>
      <SingleCircle/>
      <SingleCircle/>
      <SingleCircle/>
      <SingleCircle/>
    </ScrollView>
  );
};

export default CirlesHolder;

const styles = StyleSheet.create({
  circle_container: {
    display: "flex",
    flexDirection: "row",
    gap:50
  },
  image: {
    width:85,
    height:85,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 5,
  },
});
