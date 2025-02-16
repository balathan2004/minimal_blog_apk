import { View, ActivityIndicator } from "react-native";
import { style } from "@/style/global.css";
export default function LoadingIndicator() {
  return (
    <View style={style.loader}>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
}
