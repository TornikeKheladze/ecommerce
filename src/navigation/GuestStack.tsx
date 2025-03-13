import React from "react";
import HomeScreen from "../screens/guest/HomeScreen/HomeScreen";
import LoginScreen from "../screens/guest/LoginScreen/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/guest/RegisterScreen/RegisterScreen";

export type GuestStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};
export const Stack = createNativeStackNavigator<GuestStackParamList>();

const GuestStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
};

export default GuestStack;
