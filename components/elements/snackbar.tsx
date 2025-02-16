import React, { Component } from "react";
import { View, Text } from "react-native";
import { style } from "@/style/global.css";
import { useTheme } from "@react-navigation/native";

interface Props {
  value: string;
}

export default function Snackbar({ value }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[style.snackbar]}>
      <Text style={[style.snackbar_text]}>{value}</Text>
    </View>
  );
}