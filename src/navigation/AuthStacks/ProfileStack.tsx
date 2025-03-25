import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/loggedin/ProfileTab/ProfileScreen/ProfileScreen";
import PurchaseHistoryScreen from "../../screens/loggedin/ProfileTab/PurchaseHistoryScreen/PurchaseHistoryScreen";

export type ProfileStackParamList = {
  Profile: undefined;
  PurchaseHistory: undefined;
};
export const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
