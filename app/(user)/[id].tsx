// pages/profile/[id].js
import {
  useLocalSearchParams,
  useNavigation,
  router,
  useFocusEffect,
  Tabs,
} from "expo-router";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import {
  ProfileResponseConfig,
  UserDataInterface,
  PostDataInterface,
} from "@/components/interfaces";
import { styles } from "@/style/profile.css";
const image = require("../../assets/images/profile.jpg");
import { Image } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import SingleImagePost from "@/components/elements/singleImagePost";
import moment from "moment";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function UserProfile() {
  const { id } = useLocalSearchParams(); // Get the dynamic `id` from the route
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [userData, setUserData] = useState<UserDataInterface | null>(null);
  const [postData, setPostData] = useState<PostDataInterface[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (id) {
      const fetchFunction = async () => {
        const response = await fetch(
          `https://minimal-blog-ivory.vercel.app/api/get_profile?userId=${id}`,
          {
            method: "GET",
          }
        );

        const res = (await response.json()) as ProfileResponseConfig;
        if (res.status == 200) {
          setIsLoading(false);
          setUserData(res.userData);
          setPostData(res.postData);
        }
      };

      fetchFunction();
    }
  }, [id]);

  const joinedTimer = (time: string) => {
    const formattedDate = moment(new Date(time)).fromNow();
    return formattedDate;
  };
  console.log(userData);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Tabs.Screen
        options={{
          headerTitle: `${userData?.display_name}'s Profile` || "user Profile",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.title}>{userData?.display_name} Profile</Text>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              style={styles.image}
              source={{ uri: `${userData?.profile_url}}&format=png` }}
            ></Image>
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.title, { color: colors.text }]}>
              {userData ? userData.display_name : "unknown"}
            </Text>

            <Text style={[styles.count, { color: colors.text }]}>
              {postData?.length} posts
            </Text>

            <Text style={[styles.joined, { color: colors.text }]}>
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
