import { View, Text, SafeAreaView, ScrollView } from "react-native";
import {
  ProfileResponseConfig,
  UserDataInterface,
  PostDataInterface,
} from "@/components/interfaces";
import { styles as postStyle } from "@/style/profile.css";
import { style } from "@/style/global.css";
const image = require("../../assets/images/profile.jpg");
import { Image } from "react-native";
import React, { useState, useEffect } from "react";
import SingleImagePost from "@/components/elements/singleImagePost";
import moment from "moment";
import { useUserContext } from "@/components/context/userContext";
import { useTheme } from "@react-navigation/native";

export default function HomeScreen() {
  const { userCred } = useUserContext();
  const [userData, setUserData] = useState<UserDataInterface | null>(null);
  const [postData, setPostData] = useState<PostDataInterface[] | null>(null);
  const { colors } = useTheme();
  useEffect(() => {
    if (userCred) {
      const fetchFunction = async () => {
        const response = await fetch(
          `https://minimal-blog-ivory.vercel.app/api/get_profile?userId=${userCred.uid}`,
          {
            method: "GET",
          }
        );
        const res = (await response.json()) as ProfileResponseConfig;
        if (res.status == 200) {
          setUserData(res.userData);
          setPostData(res.postData);
        }
      };
      fetchFunction();
      setUserData(userCred);
    }
  }, [userCred]);

  const joinedTimer = (time: string) => {
    const formattedDate = moment(new Date(time)).fromNow();
    return formattedDate;
  };

  console.log(userData);

  return (
    <View style={style.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={[postStyle.title, { color: colors.text }]}>
          Your Profile
        </Text>

        <View style={postStyle.header}>
          <View style={postStyle.headerLeft}>
            <Image
              style={postStyle.image}
              source={{ uri: `${userData?.profile_url}}&format=png` }}
            ></Image>
          </View>
          <View style={postStyle.headerRight}>
            <Text style={[postStyle.username, { color: colors.text }]}>
              {userData ? userData.display_name : "unknown"}
            </Text>

            <Text style={[postStyle.count, { color: colors.text }]}>
              {postData?.length} posts
            </Text>

            <Text style={[postStyle.joined, { color: colors.text }]}>
              {userData ? `Joined ${joinedTimer(userData.created_at)} ` : null}
            </Text>
          </View>
        </View>

        <View>
          {postData?.map((item) => (
            <SingleImagePost data={item} key={item.post_name}></SingleImagePost>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
