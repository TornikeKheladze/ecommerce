import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import GuestStack from "./GuestStack";
import AuthTabNavigator from "./AuthTabNavigator";
import { Product } from "../types/common";
import { saveCategories, saveProducts } from "../store/productSlice";

const RootNavigator = () => {
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const { products } = useSelector((store: RootState) => store.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (products.length === 0) {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((products: Product[]) => {
          const categories = products.map((product) => product.category);
          const categorySet = new Set(categories);
          const uniqueCategories = [...categorySet];
          dispatch(saveProducts(products));
          dispatch(saveCategories(uniqueCategories));
        });
    }
  }, []);
  return (
    <NavigationContainer>
      {authorizedUser ? <AuthTabNavigator /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
