import React, { FC } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { styles } from "@/style/post.css";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
//const profile = require("../../assets/images/gwen.jpg");
import { useRouter } from "expo-router";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "@react-navigation/native";

import { PostDataInterface } from "../interfaces";

interface Props {
  data: PostDataInterface;
}

const SingleImagePost: FC<Props> = ({ data }: Props) => {
  const router = useRouter();
  const { colors } = useTheme();
  const handleUserProfile = () => {
    router.push(`/(user)/${data.post_user_id}`);
  };

  const timeConvert = (time: number | string) => {
    return `created ${formatDistanceToNow(new Date(data.post_time), {
      addSuffix: true,
    })}
  `;
  };

  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <View style={styles.header_left}>
          <View>
            <Image
              style={[styles.profile_image, { borderColor: colors.text }]}
              source={{
                uri: `https://ui-avatars.com/api/?name=${data.post_user_name}&format=png`,
              }}
            ></Image>
          </View>
          <View>
            <Pressable onPress={handleUserProfile}>
              <Text style={[styles.username, { color: colors.text }]}>
                {data.post_user_name}
              </Text>
            </Pressable>
          </View>
        </View>
        <View>
          <FontAwesome5 name="ellipsis-v" size={28} color={colors.text} />
        </View>
      </View>
      <View>
        <Image
          alt="image"
          style={styles.content_image}
          source={{ uri: data.post_image_url }}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_caption}>
          <Text style={[styles.username, { color: colors.text }]}>
            {data.post_user_name}
          </Text>
          <Text style={[styles.caption, { color: colors.text }]}>
            {data.post_caption}
          </Text>
        </View>
        <Text style={[styles.caption, { color: colors.text }]}>{timeConvert(data.post_time)}</Text>
      </View>
    </View>
  );
};

export default SingleImagePost;
