import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GuestStackParamList } from "../../../navigation/GuestStack";

type HomeScreenProps = NativeStackScreenProps<GuestStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View className="bg-mainBg flex-1 gap-8 justify-center items-center">
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        className="rounded-3xl p-4 bg-customBlack items-center w-1/2"
      >
        <Text className="text-white text-2xl">Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="rounded-3xl p-4 bg-customBlack items-center w-1/2"
      >
        <Text className="text-white text-2xl">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
