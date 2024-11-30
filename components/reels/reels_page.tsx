import React, { FC } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Video } from 'expo-av';

const video = require("../../assets/videos/video.mp4");

const ReelsPage: FC = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.videoContainer}>
        <Video
          source={video}
          useNativeControls
          isLooping
          style={styles.video}    // Set dimensions
        />
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    marginTop: 20,
    backgroundColor: "inherit",
    position: "relative",
    width: "100%",
    display:"flex",
  },
  videoContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  video: {
    width: '100%',
    height: 1000,  
  },
  
});

export default ReelsPage;
