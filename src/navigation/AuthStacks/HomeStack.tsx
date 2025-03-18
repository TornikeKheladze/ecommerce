import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Product } from "../../types/common";
import HomeScreen from "../../screens/loggedin/HomeTab/HomeScreen/HomeScreen";
import ProductScreen from "../../screens/loggedin/HomeTab/ProductScreen/ProductScreen";
import ProductListScreen from "../../screens/loggedin/HomeTab/ProductListScreen/ProductListScreen";

export type HomeStackParamList = {
  Home: undefined;
  Product: { product: Product };
  ProductList: { category?: string };
};

export const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
