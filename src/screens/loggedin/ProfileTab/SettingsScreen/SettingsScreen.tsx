import { View, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../../navigation/AuthStacks/ProfileStack";
import Txt from "../../../../components/Txt/Txt";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type SettingsScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "Settings"
>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { goBack, canGoBack } = navigation;
  return (
    <View className="flex-1 bg-mainBg items-center">
      <View className="bg-customBlack h-32 justify-end pb-3 items-center w-full">
        {canGoBack() && (
          <TouchableOpacity
            onPress={goBack}
            className="absolute left-2 bottom-3"
          >
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
        )}
        <Txt className="text-white text-3xl">Settings</Txt>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("PasswordUpdate")}
        className="bg-white p-4 my-3 w-2/3 rounded-2xl py-5 flex-row justify-between mt-12"
      >
        <View className="flex-row items-center gap-3">
          <MaterialIcons name="password" size={24} color="black" />
          <Txt>Change Password</Txt>
        </View>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditUser")}
        className="bg-white p-4 my-3 w-2/3 rounded-2xl py-5 flex-row justify-between"
      >
        <View className="flex-row items-center gap-3">
          <AntDesign name="edit" size={24} color="black" />
          <Txt>Edit User</Txt>
        </View>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
