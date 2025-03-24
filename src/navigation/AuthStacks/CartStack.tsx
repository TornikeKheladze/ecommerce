import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "../../screens/loggedin/HomeTab/ProductScreen/ProductScreen";
import { Product } from "../../types/common";
import CartScreen from "../../screens/loggedin/CartTab/CartScreen/CartScreen";

export type CartStackParamList = {
  Cart: undefined;
  Product: { product: Product };
};
export const Stack = createNativeStackNavigator<CartStackParamList>();

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
