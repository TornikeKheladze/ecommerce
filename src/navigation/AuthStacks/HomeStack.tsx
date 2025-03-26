import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Product } from "../../types/common";
import HomeScreen from "../../screens/loggedin/HomeTab/HomeScreen/HomeScreen";
import ProductScreen from "../../screens/loggedin/HomeTab/ProductScreen/ProductScreen";
import ProductListScreen from "../../screens/loggedin/HomeTab/ProductListScreen/ProductListScreen";
import EditProductScreen from "../../screens/loggedin/HomeTab/EditProductScreen/EditProductScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EditProductImagesScreen from "../../screens/loggedin/HomeTab/EditProductImagesScreen/EditProductImagesScreen";
import AddProductScreen from "../../screens/loggedin/HomeTab/AddProductScreen/AddProductScreen";

export type HomeStackParamList = {
  Home: undefined;
  Product: { product: Product };
  ProductList: { category?: string };
  EditProduct: { productId: number };
  EditProductImages: { productId: number };
  AddProduct: undefined;
};

export const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      {authorizedUser?.isAdmin && (
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
      )}
      {authorizedUser?.isAdmin && (
        <Stack.Screen
          name="EditProductImages"
          component={EditProductImagesScreen}
        />
      )}
      {authorizedUser?.isAdmin && (
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
      )}
    </Stack.Navigator>
  );
};

export default HomeStack;
