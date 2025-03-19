import { View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";
import Txt from "../../../../components/Txt/Txt";

type ProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "Profile"
>;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return (
    <View className="flex-1 bg-mainBg pt-28">
      <Txt>ProfileScreen</Txt>
    </View>
  );
};

export default ProfileScreen;
