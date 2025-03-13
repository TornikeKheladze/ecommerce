import { View, Text } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GuestStackParamList } from "../../../navigation/GuestStack";

type LoginScreenProps = NativeStackScreenProps<GuestStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;
