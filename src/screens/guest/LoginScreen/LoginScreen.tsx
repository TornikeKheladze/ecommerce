import { View, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import Input from "../../../components/Input/Input";
import Animated from "react-native-reanimated";
import { useLoginScreen } from "./useLoginScreen";
import Txt from "../../../components/Txt/Txt";

type LoginScreenProps = NativeStackScreenProps<GuestStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { control, handleSubmit, errors, onSubmit, submitAnimatedStyle } =
    useLoginScreen();

  return (
    <View className="bg-mainBg flex-1 items-center pt-[30%] px-4 gap-4">
      <Input
        fieldName="email"
        displayName={"Email"}
        control={control}
        error={errors.email}
        initialOffset={400}
        animate={true}
      />
      <Input
        fieldName="password"
        displayName={"Password"}
        control={control}
        error={errors.password}
        animate={true}
      />
      <Animated.View className="w-1/2" style={[submitAnimatedStyle]}>
        <TouchableOpacity
          className="w-full p-4 rounded-3xl bg-customBlack items-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Txt className="text-white text-2xl">Login</Txt>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;
