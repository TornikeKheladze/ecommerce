import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/loggedin/ProfileTab/ProfileScreen/ProfileScreen";
import PurchaseHistoryScreen from "../../screens/loggedin/ProfileTab/PurchaseHistoryScreen/PurchaseHistoryScreen";
import SettingsScreen from "../../screens/loggedin/ProfileTab/SettingsScreen/SettingsScreen";
import PasswordUpdateScreen from "../../screens/loggedin/ProfileTab/PasswordUpdateScreen/PasswordUpdateScreen";
import EditUserScreen from "../../screens/loggedin/ProfileTab/EditUserScreen/EditUserScreen";

export type ProfileStackParamList = {
  Profile: undefined;
  PurchaseHistory: undefined;
  Settings: undefined;
  PasswordUpdate: undefined;
  EditUser: undefined;
};
export const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="PasswordUpdate" component={PasswordUpdateScreen} />
      <Stack.Screen name="EditUser" component={EditUserScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
