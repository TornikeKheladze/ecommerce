import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../../../types/common";
import Input from "../../../components/Input/Input";

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
});

type RegisterScreenProps = NativeStackScreenProps<
  GuestStackParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: User) => {
    // Alert.alert("Form Data", JSON.stringify(data));

    console.log(data);
  };

  return (
    <View className="bg-mainBg flex-1 items-center pt-[30%] px-4">
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Input
            fieldName="firstName"
            displayName={"First Name"}
            control={control}
            error={errors.firstName}
          />
        </View>
        <View className="flex-1">
          <Input
            fieldName="lastName"
            displayName={"Last Name"}
            control={control}
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
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="rounded-3xl p-4 bg-customBlack items-center w-1/2"
      >
        <Text className="text-white text-2xl">Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
