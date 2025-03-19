import { View, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import Animated from "react-native-reanimated";
import { useTranslateAnimation } from "../../../hooks/useTranslateAnimation";
import Txt from "../../../components/Txt/Txt";

type LandingScreenProps = NativeStackScreenProps<
  GuestStackParamList,
  "Landing"
>;

const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  const registerAnimatedStyle = useTranslateAnimation("x", -400, 300);
  const loginAnimatedStyle = useTranslateAnimation("x", 400, 300);

  return (
    <View className="bg-mainBg flex-1 gap-8 items-center pt-[40%]">
      <Animated.View style={[registerAnimatedStyle]} className="w-1/2">
        <TouchableOpacity
          className="w-full p-4 rounded-3xl bg-customBlack items-center"
          onPress={() => navigation.navigate("Register")}
        >
          <Txt className="text-white text-2xl">Register</Txt>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[loginAnimatedStyle]} className="w-1/2">
        <TouchableOpacity
          className="w-full p-4 rounded-3xl bg-customBlack items-center"
          onPress={() => navigation.navigate("Login")}
        >
          <Txt className="text-white text-2xl">Login</Txt>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LandingScreen;
