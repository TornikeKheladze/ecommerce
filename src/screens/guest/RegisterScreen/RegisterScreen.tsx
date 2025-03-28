import { View, TouchableOpacity, Switch } from "react-native";
import React from "react";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Input from "../../../components/Input/Input";
import Animated from "react-native-reanimated";
import { useRegisterScreen } from "./useRegisterScreen";
import Txt from "../../../components/Txt/Txt";

type RegisterScreenProps = NativeStackScreenProps<
  GuestStackParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const {
    handleSubmit,
    control,
    errors,
    isAdmin,
    onSubmit,
    switchAnimatedStyle,
    submitAnimatedStyle,
    setValue,
  } = useRegisterScreen();

  return (
    <View className="bg-mainBg flex-1 items-center pt-[30%] px-4 gap-4">
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Input
            animate={true}
            fieldName="firstName"
            displayName={"First Name"}
            control={control}
            direction="y"
            error={errors.firstName}
          />
        </View>
        <View className="flex-1">
          <Input
            animate={true}
            fieldName="lastName"
            displayName={"Last Name"}
            control={control}
            direction="y"
            error={errors.lastName}
          />
        </View>
      </View>
      <Input
        animate={true}
        fieldName="email"
        displayName={"Email"}
        control={control}
        error={errors.email}
      />
      <Input
        animate={true}
        fieldName="password"
        displayName={"Password"}
        control={control}
        error={errors.password}
        initialOffset={400}
      />
      <Input
        animate={true}
        fieldName="passwordConfirmation"
        displayName={"Confirm Password"}
        control={control}
        error={errors.passwordConfirmation}
      />
      <Animated.View
        style={[switchAnimatedStyle]}
        className="flex-row items-center justify-center mb-2 gap-4 self-start"
      >
        <Txt className="text-xl text-customBlack">Admin</Txt>
        <Switch
          value={isAdmin}
          onValueChange={() => setValue("isAdmin", !isAdmin)}
        />
      </Animated.View>

      <Animated.View className="w-1/2" style={[submitAnimatedStyle]}>
        <TouchableOpacity
          className="w-full p-4 rounded-3xl bg-customBlack items-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Txt className="text-white text-2xl">Register</Txt>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default RegisterScreen;
