import React, { FC ,useRef,useEffect} from "react";
import { View, StyleSheet, Animated,SafeAreaView,Text } from "react-native";

const LoadingPage: FC = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startSpinning=()=>{
            Animated.loop(
                Animated.timing(spinValue, {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: true,
                })
              ).start();
        }

        startSpinning()
        
      }, [spinValue]);


  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.safearea}>
      
       <View>
        <Text>Hello Loading</Text></View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    marginTop: 50,
    backgroundColor: "inherit",
    position: "relative",
    width: "100%",
    display: "flex",
    height: "100%",
  },
  spinner: {
    borderWidth: 7,
    borderColor: "rgb(79, 75, 75)",
    borderTopColor: "#3498db",
    borderRadius: 50,
    width: 100,
    height: 100,
    position: "absolute",
    top: "30%",
    left: "45%",
    zIndex: 10,
    backgroundColor: "rgba(241, 238, 238, 0)", // Transparent background
  },
});

/**
 * 
 *  border: 7px solid rgb(79, 75, 75),
    borderTop: "7px solid #3498db",
    borderRadius: 50,
    width: 100,
    height: 100,
    animation: spin 1s linear infinite,
    margin: 20px auto,
    position: absolute,
    top: 30%,
    left: 45%,
    z-index: 10,
    background-color: transparent(241, 238, 238),
    

 */

export default LoadingPage;
