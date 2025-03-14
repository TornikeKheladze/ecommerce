import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import Animated from "react-native-reanimated";
import { useTranslateAnimation } from "../../../hooks/useTranslateAnimation";

type HomeScreenProps = NativeStackScreenProps<GuestStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const registerAnimatedStyle = useTranslateAnimation("x", -400, 300);
  const loginAnimatedStyle = useTranslateAnimation("x", 400, 300);

  return (
    <View className="bg-mainBg flex-1 gap-8 items-center pt-[40%]">
      <Animated.View
        style={[registerAnimatedStyle]}
        className="rounded-3xl p-4 bg-customBlack items-center w-1/2"
      >
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-white text-2xl">Register</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[loginAnimatedStyle]}
        className="rounded-3xl p-4 bg-customBlack items-center w-1/2"
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-white text-2xl">Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;
