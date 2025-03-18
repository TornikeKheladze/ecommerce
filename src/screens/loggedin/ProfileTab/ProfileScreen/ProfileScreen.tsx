import { View, Text } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";

type ProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "Profile"
>;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return (
    <View className="flex-1 bg-mainBg pt-28">
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
