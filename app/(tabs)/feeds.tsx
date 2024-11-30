import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import SingleImagePost from "@/components/posts/singleImagePost";
import Header from "@/components/layout_components/header";
import CirlesHolder from "@/components/circles_holder";




export interface PostDataInterface {
  post_name: string;
  post_caption: string;
  post_time: string;
  post_user_id: string;
  post_image_url: string;
  post_user_name: string;
}

export default function Feed() {
  const [postData, setPostData] = useState<PostDataInterface[] | null>(null);

  const getData = async () => {
    const res = await fetch(
      "https://minimal-blog-ivory.vercel.app/api/get_posts"
    );
    const resJson = await res.json();
    setPostData(resJson.postData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Header />
        <CirlesHolder />
        <View style={styles.post_container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    marginTop: 20,
    backgroundColor: "inherit",
    position: "relative",
    width: "100%",
  },
  post_container: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    paddingBottom: 100,
  },
});
