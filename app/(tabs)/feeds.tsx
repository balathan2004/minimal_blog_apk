import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SingleImagePost from "@/components/elements/singleImagePost";
import { PostDataInterface } from "@/components/interfaces";
import { useTheme } from "@react-navigation/native";
import { style } from "@/style/global.css";
import { styles as postStyles } from "@/style/post.css";
import { useNavigation } from "expo-router";

export default function Feed() {
  const [postData, setPostData] = useState<PostDataInterface[] | null>(null);
  const { colors } = useTheme();
  const navigation = useNavigation();
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://minimal-blog-ivory.vercel.app/api/get_posts?page=0&limit=5",
        {
          method: "GET",
          headers: {
            Origin: "http://localhost:8081", // Set the appropriate origin here
          },
        }
      );
      const resJson = await res.json();
      setPostData(resJson.postData);
    };
    getData();
  }, []);

  return (
    <View style={style.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[style.centerText, { color: colors.text }]}>
            Minimal Blog
          </Text>
        </View>

        <View style={postStyles.post_container}>
          {postData?.map((post) => {
            return (
              <SingleImagePost
                key={post.post_name}
                data={post}
              ></SingleImagePost>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
  },
});
