import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavouritesScreen from "../../screens/loggedin/FavTab/FavouritesScreen/FavouritesScreen";

export type FavouritesStackParamList = {
  FavouritesList: undefined;
};
export const Stack = createNativeStackNavigator<FavouritesStackParamList>();

const FavouritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavouritesList" component={FavouritesScreen} />
    </Stack.Navigator>
  );
};

export default FavouritesStack;
