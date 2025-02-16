import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
  safearea: {
    backgroundColor: "inherit",
    position: "relative",
    width: "100%",
    display: "flex",
    height: "100%",
  },
  container: {
    flex: 1,
    width: "95%",
    marginHorizontal: "auto",
  },
  snackbar: {
    position: "absolute",
    top: 100,
    zIndex: 10,
  },
  snackbar_text: {},
  loader: {
    position: "absolute",
    top: 100,
    zIndex: 10,
  },
  centerText: {
    fontSize: 24,
    textAlign: "center",
  },
});
