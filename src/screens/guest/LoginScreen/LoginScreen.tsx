import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../../components/Input/Input";
import { useTranslateAnimation } from "../../../hooks/useTranslateAnimation";
import Animated from "react-native-reanimated";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email Required").email("Invalid Email"),
  password: yup.string().required("Password Required"),
});

type LoginScreenProps = NativeStackScreenProps<GuestStackParamList, "Login">;

type UserLoginForm = {
  email: string;
  password: string;
};

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: UserLoginForm) => {
    console.log(data);
  };
  const submitAnimatedStyle = useTranslateAnimation("y", 400, 300);

  return (
    <View className="bg-mainBg flex-1 items-center pt-[30%] px-4 gap-4">
      <Input
        fieldName="email"
        displayName={"Email"}
        control={control}
        error={errors.email}
        initialOffset={400}
      />
      <Input
        fieldName="password"
        displayName={"Password"}
        control={control}
        error={errors.password}
      />
      <Animated.View
        className="rounded-3xl p-4 bg-customBlack items-center w-1/2"
        style={[submitAnimatedStyle]}
      >
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text className="text-white text-2xl">Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;
