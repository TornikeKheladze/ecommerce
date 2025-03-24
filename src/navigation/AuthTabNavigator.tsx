import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeartIcon, HomeIcon, ProfileIcon } from "../assets/icons";
import HomeStack from "./AuthStacks/HomeStack";
import ProfileStack from "./AuthStacks/ProfileStack";
import FavouritesStack from "./AuthStacks/FavouritesStack";
import CartStack from "./AuthStacks/CartStack";
import AntDesign from "@expo/vector-icons/AntDesign";

export type AuthTabParamList = {
  ProfileStack: undefined;
  HomeStack: undefined;
  FavouritesStack: undefined;
  CartStack: undefined;
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
          } else if (route.name === "FavouritesStack") {
            return <HeartIcon color={focused ? "black" : "#7f8c8d"} />;
          } else if (route.name === "CartStack") {
            return (
              <AntDesign
                name="shoppingcart"
                size={26}
                color={focused ? "black" : "#7f8c8d"}
              />
            );
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
        name="FavouritesStack"
        component={FavouritesStack}
        options={{ title: "Favourites" }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{ title: "Cart" }}
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
