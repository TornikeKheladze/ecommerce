import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, ProfileIcon } from "../assets/icons";
import { Product } from "../types/common";
import HomeStack from "./AuthStacks/HomeStack";
import ProfileStack from "./AuthStacks/ProfileStack";

export type AuthTabParamList = {
  ProfileStack: undefined;
  HomeStack: undefined;
};

const Tab = createBottomTabNavigator<AuthTabParamList>();

const AuthTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "HomeStack") {
            return <HomeIcon color={focused ? "black" : "#7f8c8d"} />;
          } else if (route.name === "ProfileStack") {
            return <ProfileIcon color={focused ? "black" : "#7f8c8d"} />;
          }
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#7f8c8d",
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default AuthTabNavigator;
