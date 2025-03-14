import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../../../types/common";
import Input from "../../../components/Input/Input";
import { useTranslateAnimation } from "../../../hooks/useTranslateAnimation";
import Animated from "react-native-reanimated";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only Letters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only Letters"),
  email: yup.string().required("Email Required").email("Invalid Email"),
  password: yup
    .string()
    .required("Password Required")
    .min(8, "Minimum 8 Letters"),
  passwordConfirmation: yup
    .string()
    .required("Password Confirmation Required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

type RegisterScreenProps = NativeStackScreenProps<
  GuestStackParamList,
  "Register"
>;

interface UserRegisterForm extends User {
  passwordConfirmation: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: User) => {
    console.log(data);
  };
  const submitAnimatedStyle = useTranslateAnimation("y", 400, 300);

  return (
    <View className="bg-mainBg flex-1 items-center pt-[30%] px-4 gap-4">
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Input
            fieldName="firstName"
            displayName={"First Name"}
            control={control}
            direction="y"
            error={errors.firstName}
          />
        </View>
        <View className="flex-1">
          <Input
            fieldName="lastName"
            displayName={"Last Name"}
            control={control}
            direction="y"
            error={errors.lastName}
          />
        </View>
      </View>
      <Input
        fieldName="email"
        displayName={"Email"}
        control={control}
        error={errors.email}
      />
      <Input
        fieldName="password"
        displayName={"Password"}
        control={control}
        error={errors.password}
        initialOffset={400}
      />
      <Input
        fieldName="passwordConfirmation"
        displayName={"Confirm Password"}
        control={control}
        error={errors.passwordConfirmation}
      />

      <Animated.View
        className="rounded-3xl p-4 bg-customBlack items-center w-1/2"
        style={[submitAnimatedStyle]}
      >
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text className="text-white text-2xl">Register</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default RegisterScreen;
