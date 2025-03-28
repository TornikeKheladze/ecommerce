import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavouritesScreen from "../../screens/loggedin/FavTab/FavouritesScreen/FavouritesScreen";
import ProductScreen from "../../screens/loggedin/HomeTab/ProductScreen/ProductScreen";
import { Product } from "../../types/common";

export type FavouritesStackParamList = {
  FavouritesList: undefined;
  Product: { product: Product };
};
export const Stack = createNativeStackNavigator<FavouritesStackParamList>();

const FavouritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavouritesList" component={FavouritesScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default FavouritesStack;
